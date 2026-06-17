// CICEKYOLLA OS — Revenue & Upsell store
// Powers the Revenue Optimizer, Checkout Analytics and dashboard KPI strip.
// Mutators update the in-memory catalog; swap for API writes when backend
// is connected (PATCH /revenue/upsells/:id, /bundles/:id, /promotions/:id).
// Full source: github.com/Cicekyolla/cicekyolla-os

// ───────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────
export type UpsellCategory = 'delivery' | 'gifts' | 'flowers' | 'experience' | 'corporate';
export type BadgeType = 'hot' | 'new' | 'recommended' | 'florist';

export interface UpsellProduct {
  id:             string;
  name:           string;
  emoji:          string;
  category:       UpsellCategory;
  price:          number;
  badge:          string | null;
  badgeType:      BadgeType | null;
  acceptRate:     number;   // %
  soldLast24h:    number;
  monthlyRevenue: number;
  floristPick:    boolean;
  active:         boolean;
}

export interface Bundle {
  id:          string;
  name:        string;
  description: string;
  items:       string[];    // UpsellProduct ids
  savings:     number;
  soldCount:   number;
  active:      boolean;
}

export interface Promotion {
  id:          string;
  name:        string;
  trigger:     string;
  reward:      string;
  conversions: number;
  revenue:     number;
  active:      boolean;
}

export interface RevenueMetrics {
  currentAOV:           number;
  aovGrowthMoM:         number;  // %
  upsellAcceptRate:     number;  // %
  monthlyUpsellRevenue: number;
  cartAbandonRate:      number;  // %
}

// ───────────────────────────────────────────────────────────────
// Metrics
// ───────────────────────────────────────────────────────────────
export const REVENUE_METRICS: RevenueMetrics = {
  currentAOV:           1280,
  aovGrowthMoM:         12,
  upsellAcceptRate:     34,
  monthlyUpsellRevenue: 248_000,
  cartAbandonRate:      62,
};

// ───────────────────────────────────────────────────────────────
// Upsell catalog
// ───────────────────────────────────────────────────────────────
export const UPSELL_CATALOG: UpsellProduct[] = [
  { id: 'ups-1', name: 'Aynı Gün Express Teslimat', emoji: '⚡', category: 'delivery',  price: 49,  badge: 'Popüler',  badgeType: 'hot',         acceptRate: 48, soldLast24h: 73, monthlyRevenue: 64_200, floristPick: false, active: true },
  { id: 'ups-2', name: 'Premium Hediye Paketi',     emoji: '🎁', category: 'gifts',     price: 79,  badge: 'Önerilen', badgeType: 'recommended', acceptRate: 41, soldLast24h: 54, monthlyRevenue: 58_900, floristPick: true,  active: true },
  { id: 'ups-3', name: 'El Yazısı Kart Mesajı',     emoji: '✍️', category: 'gifts',     price: 25,  badge: null,       badgeType: null,          acceptRate: 56, soldLast24h: 88, monthlyRevenue: 41_300, floristPick: false, active: true },
  { id: 'ups-4', name: 'Belçika Çikolatası',        emoji: '🍫', category: 'gifts',     price: 120, badge: 'Çok Satan', badgeType: 'hot',        acceptRate: 33, soldLast24h: 39, monthlyRevenue: 52_800, floristPick: true,  active: true },
  { id: 'ups-5', name: 'Vazo Ekle (Cam)',           emoji: '🏺', category: 'flowers',   price: 89,  badge: null,       badgeType: null,          acceptRate: 29, soldLast24h: 27, monthlyRevenue: 28_400, floristPick: false, active: true },
  { id: 'ups-6', name: 'Çiçek Bakım Kiti',          emoji: '🌿', category: 'flowers',   price: 35,  badge: 'Yeni',     badgeType: 'new',         acceptRate: 22, soldLast24h: 18, monthlyRevenue: 14_700, floristPick: false, active: true },
  { id: 'ups-7', name: 'Lüks Balon Buketi',         emoji: '🎈', category: 'experience', price: 95, badge: null,       badgeType: null,          acceptRate: 26, soldLast24h: 21, monthlyRevenue: 22_100, floristPick: false, active: false },
  { id: 'ups-8', name: 'Kurumsal Faturalı Teslimat', emoji: '🧾', category: 'corporate', price: 0,  badge: 'Kurumsal', badgeType: 'recommended', acceptRate: 18, soldLast24h: 12, monthlyRevenue: 0,      floristPick: false, active: true },
];

