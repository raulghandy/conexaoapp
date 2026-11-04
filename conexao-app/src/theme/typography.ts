import { Platform } from 'react-native';

// Títulos em serifa, como no protótipo.
const serif = Platform.OS === 'ios' ? 'Georgia' : 'serif';

// Valores em sp: o React Native escala com a fonte do sistema.
// O protótipo usava 8–11px em vários textos; aqui o mínimo é 12.
export const typography = {
  display: { fontFamily: serif, fontSize: 34, lineHeight: 40, fontWeight: '600', letterSpacing: -0.8 },
  title: { fontFamily: serif, fontSize: 28, lineHeight: 34, fontWeight: '600' },
  value: { fontFamily: serif, fontSize: 28, lineHeight: 34, fontWeight: '600' },
  valueSmall: { fontFamily: serif, fontSize: 20, lineHeight: 26, fontWeight: '600' },
  heading: { fontSize: 17, lineHeight: 24, fontWeight: '700' },
  cardTitle: { fontSize: 15, lineHeight: 21, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodySmall: { fontSize: 13, lineHeight: 19, fontWeight: '400' },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '700' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '700' },
  eyebrow: { fontSize: 12, lineHeight: 16, fontWeight: '800', letterSpacing: 1.5 },
} as const;

// Limite de escala: evita quebra de layout sem bloquear o zoom de fonte.
export const MAX_FONT_SCALE = 1.8;
