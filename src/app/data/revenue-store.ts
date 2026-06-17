export type UpsellCategory = 'flower' | 'gift' | 'delivery' | 'packaging';

export type UpsellProduct = {
  id: string;
  name: string;
  category: UpsellCategory;
  price: number;
  active: boolean;
  floristPick?: boolean;
};

export const UPSELL_CATALOG: UpsellProduct[] = [
  { id: 'rose-upgrade', name: 'Premium Gul Yukseltme', category: 'flower', price: 249, active: true, floristPick: true },
  { id: 'chocolate-box', name: 'Cikolata Kutusu', category: 'gift', price: 189, active: true },
  { id: 'same-day', name: 'Ayni Gun Teslimat', category: 'delivery', price: 99, active: true },
  { id: 'premium-pack', name: 'Premium Paketleme', category: 'packaging', price: 129, active: true },
];

export const BUNDLES = [
  { id: 'romantic', name: 'Romantik Set', products: ['rose-upgrade', 'chocolate-box'], price: 399, active: true },
  { id: 'express', name: 'Express Teslimat Seti', products: ['same-day', 'premium-pack'], price: 199, active: true },
];

export const PROMOTIONS = [
  { id: 'welcome', name: 'Ilk Siparis Indirimi', discount: 10, active: true },
  { id: 'vip', name: 'VIP Musteri Teklifi', discount: 15, active: true },
];

export const REVENUE_METRICS = {
  monthlyUpsellRevenue: 68400,
  currentAOV: 742,
  aovGrowthMoM: 12.4,
  upsellAcceptRate: 31,
  cartAbandonRate: 18,
};

export const DAILY_REVENUE = [
  { day: 'Pzt', revenue: 32800, upsell: 5200 },
  { day: 'Sal', revenue: 37400, upsell: 6100 },
  { day: 'Car', revenue: 42100, upsell: 7400 },
  { day: 'Per', revenue: 39800, upsell: 6900 },
  { day: 'Cum', revenue: 48600, upsell: 8200 },
  { day: 'Cmt', revenue: 53400, upsell: 9100 },
  { day: 'Paz', revenue: 45200, upsell: 7600 },
];

export const FUNNEL_DATA = [
  { step: 'Sepet', value: 100 },
  { step: 'Teslimat', value: 74 },
  { step: 'Odeme', value: 58 },
  { step: 'Tamamlandi', value: 46 },
];

export const AOV_TREND = [
  { month: 'Oca', aov: 620 },
  { month: 'Sub', aov: 655 },
  { month: 'Mar', aov: 681 },
  { month: 'Nis', aov: 704 },
  { month: 'May', aov: 728 },
  { month: 'Haz', aov: 742 },
];

export const CONVERSION_TREND = [
  { month: 'Oca', rate: 2.8 },
  { month: 'Sub', rate: 3.1 },
  { month: 'Mar', rate: 3.4 },
  { month: 'Nis', rate: 3.7 },
  { month: 'May', rate: 4.0 },
  { month: 'Haz', rate: 4.2 },
];

export const ABANDONMENT_BY_STEP = [
  { step: 'Urun', rate: 12 },
  { step: 'Sepet', rate: 18 },
  { step: 'Teslimat', rate: 21 },
  { step: 'Odeme', rate: 9 },
];

export function toggleUpsellActive(id: string) {
  const item = UPSELL_CATALOG.find((p) => p.id === id);
  if (item) item.active = !item.active;
}

export function setUpsellPrice(id: string, price: number) {
  const item = UPSELL_CATALOG.find((p) => p.id === id);
  if (item) item.price = price;
}

export function toggleFloristPick(id: string) {
  const item = UPSELL_CATALOG.find((p) => p.id === id);
  if (item) item.floristPick = !item.floristPick;
}

export function toggleBundleActive(id: string) {
  const item = BUNDLES.find((b) => b.id === id);
  if (item) item.active = !item.active;
}

export function togglePromotionActive(id: string) {
  const item = PROMOTIONS.find((p) => p.id === id);
  if (item) item.active = !item.active;
}
