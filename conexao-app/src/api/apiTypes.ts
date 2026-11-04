// Formatos das respostas da API do professor (Connectivity Forecast API, /api/v1).
// Os nomes vêm do código Java (records em ApiDtos.java).

export type ApiQuality = 'GOOD' | 'MODERATE' | 'UNSTABLE';

export type ApiActivity =
  | 'VIDEO_CALL'
  | 'AUDIO_CALL'
  | 'STREAMING'
  | 'FILE_UPLOAD'
  | 'WEB_BROWSING'
  | 'MESSAGING';

export interface ApiRecommendation {
  code: 'NORMAL_USE' | 'REDUCE_NETWORK_USAGE' | 'PREPARE_OFFLINE';
  message: string;
}

// GET /forecasts/nearby
export interface ApiNearby {
  model: { id: string; name: string; version: string };
  matchedProbe: { probeId: number; distanceKm: number };
  prediction: { predictionFor: string; predictedAvgRttMs: number; predictedPacketLossPct: number };
  assessment: { quality: ApiQuality; qualityScore: number };
  recommendation: ApiRecommendation;
  metadata: { disclaimer: string; locationPrivacy: string };
}

// GET /forecasts/probes/{id}/timeline
export interface ApiTimelineItem {
  predictionFor: string;
  predictedAvgRttMs: number;
  predictedPacketLossPct: number;
  quality: ApiQuality;
  qualityScore: number;
}

export interface ApiTimeline {
  items: ApiTimelineItem[];
}

// POST /activity/check
export interface ApiActivityCheck {
  activity: ApiActivity;
  suitable: boolean;
  forecast: { quality: ApiQuality; predictedAvgRttMs: number; predictedPacketLossPct: number };
  recommendation: ApiRecommendation;
}

// Erros da API: { error: { code, message, details? } }
export interface ApiErrorBody {
  error: { code: string; message: string };
}
