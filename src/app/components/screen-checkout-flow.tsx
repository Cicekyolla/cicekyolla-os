/* CICEKYOLLA REVENUE ENGINE — Premium 5-Step Checkout
   Step 1: Sepet (QuickUpsellBar)
   Step 2: Hediyeler (Upsell + Bundles + LiveProof + GiftNoteTemplates)
   Step 3: Alıcı (GiftNoteTemplates, SurpriseProtection)
   Step 4: Teslimat (Slot selector)
   Step 5: Ödeme (iyzico, installments)
   Mobile: sticky footer CTA + compact summary
   Full source: github.com/Cicekyolla/cicekyolla-os */
import { useState, useEffect } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { Check, Plus, Minus, Lock, ArrowRight, Truck, ChevronRight } from 'lucide-react';
import { UPSELL_CATALOG, BUNDLES, PROMOTIONS, type UpsellProduct, type UpsellCategory } from '../data/revenue-store';

const P  = { purple:'#7C3AED', mid:'#8B5CF6', light:'#A78BFA', pale:'#EDE9FE', surface:'#F5F3FF', lilac:'#DDD6FE', deep:'#1E1B4B', gold:'#D97706' };
const G  = { 50:'#F9FAFB', 100:'#F3F4F6', 200:'#E5E7EB', 300:'#D1D5DB', 400:'#9CA3AF', 500:'#6B7280', 600:'#4B5563', 700:'#374151', 800:'#1F2937', 900:'#111827' };
const GR = { 50:'#F0FDF4', 100:'#DCFCE7', 500:'#22C55E', 600:'#16A34A' };
const AM = { 50:'#FFFBEB', 100:'#FEF3C7', 400:'#FBBF24', 600:'#D97706', 700:'#B45309' };

const fmt = (n: number) => n===0?'Ücretsiz':'₺'+n.toLocaleString('tr-TR');

const STEPS = [
  { n:1, label:'Sepet' }, { n:2, label:'Hediyeler' },
  { n:3, label:'Alıcı' }, { n:4, label:'Teslimat' }, { n:5, label:'Ödeme' },
];

const CATEGORIES: { id:UpsellCategory; label:string; emoji:string }[] = [
  { id:'delivery', label:'Ekspres', emoji:'⚡' }, { id:'gifts', label:'Hediyeler', emoji:'🎁' },
  { id:'flowers', label:'Çiçek', emoji:'🌹' }, { id:'experience', label:'Deneyim', emoji:'💌' },
  { id:'corporate', label:'Kurumsal', emoji:'🏢' },
];

const THRESHOLDS = [
  { amount:500, label:'Ücretsiz Teslimat', emoji:'🚚', promoId:'p-del' },
  { amount:1500, label:'Ücretsiz Premium Ambalaj', emoji:'📦', promoId:'p-pack' },
  { amount:2500, label:'VIP Kurye Ödülü', emoji:'👑', promoId:'p-vip' },
];

const QUICK_IDS = ['g-choc','g-plush','f-vase','f-ribbon','e-hand'];

