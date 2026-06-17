/* CICEKYOLLA — Magaşa Ön Yüzü (Homepage) — PHASE 1 LOCKED
   17 Sections:
   Hero (100vh, floating category carousel) · Aynı Gün Teslimat
   Occasions · Best Sellers · WhatsApp CTA · Trust · Google Reviews
   Corporate · Premium Packaging · Artificial Flowers · Experience Hub
   Turkiye Kargo Banner · Instagram · FAQ · CTA · Footer
   Reads from: homepage-store.ts (hero content, sections config)
   Full source: github.com/Cicekyolla/cicekyolla-os */
import { useState, useEffect, useRef } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../App';
import { Star, ChevronDown, ChevronUp, Package, Truck, Shield, RefreshCw, MessageCircle, ArrowRight, Play } from 'lucide-react';
import { HERO_CONTENT, HOMEPAGE_SECTIONS, FEATURED_CATEGORIES } from '../data/homepage-store';

const P   = { purple:'#7C3AED', mid:'#8B5CF6', pale:'#EDE9FE', deep:'#1E1B4B', border:'#DDD6FE' };
const G   = { 50:'#F9FAFB', 100:'#F3F4F6', 200:'#E5E7EB', 400:'#9CA3AF', 500:'#6B7280', 700:'#374151', 800:'#1F2937', 900:'#111827' };
const GR  = { 50:'#F0FDF4', 100:'#DCFCE7', 200:'#BBF7D0', 600:'#16A34A', 700:'#15803D' };
const AM  = { 50:'#FFFBEB', 100:'#FEF3C7', 600:'#D97706', 700:'#B45309' };

const OCCASIONS = [
  { emoji:'🎂', label:'Doğum Günü',   accent:'#EF4444' },
  { emoji:'💝', label:'Sevgililer G.',  accent:'#EC4899' },
  { emoji:'💐', label:'Yıldönümü',    accent:'#8B5CF6' },
  { emoji:'👴', label:'Anneler G.',     accent:'#F97316' },
  { emoji:'🎓', label:'Mezuniyet',      accent:'#22C55E' },
  { emoji:'👏', label:'Tebrik',         accent:'#3B82F6' },
  { emoji:'🤝', label:'Kurumsal',       accent:'#6B7280' },
  { emoji:'🌿', label:'Geçmiş Olsun',  accent:'#14B8A6' },
];

const BEST_SELLERS = [
  { id:1, name:'51 Kırmızı Güller Buketi', price:1240, emoji:'🌹', rating:4.9, reviews:847, badge:'En Çok Satan', category:'Güller', sold:'2.140 adet' },
  { id:2, name:'Lux Orkide Aranjmanı', price:980, emoji:'🌸', rating:4.8, reviews:423, badge:'Uzun Ömürlü', category:'Orkideler', sold:'1.820 adet' },
  { id:3, name:'Premium Hediye Seti', price:1580, emoji:'🎁', rating:4.9, reviews:634, badge:'Çok Beğenilen', category:'Hediye Seti', sold:'1.240 adet' },
  { id:4, name:'Renkli Mevsim Buketi', price:680, emoji:'💐', rating:4.7, reviews:312, category:'Karışık', sold:'890 adet' },
  { id:5, name:'25 Beyaz Gül Buketi', price:840, emoji:'🤍', rating:4.8, reviews:287, category:'Güller', sold:'760 adet' },
  { id:6, name:'Tropik Meyve Sepeti', price:1180, emoji:'🌊', rating:4.6, reviews:198, badge:'Yeni', category:'Sepet', sold:'420 adet' },
];

const REVIEWS = [
  { name:'Selin K.',   city:'Kadıköy', rating:5, text:"Hayatımda aldığım en güzel buket! Sevgilime harika bir sürpriz oldu. Teslimat da\ mükemmeldi.", date:'14 Haz', avatar:'SK' },
  { name:'Ahmet Y.',   city:'Beşiktaş', rating:5, text:"Yıllardır kullanıyorum. Her seferinde aynı kalite ve güvenilirlik. Kesinlikle tavsiye ederim!", date:'12 Haz', avatar:'AY' },
  { name:'Fatma D.',   city:'Şişli',    rating:5, text:"Annem için gönderdim, çok mutlu oldu. Güller çok tazeydi, bir hafta dayandı. Harika hizmet!", date:'10 Haz', avatar:'FD' },
  { name:'Murat S.',   city:'Ataşehir', rating:5, text:"Kurumsal sipariş verdim, tam zamanında ve çok profesyonel paketleme ile geldi.", date:'8 Haz', avatar:'MS' },
  { name:'Zeynep A.',  city:'Bakırköy', rating:4, text:"Orkideler çok güzel. Biraz gecikmeli geldi ama kalitesi mükkemmeldi. Tekrar sipariş veririm.", date:'6 Haz', avatar:'ZA' },
  { name:'Can T.',     city:'Beyoğlu', rating:5, text:"Sürpriz teslimat yaptırdım, eşim çok şaşırdı. Paketleme ve sunum inanılmaz!", date:'4 Haz', avatar:'CT' },
];

