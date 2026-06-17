export type KargoFilter = { id: string; label: string; emoji: string };

export type KargoProduct = {
  id: string;
  name: string;
  category: string;
  emoji: string;
  price: number;
  originalPrice?: number;
  shortDesc: string;
  badge?: string;
  active: boolean;
  bestSeller?: boolean;
  sold24h: number;
  sold30d: number;
  stock: number;
  zone: 1 | 2 | 3;
  deliveryMin: number;
  deliveryMax: number;
  standardFee: number;
  expressFee: number;
  freeAt: number;
  regions: string[];
  features: string[];
};

export type Province = {
  name: string;
  zone: 1 | 2 | 3;
  fee: number;
  expressFee: number;
  delivery: string;
  active: boolean;
};

export const KARGO_SLOGANS = [
  'Türkiye Geneline Güvenli Çiçek Kargo',
  '81 İle Taze Çiçek Teslimatı',
  'Sigortalı Paketleme, Hızlı Teslimat'
];

export const KARGO_BADGES = [
  { emoji: '🚚', val: '81 İl', label: 'Türkiye geneli teslimat' },
  { emoji: '🛡️', val: 'Sigortalı', label: 'Güvenli paketleme' },
  { emoji: '⭐', val: '4.9/5', label: 'Müşteri puanı' },
  { emoji: '📦', val: '50K+', label: 'Başarılı teslimat' }
];

export const KARGO_FILTERS: KargoFilter[] = [
  { id: 'all', label: 'Tümü', emoji: '🌿' },
  { id: 'same-day', label: 'Aynı Gün', emoji: '⚡' },
  { id: 'flowers', label: 'Çiçek', emoji: '💐' },
  { id: 'plants', label: 'Bitki', emoji: '🪴' }
];

export const KARGO_PRODUCTS: KargoProduct[] = [
  {
    id: 'kargo-gul',
    name: 'Kargo Gül Buketi',
    category: 'flowers',
    emoji: '🌹',
    price: 749,
    originalPrice: 899,
    shortDesc: 'Türkiye geneline özel paketli gül buketi.',
    badge: '🚚 1-2 Gün',
    active: true,
    bestSeller: true,
    sold24h: 38,
    sold30d: 920,
    stock: 120,
    zone: 1,
    deliveryMin: 1,
    deliveryMax: 2,
    standardFee: 49,
    expressFee: 89,
    freeAt: 1000,
    regions: ['İstanbul', 'Ankara', 'İzmir'],
    features: ['Özel kutu', 'Taze garanti', 'Not kartı']
  },
  {
    id: 'kargo-orkide',
    name: 'Kargo Orkide',
    category: 'plants',
    emoji: '🌸',
    price: 1199,
    shortDesc: 'Dayanıklı orkide, güvenli kutu ile gönderim.',
    badge: '📦 3-5 Gün',
    active: true,
    bestSeller: true,
    sold24h: 21,
    sold30d: 610,
    stock: 64,
    zone: 2,
    deliveryMin: 2,
    deliveryMax: 5,
    standardFee: 69,
    expressFee: 119,
    freeAt: 1500,
    regions: ['Bursa', 'Antalya', 'Konya'],
    features: ['Kırılmaz paket', 'Bakım kartı', 'Sigortalı teslimat']
  }
];

export const PROVINCES: Province[] = [
  { name: 'İstanbul', zone: 1, fee: 29, expressFee: 59, delivery: 'Aynı gün', active: true },
  { name: 'Ankara', zone: 1, fee: 39, expressFee: 79, delivery: '1-2 gün', active: true },
  { name: 'İzmir', zone: 1, fee: 39, expressFee: 79, delivery: '1-2 gün', active: true },
  { name: 'Bursa', zone: 2, fee: 59, expressFee: 99, delivery: '2-3 gün', active: true },
  { name: 'Antalya', zone: 2, fee: 69, expressFee: 119, delivery: '2-4 gün', active: true },
  { name: 'Diyarbakır', zone: 3, fee: 89, expressFee: 149, delivery: '3-5 gün', active: true }
];

export const ALSO_SENT = [
  { id: 'combo-1', alsoIds: ['kargo-gul', 'kargo-orkide'] }
];

export const SHIPPING_RULES = [
  { id: 'free-1000', name: '1000 TL üzeri ücretsiz kargo', trigger: 'Sepet 1000 TL+', discount: 49, active: true },
  { id: 'express', name: 'Ekspres teslimat ücreti', trigger: 'Ekspres seçim', discount: 0, active: true }
];

export const KARGO_CAMPAIGNS = [
  { id: 'summer', name: 'Yaz Kargo Kampanyası', discount: 15, active: true }
];

export const KARGO_DAILY = [
  { day: 'Pzt', revenue: 42000, orders: 58 },
  { day: 'Sal', revenue: 51000, orders: 72 },
  { day: 'Çar', revenue: 47000, orders: 64 },
  { day: 'Per', revenue: 59000, orders: 81 }
];

export const KARGO_METRICS = {
  monthlyRevenue: 1280000,
  monthlyOrders: 1840,
  onTimeRate: 94.6,
  avgOrderValue: 695
};

export const CARRIER_PERFORMANCE = [
  { carrier: 'Yurtiçi', onTime: 95.2, avgDays: 1.8, monthlyVolume: 820, satisfaction: 4.8 },
  { carrier: 'MNG', onTime: 91.4, avgDays: 2.2, monthlyVolume: 540, satisfaction: 4.5 }
];

export const KARGO_CRM_SUMMARY = {
  totalKargoCustomers: 1260,
  repeatRate: 38.4
};

export function toggleKargoProduct(id: string) {
  const item = KARGO_PRODUCTS.find((p) => p.id === id);
  if (item) item.active = !item.active;
}

export function toggleShippingRule(id: string) {
  const item = SHIPPING_RULES.find((r) => r.id === id);
  if (item) item.active = !item.active;
}

export function toggleKargoCampaign(id: string) {
  const item = KARGO_CAMPAIGNS.find((c) => c.id === id);
  if (item) item.active = !item.active;
}
