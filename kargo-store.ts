// CICEKYOLLA OS — Türkiye Cargo store
// Powers the nationwide cargo storefront and the Cargo admin center
// (products, provinces, shipping rules, campaigns, analytics, carriers).
// Swap for API reads when backend lands (GET /cargo/*). Mutators in-memory.
// Full source: github.com/Cicekyolla/cicekyolla-os

// ───────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────
export type KargoFilter = 'all' | 'bestseller' | 'flowers' | 'gifts' | 'corporate';

export interface KargoProduct {
  id:            string;
  name:          string;
  emoji:         string;
  category:      Exclude<KargoFilter, 'all'> | 'flowers' | 'gifts' | 'corporate';
  shortDesc:     string;
  price:         number;
  originalPrice: number | null;
  badge:         string | null;
  bestSeller:    boolean;
  features:      string[];
  regions:       string;
  sold24h:       number;
  sold30d:       number;
  active:        boolean;
}

export interface KargoFilterItem { id: KargoFilter; emoji: string; label: string; }
export interface KargoBadge { emoji: string; val: string; label: string; }

export interface Province {
  id:           string;
  name:         string;
  emoji:        string;
  zone:         string;
  badge:        string | null;
  shortDesc:    string;
  price:        number;
  deliveryMin:  number;
  deliveryMax:  number;
  standardFee:  number;
  expressFee:   number;
  freeAt:       number;
  stock:        number;
  sold30d:      number;
  active:       boolean;
}

export interface ShippingRule {
  id:       string;
  name:     string;
  trigger:  string;
  discount: string;
  active:   boolean;
}

export interface KargoCampaign {
  id:          string;
  name:        string;
  description: string;
  startDate:   string;
  endDate:     string;
  usageCount:  number;
  active:      boolean;
}

export interface CarrierPerformance {
  carrier:       string;
  onTime:        number;        // %
  avgDays:       number;
  satisfaction:  number;        // /5
  monthlyVolume: number;
  active:        boolean;
}

export interface KargoMetrics {
  monthlyOrders:  number;
  monthlyRevenue: number;
  avgOrderValue:  number;
  onTimeRate:     number;       // %
}

export interface KargoCrmSummary {
  totalKargoCustomers: number;
}

export interface AlsoSent { alsoIds: string[]; }

// ───────────────────────────────────────────────────────────────
// Storefront data
// ───────────────────────────────────────────────────────────────
export const KARGO_SLOGANS: string[] = [
  '81 İle Güvenli Çiçek & Hediye Kargosu',
  'Sigortalı Teslimat — Taze Garanti',
  '1-3 İş Gününde Kapında',
];

export const KARGO_BADGES: KargoBadge[] = [
  { emoji: '📦', val: '81 İl', label: 'Teslimat Ağı' },
  { emoji: '🚚', val: '1-3 Gün', label: 'Ortalama Süre' },
  { emoji: '🛡️', val: '%100', label: 'Sigortalı' },
  { emoji: '⭐', val: '4.8/5', label: 'Müşteri Puanı' },
];

export const KARGO_FILTERS: KargoFilterItem[] = [
  { id: 'all',        emoji: '🌐', label: 'Tümü' },
  { id: 'bestseller', emoji: '🔥', label: 'Çok Satan' },
  { id: 'flowers',    emoji: '🌹', label: 'Çiçek' },
  { id: 'gifts',      emoji: '🎁', label: 'Hediye' },
  { id: 'corporate',  emoji: '🏢', label: 'Kurumsal' },
];