function ProgressBar({ step }: { step: number }) {
  const { isMobile } = useResponsive();
  return (
    <div style={{ background:'#fff', borderBottom:`1px solid ${G[100]}`, padding:'12px 0' }}>
      <div style={{ maxWidth:680, margin:'0 auto', padding:`0 ${isMobile?'16px':'24px'}`, display:'flex', alignItems:'center' }}>
        {STEPS.map((s,i)=>(
          <div key={s.n} style={{ display:'flex', alignItems:'center', flex:1, minWidth:0 }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:isMobile?2:5 }}>
              <div style={{ width:isMobile?26:30, height:isMobile?26:30, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background:step>s.n?P.purple:step===s.n?P.purple:G[100], border:`2px solid ${step>=s.n?P.purple:G[200]}`, transition:'all 0.3s' }}>
                {step>s.n ? <Check style={{ width:11, height:11, color:'#fff' }}/> : <span style={{ fontSize:10, fontWeight:800, color:step===s.n?'#fff':G[400] }}>{s.n}</span>}
              </div>
              {!isMobile && <span style={{ fontSize:10, fontWeight:step>=s.n?700:400, color:step>=s.n?P.purple:G[400], whiteSpace:'nowrap' }}>{s.label}</span>}
              {isMobile && step===s.n && <span style={{ fontSize:9, fontWeight:700, color:P.purple, whiteSpace:'nowrap' }}>{s.label}</span>}
            </div>
            {i<STEPS.length-1 && <div style={{ flex:1, height:2, margin:`0 ${isMobile?'4px':'6px'}`, marginBottom:isMobile?0:18, background:step>s.n?P.purple:G[200], transition:'background 0.3s' }}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AOVProgressBar({ total }: { total: number }) {
  const active = PROMOTIONS.filter(p=>p.active);
  const next = THRESHOLDS.find(t=>{ const promo=active.find(p=>p.id===t.promoId); return promo&&total<t.amount; });
  const achieved = THRESHOLDS.filter(t=>{ const promo=active.find(p=>p.id===t.promoId); return promo&&total>=t.amount; });
  if (!next&&achieved.length===0) return null;
  const prev=achieved[achieved.length-1];
  const from=prev?prev.amount:0;
  const to=next?next.amount:THRESHOLDS[THRESHOLDS.length-1].amount;
  const pct=Math.min(100,Math.round(((total-from)/(to-from))*100));
  return (
    <div style={{ padding:'12px 16px', background:`linear-gradient(135deg,${P.surface},#fff)`, borderRadius:11, border:`1px solid ${P.lilac}`, marginBottom:14 }}>
      {achieved.length>0&&(<div style={{ marginBottom:8 }}>{achieved.map(t=>(<div key={t.promoId} style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}><span style={{ width:16, height:16, borderRadius:'50%', background:GR[600], display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, flexShrink:0 }}>✓</span><span style={{ fontSize:11, fontWeight:600, color:GR[600] }}>{t.emoji} {t.label} kazandınız!</span></div>))}</div>)}
      {next&&(<><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}><span style={{ fontSize:11, fontWeight:600, color:P.purple }}>{next.emoji} {next.label} için {fmt(next.amount-total)} daha ekleyin</span><span style={{ fontSize:10, color:G[400] }}>{pct}%</span></div><div style={{ height:6, borderRadius:99, background:P.pale, overflow:'hidden' }}><div style={{ height:'100%', width:`${pct}%`, borderRadius:99, background:`linear-gradient(90deg,${P.purple},${P.mid})`, transition:'width 0.4s ease' }}/></div></>)}
    </div>
  );
}

function QuickUpsellBar({ added, onToggle }: { added: Set<string>; onToggle: (id:string)=>void }) {
  const items = UPSELL_CATALOG.filter(u=>QUICK_IDS.includes(u.id)&&u.active).sort((a,b)=>QUICK_IDS.indexOf(a.id)-QUICK_IDS.indexOf(b.id));
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${G[200]}`, padding:'16px 20px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', marginTop:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontSize:10.5, fontWeight:800, color:G[400], textTransform:'uppercase', letterSpacing:'0.08em' }}>🔥 En Çok Eklenenler — Tek Tıkla</div>
        <div style={{ fontSize:10, color:G[400] }}>Müşterilerin %71\'i en az 1 ekliyor</div>
      </div>
      <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:2 }}>
        {items.map(item=>{ const isAdded=added.has(item.id); return (
          <div key={item.id} onClick={()=>onToggle(item.id)} style={{ flexShrink:0, textAlign:'center', cursor:'pointer' }}>
            <div style={{ width:72, height:72, borderRadius:16, border:`2px solid ${isAdded?P.purple:G[200]}`, background:isAdded?P.pale:G[50], display:'flex', alignItems:'center', justifyContent:'center', fontSize:34, position:'relative', marginBottom:6, transition:'all 0.15s', boxShadow:isAdded?`0 0 0 4px ${P.purple}14`:'none' }}>
              {item.emoji}
              {isAdded&&(<div style={{ position:'absolute', top:-7, right:-7, width:20, height:20, borderRadius:'50%', background:P.purple, display:'flex', alignItems:'center', justifyContent:'center' }}><Check style={{ width:11, height:11, color:'#fff' }}/></div>)}
            </div>
            <div style={{ fontSize:9.5, fontWeight:600, color:isAdded?P.purple:G[600], lineHeight:1.2, maxWidth:72, wordBreak:'break-word' }}>{item.name.split(' ').slice(0,2).join(' ')}</div>
            <div style={{ fontSize:11, fontWeight:800, color:isAdded?P.purple:G[800], marginTop:2 }}>{item.price===0?'Ücretsiz':`+₺${item.price}`}</div>
          </div>
        );})}
      </div>
    </div>
  );
}

function BundlesSection({ added, onToggleBundle }: { added: Set<string>; onToggleBundle: (ids:string[])=>void }) {
  const activeBundles = BUNDLES.filter(b=>b.active);
  return (
    <div style={{ marginBottom:24 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
        <span style={{ fontSize:10.5, fontWeight:800, color:AM[700], textTransform:'uppercase', letterSpacing:'0.08em' }}>🎁 Hazır Paketler</span>
        <span style={{ fontSize:10, fontWeight:700, background:GR[50], border:`1px solid ${GR[100]}`, borderRadius:99, padding:'2px 8px', color:GR[600] }}>En iyi fiyat garantisi</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {activeBundles.map(bundle=>{
          const bundleItems=UPSELL_CATALOG.filter(u=>bundle.items.includes(u.id)&&u.active);
          const fullPrice=bundleItems.reduce((s,u)=>s+u.price,0);
          const salePrice=fullPrice-bundle.savings;
          const isAllAdded=bundle.items.every(id=>added.has(id));
          return (
            <div key={bundle.id} onClick={()=>onToggleBundle(bundle.items)} style={{ background:isAllAdded?P.pale:`linear-gradient(135deg,${AM[50]},#FFFEF8)`, border:`2px solid ${isAllAdded?P.purple:AM[400]+'50'}`, borderRadius:14, padding:'14px 18px', cursor:'pointer', transition:'all 0.15s', boxShadow:isAllAdded?`0 0 0 4px ${P.purple}10`:'none' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                <div style={{ flex:1, minWidth:0, marginRight:12 }}>
                  <div style={{ fontSize:13.5, fontWeight:800, color:isAllAdded?P.deep:G[800] }}>{bundle.name}</div>
                  <div style={{ fontSize:11, color:G[500], marginTop:2 }}>{bundle.description}</div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontSize:10, color:G[400], textDecoration:'line-through', marginBottom:1 }}>₺{fullPrice.toLocaleString('tr-TR')}</div>
                  <div style={{ fontSize:16, fontWeight:900, color:isAllAdded?P.purple:AM[700] }}>₺{salePrice.toLocaleString('tr-TR')}</div>
                  <div style={{ fontSize:10, fontWeight:700, color:GR[600] }}>₺{bundle.savings} tasarruf</div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                {bundleItems.map((item,i)=>(<span key={item.id} style={{ fontSize:11, color:isAllAdded?P.mid:G[600], display:'flex', alignItems:'center', gap:4 }}><span style={{ fontSize:14 }}>{item.emoji}</span>{item.name}{i<bundleItems.length-1&&<span style={{ color:G[300] }}>+</span>}</span>))}
                <div style={{ marginLeft:'auto' }}><span style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'6px 14px', borderRadius:99, background:isAllAdded?GR[600]:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:11.5, fontWeight:700, flexShrink:0 }}>{isAllAdded?<><Check style={{ width:11, height:11 }}/> Eklendi</>:<><Plus style={{ width:11, height:11 }}/> Paketi Seç</>}</span></div>
              </div>
              <div style={{ marginTop:8, fontSize:10, color:G[400] }}>🔥 Bu ay {bundle.soldCount} kez seçildi</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderSummary({ cart, added, total, step, onNext }: { cart:{name:string;price:number;emoji:string;variant:string;qty:number}[]; added:Set<string>; total:number; step:number; onNext:()=>void }) {
  const active=UPSELL_CATALOG.filter(u=>u.active);
  const addedItems=active.filter(u=>added.has(u.id));
  const cartTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const upsellTotal=addedItems.reduce((s,u)=>s+u.price,0);
  const hasExpress=added.has('d-90')||added.has('d-vip')||added.has('d-urgent');
  const CTA=['','Hediyelerle Devam Et','Alıcı Bilgilerine Geç','Teslimat Bilgilerine Geç','Ödemeye Geç','Siparişi Tamamla'];
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.07)', position:'sticky', top:20 }}>
      <div style={{ padding:'14px 18px', background:`linear-gradient(135deg,${P.surface},#fff)`, borderBottom:`1px solid ${P.lilac}` }}>
        <div style={{ fontSize:14, fontWeight:800, color:P.deep }}>Sipariş Özeti</div>
        <div style={{ fontSize:11, color:P.light, marginTop:1 }}>{cart.length+addedItems.length} ürün{upsellTotal>0&&<span style={{ marginLeft:8, color:P.purple, fontWeight:700 }}>+{fmt(upsellTotal)} eklendi</span>}</div>
      </div>
      <div style={{ padding:'14px 18px' }}>
        {cart.map((item,i)=>(<div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 }}><div style={{ width:44, height:44, borderRadius:10, background:P.pale, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{item.emoji}</div><div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:12, fontWeight:700, color:G[800], lineHeight:1.3 }}>{item.name}</div><div style={{ fontSize:10.5, color:G[400], marginTop:2 }}>{item.variant} × {item.qty}</div></div><div style={{ fontSize:13, fontWeight:800, color:P.purple, flexShrink:0 }}>{fmt(item.price*item.qty)}</div></div>))}
        {addedItems.length>0&&(<div style={{ marginTop:10, paddingTop:10, borderTop:`1px dashed ${G[200]}` }}><div style={{ fontSize:10, fontWeight:700, color:G[400], textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Eklenen Ürünler</div>{addedItems.map(u=>(<div key={u.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}><div style={{ display:'flex', gap:6, alignItems:'center' }}><span style={{ fontSize:14 }}>{u.emoji}</span><span style={{ fontSize:11.5, color:G[600], maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.name}</span></div><span style={{ fontSize:12, fontWeight:700, color:u.price===0?GR[600]:P.purple, flexShrink:0 }}>{fmt(u.price)}</span></div>))}</div>)}
        <div style={{ margin:'12px 0', height:1, background:G[100] }}/>
        {[{l:'Toplamı',v:fmt(cartTotal)},...(upsellTotal>0?[{l:'Ek Ürünler',v:`+${fmt(upsellTotal)}`}]:[]),{l:'Teslimat',v:'Ücretsiz'}].map((r,i)=>(<div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}><span style={{ fontSize:12, color:G[500] }}>{r.l}</span><span style={{ fontSize:12, fontWeight:500, color:r.v==='Ücretsiz'?GR[600]:r.v.startsWith('+')?P.purple:G[700] }}>{r.v}</span></div>))}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', margin:'10px 0 14px' }}>
          <span style={{ fontSize:14, fontWeight:800, color:G[900] }}>Toplam</span>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:22, fontWeight:900, color:P.purple, letterSpacing:'-0.03em', transition:'all 0.3s' }}>{fmt(total)}</div>
            {upsellTotal>0&&<div style={{ fontSize:9.5, color:G[400], textDecoration:'line-through' }}>{fmt(cartTotal)}</div>}
          </div>
        </div>
        <AOVProgressBar total={total}/>
        <div style={{ display:'flex', gap:8, alignItems:'center', background:GR[50], border:`1px solid ${GR[100]}`, borderRadius:9, padding:'9px 12px', marginBottom:14 }}>
          <div style={{ width:26, height:26, borderRadius:'50%', background:GR[100], display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Truck style={{ width:12, height:12, color:GR[600] }}/></div>
          <div><div style={{ fontSize:11.5, fontWeight:700, color:GR[600] }}>{hasExpress?'Tahmini 60-90 Dakika İçinde':'Bugün 14:00 – 16:00'}</div><div style={{ fontSize:10, color:GR[600], opacity:0.7 }}>Kadıköy / İstanbul</div></div>
        </div>
        {step<6&&(<button onClick={onNext} style={{ width:'100%', padding:'13px 0', border:'none', borderRadius:11, background:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:13, fontWeight:800, cursor:'pointer', boxShadow:`0 6px 20px rgba(124,58,237,0.32)`, display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>{CTA[step]||'Devam Et'} <ArrowRight style={{ width:14, height:14 }}/></button>)}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:5, marginTop:10 }}><Lock style={{ width:10, height:10, color:G[400] }}/><span style={{ fontSize:10, color:G[400] }}>256-bit SSL şifreli güvenli alışveriş</span></div>
        <div style={{ display:'flex', marginTop:12, borderTop:`1px solid ${G[100]}`, paddingTop:10 }}>
          {[{i:'🚚',l:'Aynı Gün'},{i:'🔒',l:'Güvenli'},{i:'😊',l:'50K Müşteri'},{i:'🌹',l:'Taze Garanti'}].map((t,idx)=>(<div key={idx} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, borderRight:idx<3?`1px solid ${G[100]}`:'none' }}><span style={{ fontSize:14 }}>{t.i}</span><span style={{ fontSize:9, color:G[400], fontWeight:500, textAlign:'center' }}>{t.l}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function CartStep({ cart, onChange, added, onToggle }: { cart:{id:number;name:string;price:number;emoji:string;variant:string;qty:number}[]; onChange:(id:number,delta:number)=>void; added:Set<string>; onToggle:(id:string)=>void }) {
  return (
    <div>
      <h2 style={{ fontSize:22, fontWeight:900, color:G[900], letterSpacing:'-0.03em', margin:'0 0 4px' }}>Sepetiniz</h2>
      <p style={{ fontSize:13, color:G[400], margin:'0 0 24px' }}>Siparişinizi kontrol edin, sonra hediyelerinizi ekleyin.</p>
      {cart.map(item=>(<div key={item.id} style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'20px', display:'flex', gap:16, alignItems:'center', marginBottom:12, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ width:80, height:80, borderRadius:14, background:`linear-gradient(135deg,${P.surface},#fff)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:44, border:`1px solid ${P.lilac}`, flexShrink:0 }}>{item.emoji}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:15, fontWeight:800, color:G[900], letterSpacing:'-0.01em', marginBottom:4 }}>{item.name}</div>
          <div style={{ fontSize:12.5, color:G[400], marginBottom:12 }}>{item.variant}</div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ display:'flex', alignItems:'center', border:`1px solid ${G[200]}`, borderRadius:9, overflow:'hidden' }}>
              <button onClick={()=>onChange(item.id,-1)} style={{ width:32, height:32, border:'none', background:G[50], cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Minus style={{ width:12, height:12, color:G[500] }}/></button>
              <div style={{ width:36, textAlign:'center', fontSize:13, fontWeight:700, color:G[900] }}>{item.qty}</div>
              <button onClick={()=>onChange(item.id,1)} style={{ width:32, height:32, border:'none', background:G[50], cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Plus style={{ width:12, height:12, color:G[500] }}/></button>
            </div>
            <div style={{ display:'flex', gap:5 }}>
              <span style={{ fontSize:10, fontWeight:700, color:GR[600], background:GR[50], border:`1px solid ${GR[100]}`, padding:'2px 8px', borderRadius:99 }}>Taze Garanti</span>
              <span style={{ fontSize:10, fontWeight:700, color:P.purple, background:P.pale, border:`1px solid ${P.lilac}`, padding:'2px 8px', borderRadius:99 }}>Aynı Gün</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize:20, fontWeight:900, color:P.purple, letterSpacing:'-0.02em', flexShrink:0 }}>{fmt(item.price*item.qty)}</div>
      </div>))}
      <div style={{ background:'#fff', borderRadius:12, border:`1px dashed ${G[200]}`, padding:'14px 16px', display:'flex', gap:10, marginBottom:20 }}>
        <input placeholder="Kupon kodu veya hediye çeki" style={{ flex:1, height:38, padding:'0 12px', border:`1px solid ${G[200]}`, borderRadius:8, fontSize:13, outline:'none', color:G[700] }}/>
        <button style={{ padding:'0 18px', border:'none', borderRadius:8, background:P.purple, color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', flexShrink:0 }}>Uygula</button>
      </div>
      <QuickUpsellBar added={added} onToggle={onToggle}/>
      <div style={{ background:`linear-gradient(135deg,${AM[50]},#FFFEF0)`, border:`1px solid ${AM[400]}30`, borderRadius:14, padding:'18px 20px', display:'flex', alignItems:'center', gap:14, marginTop:16 }}>
        <div style={{ width:48, height:48, borderRadius:12, background:`linear-gradient(135deg,${AM[600]},${AM[700]})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>✨</div>
        <div style={{ flex:1 }}><div style={{ fontSize:14, fontWeight:800, color:AM[700] }}>Paket Fırsatları — %40'a Kadar Tasarruf</div><div style={{ fontSize:12, color:AM[600], marginTop:2 }}>Bir sonraki adımda paket teklifleri göreceksiniz</div></div>
        <ChevronRight style={{ width:18, height:18, color:AM[600], flexShrink:0 }}/>
      </div>
    </div>
  );
}

function UpsellCard({ item, added, justAdded, onToggle }: { item:UpsellProduct; added:boolean; justAdded:boolean; onToggle:()=>void }) {
  const [hov, setHov] = useState(false);
  const BADGE_COLORS: Record<string,string> = { hot:P.purple, new:'#0EA5E9', recommended:GR[600], florist:AM[600] };
  const badgeColor = item.badgeType?BADGE_COLORS[item.badgeType]:P.purple;
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onToggle} style={{ background:added?P.pale:'#fff', borderRadius:14, border:`2px solid ${added?P.purple:hov?P.lilac:G[200]}`, padding:'16px', cursor:'pointer', position:'relative', transition:'all 0.18s', boxShadow:added?`0 0 0 4px ${P.purple}14`:hov?'0 6px 18px rgba(0,0,0,0.08)':'0 1px 4px rgba(0,0,0,0.04)' }}>
      {item.badge&&(<div style={{ position:'absolute', top:10, left:10 }}><span style={{ fontSize:9, fontWeight:800, color:badgeColor, background:`${badgeColor}15`, border:`1px solid ${badgeColor}30`, padding:'2px 7px', borderRadius:99, letterSpacing:'0.04em' }}>{item.badge}</span></div>)}
      {added&&(<div style={{ position:'absolute', top:10, right:10, width:20, height:20, borderRadius:'50%', background:P.purple, display:'flex', alignItems:'center', justifyContent:'center' }}><Check style={{ width:11, height:11, color:'#fff' }}/></div>)}
      <div style={{ marginTop:item.badge?20:0 }}>
        <div style={{ fontSize:40, textAlign:'center', marginBottom:10, lineHeight:1 }}>{item.emoji}</div>
        <div style={{ fontSize:13, fontWeight:800, color:added?P.deep:G[800], lineHeight:1.3, marginBottom:4, textAlign:'center' }}>{item.name}</div>
        <div style={{ fontSize:11, color:added?P.mid:G[400], textAlign:'center', lineHeight:1.4, marginBottom:8 }}>{item.sub}</div>
        <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:12, flexWrap:'wrap' }}>
          {item.soldLast24h>0&&<span style={{ fontSize:9.5, color:G[400] }}>🔥 {item.soldLast24h} bugün ekledi</span>}
          {item.acceptRate>0&&<span style={{ fontSize:9.5, color:G[400] }}>%{item.acceptRate} kabul</span>}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>
          <div style={{ fontSize:17, fontWeight:900, color:added?P.purple:G[800], letterSpacing:'-0.02em' }}>{item.price===0?'Ücretsiz':`+${fmt(item.price)}`}</div>
          <button onClick={e=>{e.stopPropagation();onToggle();}} style={{ flex:1, maxWidth:90, padding:'7px 0', border:'none', borderRadius:8, cursor:'pointer', fontSize:11.5, fontWeight:700, background:added?GR[600]:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', gap:4, transition:'all 0.2s' }}>
            {added?<><Check style={{ width:11, height:11 }}/> Eklendi</>:<><Plus style={{ width:11, height:11 }}/> Ekle</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function UpsellStep({ added, justAdded, onToggle, onToggleBundle }: { added:Set<string>; justAdded:string|null; onToggle:(id:string)=>void; onToggleBundle:(ids:string[])=>void }) {
  const { isMobile } = useResponsive();
  const [cat, setCat] = useState<UpsellCategory>('gifts');
  const [filter, setFilter] = useState<'all'|'florist'|'popular'|'new'>('all');
  const [liveCount] = useState(()=>Math.floor(Math.random()*18)+14);
  const active=UPSELL_CATALOG.filter(u=>u.active);
  const floristPicks=active.filter(u=>u.floristPick);
  const topPick=[...floristPicks].sort((a,b)=>b.soldLast24h-a.soldLast24h)[0];
  const alsoAdded=active.filter(u=>u.category!=='delivery').sort((a,b)=>b.acceptRate-a.acceptRate).slice(0,4);
  let catItems=active.filter(u=>u.category===cat);
  if (filter==='florist') catItems=catItems.filter(u=>u.floristPick);
  if (filter==='popular') catItems=catItems.sort((a,b)=>b.soldLast24h-a.soldLast24h);
  if (filter==='new') catItems=catItems.filter(u=>u.badgeType==='new');
  const addedCount=active.filter(u=>added.has(u.id)).length;
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${GR[50]},#F0FDF4)`, border:`1px solid ${GR[100]}`, borderRadius:10, padding:'9px 14px', marginBottom:16 }}>
        <span style={{ width:8, height:8, borderRadius:'50%', background:'#22C55E', flexShrink:0, boxShadow:'0 0 0 3px #22C55E30' }}/>
        <span style={{ fontSize:11.5, color:GR[600], fontWeight:600 }}>🔴 CANLI: <strong>{liveCount} kişi</strong> şu an sipariş veriyor — son 1 saatte <strong>47 sipariş</strong></span>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
        <div><h2 style={{ fontSize:22, fontWeight:900, color:G[900], letterSpacing:'-0.03em', margin:'0 0 4px' }}>✨ Hediyenizi Tamamlayın</h2><p style={{ fontSize:13, color:G[400], margin:0 }}>Müşterilerin %76'sı bu adımda hediyelerini özelleştiriyor.</p></div>
        {addedCount>0&&(<div style={{ display:'flex', alignItems:'center', gap:5, background:P.pale, border:`1px solid ${P.lilac}`, borderRadius:99, padding:'5px 12px', flexShrink:0 }}><Check style={{ width:12, height:12, color:P.purple }}/><span style={{ fontSize:11.5, fontWeight:700, color:P.purple }}>{addedCount} eklendi</span></div>)}
      </div>
      <BundlesSection added={added} onToggleBundle={onToggleBundle}/>
      {topPick&&(<div style={{ background:`linear-gradient(135deg,${AM[50]},#FFFEF2)`, border:`2px solid ${AM[400]}40`, borderRadius:16, padding:'16px 20px', marginBottom:20, display:'flex', alignItems:'center', gap:16 }}>
        <div style={{ flexShrink:0, textAlign:'center' }}><div style={{ width:50, height:50, borderRadius:'50%', background:`linear-gradient(135deg,${P.purple},${P.mid})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:3 }}>👩‍🌾</div><div style={{ fontSize:8.5, color:AM[600], fontWeight:800, letterSpacing:'0.08em' }}>FLORİST</div></div>
        <div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:10, fontWeight:800, color:AM[600], textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:3 }}>Florist'in Bugünkü Önerisi</div><div style={{ fontSize:15, fontWeight:800, color:G[900], marginBottom:3 }}>{topPick.emoji} {topPick.name}</div><div style={{ fontSize:12, color:G[500], fontStyle:'italic' }}>"{topPick.name.toLowerCase()} harika yakışıyor." — Bugün {topPick.soldLast24h} kişi ekledi.</div></div>
        <div style={{ flexShrink:0, textAlign:'right' }}><div style={{ fontSize:18, fontWeight:900, color:P.purple, marginBottom:8 }}>{fmt(topPick.price)}</div><button onClick={()=>onToggle(topPick.id)} style={{ padding:'8px 16px', border:'none', borderRadius:9, background:added.has(topPick.id)?GR[600]:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>{added.has(topPick.id)?<><Check style={{ width:11, height:11 }}/> Eklendi</>:<><Plus style={{ width:11, height:11 }}/> Ekle</>}</button></div>
      </div>)}
      <div style={{ marginBottom:20 }}><div style={{ fontSize:11, fontWeight:700, color:G[400], textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>Müşteriler Bunları da Ekledi</div><div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:4 }}>{alsoAdded.map(item=>(<div key={item.id} onClick={()=>onToggle(item.id)} style={{ flexShrink:0, width:140, background:added.has(item.id)?P.pale:'#fff', border:`2px solid ${added.has(item.id)?P.purple:G[200]}`, borderRadius:12, padding:'12px', cursor:'pointer', transition:'all 0.15s' }}><div style={{ fontSize:28, textAlign:'center', marginBottom:6 }}>{item.emoji}</div><div style={{ fontSize:11.5, fontWeight:700, color:G[800], textAlign:'center', lineHeight:1.3, marginBottom:6 }}>{item.name}</div><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}><span style={{ fontSize:12, fontWeight:800, color:P.purple }}>{item.price===0?'Ücretsiz':fmt(item.price)}</span><div style={{ width:24, height:24, borderRadius:6, background:added.has(item.id)?GR[600]:P.purple, display:'flex', alignItems:'center', justifyContent:'center' }}>{added.has(item.id)?<Check style={{ width:11, height:11, color:'#fff' }}/>:<Plus style={{ width:11, height:11, color:'#fff' }}/>}</div></div></div>))}</div></div>
      <div style={{ display:'flex', gap:8, marginBottom:12, overflowX:'auto', paddingBottom:2 }}>{CATEGORIES.map(c=>{ const count=active.filter(u=>u.category===c.id).length; const catAdded=active.filter(u=>u.category===c.id&&added.has(u.id)).length; return (<button key={c.id} onClick={()=>setCat(c.id)} style={{ padding:'7px 14px', border:`2px solid ${cat===c.id?P.purple:G[200]}`, borderRadius:99, flexShrink:0, background:cat===c.id?P.pale:'#fff', cursor:'pointer', fontSize:12, fontWeight:cat===c.id?700:400, color:cat===c.id?P.purple:G[500], display:'flex', alignItems:'center', gap:6, transition:'all 0.15s' }}><span style={{ fontSize:14 }}>{c.emoji}</span> {c.label} <span style={{ fontSize:10, background:cat===c.id?P.purple:G[200], color:cat===c.id?'#fff':G[500], borderRadius:99, padding:'1px 6px', fontWeight:700 }}>{count}</span>{catAdded>0&&<span style={{ width:16, height:16, borderRadius:'50%', background:GR[600], display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:900, color:'#fff' }}>{catAdded}</span>}</button>); })}</div>
      <div style={{ display:'flex', gap:8, marginBottom:18 }}>{[{id:'all',label:'Tümü'},{id:'florist',label:'🌟 Florist Tavsiyesi'},{id:'popular',label:'🔥 En Çok Satan'},{id:'new',label:'✨ Yeni Ürünler'}].map(f=>(<button key={f.id} onClick={()=>setFilter(f.id as any)} style={{ padding:'5px 12px', border:`1px solid ${filter===f.id?P.purple:G[200]}`, borderRadius:99, background:filter===f.id?P.purple:'#fff', color:filter===f.id?'#fff':G[500], fontSize:11.5, fontWeight:filter===f.id?700:400, cursor:'pointer', transition:'all 0.15s' }}>{f.label}</button>))}</div>
      {catItems.length===0?(<div style={{ textAlign:'center', padding:'32px', color:G[400], fontSize:14 }}>Bu kategoride aktif ürün bulunmuyor.</div>):(<div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:12 }}>{catItems.map(item=>(<UpsellCard key={item.id} item={item} added={added.has(item.id)} justAdded={justAdded===item.id} onToggle={()=>onToggle(item.id)}/>))}</div>)}
      <div style={{ marginTop:16, textAlign:'center', fontSize:12, color:G[400] }}>İstege baglı — dilediğinizde devam edebilirsiniz.</div>
    </div>
  );
}

function Field({ label, placeholder, type='text', span=1 }: { label:string; placeholder:string; type?:string; span?:number }) {
  return (
    <div style={{ gridColumn:`span ${span}` }}>
      <label style={{ fontSize:11.5, fontWeight:700, color:G[600], display:'block', marginBottom:6, letterSpacing:'0.02em' }}>{label}</label>
      <input type={type} placeholder={placeholder} style={{ width:'100%', height:42, padding:'0 14px', border:`1.5px solid ${G[200]}`, borderRadius:10, fontSize:13, outline:'none', color:G[800], boxSizing:'border-box', transition:'border 0.15s' }} onFocus={e=>e.target.style.borderColor=P.purple} onBlur={e=>e.target.style.borderColor=G[200]}/>
    </div>
  );
}

function RecipientStep() {
  const { isMobile } = useResponsive();
  return (
    <div>
      <h2 style={{ fontSize:22, fontWeight:900, color:G[900], letterSpacing:'-0.03em', margin:'0 0 4px' }}>Alıcı Bilgileri</h2>
      <p style={{ fontSize:13, color:G[400], margin:'0 0 24px' }}>Çiçeği kim alacak? Sürpriz koruması aktif.</p>
      <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', marginBottom:14 }}>
        <div style={{ fontSize:13, fontWeight:800, color:G[800], marginBottom:16 }}>Alıcı Kişi</div>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:14, marginBottom:14 }}><Field label="Alıcı Adı *" placeholder="Ayşe"/><Field label="Alıcı Soyadı *" placeholder="Kaya"/></div>
        <Field label="Alıcı Telefonu *" placeholder="0 5XX XXX XX XX" type="tel" span={2}/>
        <div style={{ marginTop:14 }}><div style={{ fontSize:11, color:G[400], marginTop:5 }}>Kurye teslimatta arayabilir. Sürpriz bozulmaz, fiyat iletilmez.</div></div>
      </div>
      <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', marginBottom:14 }}>
        <div style={{ fontSize:13, fontWeight:800, color:G[800], marginBottom:12 }}>Kart Mesajı</div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:G[400], textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>Hazır Mesaj Seç</div>
          <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
            {[{label:'Romantik',emoji:'💕',text:"Seninle her gün çiçek gibi güzel. Seni seviyorum."},{label:'Doğum Günü',emoji:'🎂',text:"Bugün senin günün! Nice mutlu yıllara, doğum günün kutlu olsun."},{label:'Tebrik',emoji:'🎉',text:"Tebrikler! Bu başarı senin emeklerinin ürünü. Gurur duyuyorum."},{label:'Geçmiş',emoji:'💪',text:"Çabuk iyileş! Dünya seni bekliyor. Çiçekler gibi güçlü ol."},{label:'Sürpriz',emoji:'🌟',text:"Seni düşünüyorum. İyi ki varsın hayatımda."},{label:'Kurumsal',emoji:'🤝',text:"Değerli iş birliğimiz için teşekkürler. Başarılar dileriz."}].map(t=>(<button key={t.label} onClick={(e)=>{ const ta=(e.currentTarget.closest('[data-note-block]') as HTMLElement|null)?.querySelector('textarea'); if(ta) ta.value=t.text; }} style={{ padding:'5px 12px', border:`1px solid ${G[200]}`, borderRadius:99, background:'#fff', fontSize:11, color:G[600], cursor:'pointer', transition:'all 0.12s', display:'flex', alignItems:'center', gap:4 }} onMouseEnter={e=>{e.currentTarget.style.borderColor=P.purple;e.currentTarget.style.color=P.purple;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=G[200];e.currentTarget.style.color=G[600];}}>{t.emoji} {t.label}</button>))}
          </div>
        </div>
        <div data-note-block=""><textarea placeholder="Sana ne kadar değer verdiğimi anlatmak istedim… Doğum günün kutlu olsun! 🌹" rows={4} style={{ width:'100%', padding:'12px 14px', border:`1.5px solid ${G[200]}`, borderRadius:10, fontSize:13, outline:'none', color:G[800], resize:'none', boxSizing:'border-box', lineHeight:1.6, transition:'border 0.15s' }} onFocus={e=>e.target.style.borderColor=P.purple} onBlur={e=>e.target.style.borderColor=G[200]}/></div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}><div style={{ fontSize:11, color:G[400] }}>El ile yazılabilir veya baskı yapılır</div><div style={{ fontSize:11, color:G[400] }}>0 / 280</div></div>
        <div style={{ marginTop:14 }}><label style={{ fontSize:11.5, fontWeight:700, color:G[600], display:'block', marginBottom:6 }}>Kurdele Yazısı <span style={{ fontWeight:400, color:G[400] }}>(isteğe bağlı)</span></label><input placeholder="Doğum Günün Kutlu Olsun!" style={{ width:'100%', height:42, padding:'0 14px', border:`1.5px solid ${G[200]}`, borderRadius:10, fontSize:13, outline:'none', color:G[800], boxSizing:'border-box', transition:'border 0.15s' }} onFocus={e=>e.target.style.borderColor=P.purple} onBlur={e=>e.target.style.borderColor=G[200]}/></div>
      </div>
      <div style={{ display:'flex', gap:10, alignItems:'center', background:AM[50], border:`1px solid ${AM[400]}30`, borderRadius:11, padding:'12px 16px' }}><span style={{ fontSize:18 }}>🤫</span><div><div style={{ fontSize:12.5, fontWeight:700, color:AM[700] }}>Sürpriz Koruması Aktif</div><div style={{ fontSize:11.5, color:AM[600] }}>Alıcıya fiyat, gönderen adı veya sipariş detayı iletilmez.</div></div></div>
    </div>
  );
}

function DeliveryStep({ added }: { added: Set<string> }) {
  const { isMobile } = useResponsive();
  const [slot, setSlot] = useState('14-16');
  const hasExpress=added.has('d-90')||added.has('d-vip')||added.has('d-urgent');
  const SLOTS=hasExpress?[{id:'now',label:'90 Dakika İçinde ⚡',sub:'Ekspres — saat sınırı yok'}]:[{id:'10-12',label:'10:00 – 12:00',sub:'Sabah teslimatı'},{id:'12-14',label:'12:00 – 14:00',sub:'Öğlen teslimatı'},{id:'14-16',label:'14:00 – 16:00',sub:'Önerilen saat ✓',highlight:true},{id:'16-18',label:'16:00 – 18:00',sub:'İkindi teslimatı'},{id:'18-20',label:'18:00 – 20:00',sub:'Akşam teslimatı'},{id:'20-22',label:'20:00 – 22:00',sub:'Gece teslimatı',extra:129}];
  return (
    <div>
      <h2 style={{ fontSize:22, fontWeight:900, color:G[900], letterSpacing:'-0.03em', margin:'0 0 4px' }}>Teslimat Bilgileri</h2>
      <p style={{ fontSize:13, color:G[400], margin:'0 0 24px' }}>Nereye, ne zaman teslim edelim?</p>
      <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:800, color:G[800], marginBottom:16 }}>Teslimat Adresi</div>
        <div style={{ marginBottom:14 }}><label style={{ fontSize:11.5, fontWeight:700, color:G[600], display:'block', marginBottom:6 }}>İlçe *</label><select style={{ width:'100%', height:42, padding:'0 14px', border:`1.5px solid ${G[200]}`, borderRadius:10, fontSize:13, outline:'none', color:G[800], cursor:'pointer', appearance:'none' }}><option value="">İlçe seçin</option>{['Kadıköy','Beşiktaş','Şişli','Úsküdar','Ataşehir','Bakırköy','Sarıyer','Maltepe','Kartal','Pendik'].map(d=><option key={d}>{d}</option>)}</select></div>
        <div style={{ marginBottom:14 }}><label style={{ fontSize:11.5, fontWeight:700, color:G[600], display:'block', marginBottom:6 }}>Tam Adres *</label><textarea placeholder="Mahalle, cadde, sokak, kapı no, daire no" rows={3} style={{ width:'100%', padding:'12px 14px', border:`1.5px solid ${G[200]}`, borderRadius:10, fontSize:13, outline:'none', color:G[800], resize:'none', boxSizing:'border-box', lineHeight:1.6 }}/></div>
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:14 }}><Field label="Bina Adı (isteğe bağlı)" placeholder="Olimpos Apt."/><Field label="Kapıcı Talimatı (isteğe bağlı)" placeholder="Zili çalma"/></div>
      </div>
      <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:800, color:G[800], marginBottom:16 }}>Teslimat Tarihi</div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>{['Bugün','Yarın','Öbür Gün','Tarih Seç'].map((d,i)=>(<button key={d} style={{ padding:'9px 18px', border:`2px solid ${i===0?P.purple:G[200]}`, borderRadius:99, background:i===0?P.pale:'#fff', fontSize:12.5, fontWeight:i===0?700:400, color:i===0?P.purple:G[500], cursor:'pointer' }}>{d}{i===0&&<span style={{ marginLeft:6, fontSize:9, background:GR[600], color:'#fff', borderRadius:99, padding:'2px 6px' }}>Önerilen</span>}</button>))}</div>
      </div>
      <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize:13, fontWeight:800, color:G[800], marginBottom:4 }}>Teslimat Saati</div>
        {hasExpress&&<div style={{ fontSize:11.5, color:P.purple, fontWeight:600, marginBottom:12 }}>⚡ Ekspres teslimat aktif — saat seçimi gerekmez</div>}
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>{SLOTS.map(s=>(<label key={s.id} onClick={()=>setSlot(s.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderRadius:11, border:`2px solid ${slot===s.id?P.purple:G[200]}`, background:slot===s.id?P.pale:'#fff', cursor:'pointer', transition:'all 0.15s' }}><div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${slot===s.id?P.purple:G[300]}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{slot===s.id&&<div style={{ width:8, height:8, borderRadius:'50%', background:P.purple }}/>}</div><div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:700, color:slot===s.id?P.deep:G[700] }}>{s.label}</div><div style={{ fontSize:11, color:slot===s.id?P.mid:G[400], marginTop:1 }}>{s.sub}</div></div>{(s as any).extra&&<div style={{ fontSize:12, fontWeight:600, color:G[500] }}>+{fmt((s as any).extra)}</div>}{(s as any).highlight&&<span style={{ fontSize:9.5, background:GR[600], color:'#fff', borderRadius:99, padding:'2px 7px', fontWeight:700 }}>Öneri</span>}</label>))}</div>
      </div>
    </div>
  );
}

function PaymentStep({ total }: { total: number }) {
  const { isMobile } = useResponsive();
  const [method, setMethod] = useState<'card'|'bank'|'door'>('card');
  const [inst, setInst] = useState(1);
  return (
    <div>
      <h2 style={{ fontSize:22, fontWeight:900, color:G[900], letterSpacing:'-0.03em', margin:'0 0 4px' }}>Ödeme</h2>
      <p style={{ fontSize:13, color:G[400], margin:'0 0 24px' }}>iyzico güvencesiyle SSL şifreli ödeme.</p>
      <div style={{ display:'flex', flexDirection:isMobile?'column':'row', gap:10, marginBottom:20 }}>{[{id:'card',l:'💳 Kredi / Banka Kartı'},{id:'bank',l:'🏦 Havale / EFT'},{id:'door',l:'🚶 Kapıda Ödeme'}].map(m=>(<button key={m.id} onClick={()=>setMethod(m.id as any)} style={{ flex:1, padding:'11px 14px', border:`2px solid ${method===m.id?P.purple:G[200]}`, borderRadius:11, background:method===m.id?P.pale:'#fff', fontSize:12, fontWeight:method===m.id?700:400, color:method===m.id?P.purple:G[500], cursor:'pointer', transition:'all 0.15s', textAlign:'left' }}>{m.l}</button>))}</div>
      {method==='card'&&(<div style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ height:130, borderRadius:16, background:`linear-gradient(135deg,${P.deep},${P.purple})`, padding:'20px 24px', marginBottom:24, display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', right:-20, top:-20, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }}/>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}><div style={{ fontSize:22 }}>💳</div><div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em' }}>CICEKYOLLA PAY</div></div>
          <div><div style={{ fontSize:16, letterSpacing:'0.18em', color:'rgba(255,255,255,0.4)', fontFamily:'monospace', marginBottom:6 }}>•••• •••• •••• ••••</div><div style={{ fontSize:11, color:'rgba(255,255,255,0.4)' }}>AD SOYAD</div></div>
        </div>
        {[{l:'Kart Numarası',ph:'1234  5678  9012  3456'},{l:'Kart Üzerindeki İsim',ph:'AD SOYAD'}].map(f=>(<div key={f.l} style={{ marginBottom:14 }}><label style={{ fontSize:11.5, fontWeight:700, color:G[600], display:'block', marginBottom:6 }}>{f.l}</label><input placeholder={f.ph} style={{ width:'100%', height:42, padding:'0 14px', border:`1.5px solid ${G[200]}`, borderRadius:10, fontSize:13, outline:'none', color:G[800], boxSizing:'border-box', transition:'border 0.15s' }} onFocus={e=>e.target.style.borderColor=P.purple} onBlur={e=>e.target.style.borderColor=G[200]}/></div>))}
        <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:14, marginBottom:20 }}>{[{l:'Son Kullanım',ph:'AA / YY'},{l:'CVV / CVC',ph:'•••'}].map(f=>(<div key={f.l}><label style={{ fontSize:11.5, fontWeight:700, color:G[600], display:'block', marginBottom:6 }}>{f.l}</label><input placeholder={f.ph} style={{ width:'100%', height:42, padding:'0 14px', border:`1.5px solid ${G[200]}`, borderRadius:10, fontSize:13, outline:'none', color:G[800], boxSizing:'border-box', transition:'border 0.15s' }} onFocus={e=>e.target.style.borderColor=P.purple} onBlur={e=>e.target.style.borderColor=G[200]}/></div>))}</div>
        <div style={{ marginBottom:20 }}><div style={{ fontSize:12, fontWeight:700, color:G[600], marginBottom:10 }}>Taksit Seçeneği</div><div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>{[1,3,6,9,12].map(n=>(<button key={n} onClick={()=>setInst(n)} style={{ padding:'7px 14px', border:`2px solid ${inst===n?P.purple:G[200]}`, borderRadius:9, background:inst===n?P.pale:'#fff', fontSize:11.5, fontWeight:inst===n?700:400, color:inst===n?P.purple:G[500], cursor:'pointer', textAlign:'center' }}><div>{n===1?'Peşin':`${n} Taksit`}</div>{n>1&&<div style={{ fontSize:9.5, color:inst===n?P.mid:G[400], marginTop:2 }}>{fmt(Math.round(total/n))}/ay</div>}</button>))}</div></div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:16 }}><Lock style={{ width:12, height:12, color:GR[600] }}/><span style={{ fontSize:11, color:G[400] }}>256-bit SSL şifreleme • iyzico • PCI DSS • 3D Secure</span></div>
      </div>)}
      {method==='bank'&&(<div style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'24px' }}><div style={{ fontSize:13, color:G[600], lineHeight:1.8, marginBottom:16 }}>Sipariş verdikten sonra banka bilgilerimiz e-posta ile iletilecektir.</div><div style={{ background:G[50], borderRadius:10, padding:'14px 16px', fontFamily:'monospace', fontSize:12.5, color:G[700], lineHeight:2 }}><div>Banka: <strong>Garanti BBVA</strong></div><div>IBAN: <strong>TR00 0000 0000 0000 0000 0000 00</strong></div><div>Ad: <strong>Cicekyolla Çiçekçilik A.Ş.</strong></div></div></div>)}
      {method==='door'&&(<div style={{ background:'#fff', borderRadius:16, border:`1px solid ${G[200]}`, padding:'24px' }}><div style={{ fontSize:13, color:G[600], lineHeight:1.8, marginBottom:16 }}>Kurye kapınıza geldiğinde nakit veya POS ile ödeme yapabilirsiniz.</div><div style={{ background:AM[50], border:`1px solid ${AM[400]}40`, borderRadius:10, padding:'12px 16px', fontSize:12.5, color:AM[700] }}>⚠️ Kapıda ödeme için +₺15 hizmet bedeli uygulanır.</div></div>)}
    </div>
  );
}

function SuccessScreen({ total, upsellCount }: { total: number; upsellCount: number }) {
  const { isMobile } = useResponsive();
  const [pulse, setPulse] = useState(false);
  const orderNo=`CK${Math.floor(Math.random()*9000+1000)}-2026`;
  useEffect(()=>{ const t=setInterval(()=>setPulse(p=>!p),1500); return ()=>clearInterval(t); },[]);
  return (
    <div style={{ textAlign:'center', padding:'48px 24px', background:'#fff', borderRadius:20, border:`1px solid ${G[200]}`, maxWidth:580, margin:'0 auto' }}>
      <div style={{ width:80, height:80, borderRadius:'50%', background:`linear-gradient(135deg,${GR[600]},#15803D)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', boxShadow:`0 0 0 ${pulse?'16':'8'}px ${GR[600]}20`, transition:'box-shadow 0.6s' }}><Check style={{ width:36, height:36, color:'#fff' }}/></div>
      <div style={{ fontSize:28, fontWeight:900, color:G[900], letterSpacing:'-0.03em', marginBottom:8 }}>Siparişiniz Alındı! 🌹</div>
      <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:P.pale, border:`1px solid ${P.lilac}`, borderRadius:10, padding:'8px 18px', marginBottom:28 }}><span style={{ fontSize:13, color:G[500] }}>Sipariş No:</span><span style={{ fontSize:15, fontWeight:900, color:P.purple, fontFamily:'monospace' }}>{orderNo}</span></div>
      {upsellCount>0&&(<div style={{ background:AM[50], border:`1px solid ${AM[400]}40`, borderRadius:12, padding:'12px 20px', marginBottom:24, display:'inline-block' }}><span style={{ fontSize:13, fontWeight:700, color:AM[700] }}>✨ {upsellCount} ek ürünle sipariş değeriniz artırıldı — tebrikler!</span></div>)}
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:12, marginBottom:24, textAlign:'left' }}>{[{e:'📱',t:'SMS Gönderildi',s:'Onay SMS alındı'},{e:'📧',t:'E-posta Gönderildi',s:'Detaylar mailinde'},{e:'🌹',t:'Florist Başladı',s:'Hazırlık sürüyor'},{e:'🚚',t:'Kurye Atandı',s:'Bugün 14:00–16:00'}].map((item,i)=>(<div key={i} style={{ display:'flex', gap:10, alignItems:'center', background:G[50], borderRadius:11, padding:'12px' }}><span style={{ fontSize:22 }}>{item.e}</span><div><div style={{ fontSize:12, fontWeight:700, color:G[800] }}>{item.t}</div><div style={{ fontSize:10.5, color:G[400] }}>{item.s}</div></div></div>))}</div>
      <div style={{ fontSize:24, fontWeight:900, color:P.purple, marginBottom:24, letterSpacing:'-0.02em' }}>{fmt(total)}</div>
      <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
        <button style={{ padding:'12px 24px', border:'none', borderRadius:11, background:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', boxShadow:`0 5px 16px rgba(124,58,237,0.3)` }}>📍 Siparişimi Takip Et</button>
        <button style={{ padding:'12px 24px', border:`1px solid ${G[200]}`, borderRadius:11, background:'#fff', fontSize:13, color:G[600], cursor:'pointer' }}>Alışverişe Devam Et</button>
      </div>
    </div>
  );
}

export function ScreenCheckoutFlow() {
  const { isMobile, isTablet } = useResponsive();
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState([{ id:1, name:'51 Kırmızı Güller Buketi', price:1240, emoji:'🌹', variant:'Büyük Boy (45cm)', qty:1 }]);
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [justAdded, setJustAdded] = useState<string|null>(null);
  const cartTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const active=UPSELL_CATALOG.filter(u=>u.active);
  const upsellTotal=active.filter(u=>added.has(u.id)).reduce((s,u)=>s+u.price,0);
  const total=cartTotal+upsellTotal;
  function toggleAdd(id: string) { setAdded(prev=>{ const next=new Set(prev); if(next.has(id)){ next.delete(id); }else{ next.add(id); setJustAdded(id); setTimeout(()=>setJustAdded(null),800); } return next; }); }
  function toggleBundle(ids: string[]) { setAdded(prev=>{ const next=new Set(prev); const allAdded=ids.every(id=>next.has(id)); if(allAdded){ ids.forEach(id=>next.delete(id)); }else{ ids.forEach(id=>next.add(id)); } return next; }); }
  function changeQty(id: number, delta: number) { setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+delta)}:i)); }
  const isSuccess=step===6;
  const CTA_LABEL=step===1?'✨ Hediye Ekle':step===2?'Alıcı Bilgilerine Geç':step===3?'Teslimat Bilgilerine Geç':step===4?'Ödemeye Geç':'Siparişi Tamamla';
  return (
    <div style={{ minHeight:'100%', background:G[50], fontFamily:"'Inter',system-ui,sans-serif", paddingBottom:isMobile?80:0 }}>
      <div style={{ background:'#fff', borderBottom:`1px solid ${G[100]}`, padding:`14px ${isMobile?'16px':'24px'}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}><div style={{ width:32, height:32, borderRadius:10, background:`linear-gradient(135deg,#16A34A,#15803D)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🌹</div><div><div style={{ fontSize:13, fontWeight:900, color:G[900], letterSpacing:'0.04em' }}>CİCEKYOLLA</div>{!isMobile&&<div style={{ fontSize:9, color:G[400], letterSpacing:'0.1em' }}>PREMIUM FLOWER DELIVERY</div>}</div></div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}><Lock style={{ width:12, height:12, color:GR[600] }}/><span style={{ fontSize:11, color:G[400] }}>SSL Güvenli</span></div>
      </div>
      {!isSuccess&&<ProgressBar step={step}/>}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:isMobile?'16px':'28px 24px' }}>
        {isSuccess?(<SuccessScreen total={total} upsellCount={added.size}/>):(
          <div style={{ display:'grid', gridTemplateColumns:isMobile||isTablet?'1fr':'1fr 360px', gap:isMobile?16:28, alignItems:'start' }}>
            <div>
              {step===1&&<CartStep cart={cart} onChange={changeQty} added={added} onToggle={toggleAdd}/>}
              {step===2&&<UpsellStep added={added} justAdded={justAdded} onToggle={toggleAdd} onToggleBundle={toggleBundle}/>}
              {step===3&&<RecipientStep/>}
              {step===4&&<DeliveryStep added={added}/>}
              {step===5&&<PaymentStep total={total}/>}
              {!isMobile&&(<div style={{ display:'flex', justifyContent:'space-between', marginTop:28 }}>
                {step>1?(<button onClick={()=>setStep(s=>s-1)} style={{ padding:'11px 20px', border:`1.5px solid ${G[200]}`, borderRadius:10, background:'#fff', fontSize:13, color:G[600], cursor:'pointer', fontWeight:500 }}>← Geri</button>):<div/>}
                <button onClick={()=>setStep(s=>s>=5?6:s+1)} style={{ padding:'13px 28px', border:'none', borderRadius:11, background:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:13.5, fontWeight:800, cursor:'pointer', boxShadow:`0 5px 18px rgba(124,58,237,0.35)`, display:'flex', alignItems:'center', gap:7 }}>
                  {CTA_LABEL} {step<5&&<ArrowRight style={{ width:14, height:14 }}/>}{step===5&&<Lock style={{ width:13, height:13 }}/>}
                </button>
              </div>)}
            </div>
            {!isMobile&&<OrderSummary cart={cart} added={added} total={total} step={step} onNext={()=>setStep(s=>Math.min(6,s+1))}/>}
            {isMobile&&(<div style={{ background:'#fff', borderRadius:14, border:`1px solid ${G[200]}`, padding:'14px 16px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}><div style={{ fontSize:12.5, fontWeight:700, color:G[700] }}>Sipariş Özeti</div><div style={{ fontSize:16, fontWeight:900, color:P.purple }}>{total>0?`₺${total.toLocaleString('tr-TR')}`:''}</div></div>
              {active.filter(u=>added.has(u.id)).length>0&&<div style={{ fontSize:11, color:P.purple, fontWeight:600, marginBottom:8 }}>+{active.filter(u=>added.has(u.id)).length} ek ürün eklendi</div>}
              <AOVProgressBar total={total}/>
            </div>)}
          </div>
        )}
      </div>
      {isMobile&&!isSuccess&&(<div style={{ position:'fixed', bottom:0, left:0, right:0, background:'#fff', borderTop:`1px solid ${G[200]}`, padding:'12px 16px', zIndex:100, boxShadow:'0 -4px 20px rgba(0,0,0,0.12)' }}>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          {step>1&&<button onClick={()=>setStep(s=>s-1)} style={{ width:44, height:44, border:`1.5px solid ${G[200]}`, borderRadius:10, background:'#fff', fontSize:16, color:G[600], cursor:'pointer', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>←</button>}
          <button onClick={()=>setStep(s=>s>=5?6:s+1)} style={{ flex:1, height:44, border:'none', borderRadius:11, background:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:13.5, fontWeight:800, cursor:'pointer', boxShadow:`0 4px 14px rgba(124,58,237,0.35)`, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
            {step===5&&<Lock style={{ width:13, height:13 }}/>}{CTA_LABEL}{step<5&&<ArrowRight style={{ width:14, height:14 }}/>}
          </button>
        </div>
      </div>)}
    </div>
  );
}
