/* CICEKYOLLA KARGO ADMIN — Shipping Management Center
   8-Module: Dashboard · Provinces · Products · Delivery Times
             Rules · Campaigns · Analytics · Performance
   Full source: github.com/Cicekyolla/cicekyolla-os */
import { useState } from 'react';
import type React from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart,
} from 'recharts';
import { Truck, Package, MapPin, Clock, TrendingUp, BarChart2, Tag, ToggleLeft, ToggleRight, Shield, CheckCircle2, Edit2, Plus, ExternalLink } from 'lucide-react';
import { T } from './ui-kit';
import {
  KARGO_PRODUCTS, PROVINCES, SHIPPING_RULES, KARGO_CAMPAIGNS,
  KARGO_DAILY, KARGO_METRICS, CARRIER_PERFORMANCE, KARGO_CRM_SUMMARY,
  toggleKargoProduct, toggleShippingRule, toggleKargoCampaign,
  type Province,
} from '../data/kargo-store';
import { REVENUE_METRICS } from '../data/revenue-store';
import { useNav } from '../App';

const G  = { 600:'#16A34A', 700:'#15803D', 50:'#F0FDF4', 100:'#DCFCE7', 200:'#BBF7D0', 800:'#166534' };
const P  = { purple:'#7C3AED', mid:'#8B5CF6', pale:'#EDE9FE', deep:'#1E1B4B' };
const AM = { 600:'#D97706', 50:'#FFFBEB', 100:'#FEF3C7' };
const BL = { 600:'#2563EB', 50:'#EFF6FF', 100:'#DBEAFE' };
const RD = { 600:'#DC2626', 50:'#FEF2F2' };

const fmt  = (n: number) => n === 0 ? 'Ücretsiz' : '₺' + n.toLocaleString('tr-TR', { minimumFractionDigits:2, maximumFractionDigits:2 });
const fmtN = (n: number) => '₺' + n.toLocaleString('tr-TR');
const pct  = (n: number) => `%${n.toFixed(1)}`;

type Module = 'dashboard'|'provinces'|'products'|'delivery-times'|'rules'|'campaigns'|'analytics'|'performance';

const MODULES: { id:Module; icon:any; label:string; badge?:string }[] = [
  { id:'dashboard',     icon:BarChart2,  label:'Kargo Dashboard' },
  { id:'provinces',     icon:MapPin,     label:'İl Fiyatlandırması',  badge:'81' },
  { id:'products',      icon:Package,    label:'Kargo Ürünleri',      badge:String(KARGO_PRODUCTS.filter(p=>p.active).length) },
  { id:'delivery-times',icon:Clock,      label:'Teslimat Süreleri' },
  { id:'rules',         icon:Shield,     label:'Kargo Kuralları',     badge:String(SHIPPING_RULES.filter(r=>r.active).length) },
  { id:'campaigns',     icon:Tag,        label:'Kampanyalar',         badge:String(KARGO_CAMPAIGNS.filter(c=>c.active).length) },
  { id:'analytics',     icon:TrendingUp, label:'Kargo Analitik' },
  { id:'performance',   icon:Truck,      label:'Taşıyıcı Performans' },
];

const ZONE_COLORS = { 1:G[600], 2:BL[600], 3:AM[600] };
const ZONE_LABELS = { 1:'Bölge 1', 2:'Bölge 2', 3:'Bölge 3' };

