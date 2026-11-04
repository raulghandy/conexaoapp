import { ToneKey } from '../theme/colors';
import { ConnectionLevel } from '../types/connection';
import { IconName } from '../components/common/Icon';

export interface LevelConfig {
  label: string; // "Boa"
  tagLabel: string; // "Recomendado" | "Atenção" | "Evitar"
  tone: ToneKey;
  icon: IconName; // símbolo: o nível nunca é comunicado só por cor
}

export const LEVELS: Record<ConnectionLevel, LevelConfig> = {
  great: { label: 'Excelente', tagLabel: 'Recomendado', tone: 'positive', icon: 'check' },
  good: { label: 'Boa', tagLabel: 'Recomendado', tone: 'positive', icon: 'check' },
  attention: { label: 'Atenção', tagLabel: 'Atenção', tone: 'warning', icon: 'info' },
  regular: { label: 'Regular', tagLabel: 'Atenção', tone: 'warning', icon: 'info' },
  unstable: { label: 'Instável', tagLabel: 'Evitar', tone: 'danger', icon: 'info' },
};
