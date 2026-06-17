/* CICEKYOLLA — Türkiye Geneli Kargo Merkezi (Frontend)
   Hero · Badges · Product Grid · Best Sellers · Corporate · Advantages
   Delivery Calculator · Cargo Tracking · AlsoSent · FAQ · Reviews · CTA
   Full source: github.com/Cicekyolla/cicekyolla-os */
import { useState, useEffect } from 'react';
import { Search, Package, Truck, CheckCircle2, Star, Phone, ArrowRight, ChevronDown, ChevronUp, MapPin, Clock, Shield, Award, X } from 'lucide-react';
import { T } from './ui-kit';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../App';
import {
  KARGO_PRODUCTS, KARGO_FILTERS, KARGO_SLOGANS, KARGO_BADGES,
  PROVINCES, ALSO_SENT, type KargoProduct, type KargoFilter,
} from '../data/kargo-store';

const GR  = { 600:'#16A34A', 700:'#15803D', 50:'#F0FDF4', 100:'#DCFCE7', 200:'#BBF7D0' };
const AM  = { 600:'#D97706', 50:'#FFFBEB', 100:'#FEF3C7' };
const BL  = { 600:'#2563EB', 50:'#EFF6FF', 100:'#DBEAFE' };
const P   = { purple:'#7C3AED', pale:'#EDE9FE' };
const RD  = { 600:'#DC2626', 50:'#FEF2F2' };

const fmt  = (n: number) => n===0?'Ücretsiz':'₺'+n.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtN = (n: number) => '₺'+n.toLocaleString('tr-TR');

// Zone colors for delivery calculator
const ZC: Record<number, string> = { 1:GR[600], 2:BL[600], 3:AM[600] };

function getDeliveryDate(badge: KargoProduct['badge']): string {
  if (badge==='⚡ Aynı Gün') return 'Bugün teslim';
  if (badge==='🚚 1-2 Gün') return '1-2 iş günü';
  if (badge==='📦 3-5 Gün') return '3-5 iş günü';
  return '5-7 iş günü';
}

