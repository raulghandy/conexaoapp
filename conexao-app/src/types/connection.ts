export type ConnectionLevel = 'great' | 'good' | 'attention' | 'regular' | 'unstable';

export type ActivityId = 'video' | 'audio' | 'streaming' | 'upload' | 'browsing' | 'messaging';
export type PeriodId = 'morning' | 'afternoon' | 'evening';
export type MetricId = 'rtt' | 'loss';

// ---------- Agora ----------
export interface NetworkMetric {
  id: MetricId;
  name: string;
  value: string; // "24" | "0,2"
  unit: string; // "ms" | "%"
  spokenUnit: string; // "milissegundos" | "por cento"
  trend: string; // "Excelente"
  level: ConnectionLevel;
}

export interface CurrentConnection {
  userName: string;
  level: ConnectionLevel;
  headline: string; // "Sua rede está ótima"
  description: string;
  updatedAt: string; // ISO 8601
  note: string; // aviso da API: a previsão vem do ponto de medição mais próximo
  metrics: NetworkMetric[];
}

// ---------- Detalhes ----------
export interface MetricExplanation {
  id: MetricId;
  name: string;
  value: string; // "24 ms"
  spokenValue: string; // "24 milissegundos"
  description: string;
  status: string;
  level: ConnectionLevel;
}

export interface StabilityReport {
  percent: number;
  label: string;
  level: ConnectionLevel;
  bars: number[]; // 0-100, do mais antigo ao mais recente
  axis: [string, string, string];
  metrics: MetricExplanation[];
}

// ---------- Planejar ----------
export interface PlanSlot {
  time: string; // "16:00"
  iso: string; // horário completo, usado na verificação da atividade
  best: boolean;
}

export interface ActivityCheck {
  suitable: boolean;
  message: string;
}

// ---------- Previsão ----------
export interface ForecastItem {
  id: string;
  time: string; // "15:00"
  level: ConnectionLevel;
  title: string;
  text: string;
  tag: string; // "Ideal para jogos"
  activity: ActivityId;
}

export interface Forecast {
  updatedAt: string; // ISO 8601
  bestWindow: { label: string; note: string };
  items: ForecastItem[];
}
