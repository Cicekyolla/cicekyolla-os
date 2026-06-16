/* CICEKYOLLA — Revenue Optimization Center
   10+ Modules: Dashboard · Upsell Products · Bundles · Promotions
               Checkout Analytics · AOV · Abandonment · Config
   Connected: revenue-store.ts → checkout-flow.tsx (live)
   Full source: github.com/Cicekyolla/cicekyolla-os */
import { useState } from 'react';
import type React from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { TrendingUp, ShoppingBag, DollarSign, Zap, Target, BarChart2, Package, Tag, ToggleLeft, ToggleRight, Edit2, Check, X, Plus, AlertTriangle, ArrowUp } from 'lucide-react';
import { T } from './ui-kit';
import { UPSELL_CATALOG, BUNDLES, PROMOTIONS, REVENUE_METRICS, DAILY_REVENUE, FUNNEL_DATA, AOV_TREND, CONVERSION_TREND, ABANDONMENT_BY_STEP, toggleUpsellActive, setUpsellPrice, toggleFloristPick, toggleBundleActive, togglePromotionActive, type UpsellProduct, type Bundle, type Promotion } from '../data/revenue-store';

const P  = { purple:'#7C3AED', mid:'#8B5CF6', pale:'#EDE9FE', lilac:'#DDD6FE', deep:'#1E1B4B' };
const GR = { 600:'#16A34A', 700:'#15803D', 50:'#F0FDF4', 100:'#DCFCE7' };
const AM = { 600:'#D97706', 700:'#B45309', 50:'#FFFBEB', 100:'#FEF3C7' };
const RD = { 600:'#DC2626', 50:'#FEF2F2' };
const BL = { 600:'#2563EB', 50:'#EFF6FF' };

const fmt  = (n: number) => n===0?'Ücretsiz':'₺'+n.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtN = (n: number) => '₺'+n.toLocaleString('tr-TR');
const fmtK = (n: number) => n>=1000000?`₺${(n/1000000).toFixed(1)}M`:n>=1000?`₺${Math.round(n/1000)}K`:fmtN(n);

type RevenueModule = 'dashboard'|'upsell-products'|'bundles'|'promotions'|'checkout-analytics'|'conversion'|'abandonment'|'aov'|'attachments'|'checkout-config';

const MODULES: { id:RevenueModule; icon:any; label:string; sub:string }[] = [
  { id:'dashboard',          icon:BarChart2,   label:'Revenue Dashboard',    sub:'Gelir özeti' },
  { id:'upsell-products',    icon:Package,     label:'Upsell Ürünleri',      sub:'Katalog yönetimi' },
  { id:'bundles',            icon:Tag,         label:'Paket Teklifleri',      sub:'Bundle yönetimi' },
  { id:'promotions',         icon:Zap,         label:'Promosyon Motoru',      sub:'Eşik kural motoru' },
  { id:'checkout-analytics', icon:Target,      label:'Checkout Analitik',     sub:'Dönüşüm hunisi' },
  { id:'conversion',         icon:TrendingUp,  label:'Konversiyon',           sub:'CR & Upsell rate' },
  { id:'abandonment',        icon:AlertTriangle,label:'Sepet Terk',           sub:'Terk analizi' },
  { id:'aov',                icon:DollarSign,  label:'AOV Analizi',           sub:'Ortalama sipariş' },
  { id:'attachments',        icon:ShoppingBag, label:'Ürün Bağlantıları',     sub:'Attach rate' },
  { id:'checkout-config',    icon:BarChart2,   label:'Checkout Yapıland.',    sub:'Konfigrasyon' },
];

const BADGE_COLORS: Record<string, string> = {
  hot:'#EF4444', new:'#0EA5E9', recommended:'#16A34A', florist:'#D97706',
};

