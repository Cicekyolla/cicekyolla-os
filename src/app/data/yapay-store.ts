/* ═══════════════════════════════════════════════════════════════
   CICEKYOLLA YAPAY DATA STORE
   Connected: CRM, SEO, Revenue, Product Center
═══════════════════════════════════════════════════════════════ */
// Full source at github.com/Cicekyolla/cicekyolla-os
export type ProjectStatus = 'lead'|'quote'|'approved'|'in-progress'|'installation'|'completed'|'cancelled';
export type QuoteStatus = 'new'|'contacted'|'meeting'|'proposal'|'won'|'lost';

export interface YapayProject {
  id: string; title: string; client: string; type: string;
  status: ProjectStatus; approvalStatus: 'pending'|'approved'|'revision'|'none';
  budget: number; area: number; location: string; startDate: string;
  completionDate?: string; rating?: number; tags: string[];
  images: string[]; description: string;
}

export const YAPAY_PROJECTS: YapayProject[] = [
  { id:'yp-001', title:'Maslak Plaza Lobi Tasarımı', client:'Maslak Plaza AVM', type:'Kurumsal Ofis', status:'completed', approvalStatus:'approved', budget:285000, area:420, location:'Maslak, İstanbul', startDate:'2025-09-01', completionDate:'2025-11-15', rating:5, tags:['lüks','kurumsal','lobi'], images:[], description:'Maslak Plaza ana lobi için premium yapay çiçek ve dekorasyon projesi.' },
  { id:'yp-002', title:'Nişantaşı Butik Otel Odaları', client:'The Nişantaşı Hotel', type:'Otel & Konaklama', status:'completed', approvalStatus:'approved', budget:142000, area:280, location:'Nişantaşı, İstanbul', startDate:'2025-10-01', completionDate:'2025-12-20', rating:5, tags:['otel','butik','odalar'], images:[], description:'32 oda için özel yapay çiçek dekorasyon paketi.' },
  { id:'yp-003', title:'Kadıköy Restoran Zinciri', client:'Meze & Co. Restoran', type:'Restoran & Kafe', status:'in-progress', approvalStatus:'pending', budget:89000, area:340, location:'Kadıköy, İstanbul', startDate:'2026-02-01', tags:['restoran','zincir','mevsimlik'], images:[], description:'3 şubeli restoran zinciri için mevsimlik dekorasyon projesi.' },
  { id:'yp-004', title:'Ataşehir Rezidans Ortak Alanlar', client:'Park Rezidans', type:'Konut & Rezidans', status:'approved', approvalStatus:'approved', budget:67000, area:180, location:'Ataşehir, İstanbul', startDate:'2026-03-01', tags:['rezidans','ortak alan','modern'], images:[], description:'Lüks rezidans projesi ortak alanlar dekorasyonu.' },
  { id:'yp-005', title:'Levent Kurumsal Merkez', client:'FinTech Holding A.Ş.', type:'Kurumsal Ofis', status:'quote', approvalStatus:'none', budget:195000, area:650, location:'Levent, İstanbul', startDate:'2026-04-01', tags:['fintech','kurumsal','premium'], images:[], description:'Fintech şirketinin yeni ofis merkezi dekorasyon projesi.' },
  { id:'yp-006', title:'Bosphorus Wedding Hall', client:'Grand Bosphorus Events', type:'Düğün Salonu', status:'installation', approvalStatus:'approved', budget:312000, area:890, location:'Beşiktaş, İstanbul', startDate:'2025-12-01', tags:['düğün','salon','görkemli'], images:[], description:'Premium düğün salonu komple dekorasyon ve kurulum.' },
  { id:'yp-007', title:'Antalya Resort Spa', client:'Antalya Luxury Resort', type:'Otel & Konaklama', status:'completed', approvalStatus:'approved', budget:425000, area:1200, location:'Antalya', startDate:'2025-07-01', completionDate:'2025-09-30', rating:5, tags:['resort','spa','antalya'], images:[], description:'5 yıldızlı resort otel tüm ortak alanları dekorasyonu.' },
  { id:'yp-008', title:'Galataport Kafe Zinciri', client:'Blue Waters Cafe', type:'Restoran & Kafe', status:'completed', approvalStatus:'approved', budget:98000, area:240, location:'Karaköy, İstanbul', startDate:'2025-11-01', completionDate:'2026-01-15', rating:4, tags:['kafe','galataport','liman'], images:[], description:'Galataport lokasyonundaki 4 şubeli kafe zinciri dekorasyonu.' },
  { id:'yp-009', title:'İzmir Fuar Merkezi Standları', client:'İzmir Fuar A.Ş.', type:'Etkinlik & Organizasyon', status:'lead', approvalStatus:'none', budget:54000, area:320, location:'İzmir', startDate:'2026-05-01', tags:['fuar','stand','etkinlik'], images:[], description:'Uluslararası fuar merkezi stand dekorasyon paketi.' },
  { id:'yp-010', title:'Nişantaşı Moda Evi', client:'Haute Couture Istanbul', type:'Perakende & Moda', status:'approved', approvalStatus:'approved', budget:78000, area:160, location:'Nişantaşı, İstanbul', startDate:'2026-03-15', tags:['moda','showroom','lüks'], images:[], description:'Lüks moda evi showroom ve vitrin dekorasyonu.' },
  { id:'yp-011', title:'Ankara Büyükelçilik', client:'Avrupa Konsolosluğu', type:'Kurumsal Ofis', status:'completed', approvalStatus:'approved', budget:187000, area:520, location:'Ankara', startDate:'2025-08-01', completionDate:'2025-10-31', rating:5, tags:['büyükelçilik','resmi','protokol'], images:[], description:'Yabancı büyükelçilik binası resmi mekanlar dekorasyonu.' },
  { id:'yp-012', title:'Bodrum Villa Projesi', client:'Özel Müşteri', type:'Konut & Rezidans', status:'in-progress', approvalStatus:'pending', budget:234000, area:780, location:'Bodrum, Muğla', startDate:'2026-01-01', tags:['villa','bodrum','yazlık'], images:[], description:'Özel lüks villa tüm iç mekan dekorasyon projesi.' },
];

