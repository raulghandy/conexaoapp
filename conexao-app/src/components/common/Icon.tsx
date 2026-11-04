import React, { ReactNode } from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../../theme';

export type IconName =
  | 'activity'
  | 'arrow'
  | 'calendar'
  | 'check'
  | 'clock'
  | 'cloud'
  | 'download'
  | 'game'
  | 'home'
  | 'info'
  | 'loss'
  | 'phone'
  | 'refresh'
  | 'route'
  | 'spark'
  | 'stream'
  | 'upload'
  | 'video'
  | 'wifi';

// Mesmos desenhos do protótipo (viewBox 24x24).
const shapes: Record<IconName, ReactNode> = {
  activity: <Path d="M3 12h4l2.2-7 4.1 14 2.2-7H21" />,
  arrow: <Path d="m9 18 6-6-6-6" />,
  calendar: (
    <>
      <Rect x="3" y="5" width="18" height="16" rx="3" />
      <Path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  check: <Path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 7v5l3 2" />
    </>
  ),
  cloud: <Path d="M7 18h10a4 4 0 0 0 .8-7.9A6 6 0 0 0 6.4 8.5 4.8 4.8 0 0 0 7 18Z" />,
  download: <Path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />,
  game: (
    <>
      <Path d="M8 7h8a5 5 0 0 1 4.8 6.4l-1.1 3.8a2.3 2.3 0 0 1-3.8 1l-1.8-1.7H9.9L8 18.2a2.3 2.3 0 0 1-3.8-1l-1.1-3.8A5 5 0 0 1 8 7Z" />
      <Path d="M8 11v4m-2-2h4m6-1h.01m2 2h.01" />
    </>
  ),
  home: <Path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />,
  info: (
    <>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 11v5m0-8h.01" />
    </>
  ),
  loss: <Path d="M4 6h16M4 12h12M4 18h7" />,
  phone: (
    <>
      <Path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <Path d="M10 17h4" />
    </>
  ),
  refresh: (
    <>
      <Path d="M20 7v5h-5M4 17v-5h5" />
      <Path d="M18.1 9A7 7 0 0 0 6.6 6.4L4 9m16 6-2.6 2.6A7 7 0 0 1 5.9 15" />
    </>
  ),
  route: (
    <>
      <Circle cx="6" cy="18" r="2" />
      <Circle cx="18" cy="6" r="2" />
      <Path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3" />
    </>
  ),
  spark: (
    <>
      <Path d="m12 3 1.5 4.3L18 9l-4.5 1.7L12 15l-1.5-4.3L6 9l4.5-1.7Z" />
      <Path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8Z" />
    </>
  ),
  stream: (
    <>
      <Rect x="3" y="5" width="18" height="14" rx="3" />
      <Path d="m10 9 5 3-5 3Z" />
    </>
  ),
  upload: <Path d="M12 17V5m0 0-4 4m4-4 4 4M5 20h14" />,
  video: (
    <>
      <Rect x="3" y="6" width="13" height="12" rx="3" />
      <Path d="m16 10 5-3v10l-5-3Z" />
    </>
  ),
  wifi: (
    <>
      <Path d="M3 9a14 14 0 0 1 18 0M6.5 12.5a9 9 0 0 1 11 0M10 16a4 4 0 0 1 4 0" />
      <Circle cx="12" cy="19" r="1" />
    </>
  ),
};

interface Props {
  name: IconName;
  size?: number;
  color?: string;
}

/** Ícone decorativo: sempre escondido de leitores de tela (o texto vizinho descreve). */
export function Icon({ name, size = 20, color = colors.text }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
    >
      {shapes[name]}
    </Svg>
  );
}
