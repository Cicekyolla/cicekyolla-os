// CICEKYOLLA OS — Experience Hub (11 Luxury Verticals)
// Full 35KB source: github.com/Cicekyolla/cicekyolla-os
import { useState, useEffect } from 'react';
import { ShoppingBag, Star, Truck, Check, Heart, ArrowRight, ChevronRight } from 'lucide-react';
import { T } from './ui-kit';
import { useNav } from '../App';
import { useResponsive } from '../hooks/useResponsive';
import { EXPERIENCE_VERTICALS, getVerticalById } from '../data/experience-store';
import { UPSELL_CATALOG } from '../data/revenue-store';

const VERTICAL_ROUTES: Record<string, string> = {
  flowers:    'exp-flowers',   orchids:   'exp-orchids',
  gifts:      'exp-gifts',     corporate: 'exp-corporate',
  wedding:    'exp-wedding',   artificial:'exp-artificial',
  hotel:      'exp-hotel',     cafe:      'exp-cafe',
  restaurant: 'exp-restaurant',office:    'exp-office',
  projects:   'exp-projects',
};

function ExperienceNav({ activeId }: { activeId: string }) {
  const { navigate } = useNav();
  const { isMobile } = useResponsive();
  return (
    <div style={{ background:'#fff', borderBottom:`1px solid ${T.gray100}`, padding:`10px ${isMobile?'16px':'28px'}`, overflowX:'auto' }}>
      <div style={{ display:'flex', gap:4, minWidth:'fit-content' }}>
        {EXPERIENCE_VERTICALS.map(v => (
          <button key={v.id} onClick={() => navigate(VERTICAL_ROUTES[v.id] as any)} style={{ padding:'7px 14px', border:`1px solid ${activeId===v.id?v.color:T.gray200}`, borderRadius:99, background:activeId===v.id?`${v.color}10`:'#fff', fontSize:12, fontWeight:activeId===v.id?700:400, color:activeId===v.id?v.color:T.gray500, cursor:'pointer', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:5, transition:'all 0.15s' }}>
            <span>{v.emoji}</span> {v.title}
          </button>
        ))}
      </div>
    </div>
  );
}