const FAQ_DATA = [
  { q:'Aynı gün teslimat var mı?', a:'Evet! İstanbul içi 14:00\'a kadar verilen siparişler aynı gün 60-90 dakika içinde teslim edilir. Ekspres teslimat seçeneğimizle 45 dakika garantisi de sunuyoruz.' },
  { q:'Hangi ödeme yöntemlerini kabul ediyorsunuz?', a:'Kredi/banka kartı, havale/EFT, kapıda ödeme (nakit veya POS) kabul ediyoruz. Kredi kartında 12 taksit imkanı mevcuttur.' },
  { q:'Çiçekler taze olacak mı?', a:'Tüm çiçeklerimiz sipariş anında hazırlanır. Taze garanti sunuyoruz — memnun kalmazsanız ücretsiz yenileme veya tam iade yapıyorum.' },
  { q:'Türkiye geneline gönderim yapıyor musunuz?', a:'Evet! 81 ilin tamamına kargo hizmetimiz mevcuttur. Büyük şehirlerde 1-2, diğer illerde 3-5 iş gününde teslim edilir.' },
  { q:'Saat seçimi yapabilir miyim?', a:'İstanbul içi teslimat için sabah, öğlen, öğle sonrası, akam ve gece saatlerini seçebilirsiniz. Belirli saatte ekspres teslimat da mevcuttur.' },
  { q:'Kurumsal fatura alabilir miyim?', a:'Evet, sipariş sırasında kurumsal fatura seçeneğini işaretleyin. KDV dahil e-fatura anında e-posta ile iletilir.' },
];

const CORPORATE_BENEFITS = [
  { icon:'📊', title:'Toplu Fiyatlandırma', desc:'10+ siparişte %15 indirim' },
  { icon:'🤝', title:'Dedike Hesap Yöneticisi', desc:'7/24 özel destek hattı' },
  { icon:'🧲', title:'Logo Baskılı Kart', desc:'Kurumsal kimlik hizmetleri' },
  { icon:'🯧', title:'Aylık Faturalı Ödeme', desc:'Kurumsal ödeme çözümleri' },
];

const PACKAGING_FEATURES = [
  '✓ Luksus mat kaplama kutu',
  '✓ Florasan korumalı iç ambalaj',
  '✓ Kurgele ve saten fıyon',
  '✓ Kart ve mesaj zarfı',
  '✓ Tüm Türkiye\'ye uygun kargo kutusu',
];

const WHATSAPP_PHONE = '905xxxxxxxxx';

