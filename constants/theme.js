// constants/theme.js
// Tema: Dark Productivity - nuansa gelap elegan dengan aksen neon hijau-teal

export const COLORS = {
  // Background layers
  bg: '#0D0F14',
  bgCard: '#161921',
  bgInput: '#1E2230',
  bgHeader: '#111318',

  // Accent
  accent: '#4DFFA0',
  accentDim: '#1A4D38',
  accentSoft: 'rgba(77, 255, 160, 0.12)',

  // Priority colors
  high: '#FF5C5C',
  highBg: 'rgba(255, 92, 92, 0.12)',
  medium: '#FFB830',
  mediumBg: 'rgba(255, 184, 48, 0.12)',
  low: '#4DA6FF',
  lowBg: 'rgba(77, 166, 255, 0.12)',

  // Text
  textPrimary: '#E8ECF4',
  textSecondary: '#7B8599',
  textMuted: '#454E63',
  textDone: '#454E63',

  // UI
  border: '#252A38',
  borderFocus: '#4DFFA0',
  danger: '#FF5C5C',
  white: '#FFFFFF',

  // Done state overlay
  doneBg: '#13161C',
};

export const PRIORITY = {
  HIGH: 'Tinggi',
  MEDIUM: 'Sedang',
  LOW: 'Rendah',
};

export const PRIORITY_CONFIG = {
  [PRIORITY.HIGH]: {
    color: COLORS.high,
    bg: COLORS.highBg,
    icon: '🔴',
    label: 'Tinggi',
  },
  [PRIORITY.MEDIUM]: {
    color: COLORS.medium,
    bg: COLORS.mediumBg,
    icon: '🟡',
    label: 'Sedang',
  },
  [PRIORITY.LOW]: {
    color: COLORS.low,
    bg: COLORS.lowBg,
    icon: '🔵',
    label: 'Rendah',
  },
};

export const FILTER = {
  ALL: 'Semua',
  ACTIVE: 'Aktif',
  DONE: 'Selesai',
};
