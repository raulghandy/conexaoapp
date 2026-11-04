import {
  ApiActivity,
  ApiActivityCheck,
  ApiNearby,
  ApiQuality,
  ApiTimeline,
  ApiTimelineItem,
} from './apiTypes';
import {
  ActivityCheck,
  ActivityId,
  ConnectionLevel,
  CurrentConnection,
  Forecast,
  ForecastItem,
  NetworkMetric,
  PeriodId,
  PlanSlot,
  StabilityReport,
} from '../types/connection';
import { LEVELS } from '../utils/levels';
import { formatClock } from '../utils/formatters';

// Endereço da API. Defina EXPO_PUBLIC_API_URL (veja .env.example) para apontar para a API publicada.
const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080').replace(/\/$/, '');
const API = API_URL + '/api/v1';

// A API escolhe o ponto de medição mais próximo desta posição (Mogi das Cruzes).
const LOCATION = { lat: -23.5227, lon: -46.188 };
const MODEL_ID = 'model-a';

// Servidores gratuitos "dormem" e demoram para acordar, então o tempo limite é longo.
const TIMEOUT_MS = 60000;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(API + path, { ...init, signal: controller.signal });
    if (!response.ok) throw new Error('Erro ' + response.status);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

const nearbyPath = `/forecasts/nearby?lat=${LOCATION.lat}&lon=${LOCATION.lon}&model_id=${MODEL_ID}`;

const getNearby = () => request<ApiNearby>(nearbyPath);

const getTimeline = (probeId: number, limit = 24) =>
  request<ApiTimeline>(`/forecasts/probes/${probeId}/timeline?model_id=${MODEL_ID}&limit=${limit}`);

// ---------- Conversões: formato da API -> formato das telas ----------

const LEVEL_BY_QUALITY: Record<ApiQuality, ConnectionLevel> = {
  GOOD: 'good',
  MODERATE: 'regular',
  UNSTABLE: 'unstable',
};

// Nomes das atividades na API.
export const API_ACTIVITY: Record<ActivityId, ApiActivity> = {
  video: 'VIDEO_CALL',
  audio: 'AUDIO_CALL',
  streaming: 'STREAMING',
  upload: 'FILE_UPLOAD',
  browsing: 'WEB_BROWSING',
  messaging: 'MESSAGING',
};

// Faixas de horas de cada período (hora local).
const PERIOD_HOURS: Record<PeriodId, [number, number]> = {
  morning: [6, 11],
  afternoon: [12, 17],
  evening: [18, 23],
};

const pad = (n: number) => String(n).padStart(2, '0');
const number = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',');

// Mesmos limites usados pela API (QualityRules.java).
function rttLevel(ms: number): ConnectionLevel {
  return ms < 60 ? 'good' : ms < 150 ? 'regular' : 'unstable';
}
function lossLevel(pct: number): ConnectionLevel {
  return pct < 1 ? 'good' : pct < 5 ? 'regular' : 'unstable';
}

const QUALITY_TEXT: Record<ConnectionLevel, string> = {
  great: 'Muito boa',
  good: 'Boa',
  attention: 'Com atenção',
  regular: 'Regular',
  unstable: 'Instável',
};

function toMetrics(rtt: number, loss: number): NetworkMetric[] {
  return [
    {
      id: 'rtt',
      name: 'Latência (RTT)',
      value: number(rtt),
      unit: 'ms',
      spokenUnit: 'milissegundos',
      trend: QUALITY_TEXT[rttLevel(rtt)],
      level: rttLevel(rtt),
    },
    {
      id: 'loss',
      name: 'Perda de pacotes',
      value: number(loss),
      unit: '%',
      spokenUnit: 'por cento',
      trend: QUALITY_TEXT[lossLevel(loss)],
      level: lossLevel(loss),
    },
  ];
}

const HEADLINE: Record<ApiQuality, string> = {
  GOOD: 'Sua rede está boa',
  MODERATE: 'Sua rede está regular',
  UNSTABLE: 'Sua rede está instável',
};

// ---------- Funções usadas pelas telas ----------

export async function getCurrentConnection(): Promise<CurrentConnection> {
  const data = await getNearby();
  const { predictedAvgRttMs, predictedPacketLossPct } = data.prediction;
  return {
    userName: 'Marina',
    level: LEVEL_BY_QUALITY[data.assessment.quality],
    headline: HEADLINE[data.assessment.quality],
    description: data.recommendation.message,
    updatedAt: new Date().toISOString(),
    note: data.metadata.disclaimer,
    metrics: toMetrics(predictedAvgRttMs, predictedPacketLossPct),
  };
}

