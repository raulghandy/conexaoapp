import { ActivityId, PeriodId } from '../types/connection';
import { IconName } from '../components/common/Icon';

export const ACTIVITIES: { id: ActivityId; label: string; icon: IconName }[] = [
  { id: 'video', label: 'Chamadas de vídeo', icon: 'video' },
  { id: 'audio', label: 'Chamadas de áudio', icon: 'phone' },
  { id: 'streaming', label: 'Streaming', icon: 'stream' },
  { id: 'browsing', label: 'Navegação', icon: 'cloud' },
  { id: 'upload', label: 'Envio de arquivos', icon: 'upload' },
  { id: 'messaging', label: 'Mensagens', icon: 'wifi' },
];

export const ACTIVITY_ICON = Object.fromEntries(
  ACTIVITIES.map((item) => [item.id, item.icon])
) as Record<ActivityId, IconName>;

export const PERIODS: { id: PeriodId; label: string }[] = [
  { id: 'morning', label: 'Manhã' },
  { id: 'afternoon', label: 'Tarde' },
  { id: 'evening', label: 'Noite' },
];