function HeroSection() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  const [slIdx, setSlIdx] = useState(0);
  const [fading, setFading] = useState(false);

  // Use headline from homepage-store (admin-configurable)
  const headlines = [
    HERO_CONTENT.headline,
    "Aynı Gün Teslimat — 81 İle Kargo",
    "50.000+ Mutlu Müşteri — 4.9 Google Puanı",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => { setSlIdx(i=>(i+1)%headlines.length); setFading(false); }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const px = isMobile ? '16px' : isTablet ? '32px' : '60px';
  const sectionPad = isMobile ? '36px 16px' : isTablet ? '48px 32px' : '64px 60px';

  return (
    <div style={{ position:'relative', minHeight:isMobile?'auto':'100vh', background:'linear-gradient(150deg,#0a1a0a 0%,#0f3020 45%,#065F46 100%)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* BG orbs */}
      {!isMobile&&(<><div style={{ position:'absolute', right:'10%', top:'20%', width:340, height:340, borderRadius:'50%', background:'rgba(22,163,74,0.06)', filter:'blur(80px)' }}/><div style={{ position:'absolute', left:'5%', bottom:'15%', width:240, height:240, borderRadius:'50%', background:'rgba(124,58,237,0.06)', filter:'blur(60px)' }}/></>)}

      {/* Nav */}
      <nav style={{ position:'relative', padding:`${isMobile?'16px':' 20px'} ${px}`, display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:5 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#16A34A,#15803D)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🌹</div>
          <div style={{ fontSize:14, fontWeight:900, color:'#fff', letterSpacing:'0.04em' }}>CİCEKYOLLA</div>
        </div>
        {!isMobile&&(
          <div style={{ display:'flex', gap:28 }}>
            {['Çiçekler','Orkideler','Hediyeler','Kargo','İletişim'].map(l=>(
              <button key={l} style={{ color:'rgba(255,255,255,0.65)', background:'none', border:'none', fontSize:13.5, cursor:'pointer', fontWeight:400, transition:'color 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#fff'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.65)'}
              >{l}</button>
            ))}
          </div>
        )}
        <button onClick={()=>navigate('sf-cart')} style={{ padding:'9px 20px', border:'1.5px solid rgba(22,163,74,0.5)', borderRadius:99, background:'rgba(22,163,74,0.1)', color:'#22C55E', fontSize:13, fontWeight:700, cursor:'pointer', backdropFilter:'blur(10px)' }}>
          Sipariş Ver
        </button>
      </nav>

      {/* Hero content */}
      <div style={{ flex:1, display:'flex', alignItems:'center', padding:`${isMobile?'24px 16px 32px':'20px'} ${isMobile?'16px':isTablet?'32px':'60px'}`, position:'relative', zIndex:5 }}>
        <div style={{ flex:1, maxWidth:620 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.25)', borderRadius:99, padding:'6px 16px', marginBottom:20 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E', animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:11, fontWeight:700, color:'#22C55E', letterSpacing:'0.1em' }}>4.9 GOOGLE ★ • 50.000+ MÜŞTERİ</span>
          </div>

          <div style={{ minHeight:isMobile?72:96, marginBottom:16 }}>
            <h1 style={{ fontSize:isMobile?34:isTablet?44:56, fontWeight:900, color:'#fff', letterSpacing:'-0.04em', lineHeight:1.1, margin:0, opacity:fading?0:1, transform:fading?'translateY(-6px)':'none', transition:'opacity 0.28s,transform 0.28s', maxWidth:isMobile?'100%':580 }}>
              {headlines[slIdx]}
            </h1>
          </div>

          <p style={{ fontSize:isMobile?15:18, color:'rgba(255,255,255,0.7)', lineHeight:1.7, margin:'0 0 28px', maxWidth:isMobile?'100%':480 }}>
            {HERO_CONTENT.subtitle}
          </p>

          {/* Category carousel (inside hero as white floating panel) */}
          <div style={{ background:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:20, padding:'24px', maxWidth:580, boxShadow:'0 32px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize:12, fontWeight:700, color:G[500], textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14 }}>Hemen Keşfedin</div>
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr 1fr':'1fr 1fr 1fr', gap:12, marginBottom:16 }}>
              {FEATURED_CATEGORIES.filter(c=>c.active).slice(0,6).map(cat=>(
                <button key={cat.id} onClick={()=>navigate('sf-category')} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'12px 8px', borderRadius:14, border:`1px solid ${cat.accent}20`, background:`${cat.bg}`, cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 20px ${cat.accent}25`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
                >
                  <div style={{ width:48, height:48, borderRadius:12, background:`${cat.accent}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>{cat.emoji}</div>
                  <span style={{ fontSize:11, fontWeight:600, color:cat.accent, textAlign:'center', lineHeight:1.3 }}>{cat.label}</span>
                </button>
              ))}
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={()=>navigate('sf-cart')} style={{ flex:1, padding:'12px', border:'none', borderRadius:12, background:`linear-gradient(135deg,#16A34A,#15803D)`, color:'#fff', fontSize:13.5, fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, boxShadow:'0 6px 20px rgba(22,163,74,0.4)' }}>
                {HERO_CONTENT.cta1Label} <ArrowRight style={{ width:14, height:14 }}/>
              </button>
              <a href={`https://wa.me/${WHATSAPP_PHONE}`} style={{ flex:1, padding:'12px', border:'none', borderRadius:12, background:'#25D366', color:'#fff', fontSize:13.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, textDecoration:'none' }}>
                📱 {HERO_CONTENT.cta2Label}
              </a>
            </div>
          </div>
        </div>

        {/* Right side product grid */}
        {!isMobile&&(
          <div style={{ width:380, flexShrink:0, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {BEST_SELLERS.slice(0,4).map(p=>(
              <div key={p.id} style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(10px)', borderRadius:16, border:'1px solid rgba(255,255,255,0.08)', padding:'16px', cursor:'pointer', transition:'all 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.10)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
              >
                <div style={{ fontSize:40, marginBottom:8, textAlign:'center' }}>{p.emoji}</div>
                <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.9)', lineHeight:1.3, marginBottom:4 }}>{p.name}</div>
                <div style={{ fontSize:14, fontWeight:900, color:'#22C55E' }}>₺{p.price.toLocaleString('tr-TR')}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trust strip */}
      <div style={{ background:'rgba(255,255,255,0.06)', borderTop:'1px solid rgba(255,255,255,0.1)', padding:`${isMobile?'12px 16px':'14px 60px'}`, display:'flex', gap:isMobile?16:40, alignItems:'center', position:'relative', zIndex:5, overflowX:'auto' }}>
        {[{icon:'🚚',val:isMobile?'60 dak':'60 Dak. Ekspres',label:'İstanbul'},{icon:'⭐',val:isMobile?'4.9/5':'4.9 / 5 Google',label:'Puan'},{icon:'🛡️',val:isMobile?'%100':'%100 Garanti',label:'Memnuniyet'},{icon:'🌹',val:isMobile?'50K+':'50.000+',label:'Mutlu Müşteri'}].map((t,i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', gap:7, flexShrink:0 }}>
            <span style={{ fontSize:isMobile?18:22 }}>{t.icon}</span>
            <div>
              <div style={{ fontSize:isMobile?13:15, fontWeight:800, color:'#fff' }}>{t.val}</div>
              {!isMobile&&<div style={{ fontSize:10.5, opacity:0.65, color:'#fff' }}>{t.label}</div>}
            </div>
            {i<3&&!isMobile&&<div style={{ width:1, height:32, background:'rgba(255,255,255,0.15)', marginLeft:16 }}/>}
          </div>
        ))}
      </div>

      {/* Category scroll on mobile */}
      <div style={{ background:'rgba(255,255,255,0.96)', borderRadius:isMobile?'0':'24px 24px 0 0', padding:`${isMobile?'24px 16px':'32px 60px 40px'}`, position:'relative', zIndex:10, boxShadow:'0 -12px 40px rgba(0,0,0,0.15)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div style={{ fontSize:isMobile?20:24, fontWeight:900, color:P.deep, letterSpacing:'-0.03em' }}>Tüm Çiçek Kategorileri</div>
          <button onClick={()=>navigate('sf-category')} style={{ fontSize:12, color:GR[600], background:GR[50], border:`1px solid ${GR[100]}`, borderRadius:99, padding:'5px 14px', cursor:'pointer', fontWeight:600 }}>Tümünü Gör</button>
        </div>
        <div style={{ display:'flex', gap:isMobile?14:20, overflowX:'auto', paddingBottom:4, scrollbarWidth:'none' }}>
          {FEATURED_CATEGORIES.filter(c=>c.active).map((cat,i)=>(
            <div key={i} onClick={()=>navigate('sf-category')} style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:9, cursor:'pointer', width:isMobile?76:96 }}
              onMouseEnter={e=>{ (e.currentTarget.firstChild as HTMLElement)?.style && ((e.currentTarget.firstChild as HTMLElement).style.transform='scale(1.08)'); }}
              onMouseLeave={e=>{ (e.currentTarget.firstChild as HTMLElement)?.style && ((e.currentTarget.firstChild as HTMLElement).style.transform='none'); }}
            >
              <div style={{ width:isMobile?64:80, height:isMobile?64:80, borderRadius:'50%', background:cat.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?28:34, border:`2px solid ${cat.accent}20`, transition:'all 0.22s', boxShadow:'0 4px 12px rgba(0,0,0,0.07)' }}>{cat.emoji}</div>
              <span style={{ fontSize:10.5, fontWeight:600, color:P.deep, textAlign:'center', lineHeight:1.3, maxWidth:80 }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, sub, center=false }: { title:string; sub?:string; center?:boolean }) {
  const { isMobile } = useResponsive();
  return (
    <div style={{ marginBottom:28, textAlign:center?'center':undefined }}>
      <h2 style={{ fontSize:isMobile?24:32, fontWeight:900, color:G[900], letterSpacing:'-0.03em', margin:'0 0 8px' }}>{title}</h2>
      {sub&&<p style={{ fontSize:16, color:G[500], lineHeight:1.7, margin:0, maxWidth:560, marginLeft:center?'auto':undefined, marginRight:center?'auto':undefined }}>{sub}</p>}
    </div>
  );
}

function BestSellersSection() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  const [added, setAdded] = useState<Set<number>>(new Set());
  const cols = isMobile?2:isTablet?3:3;
  return (
    <section style={{ padding:isMobile?'48px 16px':isTablet?'56px 32px':'56px 60px', background:'#fff' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28 }}>
          <SectionTitle title="En Çok Satanlar" sub="Haftanin en popüler bouketleri" />
          <button onClick={()=>navigate('sf-category')} style={{ fontSize:13, color:GR[600], background:GR[50], border:`1px solid ${GR[100]}`, borderRadius:99, padding:'8px 18px', cursor:'pointer', fontWeight:600, flexShrink:0 }}>Tümünü Gör →</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:isMobile?12:20 }}>
          {BEST_SELLERS.map(p=>(
            <div key={p.id} style={{ background:'#fff', borderRadius:20, border:`1px solid ${G[200]}`, overflow:'hidden', cursor:'pointer', transition:'all 0.2s', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.10)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; }}
              onClick={()=>navigate('sf-product')}
            >
              <div style={{ height:isMobile?140:180, background:`linear-gradient(135deg,${GR[50]},#fff)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?60:80, position:'relative' }}>
                {p.emoji}
                {p.badge&&<div style={{ position:'absolute', top:12, left:12, fontSize:11, fontWeight:800, color:'#fff', background:'linear-gradient(135deg,#D97706,#B45309)', padding:'3px 10px', borderRadius:99 }}>{p.badge}</div>}
              </div>
              <div style={{ padding:isMobile?'12px 14px':'16px 18px' }}>
                <div style={{ fontSize:isMobile?11:12, color:G[400], marginBottom:4 }}>{p.category}</div>
                <div style={{ fontSize:isMobile?13:14.5, fontWeight:800, color:G[900], marginBottom:6, lineHeight:1.3 }}>{p.name}</div>
                <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:8 }}>
                  <span style={{ fontSize:isMobile?11:12, color:'#FBBF24' }}>★ {p.rating}</span>
                  <span style={{ fontSize:isMobile?10:11, color:G[400] }}>({p.reviews})</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ fontSize:isMobile?16:20, fontWeight:900, color:GR[600] }}>₺{p.price.toLocaleString('tr-TR')}</div>
                  <button onClick={e=>{ e.stopPropagation(); setAdded(s=>new Set(s).add(p.id)); setTimeout(()=>setAdded(s=>{ const n=new Set(s); n.delete(p.id); return n; }),2000); }} style={{ padding:isMobile?'6px 12px':'8px 16px', border:'none', borderRadius:10, background:added.has(p.id)?GR[600]:`linear-gradient(135deg,#16A34A,#15803D)`, color:'#fff', fontSize:isMobile?11:12.5, fontWeight:700, cursor:'pointer', transition:'all 0.2s' }}>
                    {added.has(p.id)?'✓ Eklendi':'Sepete Ekle'}
                  </button>
                </div>
                <div style={{ fontSize:10.5, color:G[400], marginTop:6 }}>🔥 {p.sold}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OccasionsSection() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  return (
    <section style={{ padding:isMobile?'48px 16px':isTablet?'56px 32px':'56px 60px', background:`linear-gradient(135deg,${P.pale},#fff)` }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionTitle title="Özel Günler" sub="Her anın için mükemmel çiçekler" center/>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'repeat(4,1fr)':'repeat(8,1fr)', gap:isMobile?12:16 }}>
          {OCCASIONS.map((occ,i)=>(
            <button key={i} onClick={()=>navigate('sf-category')} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10, padding:'16px 8px', borderRadius:16, border:`1px solid rgba(0,0,0,0.06)`, background:'#fff', cursor:'pointer', transition:'all 0.2s', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 8px 20px ${occ.accent}30`; e.currentTarget.style.borderColor=occ.accent+'40'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor='rgba(0,0,0,0.06)'; }}
            >
              <div style={{ width:52, height:52, borderRadius:14, background:`${occ.accent}10`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{occ.emoji}</div>
              <span style={{ fontSize:10.5, fontWeight:600, color:G[700], textAlign:'center', lineHeight:1.3 }}>{occ.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppCTA() {
  const { isMobile } = useResponsive();
  return (
    <section style={{ background:'linear-gradient(135deg,#128C7E,#075E54)', padding:isMobile?'36px 16px':'48px 60px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', gap:24, alignItems:'center', flexWrap:isMobile?'wrap':'nowrap', justifyContent:'center' }}>
        <div style={{ textAlign:isMobile?'center':'left' }}>
          <div style={{ fontSize:isMobile?22:30, fontWeight:900, color:'#fff', letterSpacing:'-0.03em', marginBottom:8 }}>WhatsApp ile Sipariş Verin</div>
          <p style={{ fontSize:isMobile?14:16, color:'rgba(255,255,255,0.8)', margin:0 }}>Hattımız 7/24 aktif. Sipariş, soru, özel istek — hepsi burada.</p>
        </div>
        <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noopener noreferrer" style={{ padding:'14px 32px', borderRadius:14, background:'#25D366', color:'#fff', fontSize:16, fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', gap:10, textDecoration:'none', boxShadow:'0 8px 28px rgba(0,0,0,0.25)', flexShrink:0 }}>
          📱 WhatsApp'tan Yazın
        </a>
      </div>
    </section>
  );
}

function TrustSection() {
  const { isMobile } = useResponsive();
  return (
    <section style={{ padding:isMobile?'40px 16px':'56px 60px', background:G[50] }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)', gap:isMobile?16:24 }}>
          {[
            { icon:Package, label:'Aynı Gün Teslimat', desc:'İstanbul içi 14:00\'a kadar siparişlere', color:'#16A34A' },
            { icon:Shield, label:'Memnuniyet Garantisi', desc:'Taze olmayan ürün için tam iade', color:'#2563EB' },
            { icon:RefreshCw, label:'Taze Değilse Değişim', desc:'Ücretsiz yenileme veya iade', color:'#7C3AED' },
            { icon:Truck, label:'Sigortalı Teslimat', desc:'Tüm kargo gönderimlerinde', color:'#D97706' },
          ].map((t,i)=>(
            <div key={i} style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'20px', display:'flex', gap:14, alignItems:'flex-start', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ width:44, height:44, borderRadius:12, background:`${t.color}10`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <t.icon style={{ width:20, height:20, color:t.color }}/>
              </div>
              <div><div style={{ fontSize:13.5, fontWeight:800, color:G[900], marginBottom:4 }}>{t.label}</div><div style={{ fontSize:12, color:G[500], lineHeight:1.5 }}>{t.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const { isMobile, isTablet } = useResponsive();
  const cols = isMobile?1:isTablet?2:3;
  return (
    <section style={{ padding:isMobile?'48px 16px':isTablet?'56px 32px':'56px 60px', background:'#fff' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28 }}>
          <SectionTitle title="Müşteri Yorumları" sub="Gerçek müşterilerimizden gerçek deneyimler"/>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
            <Star style={{ width:18, height:18, color:'#FBBF24', fill:'#FBBF24' }}/>
            <span style={{ fontSize:16, fontWeight:900, color:G[900] }}>4.9/5</span>
            <span style={{ fontSize:13, color:G[400] }}>Google</span>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:16 }}>
          {REVIEWS.slice(0,isMobile?3:6).map((r,i)=>(
            <div key={i} style={{ background:G[50], borderRadius:16, border:`1px solid ${G[200]}`, padding:'20px', transition:'all 0.2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}
            >
              <div style={{ display:'flex', gap:4, marginBottom:10 }}>
                {[1,2,3,4,5].map(s=>(<Star key={s} style={{ width:14, height:14, color:s<=r.rating?'#FBBF24':'#E5E7EB', fill:s<=r.rating?'#FBBF24':'#E5E7EB' }}/>))}
              </div>
              <p style={{ fontSize:13.5, color:G[700], lineHeight:1.6, margin:'0 0 14px', fontStyle:'italic' }}Ин"“{r.text}”"</p>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#16A34A,#D97706)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'#fff' }}>{r.avatar}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:G[900] }}>{r.name}</div>
                  <div style={{ fontSize:11, color:G[400] }}>{r.city} • {r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CorporateSection() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  return (
    <section style={{ padding:isMobile?'48px 16px':isTablet?'56px 32px':'56px 60px', background:`linear-gradient(135deg,${P.pale},#fff)` }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?32:60, alignItems:'center' }}>
        <div>
          <SectionTitle title="Kurumsal Çiçek Çözümleri" sub="50'den fazla çalışanlı şirketlere özel fiyatlandırma"/>
          <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:24 }}>
            {CORPORATE_BENEFITS.map((b,i)=>(
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <span style={{ fontSize:22, flexShrink:0 }}>{b.icon}</span>
                <div><div style={{ fontSize:14, fontWeight:700, color:G[900], marginBottom:2 }}>{b.title}</div><div style={{ fontSize:12.5, color:G[500] }}>{b.desc}</div></div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button onClick={()=>navigate('sf-corporate')} style={{ padding:'12px 24px', border:'none', borderRadius:12, background:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:13.5, fontWeight:700, cursor:'pointer' }}>Teklif Al</button>
            <a href={`https://wa.me/${WHATSAPP_PHONE}`} style={{ padding:'12px 20px', border:`1.5px solid #25D366`, borderRadius:12, background:'#fff', color:'#25D366', fontSize:13, fontWeight:600, cursor:'pointer', textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>📱 WhatsApp</a>
          </div>
        </div>
        <div style={{ background:'#fff', borderRadius:24, border:`1px solid ${G[200]}`, padding:'28px', boxShadow:'0 8px 32px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize:14, fontWeight:800, color:G[900], marginBottom:16 }}>Kurumsal Müşterilerimiz</div>
          {['Garanti BBVA — Aylık 150+ buket','Turk Telekom — Kurumsal toplantılar','Sabanci Holding — Özel etkinlikler','Getir — Çalışan mutluluk programı'].map((c,i)=>(
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:i<3?`1px solid ${G[100]}`:'none' }}>
              <span style={{ fontSize:13, color:G[700] }}>{c}</span>
              <span style={{ fontSize:10, color:GR[600], background:GR[50], border:`1px solid ${GR[100]}`, borderRadius:99, padding:'2px 8px', fontWeight:700 }}>Aktif</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackagingSection() {
  const { isMobile, isTablet } = useResponsive();
  return (
    <section style={{ padding:isMobile?'48px 16px':isTablet?'56px 32px':'56px 60px', background:G[50] }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?32:60, alignItems:'center' }}>
        <div style={{ textAlign:isMobile?'center':'left' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📦</div>
          <SectionTitle title="Premium Ambalaj" sub="Her sipariş özel olarak paketlenir"/>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {PACKAGING_FEATURES.map((f,i)=>(
              <div key={i} style={{ fontSize:14, color:G[700], display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:16, color:GR[600] }}>✓</span> {f.replace('✓ ','')}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:'linear-gradient(135deg,#FFF7ED,#fff)', borderRadius:24, border:`2px solid ${AM[100]}`, padding:'28px', display:'flex', flexDirection:'column', gap:14 }}>
          {['Standart Ambalaj — Ücretsiz','Premium Kutu (+₺145)','Kurdeleli Özel Paket (+₺65)'].map((p,i)=>(
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', borderRadius:12, background:'#fff', border:`1px solid ${i===1?AM[600]+'40':G[200]}`, boxShadow:i===1?`0 0 0 2px ${AM[600]}20`:'none' }}>
              <span style={{ fontSize:13.5, fontWeight:i===1?700:500, color:i===1?AM[700]:G[700] }}>{p}</span>
              {i===1&&<span style={{ fontSize:10.5, fontWeight:800, color:'#fff', background:AM[600], borderRadius:99, padding:'3px 8px' }}>Trend</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtificialSection() {
  const { isMobile } = useResponsive();
  const { navigate } = useNav();
  return (
    <section style={{ padding:isMobile?'48px 16px':'56px 60px', background:'linear-gradient(135deg,#F0FDFA,#fff)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:48, alignItems:'center' }}>
        <div>
          <SectionTitle title="Yapay Çiçek & Dekorasyon" sub="Mevsim boyu tazelik — bakım gerektirmeyen premium dekorasyon"/>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {['🏨 Otel & Lobi','🏢 Kurumsal Ofis','🍽️ Restoran','💒 Düğün Salonu'].map(cat=>(
              <span key={cat} style={{ fontSize:12, color:'#0D9488', background:'#F0FDFA', border:'1px solid #CCFBF1', borderRadius:99, padding:'5px 12px', fontWeight:600 }}>{cat}</span>
            ))}
          </div>
          <button onClick={()=>navigate('yapay-store')} style={{ marginTop:20, padding:'12px 24px', border:'none', borderRadius:12, background:'linear-gradient(135deg,#0D9488,#0F766E)', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
            Koleksiyonu İncele <ArrowRight style={{ width:14, height:14 }}/>
          </button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {[{e:'🌳',n:'Tropik Bitki Seti',p:1240},{e:'🌹',n:'Yapay Gül Duvarı',p:2800},{e:'🌸',n:'Orkide Premium',p:890},{e:'🌿',n:'Bahce Çiçek Seti',p:1680}].map((p,i)=>(
            <div key={i} style={{ background:'#fff', borderRadius:14, border:'1px solid #CCFBF1', padding:'16px', textAlign:'center', cursor:'pointer', transition:'all 0.18s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(13,148,136,0.12)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
            >
              <div style={{ fontSize:40, marginBottom:8 }}>{p.e}</div>
              <div style={{ fontSize:12.5, fontWeight:700, color:G[900], marginBottom:4 }}>{p.n}</div>
              <div style={{ fontSize:14, fontWeight:900, color:'#0D9488' }}>₺{p.p.toLocaleString('tr-TR')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KargoBanner() {
  const { isMobile } = useResponsive();
  const { navigate } = useNav();
  return (
    <section style={{ padding:isMobile?'36px 16px':'48px 60px', background:'linear-gradient(135deg,#065F46,#0f3020)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', gap:isMobile?20:40, alignItems:'center', flexWrap:isMobile?'wrap':'nowrap', justifyContent:'center' }}>
        <div style={{ textAlign:isMobile?'center':'left' }}>
          <div style={{ fontSize:isMobile?20:28, fontWeight:900, color:'#fff', letterSpacing:'-0.03em', marginBottom:8 }}>Türkiye Geneline Çiçek Gönderin</div>
          <p style={{ fontSize:isMobile?13:15, color:'rgba(255,255,255,0.7)', margin:0 }}>81 ile kargo hizmeti • Sigortalı • SMS takip • 499 TL üzeri ücretsiz</p>
        </div>
        <button onClick={()=>navigate('kargo')} style={{ padding:'12px 28px', border:'none', borderRadius:12, background:'#22C55E', color:'#fff', fontSize:14, fontWeight:800, cursor:'pointer', flexShrink:0, boxShadow:'0 6px 20px rgba(34,197,94,0.4)' }}>Kargo Ürünleri →</button>
      </div>
    </section>
  );
}

function FAQSection() {
  const { isMobile } = useResponsive();
  const [open, setOpen] = useState<number|null>(0);
  return (
    <section style={{ padding:isMobile?'48px 16px':'64px 60px', background:'#fff' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <SectionTitle title="Sıkça Sorulan Sorular" center/>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {FAQ_DATA.map((f,i)=>(
            <div key={i} style={{ background:G[50], borderRadius:14, border:`1px solid ${G[200]}`, overflow:'hidden', transition:'all 0.2s' }}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{ width:'100%', padding:'18px 20px', border:'none', background:'transparent', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', textAlign:'left', gap:12 }}>
                <span style={{ fontSize:14.5, fontWeight:700, color:G[800] }}>{f.q}</span>
                {open===i?<ChevronUp style={{ width:16, height:16, color:G[400], flexShrink:0 }}/>:<ChevronDown style={{ width:16, height:16, color:G[400], flexShrink:0 }}/>}
              </button>
              {open===i&&<div style={{ padding:'0 20px 20px', fontSize:14, color:G[600], lineHeight:1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { isMobile } = useResponsive();
  const { navigate } = useNav();
  return (
    <section style={{ padding:isMobile?'48px 16px':'64px 60px', background:`linear-gradient(135deg,${P.deep},${P.purple})` }}>
      <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontSize:isMobile?28:42, fontWeight:900, color:'#fff', letterSpacing:'-0.04em', marginBottom:16 }}>Sevdiğinize Özel Birşey Gönderin</div>
        <p style={{ fontSize:isMobile?14:17, color:'rgba(255,255,255,0.75)', marginBottom:32 }}>Aynı gün teslimat, taze garanti, 50.000+ mutlu müşteri.</p>
        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={()=>navigate('sf-cart')} style={{ padding:'14px 32px', border:'none', borderRadius:14, background:'#fff', color:P.purple, fontSize:15, fontWeight:900, cursor:'pointer', boxShadow:'0 8px 28px rgba(0,0,0,0.2)' }}>Hemen Sipariş Ver</button>
          <a href={`https://wa.me/${WHATSAPP_PHONE}`} style={{ padding:'14px 24px', border:'2px solid rgba(255,255,255,0.3)', borderRadius:14, background:'rgba(255,255,255,0.1)', color:'#fff', fontSize:15, fontWeight:600, cursor:'pointer', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>📱 WhatsApp\'tan Yaz</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { isMobile } = useResponsive();
  const { navigate } = useNav();
  return (
    <footer style={{ background:G[900], padding:isMobile?'40px 16px 24px':'56px 60px 24px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'2fr 1fr 1fr 1fr', gap:isMobile?28:40, marginBottom:40 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}><div style={{ width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,#16A34A,#15803D)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🌹</div><span style={{ fontSize:15, fontWeight:900, color:'#fff', letterSpacing:'0.04em' }}>CİCEKYOLLA</span></div>
            <p style={{ fontSize:13, color:G[400], lineHeight:1.8, marginBottom:16 }}>Türkiye\'nin en ileri çiçek ticaret platformu. Aynı gün teslimat, sigortalı kargo, taze garanti.</p>
            <div style={{ display:'flex', gap:10 }}>
              {['iyzico','✅ SSL','🌟 4.9 Google'].map(b=>(<span key={b} style={{ fontSize:11, color:G[500], background:G[800], borderRadius:7, padding:'4px 8px' }}>{b}</span>))}
            </div>
          </div>
          {[
            { title:'Ürünler', items:[{l:'Çiçekler',s:'sf-category'},{l:'Orkideler',s:'sf-category'},{l:'Hediye Setleri',s:'sf-category'},{l:'Türkiye Kargo',s:'kargo'}] },
            { title:'Hizmetler', items:[{l:'Kurumsal',s:'sf-corporate'},{l:'Yapay Çiçek',s:'yapay-store'},{l:'Sipariş Takip',s:'sf-account'},{l:'Teslimat Bölgeleri',s:'sf-delivery'}] },
            { title:'Bilgi', items:[{l:'Hakkımızda',s:'sf-about'},{l:'İletişim',s:'sf-contact'},{l:'SSS',s:'sf-faq'},{l:'KVKK',s:'sf-kvkk'}] },
          ].map((col,ci)=>(
            <div key={ci}>
              <div style={{ fontSize:12, fontWeight:700, color:G[400], textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:14 }}>{col.title}</div>
              {col.items.map((item,ii)=>(
                <button key={ii} onClick={()=>navigate(item.s as any)} style={{ display:'block', width:'100%', textAlign:'left', fontSize:13, color:G[500], background:'none', border:'none', cursor:'pointer', marginBottom:8, transition:'color 0.15s', padding:0 }}
                  onMouseEnter={e=>e.currentTarget.style.color='#fff'}
                  onMouseLeave={e=>e.currentTarget.style.color=G[500]}
                >{item.l}</button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${G[800]}`, paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
          <span style={{ fontSize:12, color:G[600] }}>© 2026 Cicekyolla Çiçekçilik A.Ş. Tüm hakları saklıdır.</span>
          <span style={{ fontSize:12, color:G[600] }}>Türkiye\'nin #1 Çiçek Platformu</span>
        </div>
      </div>
    </footer>
  );
}

export function ScreenStorefront() {
  return (
    <div style={{ minHeight:'100%', fontFamily:"'Inter',system-ui,sans-serif" }}>
      <HeroSection/>
      <TrustSection/>
      <OccasionsSection/>
      <BestSellersSection/>
      <WhatsAppCTA/>
      <ReviewsSection/>
      <CorporateSection/>
      <PackagingSection/>
      <ArtificialSection/>
      <KargoBanner/>
      <FAQSection/>
      <FinalCTA/>
      <Footer/>
      {/* WhatsApp floating button */}
      <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noopener noreferrer" style={{ position:'fixed', bottom:24, right:24, zIndex:9000, width:56, height:56, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, boxShadow:'0 6px 20px rgba(37,211,102,0.5)', textDecoration:'none', transition:'transform 0.2s' }}
        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'}
        onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
      >
        📱
      </a>
    </div>
  );
}