export const YAPAY_TEAMS = [
  { id:'t1', name:'Proje Müdürlüğü', lead:'Ahmet Yılmaz', members:['Ayşe K.','Mehmet D.','Fatma S.'], activeProjects:3 },
  { id:'t2', name:'Tasarım & Konsept', lead:'Selin Arslan', members:['Can T.','Zeynep A.'], activeProjects:5 },
  { id:'t3', name:'Kurulum Ekibi A', lead:'Murat Öz', members:['Ali R.','Hasan B.','İbrahim K.','Osman Y.'], activeProjects:2 },
  { id:'t4', name:'Kurulum Ekibi B', lead:'Deniz Çelik', members:['Burak S.','Emre A.','Serkan M.'], activeProjects:1 },
  { id:'t5', name:'Kalite Kontrol', lead:'Burcu Ak', members:['Ceren Y.','Gökhan T.'], activeProjects:4 },
];

export const YAPAY_MEDIA = [
  { id:'m1', url:'', type:'photo', projectId:'yp-001', caption:'Lobi merkez aranjman', featured:true },
  { id:'m2', url:'', type:'photo', projectId:'yp-001', caption:'Resepsiyon dekorasyonu', featured:false },
  { id:'m3', url:'', type:'photo', projectId:'yp-002', caption:'Deluxe oda dekorasyonu', featured:true },
  { id:'m4', url:'', type:'photo', projectId:'yp-007', caption:'Resort ana havuz alanı', featured:true },
  { id:'m5', url:'', type:'photo', projectId:'yp-006', caption:'Düğün salonu genel görünüm', featured:true },
  { id:'m6', url:'', type:'photo', projectId:'yp-011', caption:'Büyükelçilik resepsiyon', featured:false },
  { id:'m7', url:'', type:'photo', projectId:'yp-008', caption:'Kafe iç mekan', featured:false },
  { id:'m8', url:'', type:'photo', projectId:'yp-003', caption:'Restoran dekorasyon taslak', featured:false },
];

