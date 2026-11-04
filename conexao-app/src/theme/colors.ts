// Paleta do protótipo (Figma Make) com correções de contraste para WCAG 2.1 AA:
// - texto normal ≥ 4,5:1; ícones e bordas de controles ≥ 3:1.
// - `brand` (#1D725F) só é usado como FUNDO de botões com texto branco (≈ 5,8:1);
//   em texto/ícones sobre fundo escuro usamos `brandBright`.
export const colors = {
  canvas: '#070B0A',
  background: '#0B100F',
  surface: '#131A18',
  surfaceSoft: '#19211F',
  surfaceInset: '#090D0C',
  skeleton: '#222C29',

  text: '#F2F5F2', // ≈ 16:1 sobre background
  textMuted: '#AAB8B2', // ≈ 8:1 sobre surface
  line: '#2B3733', // divisores decorativos
  lineStrong: '#5D716A', // bordas de controles interativos (≈ 3,4:1)

  brand: '#1D725F',
  brandPressed: '#145444',
  brandBright: '#83DBC3',
  brandSoft: '#18362F',
  brandChart: '#2E9C82', // barras do gráfico (≈ 5:1 sobre surface)

  accent: '#E0A552',
  accentBright: '#F2C77F',
  accentSoft: '#382B1A',
  accentLine: '#665034',
  accentText: '#D9C7A9',

  danger: '#F19A8F',
  dangerSoft: '#351F1D',
  dangerLine: '#70413C',

  onBrand: '#FFFFFF',
  heroMuted: '#E3F1EC', // ≈ 5:1 sobre o fundo do hero
  navBar: '#111816',
  navBarBorder: 'rgba(255,255,255,0.12)',
} as const;

// Tons semânticos: cada nível de conexão usa um tom + símbolo + texto
// (a informação nunca depende só da cor).
export const tones = {
  positive: {
    bg: colors.brandSoft,
    fg: colors.brandBright,
    marker: colors.brand,
    hero: '#1D725F',
  },
  warning: {
    bg: colors.accentSoft,
    fg: colors.accentBright,
    marker: '#9A6628',
    hero: '#8A5A14',
  },
  danger: {
    bg: colors.dangerSoft,
    fg: colors.danger,
    marker: '#B3473A',
    hero: '#A23B30',
  },
} as const;

export type ToneKey = keyof typeof tones;