export const KARGO_PRODUCTS: KargoProduct[] = [
  { id: 'kp-1', name: 'Kutuda Solmayan Gül', emoji: '🌹', category: 'flowers', shortDesc: 'Yıllarca solmayan gerçek gül, şık kutuda.', price: 740, originalPrice: 890, badge: 'Çok Satan', bestSeller: true, features: ['Solmayan gerçek gül', 'Hediye kutusu', 'Kart mesajı'], regions: '81 il', sold24h: 64, sold30d: 1240, active: true },
  { id: 'kp-2', name: 'Premium Çikolata Sepeti', emoji: '🍫', category: 'gifts', shortDesc: 'Belçika çikolatası ve kuruyemiş seçkisi.', price: 620, originalPrice: null, badge: null, bestSeller: true, features: ['Belçika çikolatası', 'Lüks ambalaj', 'Sigortalı kargo'], regions: '81 il', sold24h: 48, sold30d: 980, active: true },
  { id: 'kp-3', name: 'Teraryum Bahçe', emoji: '🌵', category: 'flowers', shortDesc: 'Bakımı kolay cam teraryum.', price: 480, originalPrice: 560, badge: 'Yeni', bestSeller: false, features: ['Canlı bitki', 'Cam fanus', 'Bakım kartı'], regions: '81 il', sold24h: 22, sold30d: 410, active: true },
  { id: 'kp-4', name: 'Kurumsal Hediye Seti', emoji: '🎁', category: 'corporate', shortDesc: 'Logolu kurumsal hediye paketi.', price: 1280, originalPrice: null, badge: 'Kurumsal', bestSeller: false, features: ['Logolu ambalaj', 'Toplu sipariş', 'Faturalı'], regions: '81 il', sold24h: 9, sold30d: 180, active: true },
  { id: 'kp-5', name: 'Sevgiliye Sürpriz Kutu', emoji: '💝', category: 'gifts', shortDesc: 'Gül, çikolata ve ışıklı kutu.', price: 890, originalPrice: 1050, badge: 'İndirim', bestSeller: true, features: ['LED ışık', 'Solmayan gül', 'Çikolata'], regions: '81 il', sold24h: 37, sold30d: 720, active: true },
  { id: 'kp-6', name: 'Şoke Orkide Saksı', emoji: '🪴', category: 'flowers', shortDesc: 'Özel ambalajla kargoya uygun orkide.', price: 690, originalPrice: null, badge: null, bestSeller: false, features: ['Kargo korumalı', 'Bakım kiti', 'Saksı dahil'], regions: '81 il', sold24h: 14, sold30d: 290, active: false },
];

export const ALSO_SENT: AlsoSent[] = [
  { alsoIds: ['kp-2', 'kp-5', 'kp-3'] },
];

// ───────────────────────────────────────────────────────────────
// Provinces (delivery network)
// ───────────────────────────────────────────────────────────────
export const PROVINCES: Province[] = [
  { id: 'pv-34', name: 'İstanbul', emoji: '🌉', zone: 'Marmara',     badge: 'Aynı Gün',  shortDesc: 'Aynı gün teslimat bölgesi', price: 0,  deliveryMin: 0, deliveryMax: 1, standardFee: 0,  expressFee: 49, freeAt: 500, stock: 9999, sold30d: 4820, active: true },
  { id: 'pv-06', name: 'Ankara',   emoji: '🏛️', zone: 'İç Anadolu',  badge: null,        shortDesc: '1-2 iş günü kargo',          price: 39, deliveryMin: 1, deliveryMax: 2, standardFee: 39, expressFee: 69, freeAt: 600, stock: 9999, sold30d: 2140, active: true },
  { id: 'pv-35', name: 'İzmir',    emoji: '⛵', zone: 'Ege',         badge: null,        shortDesc: '1-2 iş günü kargo',          price: 39, deliveryMin: 1, deliveryMax: 2, standardFee: 39, expressFee: 69, freeAt: 600, stock: 9999, sold30d: 1980, active: true },
  { id: 'pv-16', name: 'Bursa',    emoji: '🏔️', zone: 'Marmara',     badge: null,        shortDesc: '1-2 iş günü kargo',          price: 35, deliveryMin: 1, deliveryMax: 2, standardFee: 35, expressFee: 65, freeAt: 600, stock: 9999, sold30d: 1120, active: true },
  { id: 'pv-07', name: 'Antalya',  emoji: '🌴', zone: 'Akdeniz',     badge: null,        shortDesc: '2-3 iş günü kargo',          price: 45, deliveryMin: 2, deliveryMax: 3, standardFee: 45, expressFee: 79, freeAt: 700, stock: 9999, sold30d: 940,  active: true },
  { id: 'pv-01', name: 'Adana',    emoji: '🌶️', zone: 'Akdeniz',     badge: null,        shortDesc: '2-3 iş günü kargo',          price: 45, deliveryMin: 2, deliveryMax: 3, standardFee: 45, expressFee: 79, freeAt: 700, stock: 9999, sold30d: 610,  active: true },
];