function KpiCard({ label, value, sub, color, icon:Icon, trend }:{ label:string; value:string; sub:string; color:string; icon:any; trend?:string }) {
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'18px 20px', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
        <div style={{ fontSize:11, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.08em' }}>{label}</div>
        <div style={{ width:32, height:32, borderRadius:8, background:`${color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon style={{ width:15, height:15, color }}/>
        </div>
      </div>
      <div style={{ fontSize:26, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', marginBottom:4 }}>{value}</div>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        {trend && <span style={{ fontSize:11, fontWeight:700, color:G[600] }}>{trend}</span>}
        <span style={{ fontSize:11, color:T.gray400 }}>{sub}</span>
      </div>
    </div>
  );
}

function KargoDashboard() {
  const { navigate } = useNav();
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:16, fontWeight:800, color:T.gray900 }}>Kargo Dashboard</div>
        <div style={{ fontSize:12.5, color:T.gray400, marginTop:3 }}>Türkiye Geneli Kargo performans özeti</div>
      </div>
      <div style={{ display:'flex', gap:10, marginBottom:22 }}>
        {[
          { label:'Revenue Center', color:P.purple, bg:P.pale, screen:'revenue', note:`Kargo katkısı: ${fmtN(KARGO_METRICS.monthlyRevenue)}` },
          { label:'CRM Müşterileri', color:G[600], bg:G[50], screen:'crm', note:`${KARGO_CRM_SUMMARY.totalKargoCustomers} kargo müşterisi` },
          { label:'Ürün Merkezi', color:BL[600], bg:BL[50], screen:'products', note:`${KARGO_PRODUCTS.filter(p=>p.active).length} aktif ürün` },
        ].map((item,i) => (
          <button key={i} onClick={()=>navigate(item.screen as any)} style={{ flex:1, background:item.bg, border:`1px solid ${item.color}30`, borderRadius:12, padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', transition:'all 0.15s' }}>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:item.color }}>{item.label}</div>
              <div style={{ fontSize:11, color:T.gray500, marginTop:2 }}>{item.note}</div>
            </div>
            <ExternalLink style={{ width:14, height:14, color:item.color }}/>
          </button>
        ))}
      </div>
      <div style={{ display:'flex', gap:14, marginBottom:24 }}>
        <KpiCard label="Aylık Kargo Geliri" value={fmtN(KARGO_METRICS.monthlyRevenue)} sub="bu ay" color={G[600]} icon={TrendingUp} trend="+14.2%"/>
        <KpiCard label="Kargo Sipariş Sayısı" value={KARGO_METRICS.monthlyOrders.toLocaleString('tr-TR')} sub="bu ay" color={P.purple} icon={Package} trend="+8.7%"/>
        <KpiCard label="Zamanında Teslimat" value={pct(KARGO_METRICS.onTimeRate)} sub="son 30 gün" color={BL[600]} icon={CheckCircle2} trend="+1.2pp"/>
        <KpiCard label="Kargo AOV" value={fmtN(KARGO_METRICS.avgOrderValue)} sub={`vs site AOV ${fmtN(REVENUE_METRICS.currentAOV)}`} color={AM[600]} icon={BarChart2}/>
      </div>
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px', marginBottom:20 }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Günlük Kargo Siparilşleri & Gelir</div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={KARGO_DAILY}>
            <defs>
              <linearGradient id="kaDailyG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={G[600]} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={G[600]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
            <XAxis dataKey="date" tick={{ fontSize:10, fill:T.gray400 }}/>
            <YAxis yAxisId="l" tick={{ fontSize:10, fill:T.gray400 }}/>
            <YAxis yAxisId="r" orientation="right" tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
            <Tooltip/>
            <Area yAxisId="l" type="monotone" dataKey="orders" stroke={G[600]} fill="url(#kaDailyG)" strokeWidth={2} name="Sipariş"/>
            <Bar yAxisId="r" dataKey="revenue" fill={P.purple} radius={[3,3,0,0]} opacity={0.7} name="Gelir"/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Provinces() {
  const [search, setSearch] = useState('');
  const [zone, setZone] = useState<number|null>(null);
  const filtered = PROVINCES.filter((p:Province) => {
    if (zone !== null && p.zone !== zone) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
        <div style={{ fontSize:16, fontWeight:800, color:T.gray900 }}>81 İl Fiyatlandırması</div>
        <div style={{ display:'flex', gap:8 }}>
          <input placeholder="İl ara..." value={search} onChange={e=>setSearch(e.target.value)} style={{ height:34, padding:'0 12px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:13, outline:'none' }}/>
          {[null,1,2,3].map(z=>(
            <button key={String(z)} onClick={()=>setZone(z)} style={{ padding:'7px 14px', border:`1px solid ${zone===z?G[600]:T.gray200}`, borderRadius:8, background:zone===z?G[50]:'#fff', fontSize:12, fontWeight:zone===z?700:400, color:zone===z?G[600]:T.gray500, cursor:'pointer' }}>
              {z===null?'Tümü':ZONE_LABELS[z as keyof typeof ZONE_LABELS]}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['İl','Bölge','Standart Kargo','Ekspres Kargo','Ücretsiz Kargo','Teslimat Süresi',''].map(h=>(
                <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0,20).map((p:Province)=>(
              <tr key={p.name} style={{ borderBottom:`1px solid ${T.gray50}` }}
                onMouseEnter={e=>(e.currentTarget.style.background=T.gray50)}
                onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
              >
                <td style={{ padding:'10px 14px', fontSize:13, fontWeight:600, color:T.gray800 }}>{p.name}</td>
                <td style={{ padding:'10px 14px' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:ZONE_COLORS[p.zone as keyof typeof ZONE_COLORS], background:`${ZONE_COLORS[p.zone as keyof typeof ZONE_COLORS]}15`, padding:'3px 9px', borderRadius:99 }}>{ZONE_LABELS[p.zone as keyof typeof ZONE_LABELS]}</span>
                </td>
                <td style={{ padding:'10px 14px', fontSize:12.5, color:T.gray700 }}>{fmt(p.standardFee)}</td>
                <td style={{ padding:'10px 14px', fontSize:12.5, color:T.gray700 }}>{fmt(p.expressFee)}</td>
                <td style={{ padding:'10px 14px', fontSize:12.5, color:G[600], fontWeight:600 }}>{fmt(p.freeAt)}+</td>
                <td style={{ padding:'10px 14px', fontSize:12, color:T.gray500 }}>{p.deliveryMin}-{p.deliveryMax} gün</td>
                <td style={{ padding:'10px 14px' }}>
                  <button style={{ padding:'4px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                    <Edit2 style={{ width:10, height:10 }}/> Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 20 && <div style={{ padding:'12px 20px', textAlign:'center', fontSize:12, color:T.gray400 }}>+{filtered.length-20} il daha — filtrele</div>}
      </div>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([...KARGO_PRODUCTS]);
  function toggle(id:string) { toggleKargoProduct(id); setProducts(p => p.map(x => x.id===id?{...x,active:!x.active}:x)); }
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <div style={{ fontSize:16, fontWeight:800, color:T.gray900 }}>Kargo Ürünleri</div>
          <div style={{ fontSize:12.5, color:T.gray400, marginTop:3 }}>{products.filter(p=>p.active).length} aktif ürün</div>
        </div>
        <button style={{ padding:'8px 14px', border:'none', borderRadius:9, background:G[600], color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Plus style={{ width:13, height:13 }}/> Yeni Ürün
        </button>
      </div>
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['Ürün','Kategori','Fiyat','Stok','Satış (30g)','Durum',''].map(h=>(
                <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p=>(
              <tr key={p.id} style={{ borderBottom:`1px solid ${T.gray50}`, opacity:p.active?1:0.5 }}
                onMouseEnter={e=>(e.currentTarget.style.background=T.gray50)}
                onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
              >
                <td style={{ padding:'12px 14px' }}>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <span style={{ fontSize:24 }}>{p.emoji}</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:T.gray800 }}>{p.name}</div>
                      <div style={{ fontSize:11, color:T.gray400 }}>{p.shortDesc}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <span style={{ fontSize:11, fontWeight:600, color:BL[600], background:BL[50], padding:'3px 8px', borderRadius:99 }}>{p.badge}</span>
                </td>
                <td style={{ padding:'12px 14px', fontSize:13, fontWeight:800, color:T.gray900 }}>{fmt(p.price)}</td>
                <td style={{ padding:'12px 14px', fontSize:12.5, color:p.stock<10?RD[600]:T.gray600 }}>{p.stock}</td>
                <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>{p.sold30d}</td>
                <td style={{ padding:'12px 14px' }}>
                  <button onClick={()=>toggle(p.id)} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
                    {p.active ? <ToggleRight style={{ width:28, height:28, color:G[600] }}/> : <ToggleLeft style={{ width:28, height:28, color:T.gray300 }}/>}
                  </button>
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <button style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Edit2 style={{ width:11, height:11 }}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Rules() {
  const [rules, setRules] = useState([...SHIPPING_RULES]);
  function toggle(id:string) { toggleShippingRule(id); setRules(r => r.map(x => x.id===id?{...x,active:!x.active}:x)); }
  return (
    <div>
      <div style={{ fontSize:16, fontWeight:800, color:T.gray900, marginBottom:20 }}>Kargo Kuralları</div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {rules.map(rule=>(
          <div key={rule.id} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', opacity:rule.active?1:0.55 }}>
            <div>
              <div style={{ fontSize:13.5, fontWeight:700, color:T.gray900 }}>{rule.name}</div>
              <div style={{ fontSize:12, color:T.gray400, marginTop:3 }}>Tetikleyici: {rule.trigger} → İndirim: {rule.discount}</div>
            </div>
            <button onClick={()=>toggle(rule.id)} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
              {rule.active ? <ToggleRight style={{ width:28, height:28, color:G[600] }}/> : <ToggleLeft style={{ width:28, height:28, color:T.gray300 }}/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Campaigns() {
  const [campaigns, setCampaigns] = useState([...KARGO_CAMPAIGNS]);
  function toggle(id:string) { toggleKargoCampaign(id); setCampaigns(c => c.map(x => x.id===id?{...x,active:!x.active}:x)); }
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
        <div style={{ fontSize:16, fontWeight:800, color:T.gray900 }}>Kargo Kampanyaları</div>
        <button style={{ padding:'8px 14px', border:'none', borderRadius:9, background:G[600], color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Plus style={{ width:13, height:13 }}/> Yeni Kampanya
        </button>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {campaigns.map(camp=>(
          <div key={camp.id} style={{ background:'#fff', borderRadius:12, border:`2px solid ${camp.active?G[200]:T.gray200}`, padding:'18px 20px', opacity:camp.active?1:0.6 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  <div style={{ fontSize:14.5, fontWeight:800, color:T.gray900 }}>{camp.name}</div>
                  <span style={{ fontSize:10.5, fontWeight:700, color:camp.active?G[800]:T.gray400, background:camp.active?G[100]:T.gray100, padding:'3px 8px', borderRadius:99 }}>{camp.active?'Aktif':'Pasif'}</span>
                </div>
                <div style={{ fontSize:12.5, color:T.gray500 }}>{camp.description}</div>
                <div style={{ display:'flex', gap:14, marginTop:8 }}>
                  <span style={{ fontSize:11, color:T.gray400 }}>📅 {camp.startDate} – {camp.endDate}</span>
                  <span style={{ fontSize:11, color:T.gray400 }}>💾 {camp.usageCount} kullanım</span>
                </div>
              </div>
              <button onClick={()=>toggle(camp.id)} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
                {camp.active ? <ToggleRight style={{ width:30, height:30, color:G[600] }}/> : <ToggleLeft style={{ width:30, height:30, color:T.gray300 }}/>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Performance() {
  return (
    <div>
      <div style={{ fontSize:16, fontWeight:800, color:T.gray900, marginBottom:20 }}>Taşıyıcı Performansı</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {CARRIER_PERFORMANCE.map((c,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
            <div style={{ fontSize:15, fontWeight:800, color:T.gray900, marginBottom:12 }}>{c.carrier}</div>
            {[
              { l:'Zamanında Teslimat', v:`%${c.onTime}`, c:c.onTime>=90?G[600]:AM[600] },
              { l:'Aylık Hacim', v:c.monthlyVolume.toLocaleString('tr-TR'), c:T.gray700 },
              { l:'Ortalama Süre', v:`${c.avgDays} gün`, c:T.gray700 },
              { l:'Müşteri Memnuniyeti', v:`%${c.satisfaction}`, c:c.satisfaction>=85?G[600]:AM[600] },
            ].map((s,j)=>(
              <div key={j} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:`1px solid ${T.gray50}` }}>
                <span style={{ fontSize:12, color:T.gray400 }}>{s.l}</span>
                <span style={{ fontSize:12.5, fontWeight:700, color:s.c }}>{s.v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScreenKargoAdmin() {
  const [module, setModule] = useState<Module>('dashboard');
  return (
    <div style={{ display:'flex', height:'100%', background:'#F5F7FA', overflow:'hidden' }}>
      <aside style={{ width:220, flexShrink:0, background:'#fff', borderRight:`1px solid ${T.gray200}`, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'18px 16px 12px', borderBottom:`1px solid ${T.gray100}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
            <Truck style={{ width:15, height:15, color:G[600] }}/>
            <div style={{ fontSize:12, fontWeight:900, color:G[600], textTransform:'uppercase', letterSpacing:'0.1em' }}>Kargo Admin</div>
          </div>
          <div style={{ fontSize:10.5, color:T.gray400 }}>Türkiye Kargo Yönetim Merkezi</div>
        </div>
        <nav style={{ flex:1, overflowY:'auto', padding:'10px 8px' }}>
          {MODULES.map(m=>(
            <button key={m.id} onClick={()=>setModule(m.id)} style={{ width:'100%', padding:'10px 12px', border:'none', borderRadius:10, background:module===m.id?G[50]:'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:10, marginBottom:3, transition:'all 0.12s', textAlign:'left' }}>
              <m.icon style={{ width:15, height:15, color:module===m.id?G[600]:T.gray400, flexShrink:0 }}/>
              <span style={{ fontSize:12.5, fontWeight:module===m.id?700:500, color:module===m.id?G[600]:T.gray700 }}>{m.label}</span>
              {m.badge && <span style={{ marginLeft:'auto', fontSize:10, fontWeight:800, color:'#fff', background:G[600], borderRadius:99, padding:'1px 6px', flexShrink:0 }}>{m.badge}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding:'12px 16px', borderTop:`1px solid ${T.gray100}`, fontSize:10, color:T.gray400 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E' }}/>
            <span style={{ fontWeight:600, color:G[600] }}>Canlı</span>
            <span>— değişiklikler anında yansır</span>
          </div>
        </div>
      </aside>
      <main style={{ flex:1, overflowY:'auto', padding:28 }}>
        {module==='dashboard'      && <KargoDashboard/>}
        {module==='provinces'      && <Provinces/>}
        {module==='products'       && <Products/>}
        {module==='delivery-times' && <div style={{ fontSize:14, color:T.gray400, padding:40, textAlign:'center' }}>Teslimat süreleri yönetimi — yakında</div>}
        {module==='rules'          && <Rules/>}
        {module==='campaigns'      && <Campaigns/>}
        {module==='analytics'      && <div style={{ fontSize:14, color:T.gray400, padding:40, textAlign:'center' }}>Analitik görünümü — yakında</div>}
        {module==='performance'    && <Performance/>}
      </main>
    </div>
  );
}
