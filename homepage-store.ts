// CICEKYOLLA OS — Homepage content store
// Admin-configurable hero, featured categories and section visibility for
// the storefront homepage. Editable via the Homepage Admin screen; swap for
// API reads when backend lands (GET /storefront/homepage).
// Full source: github.com/Cicekyolla/cicekyolla-os

export interface HeroContent {
  headline:  string;
  subtitle:  string;
  cta1Label: string;
  cta2Label: string;
}

export const HERO_CONTENT: HeroContent = {
  headline:  'Türkiye’nin En Taze Çiçekleri — Kapında',
  subtitle:  'Aynı gün teslimat, 81 ile kargo ve binlerce mutlu müşteri. Sevdiklerinize bir tık uzaklıktasınız.',
  cta1Label: 'Hemen Sipariş Ver',
  cta2Label: 'WhatsApp’tan Sipariş',
};

export interface FeaturedCategory {
  id:     string;
  label:  string;
  emoji:  string;
  bg:     string;
  accent: string;
  active: boolean;
}

export const FEATURED_CATEGORIES: FeaturedCategory[] = [
  { id: 'cat-gul',      label: 'Güller',           emoji: '🌹', bg: '#FEF2F2', accent: '#DC2626', active: true },
  { id: 'cat-orkide',   label: 'Orkideler',        emoji: '🌸', bg: '#FDF4FF', accent: '#A21CAF', active: true },
  { id: 'cat-aranjman', label: 'Aranjmanlar',      emoji: '💐', bg: '#F0FDF4', accent: '#16A34A', active: true },
  { id: 'cat-saksi',    label: 'Saksı Çiçekleri',  emoji: '🪴', bg: '#F0FDFA', accent: '#0D9488', active: true },
  { id: 'cat-kutu',     label: 'Kutuda Çiçek',     emoji: '🎁', bg: '#FFFBEB', accent: '#D97706', active: true },
  { id: 'cat-teras',    label: 'Teraryum',         emoji: '🌵', bg: '#ECFDF5', accent: '#059669', active: true },
  { id: 'cat-yapay',    label: 'Yapay Çiçek',      emoji: '🌿', bg: '#EFF6FF', accent: '#2563EB', active: true },
  { id: 'cat-celenk',   label: 'Çelenk',           emoji: '🏵️', bg: '#F5F3FF', accent: '#7C3AED', active: false },
];

export type HomepageSectionId =
  | 'hero' | 'categories' | 'bestsellers' | 'sameday'
  | 'occasions' | 'campaign' | 'blog' | 'testimonials' | 'trust';

export interface HomepageSection {
  id:      HomepageSectionId;
  label:   string;
  visible: boolean;
  order:   number;
}

export const HOMEPAGE_SECTIONS: HomepageSection[] = [
  { id: 'hero',         label: 'Hero Banner',       visible: true,  order: 1 },
  { id: 'categories',   label: 'Kategori Vitrini',  visible: true,  order: 2 },
  { id: 'bestsellers',  label: 'Çok Satanlar',      visible: true,  order: 3 },
  { id: 'sameday',      label: 'Aynı Gün Teslimat', visible: true,  order: 4 },
  { id: 'occasions',    label: 'Özel Günler',       visible: true,  order: 5 },
  { id: 'campaign',     label: 'Kampanya Şeridi',   visible: true,  order: 6 },
  { id: 'blog',         label: 'Blog & İçerik',     visible: false, order: 7 },
  { id: 'testimonials', label: 'Müşteri Yorumları', visible: true,  order: 8 },
  { id: 'trust',        label: 'Güven Unsurları',   visible: true,  order: 9 },
];