export const YAPAY_METRICS = {
  totalProjects: YAPAY_PROJECTS.length,
  completedProjects: YAPAY_PROJECTS.filter(p=>p.status==='completed').length,
  activeProjects: YAPAY_PROJECTS.filter(p=>['in-progress','installation'].includes(p.status)).length,
  totalRevenue: YAPAY_PROJECTS.filter(p=>p.status==='completed').reduce((s,p)=>s+p.budget,0),
  avgProjectValue: Math.round(YAPAY_PROJECTS.reduce((s,p)=>s+p.budget,0)/YAPAY_PROJECTS.length),
  clientSatisfaction: 4.8,
};

export const REFERENCE_COMPANIES = [
  { id:'r1', name:'Maslak Plaza AVM', sector:'Alışveriş Merkezi', logo:'🏪', projectCount:3, totalValue:485000, since:'2023', featured:true },
  { id:'r2', name:'The Nişantaşı Hotel', sector:'Otel & Konaklama', logo:'🏨', projectCount:2, totalValue:198000, since:'2024', featured:true },
  { id:'r3', name:'Grand Bosphorus Events', sector:'Etkinlik & Organizasyon', logo:'🎪', projectCount:4, totalValue:567000, since:'2022', featured:true },
  { id:'r4', name:'Antalya Luxury Resort', sector:'Turizm & Otel', logo:'🏖️', projectCount:1, totalValue:425000, since:'2025', featured:true },
  { id:'r5', name:'FinTech Holding A.Ş.', sector:'Finans & Teknoloji', logo:'🏦', projectCount:2, totalValue:234000, since:'2024', featured:false },
  { id:'r6', name:'Avrupa Konsolosluğu', sector:'Diplomatik', logo:'🏛️', projectCount:1, totalValue:187000, since:'2025', featured:true },
  { id:'r7', name:'Blue Waters Cafe', sector:'Restoran & Kafe', logo:'☕', projectCount:6, totalValue:142000, since:'2023', featured:false },
  { id:'r8', name:'Haute Couture Istanbul', sector:'Moda & Perakende', logo:'👗', projectCount:2, totalValue:112000, since:'2024', featured:false },
  { id:'r9', name:'Park Rezidans', sector:'Gayrimenkul', logo:'🏢', projectCount:3, totalValue:189000, since:'2023', featured:false },
  { id:'r10', name:'İzmir Fuar A.Ş.', sector:'Etkinlik & Fuar', logo:'🎡', projectCount:1, totalValue:54000, since:'2026', featured:false },
];

export const VIDEO_LIBRARY = [
  { id:'v1', title:'Maslak Plaza Lobi — Teslim Günü', duration:'2:34', type:'delivery', status:'published', projectId:'yp-001', views:1240, thumbnail:'' },
  { id:'v2', title:'Yapay Çiçek Nasıl Bakılır?', duration:'4:12', type:'educational', status:'published', projectId:'', views:8940, thumbnail:'' },
  { id:'v3', title:'Antalya Resort Kurulum Süreci', duration:'6:45', type:'timelapse', status:'published', projectId:'yp-007', views:3240, thumbnail:'' },
  { id:'v4', title:'Tasarım Konsept Sunumu — Bodrum Villa', duration:'8:20', type:'presentation', status:'draft', projectId:'yp-012', views:0, thumbnail:'' },
  { id:'v5', title:'Nişantaşı Otel — Before/After', duration:'3:18', type:'before-after', status:'published', projectId:'yp-002', views:2180, thumbnail:'' },
  { id:'v6', title:'Düğün Salonu Kurulum Timelapse', duration:'1:45', type:'timelapse', status:'published', projectId:'yp-006', views:4590, thumbnail:'' },
  { id:'v7', title:'Şirket Tanıtım Filmi 2026', duration:'3:00', type:'brand', status:'published', projectId:'', views:12400, thumbnail:'' },
  { id:'v8', title:'Müşteri Yorumları — Referanslar', duration:'5:30', type:'testimonial', status:'published', projectId:'', views:6780, thumbnail:'' },
];