export async function getStabilityReport(): Promise<StabilityReport> {
  const nearby = await getNearby();
  const timeline = await getTimeline(nearby.matchedProbe.probeId, 12);
  const items = timeline.items;
  const bars = items.map((item) => item.qualityScore);
  const percent = Math.round(bars.reduce((sum, value) => sum + value, 0) / bars.length);
  const level = LEVEL_BY_QUALITY[nearby.assessment.quality];
  const { predictedAvgRttMs: rtt, predictedPacketLossPct: loss } = nearby.prediction;

  return {
    percent,
    label: `Conexão ${LEVELS[level].label.toLowerCase()}`,
    level,
    bars,
    axis: [
      formatClock(items[0].predictionFor),
      formatClock(items[Math.floor(items.length / 2)].predictionFor),
      formatClock(items[items.length - 1].predictionFor),
    ],
    metrics: [
      {
        id: 'rtt',
        name: 'Latência (RTT)',
        value: `${number(rtt)} ms`,
        spokenValue: `${number(rtt)} milissegundos`,
        description: 'O tempo de ida e volta dos dados entre você e o serviço. Quanto menor, mais ágil.',
        status: QUALITY_TEXT[rttLevel(rtt)],
        level: rttLevel(rtt),
      },
      {
        id: 'loss',
        name: 'Perda de pacotes',
        value: `${number(loss)}%`,
        spokenValue: `${number(loss)} por cento`,
        description: 'A parte dos dados que não chegou ao destino e precisou ser enviada de novo.',
        status: QUALITY_TEXT[lossLevel(loss)],
        level: lossLevel(loss),
      },
    ],
  };
}

// Atividades que cada nível aguenta (regras de ActivityRules.java).
const FORECAST_TEXT: Record<ApiQuality, { title: string; tag: string; activity: ActivityId }> = {
  GOOD: { title: 'Conexão boa', tag: 'Boa para vídeo e streaming', activity: 'video' },
  MODERATE: { title: 'Conexão regular', tag: 'Serve para áudio e navegação', activity: 'audio' },
  UNSTABLE: { title: 'Conexão instável', tag: 'Prefira só mensagens', activity: 'messaging' },
};

function toForecastItem(item: ApiTimelineItem): ForecastItem {
  const info = FORECAST_TEXT[item.quality];
  return {
    id: item.predictionFor,
    time: formatClock(item.predictionFor),
    level: LEVEL_BY_QUALITY[item.quality],
    title: info.title,
    text: `Latência ${number(item.predictedAvgRttMs)} ms e perda de ${number(item.predictedPacketLossPct)}%.`,
    tag: info.tag,
    activity: info.activity,
  };
}

// Procura a maior sequência de horas com o melhor nível previsto.
function findBestWindow(items: ForecastItem[], scores: number[]) {
  const best = Math.max(...scores);
  let bestStart = scores.indexOf(best);
  const level = items[bestStart].level;
  let start = 0;
  let length = 0;
  let current = 0;
  items.forEach((item, index) => {
    if (item.level === level) {
      current += 1;
      if (current > length) {
        length = current;
        start = index - current + 1;
      }
    } else {
      current = 0;
    }
  });
  const first = items[start].time;
  const lastHour = (parseInt(items[start + length - 1].time, 10) + 1) % 24;
  return {
    label: length > 1 ? `Das ${first} às ${pad(lastHour)}:00` : `Às ${first}`,
    note: `Conexão ${LEVELS[level].label.toLowerCase()} prevista nesse período.`,
  };
}

export async function getForecast(): Promise<Forecast> {
  const nearby = await getNearby();
  const timeline = await getTimeline(nearby.matchedProbe.probeId, 12);
  const items = timeline.items.map(toForecastItem);
  return {
    updatedAt: new Date().toISOString(),
    bestWindow: findBestWindow(items, timeline.items.map((item) => item.qualityScore)),
    items,
  };
}

export async function getPlanSlots(_activity: ActivityId, period: PeriodId): Promise<PlanSlot[]> {
  const nearby = await getNearby();
  const timeline = await getTimeline(nearby.matchedProbe.probeId, 24);
  const [from, to] = PERIOD_HOURS[period];
  const inPeriod = timeline.items
    .filter((item) => {
      const hour = new Date(item.predictionFor).getHours();
      return hour >= from && hour <= to;
    })
    .sort((a, b) => new Date(a.predictionFor).getHours() - new Date(b.predictionFor).getHours());
  const bestScore = Math.max(...inPeriod.map((item) => item.qualityScore));
  const bestIso = inPeriod.find((item) => item.qualityScore === bestScore)?.predictionFor;
  return inPeriod.map((item) => ({
    time: formatClock(item.predictionFor),
    iso: item.predictionFor,
    best: item.predictionFor === bestIso,
  }));
}

// Pergunta à API se a atividade é adequada naquele horário (POST /activity/check).
export async function checkActivity(activity: ActivityId, iso: string): Promise<ActivityCheck> {
  const data = await request<ApiActivityCheck>('/activity/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      modelId: MODEL_ID,
      latitude: LOCATION.lat,
      longitude: LOCATION.lon,
      dateTime: iso,
      activity: API_ACTIVITY[activity],
    }),
  });
  return { suitable: data.suitable, message: data.recommendation.message };
}
