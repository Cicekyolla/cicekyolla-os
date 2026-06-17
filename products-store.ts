// CICEKYOLLA OS — Product catalog store
// Storefront + admin product catalog. Consumed by product management,
// storefront listing/detail, checkout and homepage. Swap for API reads
// when backend lands (GET /products). Mutators are in-memory.
// Full source: github.com/Cicekyolla/cicekyolla-os

export interface ProductVariant {
  id:    string;
  label: string;
  price: number;
  stock: number;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export type ProductStatus = 'active' | 'draft';

export interface StorefrontProduct {
  id:             string;        // url slug, e.g. "kirmizi-gul-51"
  numId:          string;        // display code, e.g. "CK-1024"
  name:           string;
  emoji:          string;
  category:       string;
  basePrice:      number;
  rating:         number;
  reviewCount:    number;
  sold:           number;
  status:         ProductStatus;
  featured:       boolean;
  badge:          string | null;
  isNew:          boolean;
  isBestSeller:   boolean;
  shortDesc:      string;
  tags:           string[];
  variants:       ProductVariant[];
  faq:            ProductFaq[];
  careInfo:       string;
  deliveryNote:   string;
  // SEO
  seoTitle:       string;
  seoDescription: string;
  seoKeywords:    string[];
}

const STD_FAQ: ProductFaq[] = [
  { q: 'Teslimat ne kadar sürer?', a: 'İstanbul içi aynı gün (saat 14:00’e kadar verilen siparişler), Türkiye geneli 1-3 iş günü kargo ile teslim edilir.' },
  { q: 'Çiçekler ne kadar taze?', a: 'Tüm ürünlerimiz sipariş anında hazırlanır. Taze olmayan ürün için tam iade garantisi sunarız.' },
  { q: 'Kart mesajı ekleyebilir miyim?', a: 'Evet, ödeme adımında ücretsiz el yazısı kart mesajı ekleyebilirsiniz.' },
];

const STD_CARE = 'Çiçeklerinizi serin bir ortamda tutun, doğrudan güneş ışığından kaçının. Vazo suyunu 2 günde bir değiştirin ve sap uçlarını çapraz kesin.';

export const STOREFRONT_PRODUCTS: StorefrontProduct[] = [
  {
    id: 'kirmizi-gul-51', numId: 'CK-1024', name: '51 Kırmızı Gül Buketi', emoji: '🌹',
    category: 'Güller', basePrice: 1240, rating: 4.9, reviewCount: 327, sold: 1840,
    status: 'active', featured: true, badge: 'Çok Satan', isNew: false, isBestSeller: true,
    shortDesc: 'Aşkın en güçlü ifadesi: 51 adet özenle seçilmiş kırmızı gül.',
    tags: ['aşk', 'sevgililer günü', 'yıldönümü', 'romantik'],
    variants: [
      { id: 'v-21', label: '21 Gül',  price: 640,  stock: 120 },
      { id: 'v-41', label: '41 Gül',  price: 980,  stock: 85  },
      { id: 'v-51', label: '51 Gül',  price: 1240, stock: 64  },
      { id: 'v-101', label: '101 Gül', price: 2390, stock: 28 },
    ],
    faq: STD_FAQ, careInfo: STD_CARE, deliveryNote: 'İstanbul içi aynı gün teslimat',
    seoTitle: '51 Kırmızı Gül Buketi — Aynı Gün Teslimat | Cicekyolla',
    seoDescription: '51 kırmızı gülden oluşan premium buket. Aynı gün İstanbul teslimat, taze garanti. Sevgiliye, yıldönümüne özel.',
    seoKeywords: ['kırmızı gül buketi', '51 gül', 'sevgiliye çiçek', 'aynı gün çiçek'],
  },
  {
    id: 'luks-orkide-beyaz', numId: 'CK-1041', name: 'Lüks Beyaz Orkide (2 Dal)', emoji: '🌸',
    category: 'Orkideler', basePrice: 980, rating: 4.8, reviewCount: 214, sold: 920,
    status: 'active', featured: true, badge: 'Önerilen', isNew: false, isBestSeller: false,
    shortDesc: 'Zarafetin simgesi çift dallı beyaz Phalaenopsis orkide.',
    tags: ['orkide', 'kurumsal', 'hediye', 'şık'],
    variants: [
      { id: 'v-1d', label: 'Tek Dal',  price: 580, stock: 45 },
      { id: 'v-2d', label: 'Çift Dal', price: 980, stock: 38 },
      { id: 'v-3d', label: 'Üç Dal',   price: 1380, stock: 19 },
    ],
    faq: STD_FAQ, careInfo: STD_CARE, deliveryNote: 'İstanbul içi aynı gün teslimat',
    seoTitle: 'Lüks Beyaz Orkide — Kurumsal & Hediye | Cicekyolla',
    seoDescription: 'Çift dallı beyaz orkide. Kurumsal hediye ve özel günler için ideal. Aynı gün teslimat, premium ambalaj.',
    seoKeywords: ['beyaz orkide', 'orkide gönder', 'kurumsal çiçek', 'orkide hediye'],
  },
  {
    id: 'mevsim-aranjmani', numId: 'CK-1058', name: 'Rengarenk Mevsim Aranjmanı', emoji: '💐',
    category: 'Aranjmanlar', basePrice: 680, rating: 4.7, reviewCount: 156, sold: 640,
    status: 'active', featured: true, badge: null, isNew: false, isBestSeller: false,
    shortDesc: 'Mevsimin en taze çiçeklerinden hazırlanan canlı aranjman.',
    tags: ['mevsim', 'doğum günü', 'geçmiş olsun', 'tebrik'],
    variants: [
      { id: 'v-s', label: 'Standart', price: 680,  stock: 70 },
      { id: 'v-m', label: 'Orta',     price: 940,  stock: 52 },
      { id: 'v-l', label: 'Büyük',    price: 1280, stock: 33 },
    ],
    faq: STD_FAQ, careInfo: STD_CARE, deliveryNote: 'İstanbul içi aynı gün teslimat',
    seoTitle: 'Mevsim Çiçekleri Aranjmanı — Aynı Gün | Cicekyolla',
    seoDescription: 'Mevsimin taze çiçeklerinden rengarenk aranjman. Doğum günü, tebrik ve geçmiş olsun için. Aynı gün teslimat.',
    seoKeywords: ['mevsim çiçeği', 'çiçek aranjmanı', 'doğum günü çiçeği', 'renkli buket'],
  },
  {
    id: 'kutuda-gul-pembe', numId: 'CK-1067', name: 'Kutuda Pembe Güller', emoji: '🎁',
    category: 'Kutuda Çiçek', basePrice: 890, rating: 4.9, reviewCount: 189, sold: 710,
    status: 'active', featured: false, badge: 'Yeni', isNew: true, isBestSeller: false,
    shortDesc: 'Şık silindir kutuda dizilmiş pastel pembe güller.',
    tags: ['kutuda çiçek', 'romantik', 'hediye', 'şık'],
    variants: [
      { id: 'v-mini', label: 'Mini Kutu',  price: 540, stock: 60 },
      { id: 'v-orta', label: 'Orta Kutu',  price: 890, stock: 41 },
      { id: 'v-buyuk', label: 'Büyük Kutu', price: 1340, stock: 22 },
    ],
    faq: STD_FAQ, careInfo: STD_CARE, deliveryNote: 'İstanbul içi aynı gün teslimat',
    seoTitle: 'Kutuda Pembe Gül — Şık Hediye Kutusu | Cicekyolla',
    seoDescription: 'Silindir kutuda pastel pembe güller. Modern ve şık hediye. Aynı gün İstanbul teslimat, taze garanti.',
    seoKeywords: ['kutuda gül', 'pembe gül kutusu', 'hediyelik çiçek', 'kutu çiçek'],
  },
  {
    id: 'saksi-orkide-mor', numId: 'CK-1072', name: 'Mor Saksı Orkidesi', emoji: '🪴',
    category: 'Saksı Çiçekleri', basePrice: 740, rating: 4.6, reviewCount: 98, sold: 380,
    status: 'active', featured: false, badge: null, isNew: false, isBestSeller: false,
    shortDesc: 'Uzun ömürlü, dekoratif mor orkide saksı.',
    tags: ['saksı', 'ofis', 'dekorasyon', 'uzun ömürlü'],
    variants: [
      { id: 'v-tek', label: 'Tek Dal',  price: 740,  stock: 30 },
      { id: 'v-cift', label: 'Çift Dal', price: 1120, stock: 18 },
    ],
    faq: STD_FAQ, careInfo: STD_CARE, deliveryNote: 'İstanbul içi aynı gün teslimat',
    seoTitle: 'Mor Saksı Orkidesi — Ofis & Ev | Cicekyolla',
    seoDescription: 'Uzun ömürlü mor saksı orkidesi. Ofis ve ev dekorasyonu için ideal. Aynı gün teslimat.',
    seoKeywords: ['saksı orkide', 'mor orkide', 'ofis çiçeği', 'dekoratif çiçek'],
  },
  {
    id: 'lilyum-buketi', numId: 'CK-1089', name: 'Beyaz Lilyum Buketi', emoji: '🌷',
    category: 'Aranjmanlar', basePrice: 820, rating: 4.8, reviewCount: 134, sold: 510,
    status: 'draft', featured: false, badge: null, isNew: false, isBestSeller: false,
    shortDesc: 'Hoş kokulu beyaz lilyumlardan zarif buket.',
    tags: ['lilyum', 'zarif', 'tebrik', 'kokulu'],
    variants: [
      { id: 'v-s', label: 'Standart', price: 820,  stock: 24 },
      { id: 'v-l', label: 'Büyük',    price: 1180, stock: 12 },
    ],
    faq: STD_FAQ, careInfo: STD_CARE, deliveryNote: 'İstanbul içi aynı gün teslimat',
    seoTitle: 'Beyaz Lilyum Buketi — Zarif & Kokulu | Cicekyolla',
    seoDescription: 'Hoş kokulu beyaz lilyum buketi. Tebrik ve özel günler için zarif seçim. Aynı gün teslimat.',
    seoKeywords: ['lilyum buketi', 'beyaz lilyum', 'kokulu çiçek', 'zarif buket'],
  },
];

// Featured subset for homepage / account recommendations.
export const FEATURED_PRODUCTS: StorefrontProduct[] =
  STOREFRONT_PRODUCTS.filter(p => p.featured && p.status === 'active');

// ───────────────────────────────────────────────────────────────
// Mutators (in-memory; replace with API writes when backend lands)
// ───────────────────────────────────────────────────────────────
export function toggleProductActive(id: string): void {
  const p = STOREFRONT_PRODUCTS.find(x => x.id === id);
  if (p) p.status = p.status === 'active' ? 'draft' : 'active';
}

export function toggleFeatured(id: string): void {
  const p = STOREFRONT_PRODUCTS.find(x => x.id === id);
  if (p) p.featured = !p.featured;
}
