// CICEKYOLLA OS — Shared UI Kit & Design Tokens
// Central token registry used by all screen components

export const T = {
  // Grays
  gray50:  '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  // Brand
  green:   '#16A34A',
  greenLight: '#F0FDF4',
  greenDark:  '#15803D',
  // Semantic
  red:     '#DC2626',
  redLight:'#FEF2F2',
  amber:   '#D97706',
  amberLight: '#FFFBEB',
  blue:    '#2563EB',
  blueLight: '#EFF6FF',
  purple:  '#7C3AED',
  purpleLight: '#EDE9FE',
  teal:    '#0D9488',
  tealLight: '#F0FDFA',
  // UI
  white:   '#FFFFFF',
  border:  '#E2E8F0',
  shadow:  'rgba(0,0,0,0.06)',
};

export const STATUS_MAP = {
  new:        { label: 'Yeni',           bg: '#FFF7ED', color: '#C2410C', dot: '#F97316' },
  preparing:  { label: 'Hazırlanıyor',  bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6' },
  designing:  { label: 'Tasarlanıyor', bg: '#F5F3FF', color: '#6D28D9', dot: '#8B5CF6' },
  ready:      { label: 'Hazır',          bg: '#ECFEFF', color: '#0E7490', dot: '#06B6D4' },
  'at-courier': { label: 'Kurye Bekliyor', bg: '#FEF9C3', color: '#92400E', dot: '#CA8A04' },
  delivering: { label: 'Teslimatta',    bg: '#ECFDF5', color: '#065F46', dot: '#10B981' },
  delivered:  { label: 'Teslim Edildi', bg: '#F0FDF4', color: '#166534', dot: '#22C55E' },
  cancelled:  { label: 'İptal',          bg: '#FEF2F2', color: '#991B1B', dot: '#EF4444' },
} as const;

export type OrderStatus = keyof typeof STATUS_MAP;

export function fmtCurrency(amount: number): string {
  return '₺' + amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function fmtTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

export function fmtRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Az önce';
  if (mins < 60) return `${mins} dakika önce`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} saat önce`;
  return fmtDate(dateStr);
}