export const THREE_SIXTY = [
  { id:'ts1', title:'Maslak Plaza Lobi 360°', projectId:'yp-001', status:'live', url:'', hotspots:3 },
  { id:'ts2', title:'Grand Bosphorus Düğün Salonu 360°', projectId:'yp-006', status:'live', url:'', hotspots:5 },
  { id:'ts3', title:'Antalya Resort Spa Alanı 360°', projectId:'yp-007', status:'live', url:'', hotspots:4 },
  { id:'ts4', title:'The Nişantaşı Deluxe Oda 360°', projectId:'yp-002', status:'live', url:'', hotspots:2 },
];

export const BEFORE_AFTER_PAIRS = [
  { id:'ba1', projectId:'yp-001', title:'Maslak Plaza Lobi', beforeEmoji:'😐', afterEmoji:'✨', beforeDesc:'Boş beton lobi', afterDesc:'Premium yapay çiçek dekorasyonu', likes:234 },
  { id:'ba2', projectId:'yp-002', title:'Otel Odası Dönüşümü', beforeEmoji:'🛏️', afterEmoji:'🌸', beforeDesc:'Standart otel odası', afterDesc:'Butik otel deneyimi', likes:187 },
  { id:'ba3', projectId:'yp-006', title:'Düğün Salonu', beforeEmoji:'🏚️', afterEmoji:'💒', beforeDesc:'Boş salon', afterDesc:'Görkemli düğün ortamı', likes:412 },
  { id:'ba4', projectId:'yp-007', title:'Resort Havuz Alanı', beforeEmoji:'🏊', afterEmoji:'🌴', beforeDesc:'Sıradan havuz kenarı', afterDesc:'Resort deneyimi', likes:298 },
  { id:'ba5', projectId:'yp-008', title:'Kafe İç Mekan', beforeEmoji:'☕', afterEmoji:'🌿', beforeDesc:'Sade kafe ortamı', afterDesc:'Butik kafe atmosferi', likes:156 },
];

export const QUOTE_REQUESTS = [
  { id:'q1', name:'Serkan Baş', company:'Metro Alışveriş', phone:'0532 111 22 33', type:'Alışveriş Merkezi', area:800, budget:'250.000-400.000 TL', message:'AVM ana girişi ve yürüyen merdiven alanları için dekorasyon teklifi.', status:'new' as const, date:'2026-06-14', source:'web' },
  { id:'q2', name:'Deniz Akar', company:'Blue Sky Hotels', phone:'0542 333 44 55', type:'Otel', area:450, budget:'150.000-200.000 TL', message:'50 odalı butik otel için mevsimlik dekorasyon paketi.', status:'contacted' as const, date:'2026-06-12', source:'whatsapp' },
  { id:'q3', name:'Mehmet Yıldız', company:'Özel', phone:'0553 555 66 77', type:'Konut', area:280, budget:'80.000-120.000 TL', message:'Yazlık villa için kalıcı yapay çiçek dekorasyonu.', status:'meeting' as const, date:'2026-06-10', source:'referral' },
  { id:'q4', name:'Canan Demir', company:'Lale Restoran Zinciri', phone:'0544 777 88 99', type:'Restoran', area:620, budget:'180.000-250.000 TL', message:'5 şubeli restoran zinciri için standart dekorasyon paketi.', status:'proposal' as const, date:'2026-06-08', source:'instagram' },
  { id:'q5', name:'Hasan Kaya', company:'Pegasus Ofis Park', phone:'0535 999 00 11', type:'Kurumsal Ofis', area:1200, budget:'400.000+', message:'Yeni ofis parkı tüm ortak alanları ve kat koridorları.', status:'won' as const, date:'2026-06-01', source:'web' },
  { id:'q6', name:'Zeynep Arslan', company:'Mavi Düğün Salonu', phone:'0546 222 33 44', type:'Düğün Salonu', area:680, budget:'200.000-300.000 TL', message:'Yeni açılan düğün salonu için komple dekorasyon.', status:'new' as const, date:'2026-06-15', source:'google' },
  { id:'q7', name:'Burak Şahin', company:'Trendyol Ofis', phone:'0537 444 55 66', type:'Kurumsal Ofis', area:2400, budget:'600.000+', message:'Yeni Trendyol HQ ofisi için kurumsal dekorasyon projesi.', status:'new' as const, date:'2026-06-16', source:'referral' },
];