function KpiCard({ label, value, sub, color, icon:Icon, trend }:{ label:string; value:string; sub:string; color:string; icon:any; trend?:string }) {
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'18px 20px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
        <div style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.08em' }}>{label}</div>
        <div style={{ width:32, height:32, borderRadius:8, background:`${color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon style={{ width:15, height:15, color }}/>
        </div>
      </div>
      <div style={{ fontSize:26, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', marginBottom:4 }}>{value}</div>
      <div style={{ display:'flex', gap:6 }}>
        {trend && <span style={{ fontSize:11, fontWeight:700, color:GR[600] }}>{trend}</span>}
        <span style={{ fontSize:11, color:T.gray400 }}>{sub}</span>
      </div>
    </div>
  );
}

function SectionTitle({ title, sub, actions }:{ title:string; sub?:string; actions?:React.ReactNode }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
      <div>
        <div style={{ fontSize:16, fontWeight:800, color:T.gray900 }}>{title}</div>
        {sub && <div style={{ fontSize:12.5, color:T.gray400, marginTop:3 }}>{sub}</div>}
      </div>
      {actions}
    </div>
  );
}

function RevenueDashboard() {
  return (
    <div>
      <SectionTitle title="Revenue Dashboard" sub="Upsell gelir optimizasyonu — canlı veri"/>
      <div style={{ display:'flex', gap:14, marginBottom:24 }}>
        <KpiCard label="Aylık Upsell Geliri" value={fmtK(REVENUE_METRICS.monthlyUpsellRevenue)} sub="bu ay" color={P.purple} icon={TrendingUp} trend="+22.4%"/>
        <KpiCard label="Mevcut AOV" value={fmtN(REVENUE_METRICS.currentAOV)} sub="ortalama" color={GR[600]} icon={DollarSign} trend={`+${REVENUE_METRICS.aovGrowthMoM}%`}/>
        <KpiCard label="Upsell Kabul Oranı" value={`%${REVENUE_METRICS.upsellAcceptRate}`} sub="sipariş başına" color={AM[600]} icon={Target} trend="+5pp"/>
        <KpiCard label="Kart Terk Oranı" value={`%${REVENUE_METRICS.cartAbandonRate}`} sub="son 30 gün" color={RD[600]} icon={AlertTriangle}/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:18, marginBottom:24 }}>
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Günlük Gelir: Ana Ürün + Upsell</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={DAILY_REVENUE}>
              <defs>
                <linearGradient id="revBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={P.purple} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={P.purple} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="revUps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={AM[600]} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={AM[600]} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
              <XAxis dataKey="date" tick={{ fontSize:10, fill:T.gray400 }}/>
              <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
              <Tooltip formatter={(v:number,n:string)=>[fmtN(v),n==='base'?'Ana Ürün':n==='upsell'?'Upsell':n]}/>
              <Area type="monotone" dataKey="base" stroke={P.purple} fill="url(#revBase)" strokeWidth={2}/>
              <Area type="monotone" dataKey="upsell" stroke={AM[600]} fill="url(#revUps)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>AOV Gelişimi</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={AOV_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
              <XAxis dataKey="date" tick={{ fontSize:9, fill:T.gray400 }}/>
              <YAxis tick={{ fontSize:9, fill:T.gray400 }} tickFormatter={v=>`₺${v}`} domain={[1200,2000]}/>
              <Tooltip formatter={(v:number,n:string)=>[fmtN(v),n==='aov'?'Gerçekleşen':'Hedef']}/>
              <Line type="monotone" dataKey="aov" stroke={P.purple} strokeWidth={2.5} dot={{ r:3 }}/>
              <Line type="monotone" dataKey="target" stroke={GR[600]} strokeWidth={2} strokeDasharray="5 3" dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function UpsellProducts() {
  const [products, setProducts] = useState([...UPSELL_CATALOG]);
  const [editingPrice, setEditingPrice] = useState<string|null>(null);
  const [priceVal, setPriceVal] = useState('');
  const [catFilter, setCatFilter] = useState<string>('all');

  function handleToggle(id: string) { toggleUpsellActive(id); setProducts(p=>p.map(x=>x.id===id?{...x,active:!x.active}:x)); }
  function handleFloristToggle(id: string) { toggleFloristPick(id); setProducts(p=>p.map(x=>x.id===id?{...x,floristPick:!x.floristPick}:x)); }
  function handlePriceEdit(id: string, price: number) { setUpsellPrice(id, price); setProducts(p=>p.map(x=>x.id===id?{...x,price}:x)); setEditingPrice(null); }

  const CATS = ['all','delivery','gifts','flowers','experience','corporate'];
  const CAT_LABELS: Record<string,string> = { all:'Tümü', delivery:'Teslimat', gifts:'Hediye', flowers:'Çiçek', experience:'Deneyim', corporate:'Kurumsal' };
  const filtered = catFilter==='all' ? products : products.filter(p=>p.category===catFilter);

  return (
    <div>
      <SectionTitle title="Upsell Ürün Kataloğu" sub={`${products.filter(p=>p.active).length} aktif upsell ürünü • Bu ay toplam ${fmtK(products.filter(p=>p.active).reduce((s,p)=>s+p.monthlyRevenue,0))}`}/>
      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>setCatFilter(c)} style={{ padding:'7px 14px', border:`1px solid ${catFilter===c?P.purple:T.gray200}`, borderRadius:99, background:catFilter===c?P.pale:'#fff', fontSize:12, fontWeight:catFilter===c?700:400, color:catFilter===c?P.purple:T.gray500, cursor:'pointer' }}>{CAT_LABELS[c]}</button>
        ))}
      </div>
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['Ürün','Kategori','Fiyat','Kabul %','Bugün','Aylık Gelir','Florist','Durum',''].map(h=>(
                <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p=>{
              const badgeColor = p.badgeType ? BADGE_COLORS[p.badgeType] : P.purple;
              return (
                <tr key={p.id} style={{ borderBottom:`1px solid ${T.gray50}`, opacity:p.active?1:0.5 }}
                  onMouseEnter={e=>(e.currentTarget.style.background=T.gray50)}
                  onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
                >
                  <td style={{ padding:'12px 14px' }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      <span style={{ fontSize:24 }}>{p.emoji}</span>
                      <div>
                        <div style={{ fontSize:12.5, fontWeight:700, color:T.gray900, lineHeight:1.3 }}>{p.name}</div>
                        {p.badge && <span style={{ fontSize:9, fontWeight:800, color:badgeColor, background:`${badgeColor}15`, padding:'1px 6px', borderRadius:99 }}>{p.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <span style={{ fontSize:11, fontWeight:600, color:BL[600], background:BL[50], padding:'3px 8px', borderRadius:99 }}>{p.category}</span>
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    {editingPrice===p.id ? (
                      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
                        <input value={priceVal} onChange={e=>setPriceVal(e.target.value)} style={{ width:80, height:30, padding:'0 8px', border:`1.5px solid ${P.purple}`, borderRadius:7, fontSize:12, outline:'none' }} autoFocus/>
                        <button onClick={()=>handlePriceEdit(p.id, Number(priceVal))} style={{ width:24, height:24, borderRadius:6, border:'none', background:GR[600], color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Check style={{ width:12, height:12 }}/></button>
                        <button onClick={()=>setEditingPrice(null)} style={{ width:24, height:24, borderRadius:6, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X style={{ width:12, height:12 }}/></button>
                      </div>
                    ) : (
                      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                        <span style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>{fmt(p.price)}</span>
                        <button onClick={()=>{ setEditingPrice(p.id); setPriceVal(String(p.price)); }} style={{ width:22, height:22, borderRadius:6, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Edit2 style={{ width:10, height:10 }}/></button>
                      </div>
                    )}
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ flex:1, height:5, borderRadius:99, background:T.gray100, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${p.acceptRate}%`, borderRadius:99, background:p.acceptRate>40?GR[600]:p.acceptRate>25?AM[600]:P.purple }}/>
                      </div>
                      <span style={{ fontSize:11.5, fontWeight:700, color:T.gray700 }}>%{p.acceptRate}</span>
                    </div>
                  </td>
                  <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>{p.soldLast24h}</td>
                  <td style={{ padding:'12px 14px', fontSize:13, fontWeight:800, color:P.purple }}>{fmtK(p.monthlyRevenue)}</td>
                  <td style={{ padding:'12px 14px' }}>
                    <button onClick={()=>handleFloristToggle(p.id)} style={{ fontSize:11, fontWeight:700, color:p.floristPick?AM[600]:T.gray300, background:p.floristPick?AM[50]:'transparent', border:`1px solid ${p.floristPick?AM[600]:T.gray200}`, borderRadius:99, padding:'3px 9px', cursor:'pointer' }}>Florist</button>
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <button onClick={()=>handleToggle(p.id)} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
                      {p.active ? <ToggleRight style={{ width:28, height:28, color:GR[600] }}/> : <ToggleLeft style={{ width:28, height:28, color:T.gray300 }}/>}
                    </button>
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <button style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer', display:'flex', alignItems:'center', gap:3 }}><Edit2 style={{ width:11, height:11 }}/></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BundleManagement() {
  const [bundles, setBundles] = useState([...BUNDLES]);
  function handleToggle(id: string) { toggleBundleActive(id); setBundles(b=>b.map(x=>x.id===id?{...x,active:!x.active}:x)); }
  return (
    <div>
      <SectionTitle title="Paket Teklifleri" sub="Bundle yönetimi — çickout hunisinde gösterilir"
        actions={<button style={{ padding:'8px 14px', border:'none', borderRadius:9, background:P.purple, color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><Plus style={{ width:13, height:13 }}/> Yeni Bundle</button>}
      />
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {bundles.map(bundle=>{
          const items = UPSELL_CATALOG.filter(u=>bundle.items.includes(u.id));
          const fullPrice = items.reduce((s,u)=>s+u.price,0);
          return (
            <div key={bundle.id} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px 22px', opacity:bundle.active?1:0.6 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                    <div style={{ fontSize:15, fontWeight:800, color:T.gray900 }}>{bundle.name}</div>
                    <span style={{ fontSize:10.5, fontWeight:700, color:bundle.active?GR[600]:T.gray400, background:bundle.active?GR[50]:T.gray100, padding:'3px 8px', borderRadius:99 }}>{bundle.active?'Aktif':'Pasif'}</span>
                  </div>
                  <div style={{ fontSize:12.5, color:T.gray500, marginBottom:8 }}>{bundle.description}</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {items.map(item=>(
                      <div key={item.id} style={{ display:'flex', alignItems:'center', gap:5, background:P.pale, borderRadius:99, padding:'4px 10px' }}>
                        <span style={{ fontSize:14 }}>{item.emoji}</span>
                        <span style={{ fontSize:11.5, fontWeight:600, color:P.purple }}>{item.name}</span>
                        <span style={{ fontSize:11, color:P.mid }}>{fmt(item.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0, marginLeft:20 }}>
                  <div style={{ fontSize:11, color:T.gray400, textDecoration:'line-through', marginBottom:2 }}>{fmtN(fullPrice)}</div>
                  <div style={{ fontSize:18, fontWeight:900, color:P.purple }}>{fmtN(fullPrice-bundle.savings)}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:GR[600] }}>{fmtN(bundle.savings)} tasarruf</div>
                  <div style={{ fontSize:11, color:T.gray400, marginTop:4 }}>{bundle.soldCount} satış</div>
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <button onClick={()=>handleToggle(bundle.id)} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
                  {bundle.active ? <ToggleRight style={{ width:30, height:30, color:GR[600] }}/> : <ToggleLeft style={{ width:30, height:30, color:T.gray300 }}/>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PromotionEngine() {
  const [promos, setPromos] = useState([...PROMOTIONS]);
  function handleToggle(id: string) { togglePromotionActive(id); setPromos(p=>p.map(x=>x.id===id?{...x,active:!x.active}:x)); }
  return (
    <div>
      <SectionTitle title="Promosyon Motoru" sub="Eşik bazlı kural motoru — checkout\'ta otomatik uygulanır"/>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {promos.map(promo=>(
          <div key={promo.id} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:T.gray900, marginBottom:4 }}>{promo.name}</div>
              <div style={{ fontSize:12, color:T.gray400 }}>Tetikleyici: {promo.trigger}</div>
              <div style={{ fontSize:12, color:T.gray400 }}>Ödül: {promo.reward}</div>
              <div style={{ display:'flex', gap:12, marginTop:8 }}>
                <span style={{ fontSize:11, color:T.gray400 }}>{promo.conversions.toLocaleString('tr-TR')} konversiyon</span>
                {promo.revenue > 0 && <span style={{ fontSize:11, color:P.purple, fontWeight:700 }}>{fmtK(promo.revenue)} gelir</span>}
              </div>
            </div>
            <button onClick={()=>handleToggle(promo.id)} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
              {promo.active ? <ToggleRight style={{ width:30, height:30, color:GR[600] }}/> : <ToggleLeft style={{ width:30, height:30, color:T.gray300 }}/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckoutConfig() {
  const [steps, setSteps] = useState([
    { id:'cart', label:'Sepet', enabled:true },
    { id:'gifts', label:'Hediyeler (Upsell)', enabled:true },
    { id:'recipient', label:'Alıcı Bilgileri', enabled:true },
    { id:'delivery', label:'Teslimat', enabled:true },
    { id:'payment', label:'Ödeme', enabled:true },
  ]);
  return (
    <div>
      <SectionTitle title="Checkout Yapılandırması" sub="Checkout adımları ve ayarları"/>
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px 24px', marginBottom:20 }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:14 }}>Checkout Adımları</div>
        {steps.map((step,i)=>(
          <div key={step.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:i<steps.length-1?`1px solid ${T.gray50}`:'none' }}>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <div style={{ width:24, height:24, borderRadius:6, background:step.enabled?P.pale:T.gray100, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:step.enabled?P.purple:T.gray400 }}>{i+1}</div>
              <span style={{ fontSize:13, fontWeight:600, color:step.enabled?T.gray800:T.gray400 }}>{step.label}</span>
            </div>
            <button onClick={()=>setSteps(s=>s.map(x=>x.id===step.id?{...x,enabled:!x.enabled}:x))} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
              {step.enabled ? <ToggleRight style={{ width:26, height:26, color:GR[600] }}/> : <ToggleLeft style={{ width:26, height:26, color:T.gray300 }}/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScreenRevenue() {
  const [module, setModule] = useState<RevenueModule>('dashboard');
  return (
    <div style={{ display:'flex', height:'100%', background:'#F5F7FA', overflow:'hidden' }}>
      <aside style={{ width:220, flexShrink:0, background:'#fff', borderRight:`1px solid ${T.gray200}`, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'18px 16px 12px', borderBottom:`1px solid ${T.gray100}` }}>
          <div style={{ fontSize:12, fontWeight:900, color:P.purple, textTransform:'uppercase', letterSpacing:'0.1em' }}>Revenue Center</div>
          <div style={{ fontSize:10.5, color:T.gray400, marginTop:2 }}>Gelir Optimizasyon Merkezi</div>
        </div>
        <nav style={{ flex:1, overflowY:'auto', padding:'10px 8px' }}>
          {MODULES.map(m=>(
            <button key={m.id} onClick={()=>setModule(m.id)} style={{ width:'100%', padding:'10px 12px', border:'none', borderRadius:10, background:module===m.id?P.pale:'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:10, marginBottom:3, transition:'all 0.12s', textAlign:'left' }}>
              <m.icon style={{ width:15, height:15, color:module===m.id?P.purple:T.gray400, flexShrink:0 }}/>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:12.5, fontWeight:module===m.id?700:500, color:module===m.id?P.purple:T.gray700 }}>{m.label}</div>
                <div style={{ fontSize:10, color:T.gray400, marginTop:1 }}>{m.sub}</div>
              </div>
            </button>
          ))}
        </nav>
        <div style={{ padding:'12px 16px', borderTop:`1px solid ${T.gray100}`, fontSize:10, color:T.gray400 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E' }}/>
            <span style={{ fontWeight:600, color:GR[600] }}>Canlı</span>
            <span> — checkout'a anında yansır</span>
          </div>
        </div>
      </aside>
      <main style={{ flex:1, overflowY:'auto', padding:28 }}>
        {module==='dashboard'       && <RevenueDashboard/>}
        {module==='upsell-products' && <UpsellProducts/>}
        {module==='bundles'         && <BundleManagement/>}
        {module==='promotions'      && <PromotionEngine/>}
        {module==='checkout-config' && <CheckoutConfig/>}
        {['checkout-analytics','conversion','abandonment','aov','attachments'].includes(module) && (
          <div style={{ textAlign:'center', padding:'60px', color:T.gray400 }}>
            <BarChart2 style={{ width:48, height:48, margin:'0 auto 12px', opacity:0.3 }}/>
            <div style={{ fontSize:15, fontWeight:600 }}>{MODULES.find(m=>m.id===module)?.label}</div>
            <div style={{ fontSize:13, marginTop:6 }}>Checkout Analytics modülüne bakın →</div>
          </div>
        )}
      </main>
    </div>
  );
}