function LuxuryProductCard({ p, color, onAdd }: { p:any; color:string; onAdd:(id:string)=>void }) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { navigate } = useNav();

  function handleAdd() {
    setAdding(true);
    setTimeout(() => { setAdding(false); setAdded(true); onAdd(p.id); setTimeout(() => setAdded(false), 2000); }, 600);
  }

  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, overflow:'hidden', transition:'all 0.18s' }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.10)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
    >
      <div onClick={()=>navigate('sf-product')} style={{ height:160, background:`linear-gradient(135deg,${color}10,${color}05)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:72, cursor:'pointer', position:'relative' }}>
        {p.emoji}
        {p.badge && <div style={{ position:'absolute', top:10, left:10, fontSize:10, fontWeight:800, color:'#fff', background:color, padding:'3px 9px', borderRadius:99 }}>{p.badge}</div>}
        <button onClick={e=>{e.stopPropagation();}} style={{ position:'absolute', top:10, right:10, width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart style={{ width:14, height:14, color:T.gray400 }}/>
        </button>
      </div>
      <div style={{ padding:'14px 16px' }}>
        <div style={{ fontSize:14, fontWeight:800, color:T.gray900, marginBottom:4, lineHeight:1.3 }}>{p.name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:8 }}>
          <span style={{ fontSize:12, color:'#FBBF24' }}>{'★'.repeat(Math.round(p.rating))}</span>
          <span style={{ fontSize:11, color:T.gray400 }}>({p.reviews})</span>
        </div>
        <div style={{ display:'flex', gap:5, marginBottom:10, flexWrap:'wrap' }}>
          {p.occasions.slice(0,2).map((occ:string)=>(
            <span key={occ} style={{ fontSize:10, color:T.gray500, background:T.gray100, padding:'2px 7px', borderRadius:99 }}>{occ}</span>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            {p.originalPrice && <div style={{ fontSize:11, color:T.gray300, textDecoration:'line-through' }}>₺{p.originalPrice.toLocaleString('tr-TR')}</div>}
            <div style={{ fontSize:18, fontWeight:900, color:color }}>₺{p.price.toLocaleString('tr-TR')}</div>
          </div>
          <button onClick={handleAdd} style={{ padding:'8px 14px', border:'none', borderRadius:9, background:added?'#16A34A':color, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5, transition:'all 0.2s' }}>
            {added ? <><Check style={{ width:12, height:12 }}/> Eklendi</> : adding ? '⋯' : <><ShoppingBag style={{ width:12, height:12 }}/> Ekle</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function ExperiencePage({ verticalId }: { verticalId: string }) {
  const { navigate } = useNav();
  const { isMobile, isTablet } = useResponsive();
  const vertical = getVerticalById(verticalId);
  const upsells = UPSELL_CATALOG.filter(u => u.active && (u.floristPick || u.category==='experience')).slice(0, isMobile?2:4);
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    if (!vertical) return;
    const schema = { "@context":"https://schema.org", "@type":"CollectionPage", "name":vertical.seoTitle, "description":vertical.seoDescription };
    const el = document.createElement('script'); el.type='application/ld+json'; el.id=`exp-schema-${vertical.id}`;
    el.textContent = JSON.stringify(schema); document.head.appendChild(el);
    return () => { const old = document.getElementById(`exp-schema-${vertical.id}`); if (old) old.remove(); };
  }, [vertical]);

  if (!vertical) return <div style={{ padding:40, textAlign:'center', color:T.gray400 }}>Deneyim bulunamadı.</div>;

  const cols = isMobile ? 2 : isTablet ? 2 : 3;

  return (
    <div style={{ minHeight:'100%', background:T.gray50 }}>
      <ExperienceNav activeId={verticalId} />
      {/* Hero */}
      <section style={{ background:`linear-gradient(135deg,${vertical.color}12,#fff)`, borderBottom:`1px solid ${vertical.color}20`, padding:isMobile?'32px 16px':'48px 60px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
            <span style={{ fontSize:isMobile?36:48 }}>{vertical.emoji}</span>
            <div>
              <h1 style={{ fontSize:isMobile?26:38, fontWeight:900, color:T.gray900, letterSpacing:'-0.04em', margin:0, lineHeight:1.15 }}>{vertical.title}</h1>
              <p style={{ fontSize:isMobile?13:15, color:T.gray500, margin:'6px 0 0' }}>{vertical.subtitle}</p>
            </div>
          </div>
          <p style={{ fontSize:isMobile?14:16, color:T.gray600, lineHeight:1.7, margin:'0 0 20px', maxWidth:560 }}>{vertical.hero}</p>
          <div style={{ display:'flex', gap:isMobile?12:20, flexWrap:'wrap' }}>
            {[
              { icon:Truck, v:'Aynı Gün Teslimat' },
              { icon:Star, v:'4.9 / 5 Google' },
              { icon:Check, v:'Taze Garanti' },
            ].map((s,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:7 }}>
                <div style={{ width:28, height:28, borderRadius:7, background:`${vertical.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <s.icon style={{ width:14, height:14, color:vertical.color }}/>
                </div>
                <span style={{ fontSize:12.5, fontWeight:600, color:T.gray700 }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding:isMobile?'32px 16px':'48px 60px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <h2 style={{ fontSize:isMobile?20:26, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 20px' }}>Ürün Koleksiyonu</h2>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap:isMobile?12:18 }}>
            {vertical.products.map(p=>(
              <LuxuryProductCard key={p.id} p={p} color={vertical.color} onAdd={id=>setCart(c=>[...c,id])}/>
            ))}
          </div>
        </div>
      </section>

      {/* Upsells */}
      {upsells.length > 0 && (
        <section style={{ padding:isMobile?'0 16px 40px':'0 60px 56px' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ fontSize:isMobile?16:20, fontWeight:800, color:T.gray800, marginBottom:16 }}>Bununla Birlikte Alınabilir</div>
            <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:4 }}>
              {upsells.map(u=>(
                <div key={u.id} style={{ flexShrink:0, background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'14px', width:140, cursor:'pointer' }}>
                  <div style={{ fontSize:28, textAlign:'center', marginBottom:6 }}>{u.emoji}</div>
                  <div style={{ fontSize:11.5, fontWeight:700, color:T.gray800, textAlign:'center', marginBottom:4, lineHeight:1.3 }}>{u.name}</div>
                  <div style={{ fontSize:13, fontWeight:900, color:vertical.color, textAlign:'center' }}>{u.price===0?'Ücretsiz':`+₺${u.price}`}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export function ScreenExperienceHub() {
  const { navigate } = useNav();
  const { isMobile } = useResponsive();
  return (
    <div style={{ minHeight:'100%', background:T.gray50 }}>
      <div style={{ background:`linear-gradient(135deg,#0a1a0a,#1a3520)`, padding:isMobile?'40px 16px':'64px 60px', textAlign:'center' }}>
        <div style={{ fontSize:isMobile?28:42, fontWeight:900, color:'#fff', letterSpacing:'-0.04em', marginBottom:12 }}>Deneyim Merkezi</div>
        <p style={{ fontSize:isMobile?14:17, color:'rgba(255,255,255,0.7)', maxWidth:520, margin:'0 auto' }}>11 premium çiçek ve dekorasyon kategorisi</p>
      </div>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:isMobile?'32px 16px':'48px 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(3,1fr)', gap:16 }}>
          {EXPERIENCE_VERTICALS.map(v=>(
            <button key={v.id} onClick={()=>navigate(VERTICAL_ROUTES[v.id] as any)} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, padding:'24px 20px', cursor:'pointer', textAlign:'left', transition:'all 0.18s', display:'flex', gap:14, alignItems:'flex-start' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=v.color; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.gray200; e.currentTarget.style.transform='none'; }}
            >
              <div style={{ width:48, height:48, borderRadius:12, background:v.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>{v.emoji}</div>
              <div>
                <div style={{ fontSize:15, fontWeight:800, color:T.gray900, marginBottom:3 }}>{v.title}</div>
                <div style={{ fontSize:12, color:T.gray400, lineHeight:1.4 }}>{v.subtitle}</div>
                <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:8 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:v.color }}>Keşfedin</span>
                  <ChevronRight style={{ width:12, height:12, color:v.color }}/>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const ScreenExpFlowers    = () => <ExperiencePage verticalId="flowers" />;
export const ScreenExpOrchids    = () => <ExperiencePage verticalId="orchids" />;
export const ScreenExpGifts      = () => <ExperiencePage verticalId="gifts" />;
export const ScreenExpCorporate  = () => <ExperiencePage verticalId="corporate" />;
export const ScreenExpWedding    = () => <ExperiencePage verticalId="wedding" />;
export const ScreenExpArtificial = () => <ExperiencePage verticalId="artificial" />;
export const ScreenExpHotel      = () => <ExperiencePage verticalId="hotel" />;
export const ScreenExpCafe       = () => <ExperiencePage verticalId="cafe" />;
export const ScreenExpRestaurant = () => <ExperiencePage verticalId="restaurant" />;
export const ScreenExpOffice     = () => <ExperiencePage verticalId="office" />;
export const ScreenExpProjects   = () => <ExperiencePage verticalId="projects" />;