export const DISCOVERY_REQUESTS = [
  { id:'d1', name:'Ayşe Mercan', type:'Otel Odaları', area:120, date:'2026-06-15', status:'new' as const, phone:'0532 100 20 30' },
  { id:'d2', name:'Can Aydın', type:'Kafe İç Mekan', area:80, date:'2026-06-14', status:'new' as const, phone:'0542 200 30 40' },
  { id:'d3', name:'Selin Koc', type:'Ev Dekorasyon', area:45, date:'2026-06-13', status:'contacted' as const, phone:'0553 300 40 50' },
  { id:'d4', name:'Orhan Taş', type:'Restoran', area:210, date:'2026-06-12', status:'meeting' as const, phone:'0544 400 50 60' },
];

export const BLOG_POSTS = [
  { id:'bp1', title:'Yapay Çiçeklerde 2026 Trendleri', status:'published', category:'Trendler', views:4820, seoScore:89, keywords:['yapay çiçek trend','dekorasyon 2026'], publishDate:'2026-06-01' },
  { id:'bp2', title:'Kurumsal Dekorasyonda Yapay Çiçek Avantajları', status:'published', category:'Kurumsal', views:3240, seoScore:92, keywords:['kurumsal dekorasyon','ofis bitkisi'], publishDate:'2026-05-15' },
  { id:'bp3', title:'Otel Lobisi Dekorasyon Rehberi', status:'published', category:'Otel', views:2180, seoScore:87, keywords:['otel lobisi','dekorasyon rehberi'], publishDate:'2026-05-01' },
  { id:'bp4', title:'Düğün Mekanı Dekorasyon İpuçları', status:'draft', category:'Düğün', views:0, seoScore:76, keywords:['düğün dekorasyon','gelin çiçeği'], publishDate:'2026-06-20' },
  { id:'bp5', title:'Restoran Atmosferi Yaratma Sanatı', status:'published', category:'Restoran', views:1840, seoScore:84, keywords:['restoran dekorasyon','atmosfer'], publishDate:'2026-04-15' },
  { id:'bp6', title:'Yapay Çiçek Bakım Rehberi', status:'published', category:'Bakım', views:6420, seoScore:95, keywords:['yapay çiçek bakım','temizleme'], publishDate:'2026-03-01' },
  { id:'bp7', title:'Villa Dekorasyonunda Doğal Görünüm', status:'draft', category:'Konut', views:0, seoScore:71, keywords:['villa dekorasyon','doğal görünüm'], publishDate:'2026-07-01' },
  { id:'bp8', title:'Ankara Kurumsal Dekorasyon Projeleri', status:'published', category:'Projeler', views:980, seoScore:88, keywords:['ankara dekorasyon','kurumsal ankara'], publishDate:'2026-04-01' },
];

export const YAPAY_ANALYTICS = {
  monthlyRevenue: 1240000,
  avgProjectValue: 182000,
  leadConversionRate: 34,
  projectDeliveryTime: 6.2,
  clientSatisfaction: 4.8,
  repeatClientRate: 67,
};

export const PROJECT_ANALYTICS = [
  { month:'Oca', revenue:820000, projects:4, leads:12 },
  { month:'Şub', revenue:940000, projects:5, leads:15 },
  { month:'Mar', revenue:1080000, projects:6, leads:18 },
  { month:'Nis', revenue:980000, projects:5, leads:14 },
  { month:'May', revenue:1140000, projects:7, leads:21 },
  { month:'Haz', revenue:1240000, projects:8, leads:24 },
];

export function updateProjectStatus(id: string, status: ProjectStatus): void {
  const p = YAPAY_PROJECTS.find(p => p.id === id);
  if (p) p.status = status;
}

export type { ProjectStatus, QuoteStatus };
