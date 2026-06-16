/* CICEKYOLLA — Yapay Çiçek & Dekorasyon Merkezi (Frontend)
   10 sections: Hero · Project Types · Before/After · Project Gallery
   Products · Videos · 360° · References · Quote Form · FAQ
   Full source: github.com/Cicekyolla/cicekyolla-os */
import { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp, Phone, Mail, MapPin, Play, ArrowRight } from 'lucide-react';
import { T } from './ui-kit';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../App';
import {
  YAPAY_PROJECTS, REFERENCE_COMPANIES, VIDEO_LIBRARY,
  THREE_SIXTY, BEFORE_AFTER_PAIRS, QUOTE_REQUESTS,
} from '../data/yapay-store';

const TEAL = { 600:'#0D9488', 700:'#0F766E', 50:'#F0FDFA', 100:'#CCFBF1', 400:'#2DD4BF' };
const P    = { purple:'#7C3AED' };
const AM   = { 600:'#D97706', 50:'#FFFBEB' };
const GR   = { 600:'#16A34A', 50:'#F0FDF4' };

const SLOGANS = [
  "Türkiye'nin En Prestijli Yapay Çiçek Merkezi",
  "Mevsim Boyu Tazelik — Sıfır Bakım",
  "AVM'den Ötel'e, Ofis'ten Rezidans'a Premium Dekorasyon",
  "Anahtar Teslim Çözümler — Garantiç"  ,
];

const PROJECT_TYPES = [
  { id:'corporate', emoji:'🏢', label:'Kurumsal Ofis', desc:'Genel müdürlük, açık ofis ve lobi dekorasyonları' },
  { id:'hotel',     emoji:'🏨', label:'Otel & Konaklama', desc:'5 yıldızlı otel lobi ve oda tasarımları' },
  { id:'restaurant',emoji:'🍽️', label:'Restoran & Kafe', desc:'Atmosfer ve ambiyans dekorasyonu' },
  { id:'wedding',   emoji:'💒', label:'Düğün Salonu', label2:'Görkemli organizasyon mekanları', desc:'Görkemli organizasyon mekanları' },
  { id:'residence', emoji:'🏠', label:'Konut & Rezidans', desc:'Villa ve rezidans özel alanları' },
  { id:'retail',    emoji:'🛝', label:'Perakende & Mağaza', desc:'Showroom ve vitrin tasarımları' },
  { id:'event',     emoji:'🎡', label:'Etkinlik & Fuar', desc:'Stand ve sahne dekorasyonları' },
  { id:'healthcare',emoji:'🏥', label:'Sağlık & Klinik', desc:'Hastane ve klinik mekan düzenlemeleri' },
];

const YAPAY_PRODUCTS_DATA = [
  { id:1, name:'Tropik Yapay Bitki Seti', emoji:'🌴', price:1240, badge:'Popüler', cat:'bitki' },
  { id:2, name:'Yapay Gül Duvarı (1m²)', emoji:'🌹', price:2800, badge:'Trend', cat:'duvar' },
  { id:3, name:'Premium Orkide Aranjmanı', emoji:'🌸', price:890, badge:'Florist', cat:'aranjman' },
  { id:4, name:'Bambu & Yeşil Kompozisyon', emoji:'🌿', price:1680, cat:'bitki' },
  { id:5, name:'Yapay Sarmaşık Duvar Perdesi', emoji:'🌿', price:3200, badge:'B2B', cat:'duvar' },
  { id:6, name:'Ofis Yesillik Paketi (10m²)', emoji:'🌱', price:4800, badge:'Kurumsal', cat:'paket' },
  { id:7, name:'Düğün Kompo Paketi', emoji:'💐', price:12000, badge:'Özel', cat:'paket' },
  { id:8, name:'Lale & Sümbül Aranjmanı', emoji:'🌷', price:760, cat:'aranjman' },
  { id:9, name:'Bonsai Premium Set', emoji:'🌳', price:2100, badge:'Yeni', cat:'bitki' },
];

