export type StorefrontProduct = {
  id: string;
  name: string;
  category: string;
  emoji: string;
  status: 'active' | 'draft' | 'archived' | 'out-of-stock';
  featured: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
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
    name: 'Premium Gul Buketi',
    category: 'Guller',
    emoji: '🌹',
    status: 'active',
    featured: true,
    isBestSeller: true,
    shortDesc: 'Ozel gunler icin premium gul buketi.',
    careInfo: 'Serin yerde tutun, suyunu gunluk yenileyin.',
    tags: ['gul', 'romantik', 'premium'],
    rating: 4.9,
    reviewCount: 248,
    sold: 1840,
    variants: [
      { name: '12 Gul', price: 749, stock: 42 },
      { name: '24 Gul', price: 1299, stock: 18 }
    ],
    seoTitle: 'Premium Gul Buketi - Ayni Gun Teslimat',
    seoDescription: 'Taze premium gul buketi, ayni gun teslimat ve guvenli odeme ile Cicekyolla.',
    seoKeywords: ['gul buketi', 'cicek gonder', 'ayni gun teslimat'],
    faq: [
      { q: 'Ayni gun teslim edilir mi?', a: 'Uygun bolgelerde ayni gun teslim edilir.' },
      { q: 'Not karti eklenir mi?', a: 'Evet, siparis sirasinda eklenebilir.' }
    ]
  },
  {
    id: 'orkide-aranjmani',
    name: 'Orkide Aranjmani',
    category: 'Orkideler',
    emoji: '🌸',
    status: 'active',
    featured: true,
    isNew: true,
    shortDesc: 'Sik ve uzun omurlu orkide aranjmani.',
    careInfo: 'Direkt gunes almayan aydinlik ortamda konumlandirin.',
    tags: ['orkide', 'hediye', 'kurumsal'],
    rating: 4.8,
    reviewCount: 132,
    sold: 760,
    variants: [
      { name: 'Tek Dal', price: 899, stock: 24 },
      { name: 'Cift Dal', price: 1399, stock: 12 }
    ],
    seoTitle: 'Orkide Aranjmani - Sik Hediye Secenegi',
    seoDescription: 'Premium orkide aranjmanlari Cicekyolla guvencesiyle kapinizda.',
    seoKeywords: ['orkide', 'orkide gonder', 'premium cicek'],
    faq: [
      { q: 'Orkide kac gun dayanir?', a: 'Dogru bakimla uzun sure canli kalir.' }
    ]
  }
];

export function toggleProductActive(id: string) {
  const product = STOREFRONT_PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  product.status = product.status === 'active' ? 'draft' : 'active';
}

export function toggleFeatured(id: string) {
  const product = STOREFRONT_PRODUCTS.find((p) => p.id === id);
  if (product) product.featured = !product.featured;
}export const FEATURED_PRODUCTS = STOREFRONT_PRODUCTS.filter((product) => product.featured);