// ───────────────────────────────────────────────────────────────
// Bundles
// ───────────────────────────────────────────────────────────────
export const BUNDLES: Bundle[] = [
  { id: 'bnd-1', name: 'Romantik Sürpriz', description: 'Express teslimat + çikolata + el yazısı kart', items: ['ups-1', 'ups-4', 'ups-3'], savings: 40, soldCount: 312, active: true },
  { id: 'bnd-2', name: 'Tam Hediye Seti',  description: 'Premium paket + vazo + bakım kiti',           items: ['ups-2', 'ups-5', 'ups-6'], savings: 55, soldCount: 184, active: true },
  { id: 'bnd-3', name: 'Kutlama Paketi',   description: 'Balon buketi + çikolata + kart',              items: ['ups-7', 'ups-4', 'ups-3'], savings: 35, soldCount: 97,  active: false },
];

// ───────────────────────────────────────────────────────────────
// Promotions
// ───────────────────────────────────────────────────────────────
export const PROMOTIONS: Promotion[] = [
  { id: 'pro-1', name: 'Sepette 2. Üründe %20',   trigger: 'Sepet ≥ ₺750',        reward: '%20 indirim',        conversions: 1240, revenue: 96_400,  active: true },
  { id: 'pro-2', name: 'Ücretsiz Kargo Eşiği',     trigger: 'Sepet ≥ ₺500',        reward: 'Ücretsiz teslimat',  conversions: 2180, revenue: 134_200, active: true },
  { id: 'pro-3', name: 'İlk Sipariş %15',          trigger: 'Yeni müşteri',        reward: '%15 indirim',        conversions: 860,  revenue: 41_800,  active: true },
  { id: 'pro-4', name: 'Sepeti Terk Hatırlatma',   trigger: '1 saat terk',         reward: '%10 kupon (e-posta)', conversions: 540,  revenue: 28_900, active: false },
];

// ───────────────────────────────────────────────────────────────
// Time-series (recharts)
// ───────────────────────────────────────────────────────────────
export const DAILY_REVENUE = [
  { date: 'Pzt', base: 42000, upsell: 9800  },
  { date: 'Sal', base: 38500, upsell: 8600  },
  { date: 'Çar', base: 46200, upsell: 11200 },
  { date: 'Per', base: 51800, upsell: 13400 },
  { date: 'Cum', base: 68400, upsell: 18900 },
  { date: 'Cmt', base: 79200, upsell: 22100 },
  { date: 'Paz', base: 58600, upsell: 15700 },
];

export const AOV_TREND = [
  { date: 'Oca', aov: 1080, target: 1200 },
  { date: 'Şub', aov: 1120, target: 1200 },
  { date: 'Mar', aov: 1165, target: 1250 },
  { date: 'Nis', aov: 1210, target: 1250 },
  { date: 'May', aov: 1245, target: 1300 },
  { date: 'Haz', aov: 1280, target: 1300 },
];

export const CONVERSION_TREND = [
  { date: 'Oca', conversion: 2.4 },
  { date: 'Şub', conversion: 2.6 },
  { date: 'Mar', conversion: 2.9 },
  { date: 'Nis', conversion: 3.1 },
  { date: 'May', conversion: 3.4 },
  { date: 'Haz', conversion: 3.6 },
];

export const FUNNEL_DATA = [
  { stage: 'Ürün Görüntüleme', count: 48200, pct: 100 },
  { stage: 'Sepete Ekleme',    count: 18600, pct: 39  },
  { stage: 'Checkout Başlangıç', count: 11200, pct: 23 },
  { stage: 'Ödeme Bilgisi',    count: 7800,  pct: 16  },
  { stage: 'Sipariş Tamamlama', count: 7100,  pct: 15  },
];

export const ABANDONMENT_BY_STEP = [
  { step: 'Teslimat Adresi', label: 'Teslimat Adresi', rate: 28 },
  { step: 'Teslimat Zamanı', label: 'Teslimat Zamanı', rate: 19 },
  { step: 'Kart Mesajı',     label: 'Kart Mesajı',     rate: 12 },
  { step: 'Ödeme',           label: 'Ödeme',           rate: 34 },
  { step: 'Onay',            label: 'Onay',            rate: 7  },
];

// ───────────────────────────────────────────────────────────────
// Mutators (in-memory; replace with API writes when backend lands)
// ───────────────────────────────────────────────────────────────
export function toggleUpsellActive(id: string): void {
  const p = UPSELL_CATALOG.find(x => x.id === id);
  if (p) p.active = !p.active;
}

export function setUpsellPrice(id: string, price: number): void {
  const p = UPSELL_CATALOG.find(x => x.id === id);
  if (p && Number.isFinite(price) && price >= 0) p.price = price;
}

export function toggleFloristPick(id: string): void {
  const p = UPSELL_CATALOG.find(x => x.id === id);
  if (p) p.floristPick = !p.floristPick;
}

export function toggleBundleActive(id: string): void {
  const b = BUNDLES.find(x => x.id === id);
  if (b) b.active = !b.active;
}

export function togglePromotionActive(id: string): void {
  const pr = PROMOTIONS.find(x => x.id === id);
  if (pr) pr.active = !pr.active;
}