const FAQ_DATA = [
  { q: 'Yapay çiçekler taze çiçeklere ne kadar benziyor?', a: 'Premium kalite ürünlerimiz, taze çiçeklerle neredeyse aynı görünüme sahiptir. Dokunulduğunda dahi ilk anda ayrt edilmez.' },
  { q: 'Ne kadar süre dayanabilir?', a: 'Doğru bakımla 5-10 yıl arasında tazeliklerini korurlar. Direkt güneş ışığından koruyun.' },
  { q: 'Büyük mekan projeleri için hizmet veriyor musunuz?', a: 'Evet! AVM, otel, rezidans gibi büyük ölçekli projelerde anahtar teslim hizmet sunuyoruz.' },
  { q: 'Garanti var mı?', a: '2 yıl imalat garantisi veriyoruz. Renk solması veya bozulmada ücretsiz değişim.' },
  { q: 'Kurulum dahil mi?', a: 'Evet, tüm büyük projelerde profesyonel kurulum dahildir. Biz gelip kurarız.' },
];

function HeroSection({ isMobile }: { isMobile: boolean }) {
  const [sloganIdx, setSloganIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => { setSloganIdx(i => (i+1) % SLOGANS.length); setFading(false); }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position:'relative', minHeight:isMobile?'auto':'100vh', background:'linear-gradient(150deg,#0a1a0a 0%,#0f3020 45%,#0D9488 100%)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Nav */}
      <div style={{ position:'relative', padding:isMobile?'16px':'20px 60px', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:5 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${TEAL[600]},${TEAL[700]})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🌿</div>
          <div style={{ fontSize:14, fontWeight:900, color:'#fff', letterSpacing:'0.04em' }}>CİCEKYOLLA</div>
        </div>
        {!isMobile && (
          <div style={{ display:'flex', gap:28 }}>
            {['Projeler','Ürünler','Referanslar','360°','Teklif Al'].map(l=>(
              <button key={l} style={{ color:'rgba(255,255,255,0.7)', background:'none', border:'none', fontSize:13.5, cursor:'pointer', fontWeight:500 }}>{l}</button>
            ))}
          </div>
        )}
        <button style={{ padding:'9px 20px', border:`1.5px solid ${TEAL[400]}`, borderRadius:99, background:'transparent', color:TEAL[400], fontSize:13, fontWeight:700, cursor:'pointer' }}>Teklif Al</button>
      </div>

      {/* Hero content */}
      <div style={{ flex:1, display:'flex', alignItems:'center', padding:isMobile?'32px 16px 40px':'40px 60px 60px', position:'relative', zIndex:5 }}>
        <div style={{ maxWidth:620 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(13,148,136,0.15)', border:`1px solid ${TEAL[600]}40`, borderRadius:99, padding:'6px 16px', marginBottom:20 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:TEAL[400], display:'inline-block' }}/>
            <span style={{ fontSize:12, fontWeight:700, color:TEAL[400], letterSpacing:'0.08em' }}>PREMIUM YAPAY ÇİÇEK MERKEZİ</span>
          </div>
          <div style={{ minHeight:isMobile?72:100, marginBottom:16 }}>
            <h1 style={{ fontSize:isMobile?32:54, fontWeight:900, color:'#fff', letterSpacing:'-0.04em', lineHeight:1.05, margin:0, opacity:fading?0:1, transform:fading?'translateY(-8px)':'none', transition:'opacity 0.28s,transform 0.28s' }}>
              {SLOGANS[sloganIdx]}
            </h1>
          </div>
          <p style={{ fontSize:isMobile?14:18, color:'rgba(255,255,255,0.72)', lineHeight:1.8, margin:'0 0 36px', maxWidth:560 }}>
            Kurumsal ofisten lüks otele, restorandan rezidansa — mevsim boyu taze görünen, bakım gerektirmeyen premium yapay çiçek çözümleri.
          </p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <button style={{ padding:'14px 28px', border:'none', borderRadius:12, background:`linear-gradient(135deg,${TEAL[600]},${TEAL[700]})`, color:'#fff', fontSize:15, fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', gap:8, boxShadow:`0 8px 28px ${TEAL[600]}50` }}>
              Proje Teklifi Al <ArrowRight style={{ width:16, height:16 }}/>
            </button>
            <button style={{ padding:'14px 24px', border:`1.5px solid rgba(255,255,255,0.2)`, borderRadius:12, background:'rgba(255,255,255,0.06)', color:'#fff', fontSize:15, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>
              <Play style={{ width:14, height:14 }}/> Proje Videoları
            </button>
          </div>
          <div style={{ display:'flex', gap:isMobile?20:40, marginTop:44, paddingTop:32, borderTop:'1px solid rgba(255,255,255,0.12)', flexWrap:'wrap' }}>
            {[{n:'12+',l:'Tamamlanan Proje'},{n:'50K+',l:'m² Kurulum Alanı'},{n:'98%',l:'Müşteri Memnuniyeti'},{n:'2 Yıl',l:'Garanti'}].map((s,i)=>(
              <div key={i}>
                <div style={{ fontSize:isMobile?22:28, fontWeight:900, color:'#fff', letterSpacing:'-0.03em' }}>{s.n}</div>
                <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.5)', marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live proof bar */}
      <div style={{ background:'rgba(255,255,255,0.06)', borderTop:'1px solid rgba(255,255,255,0.1)', padding:isMobile?'12px 16px':'14px 60px', display:'flex', gap:isMobile?16:40, overflowX:'auto', alignItems:'center', zIndex:5 }}>
        {['🔴 CANLI: Bosphorus Events — Yeni proje başladı','✓ Maslak Plaza teslim edildi • 5/5 puan','📊 12 proje aynı anda devam ediyor'].map((t,i)=>(
          <div key={i} style={{ fontSize:12, color:'rgba(255,255,255,0.65)', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:6 }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

function ProjectTypeNavigator({ activeType, setActiveType, isMobile }: { activeType:string; setActiveType:(t:string)=>void; isMobile:boolean }) {
  return (
    <section style={{ padding:isMobile?'40px 16px':'56px 60px', background:'#fff', borderBottom:`1px solid ${T.gray100}` }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <h2 style={{ fontSize:isMobile?24:34, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 8px' }}>Hangi Mekanınız Var?</h2>
        <p style={{ fontSize:14, color:T.gray400, margin:'0 0 28px' }}>Proje tipi seçin, size özel çözümlerı gösterelim</p>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)', gap:14 }}>
          {PROJECT_TYPES.map(pt=>(
            <button key={pt.id} onClick={()=>setActiveType(pt.id)} style={{ padding:'18px 16px', border:`2px solid ${activeType===pt.id?TEAL[600]:T.gray200}`, borderRadius:14, background:activeType===pt.id?TEAL[50]:'#fff', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{pt.emoji}</div>
              <div style={{ fontSize:13.5, fontWeight:800, color:activeType===pt.id?TEAL[600]:T.gray900, marginBottom:4 }}>{pt.label}</div>
              <div style={{ fontSize:11.5, color:T.gray400, lineHeight:1.4 }}>{pt.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterGallery({ isMobile }: { isMobile:boolean }) {
  return (
    <section id="oncesi-sonrasi" style={{ padding:isMobile?'48px 16px':'64px 60px', background:`linear-gradient(135deg,${TEAL[50]},#fff)` }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <h2 style={{ fontSize:isMobile?26:36, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 12px' }}>Öncesi ve Sonrası</h2>
        <p style={{ fontSize:14, color:T.gray400, margin:'0 0 28px' }}>Gerçek projelerimizden dönüşüm hikayeleri</p>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:24 }}>
          {BEFORE_AFTER_PAIRS.slice(0,4).map(pair=>{
            const [isAfter, setIsAfter] = useState(true);
            return (
              <div key={pair.id} style={{ background:'#fff', borderRadius:20, border:`1px solid ${T.gray200}`, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ height:isMobile?220:280, background:isAfter?`linear-gradient(135deg,${TEAL[50]},#f0fdf4)`:'linear-gradient(135deg,#F3F4F6,#E5E7EB)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', transition:'background 0.4s' }}>
                  <div style={{ fontSize:isMobile?56:72, marginBottom:10 }}>{isAfter ? pair.afterEmoji : pair.beforeEmoji}</div>
                  <div style={{ fontSize:14, fontWeight:800, color:isAfter?TEAL[700]:T.gray500 }}>{isAfter ? 'SONRASI ✨' : 'ÖNCESİ'}</div>
                </div>
                <div style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>{pair.title}</div>
                    <div style={{ fontSize:11.5, color:T.gray400, marginTop:2 }}>{isAfter?pair.afterDesc:pair.beforeDesc}</div>
                  </div>
                  <button onClick={()=>setIsAfter(a=>!a)} style={{ padding:'8px 16px', border:`1.5px solid ${TEAL[600]}`, borderRadius:9, background:isAfter?TEAL[600]:'#fff', color:isAfter?'#fff':TEAL[600], fontSize:12, fontWeight:700, cursor:'pointer' }}>
                    {isAfter?'Öncesi Gör':'Sonrası Gör'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QuoteForm({ isMobile }: { isMobile:boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:'', company:'', phone:'', email:'', type:'', area:'', budget:'', message:'' });

  function submit(e:React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="teklif" style={{ padding:isMobile?'48px 16px':'64px 60px', background:`linear-gradient(135deg,#0a1a0a,#0f3020)` }}>
      <div style={{ maxWidth:680, margin:'0 auto' }}>
        <h2 style={{ fontSize:isMobile?26:38, fontWeight:900, color:'#fff', letterSpacing:'-0.03em', margin:'0 0 8px', textAlign:'center' }}>Proje Teklifi Alın</h2>
        <p style={{ fontSize:14, color:'rgba(255,255,255,0.6)', margin:'0 0 32px', textAlign:'center' }}>48 saat içinde uzmanımız sizinle iletişime geçer</p>
        {submitted ? (
          <div style={{ background:`${TEAL[600]}20`, border:`2px solid ${TEAL[600]}`, borderRadius:20, padding:'40px', textAlign:'center' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
            <div style={{ fontSize:22, fontWeight:900, color:'#fff' }}>Talebiniz Alındı!</div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,0.7)', marginTop:8 }}>En kısa sürede sizinle iletişime geçeceğiz.</div>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:'32px 28px' }}>
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:16, marginBottom:16 }}>
              {[
                { key:'name', label:'Ad Soyad *', ph:'Ahmet Yılmaz' },
                { key:'company', label:'Şirket Adı', ph:'Firma A.Ş.' },
                { key:'phone', label:'Telefon *', ph:'0532 XXX XX XX' },
                { key:'email', label:'E-posta', ph:'ahmet@firma.com' },
              ].map(f=>(
                <div key={f.key}>
                  <label style={{ fontSize:11.5, fontWeight:700, color:'rgba(255,255,255,0.6)', display:'block', marginBottom:6 }}>{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e=>setForm(fm=>({...fm,[f.key]:e.target.value}))} placeholder={f.ph} style={{ width:'100%', height:42, padding:'0 14px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:9, color:'#fff', fontSize:13, outline:'none', boxSizing:'border-box' }}/>
                </div>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr 1fr', gap:16, marginBottom:16 }}>
              <div>
                <label style={{ fontSize:11.5, fontWeight:700, color:'rgba(255,255,255,0.6)', display:'block', marginBottom:6 }}>Proje Tipi *</label>
                <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} style={{ width:'100%', height:42, padding:'0 12px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:9, color:'#fff', fontSize:13, outline:'none', cursor:'pointer' }}>
                  <option value="">Seçin</option>
                  {PROJECT_TYPES.map(pt=><option key={pt.id} value={pt.id}>{pt.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:11.5, fontWeight:700, color:'rgba(255,255,255,0.6)', display:'block', marginBottom:6 }}>Alan (m²)</label>
                <input value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))} placeholder="250" style={{ width:'100%', height:42, padding:'0 14px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:9, color:'#fff', fontSize:13, outline:'none', boxSizing:'border-box' }}/>
              </div>
              <div>
                <label style={{ fontSize:11.5, fontWeight:700, color:'rgba(255,255,255,0.6)', display:'block', marginBottom:6 }}>Bütçe</label>
                <select value={form.budget} onChange={e=>setForm(f=>({...f,budget:e.target.value}))} style={{ width:'100%', height:42, padding:'0 12px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:9, color:'#fff', fontSize:13, outline:'none', cursor:'pointer' }}>
                  <option value="">Seçin</option>
                  {['50K-100K TL','100K-250K TL','250K-500K TL','500K+ TL'].map(b=><option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:11.5, fontWeight:700, color:'rgba(255,255,255,0.6)', display:'block', marginBottom:6 }}>Proje Açıklaması</label>
              <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Mekanınızı, beklentilerinizi ve varsa özel isteklerinizi kısaca anlatın..." rows={3} style={{ width:'100%', padding:'12px 14px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:9, color:'#fff', fontSize:13, outline:'none', resize:'none', boxSizing:'border-box', lineHeight:1.6 }}/>
            </div>
            <button type="submit" style={{ width:'100%', padding:'14px', border:'none', borderRadius:11, background:`linear-gradient(135deg,${TEAL[600]},${TEAL[700]})`, color:'#fff', fontSize:15, fontWeight:800, cursor:'pointer', boxShadow:`0 6px 20px ${TEAL[600]}50` }}>
              Teklif Talebini Gönder →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function FaqSection({ isMobile }: { isMobile:boolean }) {
  const [open, setOpen] = useState<number|null>(0);
  return (
    <section style={{ padding:isMobile?'48px 16px':'64px 60px', background:'#fff' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <h2 style={{ fontSize:isMobile?24:34, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 28px', textAlign:'center' }}>Sıkça Sorulan Sorular</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {FAQ_DATA.map((f,i)=>(
            <div key={i} style={{ background:T.gray50, borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{ width:'100%', padding:'18px 20px', border:'none', background:'transparent', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', textAlign:'left', gap:12 }}>
                <span style={{ fontSize:14.5, fontWeight:700, color:T.gray800 }}>{f.q}</span>
                {open===i ? <ChevronUp style={{ width:16, height:16, color:T.gray400, flexShrink:0 }}/> : <ChevronDown style={{ width:16, height:16, color:T.gray400, flexShrink:0 }}/>}
              </button>
              {open===i && <div style={{ padding:'0 20px 18px', fontSize:13.5, color:T.gray600, lineHeight:1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ScreenYapay() {
  const { isMobile, isTablet } = useResponsive();
  const [activeType, setActiveType] = useState('corporate');

  useEffect(() => {
    const schema = { "@context":"https://schema.org", "@type":"LocalBusiness", "name":"Cicekyolla Yapay Çiçek Merkezi" };
    const el = document.createElement('script'); el.type='application/ld+json'; el.id='yapay-schema';
    el.textContent = JSON.stringify(schema); document.head.appendChild(el);
    return () => { const old=document.getElementById('yapay-schema'); if(old) old.remove(); };
  }, []);

  const cols = isMobile ? 2 : isTablet ? 3 : 3;

  return (
    <div style={{ minHeight:'100%' }}>
      <HeroSection isMobile={isMobile}/>
      <ProjectTypeNavigator activeType={activeType} setActiveType={setActiveType} isMobile={isMobile}/>
      <BeforeAfterGallery isMobile={isMobile}/>

      {/* Products */}
      <section style={{ padding:isMobile?'48px 16px':'64px 60px', background:T.gray50 }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <h2 style={{ fontSize:isMobile?24:34, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 8px' }}>Premium Ürün Kataloğu</h2>
          <p style={{ fontSize:14, color:T.gray400, margin:'0 0 28px' }}>Mevsim boyu taze görünen, sıfır bakım gerektiren koleksiyonumuz</p>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:16 }}>
            {YAPAY_PRODUCTS_DATA.map(p=>(
              <div key={p.id} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.18s', cursor:'pointer' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.10)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)';}}>
                <div style={{ height:isMobile?120:140, background:`linear-gradient(135deg,${TEAL[50]},#fff)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?52:68, position:'relative' }}>
                  {p.emoji}
                  {p.badge && <div style={{ position:'absolute', top:10, left:10, fontSize:9.5, fontWeight:800, color:'#fff', background:TEAL[600], padding:'3px 8px', borderRadius:99 }}>{p.badge}</div>}
                </div>
                <div style={{ padding:'14px 16px' }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.gray900, marginBottom:8, lineHeight:1.3 }}>{p.name}</div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div style={{ fontSize:16, fontWeight:900, color:TEAL[600] }}>₺{p.price.toLocaleString('tr-TR')}</div>
                    <button style={{ padding:'7px 14px', border:'none', borderRadius:8, background:TEAL[600], color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' }}>Teklif Al</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References */}
      <section style={{ padding:isMobile?'48px 16px':'64px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <h2 style={{ fontSize:isMobile?24:34, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 28px', textAlign:'center' }}>Referanslarımız</h2>
          <div style={{ display:'flex', gap:isMobile?16:24, overflowX:'auto', paddingBottom:8 }}>
            {REFERENCE_COMPANIES.filter(r=>r.featured).map(r=>(
              <div key={r.id} style={{ flexShrink:0, background:T.gray50, borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px 24px', textAlign:'center', minWidth:160 }}>
                <div style={{ fontSize:36, marginBottom:8 }}>{r.logo}</div>
                <div style={{ fontSize:12.5, fontWeight:700, color:T.gray900 }}>{r.name}</div>
                <div style={{ fontSize:11, color:T.gray400, marginTop:4 }}>{r.projectCount} proje</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteForm isMobile={isMobile}/>
      <FaqSection isMobile={isMobile}/>
    </div>
  );
}
