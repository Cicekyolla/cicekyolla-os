/* ═══════════════════════════════════════════════════════════════
   CICEKYOLLA EXPERIENCE STORE — 11 luxury verticals
   Connected: Homepage, Product, SEO, CRM
═══════════════════════════════════════════════════════════════ */

export interface ExperienceProduct {
  id: string; name: string; emoji: string; price: number;
  originalPrice?: number; rating: number; reviews: number;
  badge?: string; delivery: string; occasions: string[];
}

export interface ExperienceVertical {
  id: string; slug: string; title: string; subtitle: string;
  emoji: string; color: string; bg: string;
  hero: string; products: ExperienceProduct[];
  seoTitle: string; seoDescription: string;
}

const makeProducts = (base: ExperienceProduct[]): ExperienceProduct[] => base;

export const EXPERIENCE_VERTICALS: ExperienceVertical[] = [
  {
    id:'flowers', slug:'flowers', title:'Premium Güller', subtitle:'Ecuador ithal — her taç yaprağı kusursuz',
    emoji:'🌹', color:'#BE123C', bg:'#FFF1F2',
    hero:'Türkiye geneline aynı gün taze gül teslimatı',
    seoTitle:"Premium Gül Teslimatı — Cicekyolla",
    seoDescription:"Ecuador ithal premium güller. Aynı gün teslimat. 50.000+ mutlu müşteri.",
    products: makeProducts([
      { id:'f1', name:'51 Kırmızı Güller', emoji:'🌹', price:1240, rating:4.9, reviews:847, badge:'En Çok Satan', delivery:'Aynı Gün', occasions:['Sevgililer','Yıldönümü','Doğum Günü'] },
      { id:'f2', name:'25 Pembe Güller', emoji:'🌸', price:680, rating:4.8, reviews:423, delivery:'Aynı Gün', occasions:['Doğum Günü','Anneler Günü'] },
      { id:'f3', name:'Beyaz Güller (30 adet)', emoji:'🤍', price:840, rating:4.7, reviews:312, delivery:'Aynı Gün', occasions:['Düğün','Tebrik'] },
      { id:'f4', name:'101 Kırmızı Güller', emoji:'🌹', price:2240, originalPrice:2480, rating:5.0, reviews:198, badge:'VIP', delivery:'Ekspres 90dk', occasions:['Evlenme Teklifi','Özel Gün'] },
    ]),
  },
  {
    id:'orchids', slug:'orchids', title:'Orkide Koleksiyonu', subtitle:'Phalaenopsis — 8 haftaya kadar açık kalır',
    emoji:'🌸', color:'#A21CAF', bg:'#FDF4FF',
    hero:'Uzun ömürlü orkideler — ev ve ofis için ideal',
    seoTitle:"Orkide Siparişi — Cicekyolla Premium",
    seoDescription:"Phalaenopsis orkide. 8 haftaya kadar açık. Aynı gün teslimat.",
    products: makeProducts([
      { id:'o1', name:'Tek Dal Orkide', emoji:'🌸', price:580, rating:4.8, reviews:342, delivery:'Aynı Gün', occasions:['Ev Hediyesi','Ofis'] },
      { id:'o2', name:'3 Dal Orkide Aranjmanı', emoji:'🌸', price:980, rating:4.9, reviews:198, badge:'Önerilen', delivery:'Aynı Gün', occasions:['Yıldönümü','Özel Gün'] },
      { id:'o3', name:'5 Dal Premium Orkide', emoji:'💜', price:1480, rating:5.0, reviews:87, badge:'Lüks', delivery:'Ekspres', occasions:['VIP Hediye','Kurumsal'] },
    ]),
  },
  {
    id:'gifts', slug:'gifts', title:'Hediye Setleri', subtitle:'Çiçek + Çikolata + Kart kombinasyonları',
    emoji:'🎁', color:'#D97706', bg:'#FFFBEB',
    hero:'Her bütçeye özel hediye setleri',
    seoTitle:"Çiçek Hediye Seti — Cicekyolla",
    seoDescription:"Çiçek ve çikolata hediye setleri. Doğum günü, yıldönümü. Aynı gün teslimat.",
    products: makeProducts([
      { id:'g1', name:'Romantik Set (Gül + Çikolata)', emoji:'🎁', price:1580, rating:4.9, reviews:634, badge:'En Beğenilen', delivery:'Aynı Gün', occasions:['Sevgililer','Yıldönümü'] },
      { id:'g2', name:'Doğum Günü Sürpriz Seti', emoji:'🎂', price:980, rating:4.8, reviews:412, delivery:'Aynı Gün', occasions:['Doğum Günü'] },
      { id:'g3', name:'VIP Lüks Hediye Kutusu', emoji:'👑', price:2800, rating:5.0, reviews:89, badge:'VIP', delivery:'Özel Kurye', occasions:['Özel Gün','Kurumsal'] },
      { id:'g4', name:'Mini Sürpriz Set', emoji:'🌷', price:480, rating:4.7, reviews:287, delivery:'Aynı Gün', occasions:['Teşekkür','Geçmiş Olsun'] },
    ]),
  },
  {
    id:'corporate', slug:'corporate', title:'Kurumsal Çiçek', subtitle:'Şirket teslimatı — logo baskılı kart seçeneği',
    emoji:'🏢', color:'#2563EB', bg:'#EFF6FF',
    hero:'Kurumsal hediyeleşme için premium çiçek çözümleri',
    seoTitle:"Kurumsal Çiçek Siparişi — Cicekyolla B2B",
    seoDescription:"Toplu kurumsal çiçek siparişi. Logo baskılı kart, e-fatura, özel fiyatlandırma.",
    products: makeProducts([
      { id:'c1', name:'Kurumsal Buket (Standart)', emoji:'🌿', price:890, rating:4.8, reviews:234, badge:'Kurumsal', delivery:'Aynı Gün', occasions:['İş Toplantısı','Açılış'] },
      { id:'c2', name:'Ofis Orkide Aranjmanı', emoji:'🌸', price:1240, rating:4.9, reviews:156, delivery:'Aynı Gün', occasions:['Açılış','Teşekkür'] },
      { id:'c3', name:'Toplu Sipariş Paketi (10+)', emoji:'📦', price:6500, originalPrice:7800, rating:5.0, reviews:67, badge:'İndirim', delivery:'Planlanmış', occasions:['Etkinlik','Fuar'] },
    ]),
  },
  {
    id:'wedding', slug:'wedding', title:'Gelin & Düğün', subtitle:'Özel tasarım — floristimizle birebir planlama',
    emoji:'💍', color:'#BE123C', bg:'#FFF5F5',
    hero:'Hayalinizdeki düğün çiçekleri',
    seoTitle:"Gelin Buketi & Düğün Çiçeği — Cicekyolla",
    seoDescription:"Özel tasarım gelin buketi ve düğün çiçeği. Floristimizle birebir planlama.",
    products: makeProducts([
      { id:'w1', name:'Klasik Beyaz Gelin Buketi', emoji:'💐', price:2800, rating:5.0, reviews:98, badge:'Özel Sipariş', delivery:'Randevulu', occasions:['Düğün','Nişan'] },
      { id:'w2', name:'Romantik Pembe Buket', emoji:'🌸', price:2200, rating:4.9, reviews:67, delivery:'Randevulu', occasions:['Düğün'] },
      { id:'w3', name:'Düğün Komple Paket', emoji:'💒', price:8500, rating:5.0, reviews:34, badge:'Komple', delivery:'Özel Planlama', occasions:['Düğün'] },
    ]),
  },
  {
    id:'artificial', slug:'artificial', title:'Yapay Çiçek', subtitle:'Mevsim boyu tazelik — bakım gerektirmez',
    emoji:'🌿', color:'#0D9488', bg:'#F0FDFA',
    hero:'Yapay çiçek — kalıcı güzellik, sıfır bakım',
    seoTitle:"Yapay Çiçek Dekorasyon — Cicekyolla",
    seoDescription:"Premium yapay çiçek ve dekorasyon. Ev, ofis, otel. Ücretsiz kurulum danışmanlığı.",
    products: makeProducts([
      { id:'a1', name:'Yapay Güller Aranjmanı', emoji:'🌹', price:680, rating:4.7, reviews:312, delivery:'3-5 Gün', occasions:['Ev Dekor','Ofis'] },
      { id:'a2', name:'Tropikal Yapay Bitki Seti', emoji:'🌴', price:1240, rating:4.8, reviews:187, badge:'Popüler', delivery:'3-5 Gün', occasions:['Ofis','Restoran'] },
      { id:'a3', name:'Yapay Orkide (Premium)', emoji:'🌸', price:890, rating:4.9, reviews:145, delivery:'2-3 Gün', occasions:['Ev Dekor','Hediye'] },
    ]),
  },
  {
    id:'hotel', slug:'hotel', title:'Otel & Lobi', subtitle:'5 yıldızlı mekanlar için özel çözümler',
    emoji:'🏨', color:'#7C3AED', bg:'#EDE9FE',
    hero:'Otel lobisi ve oda dekorasyonu — teslim garantili',
    seoTitle:"Otel Çiçek Servisi — Cicekyolla Kurumsal",
    seoDescription:"Oteller için günlük çiçek servisi. Lobi, oda, restoran. Toplu fiyatlandırma.",
    products: makeProducts([
      { id:'h1', name:'Lobi Aranjmanı (Büyük)', emoji:'🌺', price:2800, rating:5.0, reviews:45, badge:'Kurumsal', delivery:'Haftalık Servis', occasions:['Otel Lobi'] },
      { id:'h2', name:'Oda Dekorasyon Paketi', emoji:'🛏️', price:340, rating:4.8, reviews:89, delivery:'Günlük', occasions:['Otel Odası'] },
      { id:'h3', name:'Restoran Masa Aranjmanı', emoji:'🍽️', price:280, rating:4.7, reviews:67, delivery:'Günlük', occasions:['Restoran Masası'] },
    ]),
  },
  {
    id:'cafe', slug:'cafe', title:'Kafe & Bistro', subtitle:'Butik atmosfer yaratın — taze ve yapay seçenekler',
    emoji:'☕', color:'#92400E', bg:'#FFFBEB',
    hero:'Kafe atmosferi için özel çiçek çözümleri',
    seoTitle:"Kafe Çiçek Dekorasyon — Cicekyolla",
    seoDescription:"Kafe ve bistro için çiçek dekorasyon servisi. Haftalık teslimat.",
    products: makeProducts([
      { id:'ca1', name:'Kafe Masa Setleri (10 adet)', emoji:'☕', price:1800, rating:4.7, reviews:78, delivery:'Haftalık', occasions:['Kafe Masası'] },
      { id:'ca2', name:'Tezgah Dekorasyon Aranjmanı', emoji:'🌸', price:680, rating:4.8, reviews:54, delivery:'Haftalık', occasions:['Kafe Tezgahı'] },
    ]),
  },
  {
    id:'restaurant', slug:'restaurant', title:'Restoran', subtitle:'Masa dekorasyonu — atmosfer ve prestij',
    emoji:'🍽️', color:'#DC2626', bg:'#FEF2F2',
    hero:'Restoran deneyimini tamamlayan çiçek dekorasyonu',
    seoTitle:"Restoran Çiçek Servisi — Cicekyolla",
    seoDescription:"Restoranlar için masa ve mekan çiçek dekorasyonu. Haftalık servis.",
    products: makeProducts([
      { id:'r1', name:'Restoran Masa Seti (20 masa)', emoji:'🌹', price:3600, rating:4.8, reviews:89, delivery:'Haftalık', occasions:['Restoran Masası'] },
      { id:'r2', name:'Fine Dining Aranjmanı', emoji:'🌺', price:580, rating:5.0, reviews:34, badge:'Premium', delivery:'Günlük', occasions:['Fine Dining'] },
    ]),
  },
  {
    id:'office', slug:'office', title:'Ofis & Çalışma', subtitle:'Üretkenliği artıran bitki ve çiçek çözümleri',
    emoji:'🏢', color:'#16A34A', bg:'#F0FDF4',
    hero:'Ofis ortamını canlandıran çiçek ve bitki servisi',
    seoTitle:"Ofis Çiçek Servisi — Cicekyolla Kurumsal",
    seoDescription:"Ofis için haftalık çiçek ve bitki servisi. Kurumsal fiyatlandırma.",
    products: makeProducts([
      { id:'of1', name:'Ofis Haftalık Çiçek Paketi', emoji:'🌿', price:480, rating:4.8, reviews:145, delivery:'Haftalık', occasions:['Ofis'] },
      { id:'of2', name:'Toplantı Odası Aranjmanı', emoji:'🌸', price:380, rating:4.7, reviews:89, delivery:'İstek Üzerine', occasions:['Toplantı'] },
      { id:'of3', name:'Resepsiyon Premium Set', emoji:'💐', price:1240, rating:4.9, reviews:67, badge:'Kurumsal', delivery:'Haftalık', occasions:['Resepsiyon'] },
    ]),
  },
  {
    id:'projects', slug:'projects', title:'Dekorasyon Projeleri', subtitle:'Büyük ölçekli mekan dönüşümleri',
    emoji:'🏗️', color:'#0891B2', bg:'#ECFEFF',
    hero:'Mekan dönüşüm projeleri — anahtar teslim',
    seoTitle:"Yapay Çiçek Dekorasyon Projeleri — Cicekyolla",
    seoDescription:"Büyük ölçekli yapay çiçek dekorasyon projeleri. AVM, otel, rezidans.",
    products: makeProducts([
      { id:'pr1', name:'Küçük Mekan Paketi (50-150m²)', emoji:'🏠', price:45000, rating:4.9, reviews:23, delivery:'Proje Bazlı', occasions:['Küçük İşletme'] },
      { id:'pr2', name:'Orta Mekan Projesi (150-400m²)', emoji:'🏢', price:125000, rating:5.0, reviews:15, badge:'Popüler', delivery:'Proje Bazlı', occasions:['Restoran','Otel'] },
      { id:'pr3', name:'Büyük Mekan Projesi (400m²+)', emoji:'🏗️', price:280000, rating:5.0, reviews:8, badge:'Enterprise', delivery:'Proje Bazlı', occasions:['AVM','Otel Zinciri'] },
    ]),
  },
];

export function getVerticalById(id: string): ExperienceVertical | undefined {
  return EXPERIENCE_VERTICALS.find(v => v.id === id);
}

export function getVerticalBySlug(slug: string): ExperienceVertical | undefined {
  return EXPERIENCE_VERTICALS.find(v => v.slug === slug);
}
