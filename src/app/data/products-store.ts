export type StorefrontProduct = {
  id: string;
  numId: string;
  name: string;
  category: string;
  emoji: string;
  status: 'active' | 'draft' | 'archived' | 'out-of-stock';
  featured: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  basePrice: number;
  shortDesc: string;
  careInfo: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  sold: number;
  variants: { name: string; price: number; stock: number }[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  faq: { q: string; a: string }[];
};

export const STOREFRONT_PRODUCTS: StorefrontProduct[] = [
  {
    id: 'premium-gul-buketi',
    numId: 'PRD-1001',
    name: 'Premium Gül Buketi',
    category: 'Güller',
    emoji: '🌹',
    status: 'active',
    featured: true,
    isBestSeller: true,
    basePrice: 749,
    shortDesc: 'Özel günler için premium gül buketi.',
    careInfo: 'Serin yerde tutun, suyunu günlük yenileyin.',
    tags: ['gül', 'romantik', 'premium'],
    rating: 4.9,
    reviewCount: 248,
    sold: 1840,
    variants: [
      { name: '12 Gül', price: 749, stock: 42 },
      { name: '24 Gül', price: 1299, stock: 18 }
    ],
    seoTitle: 'Premium Gül Buketi - Aynı Gün Teslimat',
    seoDescription: 'Taze premium gül buketi, aynı gün teslimat ve güvenli ödeme ile Cicekyolla.',
    seoKeywords: ['gül buketi', 'çiçek gönder', 'aynı gün teslimat'],
    faq: [
      { q: 'Aynı gün teslim edilir mi?', a: 'Uygun bölgelerde aynı gün teslim edilir.' },
      { q: 'Not kartı eklenir mi?', a: 'Evet, sipariş sırasında eklenebilir.' }
    ]
  },
  {
    id: 'orkide-aranjmani',
    numId: 'PRD-1002',
    name: 'Orkide Aranjmanı',
    category: 'Orkideler',
    emoji: '🌸',
    status: 'active',
    featured: true,
    isNew: true,
    basePrice: 899,
    shortDesc: 'Şık ve uzun ömürlü orkide aranjmanı.',
    careInfo: 'Direkt güneş almayan aydınlık ortamda konumlandırın.',
    tags: ['orkide', 'hediye', 'kurumsal'],
    rating: 4.8,
    reviewCount: 132,
    sold: 760,
    variants: [
      { name: 'Tek Dal', price: 899, stock: 24 },
      { name: 'Çift Dal', price: 1399, stock: 12 }
    ],
    seoTitle: 'Orkide Aranjmanı - Şık Hediye Seçeneği',
    seoDescription: 'Premium orkide aranjmanları Cicekyolla güvencesiyle kapınızda.',
    seoKeywords: ['orkide', 'orkide gönder', 'premium çiçek'],
    faq: [
      { q: 'Orkide kaç gün dayanır?', a: 'Doğru bakımla uzun süre canlı kalır.' }
    ]
  }
];

export const FEATURED_PRODUCTS = STOREFRONT_PRODUCTS.filter((product) => product.featured);

export function toggleProductActive(id: string) {
  const product = STOREFRONT_PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  product.status = product.status === 'active' ? 'draft' : 'active';
}

export function toggleFeatured(id: string) {
  const product = STOREFRONT_PRODUCTS.find((p) => p.id === id);
  if (product) product.featured = !product.featured;
}