// ───────────────────────────────────────────────────────────────
// Admin: shipping rules, campaigns, analytics, carriers
// ───────────────────────────────────────────────────────────────
export const SHIPPING_RULES: ShippingRule[] = [
  { id: 'sr-1', name: 'Ücretsiz Kargo Eşiği', trigger: 'Sepet ≥ ₺500', discount: 'Ücretsiz teslimat', active: true },
  { id: 'sr-2', name: 'Express İndirimi',      trigger: 'Sepet ≥ ₺1.000', discount: '%50 express',     active: true },
  { id: 'sr-3', name: 'İlk Kargo Bedava',      trigger: 'Yeni müşteri',   discount: 'İlk kargo ücretsiz', active: false },
];

export const KARGO_CAMPAIGNS: KargoCampaign[] = [
  { id: 'kc-1', name: 'Bahar İndirimi',    description: 'Seçili ürünlerde %15 indirim', startDate: '01.06.2026', endDate: '30.06.2026', usageCount: 1840, active: true },
  { id: 'kc-2', name: 'Kurumsal Toplu',    description: '50+ adet siparişte özel fiyat', startDate: '01.05.2026', endDate: '31.07.2026', usageCount: 320,  active: true },
  { id: 'kc-3', name: 'Sevgililer Özel',   description: 'Sevgililer günü kargo kampanyası', startDate: '07.02.2026', endDate: '14.02.2026', usageCount: 2640, active: false },
];

export const KARGO_DAILY = [
  { date: 'Pzt', orders: 184, revenue: 142000 },
  { date: 'Sal', orders: 167, revenue: 128000 },
  { date: 'Çar', orders: 198, revenue: 156000 },
  { date: 'Per', orders: 221, revenue: 178000 },
  { date: 'Cum', orders: 264, revenue: 214000 },
  { date: 'Cmt', orders: 312, revenue: 268000 },
  { date: 'Paz', orders: 247, revenue: 198000 },
];

export const KARGO_METRICS: KargoMetrics = {
  monthlyOrders:  6420,
  monthlyRevenue: 5_240_000,
  avgOrderValue:  816,
  onTimeRate:     94,
};

export const CARRIER_PERFORMANCE: CarrierPerformance[] = [
  { carrier: 'Aras Kargo',  onTime: 95, avgDays: 1.8, satisfaction: 4.7, monthlyVolume: 2840, active: true },
  { carrier: 'Yurtiçi Kargo', onTime: 93, avgDays: 2.1, satisfaction: 4.6, monthlyVolume: 2160, active: true },
  { carrier: 'MNG Kargo',   onTime: 91, avgDays: 2.3, satisfaction: 4.4, monthlyVolume: 1080, active: true },
  { carrier: 'Sürat Kargo', onTime: 88, avgDays: 2.6, satisfaction: 4.2, monthlyVolume: 340,  active: false },
];

export const KARGO_CRM_SUMMARY: KargoCrmSummary = {
  totalKargoCustomers: 18_400,
};

// ───────────────────────────────────────────────────────────────
// Mutators (in-memory; replace with API writes when backend lands)
// ───────────────────────────────────────────────────────────────
export function toggleKargoProduct(id: string): void {
  const p = KARGO_PRODUCTS.find(x => x.id === id);
  if (p) p.active = !p.active;
}

export function toggleShippingRule(id: string): void {
  const r = SHIPPING_RULES.find(x => x.id === id);
  if (r) r.active = !r.active;
}

export function toggleKargoCampaign(id: string): void {
  const c = KARGO_CAMPAIGNS.find(x => x.id === id);
  if (c) c.active = !c.active;
}