/* Hero Section */
function HeroSection() {
  const { isMobile } = useResponsive();
  const [sloganIdx, setSloganIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => { setSloganIdx(i=>(i+1)%KARGO_SLOGANS.length); setFading(false); }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ background:'linear-gradient(150deg,#0a2010 0%,#0f3020 50%,#16A34A 100%)', padding:isMobile?'48px 16px 56px':'72px 60px 80px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:-40, top:-40, width:280, height:280, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }}/>
      <div style={{ position:'absolute', right:80, bottom:-60, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.03)' }}/>
      <div style={{ maxWidth:1140, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(34,197,94,0.15)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:99, padding:'6px 16px', marginBottom:20 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E' }}/>
          <span style={{ fontSize:12, fontWeight:700, color:'#22C55E', letterSpacing:'0.08em' }}>TÜRKİYE GENI KARGO MERKEZİ</span>
        </div>
        <div style={{ minHeight:isMobile?80:100, marginBottom:16 }}>
          <h1 style={{ fontSize:isMobile?32:52, fontWeight:900, color:'#fff', letterSpacing:'-0.04em', lineHeight:1.1, margin:0, opacity:fading?0:1, transform:fading?'translateY(-6px)':'none', transition:'opacity 0.28s,transform 0.28s' }}>
            {KARGO_SLOGANS[sloganIdx]}
          </h1>
        </div>
        <p style={{ fontSize:isMobile?14:18, color:'rgba(255,255,255,0.72)', lineHeight:1.8, margin:'0 0 32px', maxWidth:560 }}>
          81 ile çiçek kargo hizmeti. Aynı gün bazı illere, 1-7 iş gününde Türkiye geneline sigortalı teslimat.
        </p>
        <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
          <button style={{ padding:'13px 26px', border:'none', borderRadius:12, background:`linear-gradient(135deg,${GR[600]},${GR[700]})`, color:'#fff', fontSize:14, fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', gap:7, boxShadow:'0 8px 28px rgba(22,163,74,0.45)' }}>
            Kargo Ürününü Seç <ArrowRight style={{ width:15, height:15 }}/>
          </button>
          <button style={{ padding:'13px 22px', border:'1.5px solid rgba(255,255,255,0.2)', borderRadius:12, background:'rgba(255,255,255,0.07)', color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer' }}>
            📞 0850 XXX XX XX
          </button>
        </div>
        <div style={{ display:'flex', gap:isMobile?16:32, marginTop:40, paddingTop:28, borderTop:'1px solid rgba(255,255,255,0.12)', flexWrap:'wrap' }}>
          {[{n:'81',l:'ile teslimat'},{n:'50K+',l:'gönderilen sipariş'},{n:'4.9/5',l:'Google puan'},{n:'%100',l:'sigortalı'}].map((s,i)=>(
            <div key={i}>
              <div style={{ fontSize:isMobile?22:28, fontWeight:900, color:'#fff', letterSpacing:'-0.03em' }}>{s.n}</div>
              <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.5)', marginTop:2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Badges Strip */
function BadgesStrip() {
  const { isMobile } = useResponsive();
  return (
    <div style={{ background:'#fff', borderBottom:`1px solid ${T.gray100}`, padding:isMobile?'12px 16px':'14px 60px' }}>
      <div style={{ maxWidth:1140, margin:'0 auto', display:'flex', gap:isMobile?14:32, overflowX:'auto', alignItems:'center' }}>
        {KARGO_BADGES.map((b,i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', gap:7, flexShrink:0 }}>
            <span style={{ fontSize:isMobile?16:18 }}>{b.emoji}</span>
            <div>
              <div style={{ fontSize:isMobile?12:13.5, fontWeight:800, color:T.gray900 }}>{b.val}</div>
              {!isMobile && <div style={{ fontSize:10.5, color:T.gray400 }}>{b.label}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Product Card */
function KargoProductCard({ p, onAdd }: { p:KargoProduct; onAdd:(price:number)=>void }) {
  const { isMobile } = useResponsive();
  const [wish, setWish] = useState(false);
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.18s', cursor:'pointer' }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.10)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; }}
    >
      <div style={{ height:isMobile?140:160, background:`linear-gradient(135deg,${GR[50]},#fff)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?60:78, position:'relative' }}>
        {p.emoji}
        {p.badge && (
          <div style={{ position:'absolute', top:10, left:10, fontSize:11, fontWeight:800, color:'#fff', background:p.badge==='⚡ Aynı Gün'?GR[600]:p.badge==='🚚 1-2 Gün'?BL[600]:AM[600], padding:'3px 10px', borderRadius:99 }}>
            {p.badge}
          </div>
        )}
        {p.bestSeller && (
          <div style={{ position:'absolute', top:10, right:10, fontSize:10, fontWeight:800, color:'#fff', background:'#D97706', padding:'3px 8px', borderRadius:99 }}>💥 Çok Satan</div>
        )}
        <button onClick={e=>{e.stopPropagation();setWish(w=>!w);}} style={{ position:'absolute', bottom:10, right:10, width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,0.92)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:14, color:wish?'#DC2626':'#9CA3AF' }}>{wish?'♥':'♡'}</span>
        </button>
      </div>
      <div style={{ padding:'14px 16px' }}>
        <div style={{ fontSize:14, fontWeight:800, color:T.gray900, marginBottom:4, lineHeight:1.3 }}>{p.name}</div>
        <div style={{ fontSize:12.5, color:T.gray400, marginBottom:8, lineHeight:1.4 }}>{p.shortDesc}</div>
        <div style={{ display:'flex', gap:5, marginBottom:10, flexWrap:'wrap' }}>
          {p.features.slice(0,2).map((f:string)=>(
            <span key={f} style={{ fontSize:10, color:GR[600], background:GR[50], border:`1px solid ${GR[100]}`, padding:'2px 7px', borderRadius:99 }}>{f}</span>
          ))}
        </div>
        <div style={{ display:'flex', gap:5, marginBottom:10, flexWrap:'wrap' }}>
          {p.regions.slice(0,2).map((r:string)=>(
            <span key={r} style={{ fontSize:10, color:T.gray500, background:T.gray100, padding:'2px 6px', borderRadius:99 }}>📍 {r}</span>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:4 }}>
          <div>
            {p.originalPrice && <div style={{ fontSize:11, color:T.gray300, textDecoration:'line-through' }}>{fmt(p.originalPrice)}</div>}
            <div style={{ fontSize:18, fontWeight:900, color:GR[600] }}>{fmt(p.price)}</div>
          </div>
          <button onClick={()=>onAdd(p.price)} style={{ padding:'8px 14px', border:'none', borderRadius:9, background:`linear-gradient(135deg,${GR[600]},${GR[700]})`, color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5, boxShadow:'0 4px 12px rgba(22,163,74,0.3)' }}>
            <Package style={{ width:13, height:13 }}/> Ekle
          </button>
        </div>
        {p.sold30d > 0 && <div style={{ fontSize:10.5, color:T.gray400, marginTop:8 }}>🔥 Son 30 günde {p.sold30d} adet satıldı</div>}
      </div>
    </div>
  );
}

/* Free Shipping Bar */
function FreeShippingBar({ total }: { total: number }) {
  const threshold = 499;
  const pct = Math.min(100, Math.round((total/threshold)*100));
  if (total >= threshold) return (
    <div style={{ background:GR[50], border:`1px solid ${GR[200]}`, borderRadius:10, padding:'10px 16px', display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
      <CheckCircle2 style={{ width:16, height:16, color:GR[600] }}/>
      <span style={{ fontSize:13, fontWeight:700, color:GR[700] }}>Ücretsiz kargo kazanıldı! 🎉</span>
    </div>
  );
  return (
    <div style={{ background:T.gray50, borderRadius:10, padding:'10px 16px', marginBottom:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
        <span style={{ fontSize:12, color:T.gray600 }}>Ücretsiz kargo için {fmtN(threshold-total)} daha ekle</span>
        <span style={{ fontSize:12, fontWeight:700, color:GR[600] }}>{pct}%</span>
      </div>
      <div style={{ height:5, borderRadius:99, background:T.gray200, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${GR[600]},${GR[700]})`, borderRadius:99, transition:'width 0.4s' }}/>
      </div>
    </div>
  );
}

/* Delivery Calculator */
function DeliveryCalculator() {
  const { isMobile } = useResponsive();
  const [province, setProvince] = useState('');
  const [result, setResult] = useState<typeof PROVINCES[0]|null>(null);

  function calculate() {
    const found = PROVINCES.find(p => p.name.toLowerCase() === province.toLowerCase());
    setResult(found || null);
  }

  const deliveryDate = (zone:number) => {
    const d = new Date();
    const days = zone===1?0:zone===2?1:zone===3?3:5;
    d.setDate(d.getDate()+days);
    return d.toLocaleDateString('tr-TR',{weekday:'long',day:'numeric',month:'long'});
  };

  return (
    <div style={{ background:'#fff', borderRadius:20, border:`1px solid ${T.gray200}`, padding:'24px 28px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize:16, fontWeight:800, color:T.gray900, marginBottom:4 }}>Teslimat Hesaplayıcı</div>
      <div style={{ fontSize:13, color:T.gray400, marginBottom:20 }}>81 ile teslimat süresi ve ücreti</div>
      <div style={{ display:'flex', gap:10, marginBottom:16 }}>
        <div style={{ position:'relative', flex:1 }}>
          <MapPin style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', width:14, height:14, color:T.gray400 }}/>
          <input
            value={province}
            onChange={e=>setProvince(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&calculate()}
            placeholder="İl adı girin (orn. Ankara)"
            style={{ width:'100%', height:46, padding:'0 14px 0 38px', border:`1.5px solid ${T.gray200}`, borderRadius:11, fontSize:13.5, outline:'none', boxSizing:'border-box', transition:'border 0.15s' }}
            onFocus={e=>e.target.style.borderColor=GR[600]}
            onBlur={e=>e.target.style.borderColor=T.gray200}
          />
        </div>
        <button onClick={calculate} style={{ padding:'0 20px', border:'none', borderRadius:11, background:`linear-gradient(135deg,${GR[600]},${GR[700]})`, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', flexShrink:0 }}>Hesapla</button>
      </div>
      {result && (
        <div style={{ background:GR[50], border:`1px solid ${GR[200]}`, borderRadius:12, padding:'16px 18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <div style={{ fontSize:15, fontWeight:900, color:GR[700] }}>📍 {result.name}</div>
            <span style={{ fontSize:12, fontWeight:700, color:'#fff', background:ZC[result.zone]||GR[600], padding:'3px 10px', borderRadius:99 }}>Bölge {result.zone}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:10 }}>
            {[
              { label:'Tahmini Teslim', value:deliveryDate(result.zone), sub:`${result.deliveryMin}-${result.deliveryMax} iş günü`, color:ZC[result.zone]||GR[600] },
              { label:'Ücretsiz Kargo İçin', value:`${fmt(result.freeAt)} ve üzeri`, sub:'sepet tutarinda', color:GR[700] },
            ].map((item,i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,0.8)', borderRadius:10, padding:'12px', textAlign:'center' }}>
                <div style={{ fontSize:10, color:T.gray500, marginBottom:4 }}>{item.label}</div>
                <div style={{ fontSize:13.5, fontWeight:800, color:item.color }}>{item.value}</div>
                <div style={{ fontSize:10, color:T.gray400, marginTop:2 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {province && !result && (
        <div style={{ textAlign:'center', padding:'14px', background:AM[50], borderRadius:10, color:AM[600], fontSize:13 }}>
          "{province}" bulunamadı. Lütfen il adını kontrol edin.
        </div>
      )}
    </div>
  );
}

/* Also Sent Section */
function AlsoSentSection({ onAdd }: { onAdd:(price:number)=>void }) {
  const { isMobile } = useResponsive();
  const combo = ALSO_SENT[0];
  const products = combo.alsoIds.map(id=>KARGO_PRODUCTS.find(p=>p.id===id)).filter(Boolean) as KargoProduct[];
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, padding:'24px', marginBottom:32 }}>
      <div style={{ fontSize:15, fontWeight:800, color:T.gray900, marginBottom:4 }}>Müşteriler Bunları da Gönderdi</div>
      <div style={{ fontSize:13, color:T.gray400, marginBottom:18 }}>Bu kategoriden sipariş verenlerin beğenдиği diğer ürünler</div>
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${isMobile?1:3},1fr)`, gap:14 }}>
        {products.map(p=>(
          <div key={p.id} style={{ display:'flex', gap:12, alignItems:'flex-start', background:GR[50], border:`1px solid ${GR[100]}`, borderRadius:12, padding:'14px' }}>
            <div style={{ width:56, height:56, borderRadius:10, background:'#fff', border:`1px solid ${GR[100]}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, flexShrink:0 }}>{p.emoji}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:T.gray800, lineHeight:1.3, marginBottom:4 }}>{p.name}</div>
              <div style={{ fontSize:13, fontWeight:900, color:GR[700], marginBottom:6 }}>{fmt(p.price)}</div>
              <button onClick={()=>onAdd(p.price)} style={{ padding:'5px 12px', border:'none', borderRadius:7, background:GR[600], color:'#fff', fontSize:11.5, fontWeight:700, cursor:'pointer' }}>+ Ekle</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Cargo Tracking */
function CargoTracking() {
  const [code, setCode] = useState('');
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ background:'#fff', borderRadius:20, border:`1px solid ${T.gray200}`, padding:'24px 28px', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize:16, fontWeight:800, color:T.gray900, marginBottom:4 }}>Kargo Takip</div>
      <div style={{ fontSize:13, color:T.gray400, marginBottom:20 }}>Sipariş numarası veya kargo takip kodu</div>
      <div style={{ display:'flex', gap:10, marginBottom:16 }}>
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="CK2026XXXXXXX" style={{ flex:1, height:46, padding:'0 14px', border:`1.5px solid ${T.gray200}`, borderRadius:11, fontSize:13, outline:'none', transition:'border 0.15s' }}
          onFocus={e=>e.target.style.borderColor=GR[600]} onBlur={e=>e.target.style.borderColor=T.gray200}
        />
        <button onClick={()=>setChecked(true)} style={{ padding:'0 18px', border:'none', borderRadius:11, background:BL[600], color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' }}>Sorgula</button>
      </div>
      {checked && code && (
        <div style={{ background:GR[50], border:`1px solid ${GR[200]}`, borderRadius:12, padding:'16px' }}>
          <div style={{ fontSize:13, fontWeight:700, color:GR[700], marginBottom:12 }}>Sipariş: {code}</div>
          {[{s:'✅ Sipariş Alındı',d:'14 Haz 10:24'},{s:'🌹 Florist Hazırlandı',d:'14 Haz 11:45'},{s:'🚚 Kargoya Verildi',d:'14 Haz 13:00'},{s:'📦 Depoda',d:'15 Haz 08:00'}].map((s,i)=>(
            <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:i===3?BL[600]:GR[600], flexShrink:0, marginTop:6 }}/>
              <div>
                <div style={{ fontSize:12.5, fontWeight:600, color:T.gray800 }}>{s.s}</div>
                <div style={{ fontSize:11, color:T.gray400 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function KargoGuaranteeBox() {
  return (
    <div style={{ background:`linear-gradient(135deg,${GR[50]},#fff)`, border:`2px solid ${GR[200]}`, borderRadius:14, padding:'16px 20px', marginBottom:16 }}>
      <div style={{ fontSize:13, fontWeight:800, color:GR[700], marginBottom:8 }}>🚚 Kargo Garantisi</div>
      {['✅ Sigortalı gönderim','✅ Takip numarası','✅ Gecikmede tam iade','✅ Çereli (kırılmaz ambalaj)'].map((f,i)=>(
        <div key={i} style={{ fontSize:12, color:GR[600], marginBottom:3 }}>{f}</div>
      ))}
    </div>
  );
}

export function ScreenKargo() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  const [activeFilter, setActiveFilter] = useState<KargoFilter>('all');
  const [sort, setSort] = useState<'popular'|'price-asc'|'price-desc'>('popular');
  const [basketTotal, setBasketTotal] = useState(0);
  const [showBasket, setShowBasket] = useState(false);
  const [openFaq, setOpenFaq] = useState<number|null>(0);
  const [search, setSearch] = useState('');

  const active = KARGO_PRODUCTS.filter(p => p.active);

  let filtered = activeFilter==='all' ? active : active.filter(p => p.category===activeFilter);
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (sort==='price-asc') filtered = [...filtered].sort((a,b)=>a.price-b.price);
  if (sort==='price-desc') filtered = [...filtered].sort((a,b)=>b.price-a.price);
  if (sort==='popular') filtered = [...filtered].sort((a,b)=>b.sold30d-a.sold30d);

  const bestSellers = [...active].sort((a,b)=>b.sold24h-a.sold24h).slice(0,isMobile?4:6);

  function addToBasket(price: number) {
    setBasketTotal(t=>t+price);
    setShowBasket(true);
  }

  const ADVANTAGES = [
    { emoji:'🛡️', title:'Sigortalı Gönderim', desc:'Tüm kargo gönderimleriniz sigortalıdır' },
    { emoji:'📦', title:'Profesyonel Ambalaj', desc:'Kırılmaz özel çiçek ambalajı' },
    { emoji:'📱', title:'SMS Takip', desc:'Her aşamada SMS ile bilgilendirme' },
    { emoji:'☕', title:'Taze Garanti', desc:'Taze olmayan ürün için tam iade' },
    { emoji:'⚡', title:'Hızlı Hazırlık', desc:'15:00\'a kadar aynı gün kargoya verilir' },
    { emoji:'🌹', title:'Premium Çiçek', desc:'Her sipariş için taze günlük hazırlık' },
    { emoji:'🌍', title:'Türkiye\'nin Her Yerine', desc:'81 ilin tamamına kargo hizmeti' },
    { emoji:'💳', title:'Güvenli Ödeme', desc:'SSL ve iyzico ile güvenli ödeme' },
  ];

  const FAQ_DATA = [
    { q:"Kargo ürünleri Türkiye'nin her yerine gönderilebilir mi?", a:"Evet! Türkiye geneli 81 ilin tamamına kargo hizmetimiz mevcuttur. Kargo süreleri bölgeye göre 1-7 iş günü arasında değişmektedir." },
    { q:"Kargo ürünlerim ne zaman gönderilir?", a:"Hafta içi 15:00'a kadar verilen siparişler aynı gün kargoya verilmektedir. 15:00 sonrası siparişler ertesi gün kargoya verilir." },
    { q:"Kargo ürünleri hasar görürse ne olur?", a:"Tüm kargo gönderimlerimiz sigortalıdır. Hasar durumunda tam iade garantisi sunuyoruz." },
    { q:"Aynı siparişte hem kargo hem İstanbul içi ürün alabilir miyim?", a:"Evet! Sepetinize hem İstanbul içi teslimat hem de kargo ürünlerini ekleyebilirsiniz." },
    { q:"Kargo ücreti ne kadar?", a:"499 TL ve üzeri siparişlerde kargo ücretsizdir. Altındaki siparişlerde bölgeye göre kargo ücreti hesaplanır." },
    { q:"Kurumsal fatura alabilir miyim?", a:"Evet, sipariş sırasında kurumsal fatura seçeneğini işaretleyin. KDV dahil e-fatura gönderilir." },
    { q:"Gece teslimat var mı?", a:"Kargo gönderimlerinde gece teslimatı bulunmamaktadır. Teslimatlar yetkili kargo şirketleri tarafından mesai saatlerinde yapılır." },
    { q:"Teslimat saatini seçebilir miyim?", a:"Kargo gönderimlerinde belirli saat seçimi yapılamamaktadır. Kargo şirketi size önce aramadan teslimat yapacaktır." },
    { q:"Siparişimi takip edebilir miyim?", a:"Evet! Kargoya verilen her sipariş için size takip numarası SMS ile iletilir." },
  ];

  return (
    <div style={{ minHeight:'100%', background:T.gray50, fontFamily:"'Inter',system-ui,sans-serif" }}>
      <HeroSection/>
      <BadgesStrip/>

      {/* Main content */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:isMobile?'16px':isTablet?'24px 24px':'32px 32px' }}>
        {/* Search & Filter */}
        <div style={{ display:'flex', gap:12, marginBottom:24, flexWrap:isMobile?'wrap':'nowrap' }}>
          <div style={{ position:'relative', flex:1 }}>
            <Search style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', width:14, height:14, color:T.gray400 }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ürün veya özellik ara..." style={{ width:'100%', height:42, padding:'0 14px 0 36px', border:`1.5px solid ${T.gray200}`, borderRadius:11, fontSize:13.5, outline:'none', boxSizing:'border-box', transition:'border 0.15s', background:'#fff' }}
              onFocus={e=>e.target.style.borderColor=GR[600]} onBlur={e=>e.target.style.borderColor=T.gray200}
            />
          </div>
          <div style={{ display:'flex', gap:4, overflowX:'auto', paddingBottom:2 }}>
            {KARGO_FILTERS.map(f=>(
              <button key={f.id} onClick={()=>setActiveFilter(f.id)} style={{ padding:'8px 14px', border:`1px solid ${activeFilter===f.id?GR[600]:T.gray200}`, borderRadius:99, background:activeFilter===f.id?GR[50]:'#fff', fontSize:12.5, fontWeight:activeFilter===f.id?700:400, color:activeFilter===f.id?GR[600]:T.gray500, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, transition:'all 0.15s' }}>
                {f.emoji} {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Best sellers */}
        <div style={{ marginBottom:40 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <div>
              <div style={{ fontSize:isMobile?20:26, fontWeight:900, color:T.gray900 }}>En Çok Satan Kargo Ürünleri</div>
              <div style={{ fontSize:13, color:T.gray400, marginTop:4 }}>Bu hafta Türkiye\'den en çok sipariş edilen ürünler</div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${isMobile?1:isTablet?2:3},1fr)`, gap:isMobile?14:20 }}>
            {bestSellers.map((p,i)=>(
              <div key={p.id} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, padding:'18px 20px', display:'flex', gap:14, alignItems:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize:isMobile?14:16, fontWeight:900, color:i===0?'#D97706':i===1?T.gray400:i===2?'#92400E':T.gray300, flexShrink:0, width:24, textAlign:'center' }}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${i+1}`}</div>
                <div style={{ width:72, height:72, borderRadius:14, background:GR[50], display:'flex', alignItems:'center', justifyContent:'center', fontSize:40, flexShrink:0 }}>{p.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13.5, fontWeight:800, color:T.gray900, lineHeight:1.3, marginBottom:4 }}>{p.name}</div>
                  <div style={{ fontSize:15, fontWeight:900, color:GR[600], marginBottom:4 }}>{fmt(p.price)}</div>
                  <div style={{ fontSize:11, color:T.gray400 }}>{p.sold24h} adet • son 24 saat</div>
                </div>
                <button onClick={()=>addToBasket(p.price)} style={{ padding:'8px 14px', border:'none', borderRadius:9, background:`linear-gradient(135deg,${GR[600]},${GR[700]})`, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', flexShrink:0 }}>Sipariş</button>
              </div>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${isMobile?2:isTablet?3:4},1fr)`, gap:isMobile?12:18, marginBottom:40 }}>
          {filtered.map(p=><KargoProductCard key={p.id} p={p} onAdd={addToBasket}/>)}
        </div>

        {/* Also sent + calculator */}
        <AlsoSentSection onAdd={addToBasket}/>

        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:24, marginBottom:40 }}>
          <DeliveryCalculator/>
          <div style={{ background:'#fff', borderRadius:20, border:`1px solid ${T.gray200}`, padding:'24px' }}>
            <div style={{ fontSize:16, fontWeight:800, color:T.gray900, marginBottom:4 }}>Nasıl Çalışır?</div>
            <div style={{ fontSize:13, color:T.gray400, marginBottom:20 }}>5 adımda kapınıza çiçek</div>
            {[{emoji:'🛒',title:'Sipariş Verin',body:'Kargo ürününü seçin, ödeme yapın.'},{emoji:'🌿',title:'Hazırlanır',body:'Floristler özel ambalajla hazırlar.'},{emoji:'📦',title:'Kargoya Verilir',body:"15:00'e kadar aynı gün kargoya."},{emoji:'🚚',title:'Yola Çıkar',body:'Bölgenize göre 1-5 iş gününde.'},{emoji:'🎁',title:'Teslim Edilir',body:'Adresinize güvenle, sigortalı.'}].map((step,i)=>(
              <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:i<4?14:0, paddingBottom:i<4?14:0, borderBottom:i<4?`1px solid ${T.gray100}`:'none' }}>
                <div style={{ position:'relative', flexShrink:0 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:GR[50], border:`2px solid ${GR[200]}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{step.emoji}</div>
                  {i < 4 && <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', top:'100%', width:2, height:14, background:GR[100] }}/>}
                </div>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:700, color:T.gray900, marginBottom:2 }}>{step.title}</div>
                  <div style={{ fontSize:12.5, color:T.gray400 }}>{step.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages */}
        <div style={{ background:`linear-gradient(135deg,#F0FDF4,#fff)`, border:`2px solid ${GR[200]}`, borderRadius:20, padding:isMobile?'24px 16px':'36px 40px', marginBottom:48 }}>
          <div style={{ fontSize:isMobile?20:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.02em', marginBottom:8 }}>Neden Cicekyolla Kargo?</div>
          <div style={{ fontSize:14, color:T.gray400, marginBottom:24 }}>Türkiye geneli çiçek kargosunda 8 farkımız</div>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:isMobile?14:20 }}>
            {ADVANTAGES.map((item,i)=>(
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:40, height:40, borderRadius:11, background:GR[50], border:`1px solid ${GR[100]}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{item.emoji}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:800, color:T.gray900, marginBottom:3 }}>{item.title}</div>
                  <div style={{ fontSize:11.5, color:T.gray400, lineHeight:1.4 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:isMobile?22:30, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 24px', textAlign:'center' }}>Sıkça Sorulan Sorular</div>
          <div style={{ maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:10 }}>
            {FAQ_DATA.map((f,i)=>(
              <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:'100%', padding:'16px 20px', border:'none', background:'transparent', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', textAlign:'left', gap:12 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:T.gray800 }}>{f.q}</span>
                  {openFaq===i ? <ChevronUp style={{ width:16, height:16, color:T.gray400, flexShrink:0 }}/> : <ChevronDown style={{ width:16, height:16, color:T.gray400, flexShrink:0 }}/>}
                </button>
                {openFaq===i && <div style={{ padding:'0 20px 18px', fontSize:13.5, color:T.gray600, lineHeight:1.7, borderTop:`1px solid ${T.gray100}`, paddingTop:14 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background:`linear-gradient(135deg,${GR[600]},${GR[700]})`, borderRadius:24, padding:isMobile?'32px 20px':'48px 60px', textAlign:'center', marginBottom:48 }}>
          <div style={{ fontSize:isMobile?26:38, fontWeight:900, color:'#fff', letterSpacing:'-0.03em', marginBottom:12 }}>Türkiye\'nin Her Yerine Çiçek Gönderin</div>
          <p style={{ fontSize:isMobile?14:17, color:'rgba(255,255,255,0.8)', marginBottom:28, maxWidth:480, margin:'0 auto 28px' }}>81 il, sigortalı, takip numarası ile kargo hizmeti. Hemen sipariş verin.</p>
          <button onClick={()=>navigate('sf-cart')} style={{ padding:'14px 32px', border:'none', borderRadius:12, background:'#fff', color:GR[700], fontSize:15, fontWeight:900, cursor:'pointer', boxShadow:'0 8px 28px rgba(0,0,0,0.2)' }}>Hemen Sipariş Ver →</button>
        </div>

        {/* Cargo tracking inline */}
        <div style={{ maxWidth:540, margin:'0 auto 48px' }}>
          <CargoTracking/>
        </div>
      </div>

      {/* Floating basket */}
      {showBasket && basketTotal > 0 && (
        <div style={{ position:'fixed', bottom:24, right:24, zIndex:9000, background:`linear-gradient(135deg,${GR[600]},${GR[700]})`, borderRadius:16, padding:'14px 20px', boxShadow:'0 8px 28px rgba(22,163,74,0.45)', display:'flex', gap:12, alignItems:'center', cursor:'pointer', maxWidth:320 }} onClick={()=>navigate('sf-cart')}>
          <Package style={{ width:22, height:22, color:'#fff', flexShrink:0 }}/>
          <div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.8)' }}>Kargo Sepeti</div>
            <div style={{ fontSize:18, fontWeight:900, color:'#fff' }}>{fmtN(basketTotal)}</div>
          </div>
          <button onClick={e=>{e.stopPropagation();setShowBasket(false);}} style={{ width:22, height:22, borderRadius:'50%', background:'rgba(255,255,255,0.2)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', marginLeft:'auto' }}><X style={{ width:12, height:12, color:'#fff' }}/></button>
        </div>
      )}

      {/* WhatsApp */}
      <a href="https://wa.me/905xxxxxxxxx" target="_blank" rel="noopener noreferrer" style={{ position:'fixed', bottom:24, left:24, zIndex:9000, width:52, height:52, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, boxShadow:'0 4px 16px rgba(37,211,102,0.5)', textDecoration:'none' }}>
        📱
      </a>
    </div>
  );
}
