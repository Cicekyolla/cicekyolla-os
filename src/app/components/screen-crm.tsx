// CICEKYOLLA OS — CRM Merkezi
// 5 views: Customers · Segments · Analytics · Birthday Engine · Master Tasks
// Full source: github.com/Cicekyolla/cicekyolla-os
import { useState, useRef } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Plus, Filter, Download, Phone, Mail, MapPin, Star, TrendingUp, Users, Target, Heart, Bell, Calendar, CheckCircle2, ChevronRight, Tag, X } from 'lucide-react';
import { T, fmtCurrency } from './ui-kit';
import { CUSTOMERS, ORDERS } from '../data/store';

const P = { purple:'#7C3AED', mid:'#8B5CF6', pale:'#EDE9FE', deep:'#1E1B4B' };
const GR = { 600:'#16A34A', 50:'#F0FDF4', 100:'#DCFCE7' };
const AM = { 600:'#D97706', 50:'#FFFBEB' };
const RD = { 600:'#DC2626', 50:'#FEF2F2' };
const BL = { 600:'#2563EB', 50:'#EFF6FF' };

type CRMView = 'customers'|'segments'|'analytics'|'birthday'|'tasks';

const SEGMENTS = [
  { id:'vip',     label:'VIP',      count:48,  color:'#7C3AED', desc:'₺15K+ LTV, 8+ sipariş' },
  { id:'premium', label:'Premium',  count:124, color:'#D97706', desc:'₺5K-15K LTV, 4-7 sipariş' },
  { id:'regular', label:'Regular',  count:512, color:'#2563EB', desc:'₺1K-5K LTV, 2-3 sipariş' },
  { id:'new',     label:'Yeni',     count:287, color:'#16A34A', desc:'İlk sipariş, < 1 ay' },
  { id:'churn',   label:'Kayıp Risk',count:89, color:'#DC2626', desc:'60gün+ satın alma yok' },
];

const REVENUE_TREND = [
  { month:'Oca', revenue:284000, customers:320 },
  { month:'Şub', revenue:312000, customers:348 },
  { month:'Mar', revenue:298000, customers:335 },
  { month:'Nis', revenue:341000, customers:380 },
  { month:'May', revenue:378000, customers:412 },
  { month:'Haz', revenue:405000, customers:445 },
];

const SEGMENT_REVENUE = [
  { segment:'VIP', revenue:184000, customers:48 },
  { segment:'Premium', revenue:142000, customers:124 },
  { segment:'Regular', revenue:62000, customers:512 },
  { segment:'Yeni', revenue:17000, customers:287 },
];

const BIRTHDAY_CUSTOMERS = [
  { id:1, name:'Ayşe Kaya',   birthday:'18 Haz', daysLeft:2, phone:'0532 111 22 33', segment:'VIP',    totalOrders:12 },
  { id:2, name:'Mehmet Y.',  birthday:'20 Haz', daysLeft:4, phone:'0542 333 44 55', segment:'Premium',totalOrders:7 },
  { id:3, name:'Selin A.',   birthday:'22 Haz', daysLeft:6, phone:'0553 555 66 77', segment:'VIP',    totalOrders:19 },
  { id:4, name:'Burak T.',   birthday:'25 Haz', daysLeft:9, phone:'0544 777 88 99', segment:'Regular',totalOrders:3 },
  { id:5, name:'Zeynep D.', birthday:'28 Haz', daysLeft:12, phone:'0535 999 00 11', segment:'Premium',totalOrders:8 },
];

const ANNIVERSARY_CUSTOMERS = [
  { id:6,  name:'Can & Elif K.',    anniversary:'19 Haz', daysLeft:3, phone:'0532 222 33 44', segment:'VIP', totalOrders:28 },
  { id:7,  name:'Ali & Fatma D.', anniversary:'24 Haz', daysLeft:8, phone:'0542 444 55 66', segment:'Premium', totalOrders:14 },
];

const AUTO_CAMPAIGN_TEMPLATE = {
  subject: 'Doğum Gününüz Kutlu Olsun! 🎉🌹',
  body: 'Sevgili {AD}, bugün özel gününüz için size özel %15 indirim kodunuz: DOGUM{YIL}\n\nSatın almalarınız için teşekkürler!',
  whatsapp: 'Sevgili {AD} hanım/bey, doğum gününüz kutlu olsun! 🎉 Size özel çiçek hediyemiz hazır: https://cicekyolla.com/dogum-gunu',
};

const SEG_CFG: Record<string,{c:string;bg:string}> = {
  VIP:      { c:P.purple, bg:P.pale },
  Premium:  { c:AM[600],  bg:AM[50] },
  Regular:  { c:BL[600],  bg:BL[50] },
  Yeni:     { c:GR[600],  bg:GR[50] },
  'Kayıp Risk':{ c:RD[600], bg:RD[50] },
};

function CustomerCard({ c, onClick }: { c:typeof CUSTOMERS[0]; onClick:()=>void }) {
  const seg = SEG_CFG[c.segment] || { c:T.gray500, bg:T.gray100 };
  return (
    <div onClick={onClick} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'16px 18px', cursor:'pointer', transition:'all 0.15s', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor=P.purple; e.currentTarget.style.boxShadow=`0 4px 16px rgba(124,58,237,0.10)`; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.gray200; e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.04)'; }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <div style={{ width:40, height:40, borderRadius:'50%', background:`linear-gradient(135deg,${seg.c},${seg.c}AA)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:900, color:'#fff', flexShrink:0 }}>{c.name.charAt(0)}</div>
          <div>
            <div style={{ fontSize:13.5, fontWeight:800, color:T.gray900 }}>{c.name}</div>
            <div style={{ fontSize:11, color:T.gray400 }}>{c.city}</div>
          </div>
        </div>
        <span style={{ fontSize:10.5, fontWeight:700, color:seg.c, background:seg.bg, padding:'3px 9px', borderRadius:99 }}>{c.segment}</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:12 }}>
        {[
          { l:'LTV', v:fmtCurrency(c.ltv), c:P.purple },
          { l:'Sipariş', v:c.orderCount, c:GR[600] },
          { l:'NPS', v:c.nps, c:c.nps>=9?GR[600]:c.nps>=7?AM[600]:RD[600] },
        ].map((m,i)=>(
          <div key={i} style={{ background:T.gray50, borderRadius:8, padding:'6px 8px', textAlign:'center' }}>
            <div style={{ fontSize:13, fontWeight:900, color:m.c }}>{m.v}</div>
            <div style={{ fontSize:9.5, color:T.gray400 }}>{m.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:11, color:T.gray400 }}>Son: {c.lastOrder} • {c.favoriteCategory}</div>
        <div style={{ fontSize:11, fontWeight:700, color:c.churnRisk==='Düşük'?GR[600]:c.churnRisk==='Örta'?AM[600]:RD[600] }}>Churn: {c.churnRisk}</div>
      </div>
    </div>
  );
}

function CustomerProfile({ c, onClose }: { c:typeof CUSTOMERS[0]; onClose:()=>void }) {
  const [notes, setNotes] = useState(c.notes||[]);
  const [tags, setTags] = useState(c.tags||[]);
  const [noteInput, setNoteInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const TAG_SUGGESTIONS = ['VIP Oncelik', 'Doğum Günü', 'Sadakat', 'Kurumsal', 'Alerjik', 'Doğal Çiçek'];

  function addNote() {
    if (!noteInput.trim()) return;
    setNotes(n=>[...n, { id:Date.now(), text:noteInput, date:new Date().toLocaleDateString('tr-TR') }]);
    setNoteInput('');
  }

  function addTag(tag: string) {
    if (!tags.includes(tag)) setTags(t=>[...t,tag]);
    setTagInput('');
  }

  const customerOrders = ORDERS.filter(o=>o.customerId===c.id);
  const seg = SEG_CFG[c.segment] || { c:T.gray500, bg:T.gray100 };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'flex-end' }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ width:460, background:'#fff', height:'100%', overflowY:'auto', boxShadow:'-8px 0 32px rgba(0,0,0,0.12)' }}>
        {/* Header */}
        <div style={{ padding:'20px 24px', borderBottom:`1px solid ${T.gray100}`, display:'flex', justifyContent:'space-between', alignItems:'center', background:P.pale }}>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg,${seg.c},${seg.c}AA)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:900, color:'#fff' }}>{c.name.charAt(0)}</div>
            <div>
              <div style={{ fontSize:16, fontWeight:900, color:T.gray900 }}>{c.name}</div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:11, fontWeight:700, color:seg.c, background:seg.bg, padding:'2px 8px', borderRadius:99 }}>{c.segment}</span>
                <span style={{ fontSize:11, color:T.gray400 }}>{c.city}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:'50%', border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X style={{ width:12, height:12 }}/></button>
        </div>

        <div style={{ padding:'20px 24px' }}>
          {/* Metrics */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:20 }}>
            {[
              { l:'LTV', v:fmtCurrency(c.ltv), c:P.purple },
              { l:'Sipariş', v:c.orderCount, c:GR[600] },
              { l:'NPS', v:c.nps, c:c.nps>=9?GR[600]:c.nps>=7?AM[600]:RD[600] },
            ].map((m,i)=>(
              <div key={i} style={{ background:T.gray50, borderRadius:10, padding:'12px', textAlign:'center' }}>
                <div style={{ fontSize:20, fontWeight:900, color:m.c }}>{m.v}</div>
                <div style={{ fontSize:10.5, color:T.gray400 }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div style={{ background:T.gray50, borderRadius:12, padding:'14px 16px', marginBottom:16 }}>
            <div style={{ fontSize:11.5, fontWeight:700, color:T.gray500, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10 }}>İletişim</div>
            {[
              { icon:Phone, v:c.phone, href:`tel:${c.phone}` },
              { icon:Mail,  v:c.email, href:`mailto:${c.email}` },
              { icon:MapPin,v:c.city, href:'' },
            ].map((r,i)=>(
              <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8 }}>
                <r.icon style={{ width:13, height:13, color:T.gray400, flexShrink:0 }}/>
                <span style={{ fontSize:12.5, color:T.gray700 }}>{r.v}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11.5, fontWeight:700, color:T.gray500, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>Etiketler</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:8 }}>
              {tags.map(tag=>(
                <div key={tag} style={{ display:'flex', alignItems:'center', gap:4, background:P.pale, borderRadius:99, padding:'4px 10px' }}>
                  <span style={{ fontSize:11.5, fontWeight:600, color:P.purple }}>{tag}</span>
                  <button onClick={()=>setTags(t=>t.filter(x=>x!==tag))} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center' }}><X style={{ width:10, height:10, color:P.mid }}/></button>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {TAG_SUGGESTIONS.filter(t=>!tags.includes(t)).map(s=>(
                <button key={s} onClick={()=>addTag(s)} style={{ padding:'4px 10px', border:`1px solid ${T.gray200}`, borderRadius:99, background:'#fff', fontSize:11.5, color:T.gray500, cursor:'pointer' }}>+ {s}</button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11.5, fontWeight:700, color:T.gray500, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>Notlar</div>
            <div style={{ display:'flex', gap:8, marginBottom:10 }}>
              <input value={noteInput} onChange={e=>setNoteInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addNote()} placeholder="Not ekle ve Enter'a bas..." style={{ flex:1, height:36, padding:'0 10px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:12.5, outline:'none' }}
                onFocus={e=>e.target.style.borderColor=P.purple} onBlur={e=>e.target.style.borderColor=T.gray200}
              />
              <button onClick={addNote} style={{ padding:'0 12px', border:'none', borderRadius:8, background:P.purple, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' }}>Ekle</button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {notes.map((note:any)=>(
                <div key={note.id} style={{ background:T.gray50, borderRadius:8, padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div style={{ fontSize:12.5, color:T.gray700, flex:1 }}>{note.text}</div>
                  <div style={{ fontSize:10.5, color:T.gray400, flexShrink:0, marginLeft:8 }}>{note.date}</div>
                </div>
              ))}
              {notes.length===0 && <div style={{ fontSize:12.5, color:T.gray400, fontStyle:'italic', padding:'8px 0' }}>Henüz not yok.</div>}
            </div>
          </div>

          {/* Order history */}
          <div>
            <div style={{ fontSize:11.5, fontWeight:700, color:T.gray500, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>Sipariş Geçmişi ({customerOrders.length})</div>
            {customerOrders.slice(0,5).map(o=>(
              <div key={o.id} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${T.gray50}` }}>
                <div>
                  <div style={{ fontSize:12.5, color:T.gray800 }}>{o.product}</div>
                  <div style={{ fontSize:11, color:T.gray400 }}>{o.time}</div>
                </div>
                <div style={{ fontSize:13, fontWeight:800, color:P.purple }}>{fmtCurrency(o.amount)}</div>
              </div>
            ))}
            {customerOrders.length===0 && <div style={{ fontSize:12.5, color:T.gray400, fontStyle:'italic' }}>Sipariş bulunamadı.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScreenCRM({ navigate, params }: { navigate?: (s:any,p?:any)=>void; params?: any }) {
  const [view, setView] = useState<CRMView>('customers');
  const [search, setSearch] = useState('');
  const [segFilter, setSegFilter] = useState('Tümü');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof CUSTOMERS[0]|null>(null);

  const filtered = CUSTOMERS.filter(c => {
    if (segFilter!=='Tümü' && c.segment!==segFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const allTasks = CUSTOMERS.flatMap(c=>(c.tasks||[]).map((t:any)=>({...t,customerName:c.name,customerId:c.id})));
  const pendingTasks = allTasks.filter((t:any)=>!t.done);

  return (
    <div style={{ display:'flex', height:'100%', overflow:'hidden', background:'#F5F7FA' }}>
      {/* Sidebar */}
      <aside style={{ width:200, flexShrink:0, background:'#fff', borderRight:`1px solid ${T.gray100}`, padding:'16px 8px', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'4px 8px 12px', fontSize:11, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.1em' }}>CRM Merkezi</div>
        {[
          { id:'customers' as CRMView, icon:Users,      label:'Müşteriler',   badge:CUSTOMERS.length },
          { id:'segments'  as CRMView, icon:Tag,        label:'Segmentler',   badge:SEGMENTS.length },
          { id:'analytics' as CRMView, icon:TrendingUp, label:'Analitik' },
          { id:'birthday'  as CRMView, icon:Heart,      label:'Doğum Günü',  badge:BIRTHDAY_CUSTOMERS.length, color:RD[600] },
          { id:'tasks'     as CRMView, icon:CheckCircle2,label:'Görevler',    badge:pendingTasks.length, color:AM[600] },
        ].map(item=>(
          <button key={item.id} onClick={()=>setView(item.id)} style={{ width:'100%', display:'flex', alignItems:'center', gap:9, padding:'9px 10px', borderRadius:9, border:'none', cursor:'pointer', marginBottom:3, background:view===item.id?P.pale:'transparent', color:view===item.id?P.purple:T.gray600, fontWeight:view===item.id?600:400, fontSize:13, textAlign:'left', transition:'all 0.12s' }}>
            <item.icon style={{ width:15, height:15, flexShrink:0 }}/>
            <span style={{ flex:1 }}>{item.label}</span>
            {item.badge!==undefined && (
              <span style={{ fontSize:10, fontWeight:800, color:'#fff', background:item.color||P.purple, borderRadius:99, padding:'1px 7px' }}>{item.badge}</span>
            )}
          </button>
        ))}
      </aside>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        {/* Header */}
        <div style={{ padding:'16px 24px', background:'#fff', borderBottom:`1px solid ${T.gray100}`, display:'flex', gap:12, alignItems:'center', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:7, background:T.gray50, border:`1px solid ${T.gray200}`, borderRadius:9, padding:'7px 12px', flex:1 }}>
            <Search style={{ width:13, height:13, color:T.gray400 }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Müşteri ara..." style={{ border:'none', outline:'none', background:'transparent', fontSize:13, color:T.gray700, width:'100%' }}/>
          </div>
          <div style={{ display:'flex', gap:4 }}>
            {['Tümü','VIP','Premium','Regular','Yeni','Kayıp Risk'].map(s=>(
              <button key={s} onClick={()=>setSegFilter(s)} style={{ padding:'7px 12px', border:`1px solid ${segFilter===s?P.purple:T.gray200}`, borderRadius:8, background:segFilter===s?P.pale:'#fff', fontSize:11.5, fontWeight:segFilter===s?700:400, color:segFilter===s?P.purple:T.gray500, cursor:'pointer', whiteSpace:'nowrap' }}>{s}</button>
            ))}
          </div>
          <button style={{ padding:'7px 14px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <Download style={{ width:12, height:12 }}/> Excel
          </button>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
          {view==='customers' && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
              {filtered.map(c=><CustomerCard key={c.id} c={c} onClick={()=>setSelectedCustomer(c)}/>)}
            </div>
          )}

          {view==='segments' && (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {SEGMENTS.map(seg=>(
                <div key={seg.id} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px 24px', display:'flex', alignItems:'center', gap:20 }}>
                  <div style={{ width:56, height:56, borderRadius:14, background:`${seg.color}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Users style={{ width:24, height:24, color:seg.color }}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                      <div style={{ fontSize:16, fontWeight:900, color:T.gray900 }}>{seg.label}</div>
                      <span style={{ fontSize:11, fontWeight:700, color:seg.color, background:`${seg.color}10`, padding:'2px 9px', borderRadius:99 }}>{seg.count} müşteri</span>
                    </div>
                    <div style={{ fontSize:13, color:T.gray400 }}>{seg.desc}</div>
                  </div>
                  <button style={{ padding:'8px 16px', border:'none', borderRadius:9, background:seg.color, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' }}>Kampanya Gönder</button>
                </div>
              ))}
            </div>
          )}

          {view==='analytics' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
                {[
                  { l:'Toplam Müşteri', v:String(CUSTOMERS.length), c:P.purple },
                  { l:'VIP Müşteri', v:String(SEGMENTS[0].count), c:P.purple },
                  { l:'Ort. LTV', v:fmtCurrency(Math.round(CUSTOMERS.reduce((s,c)=>s+c.ltv,0)/CUSTOMERS.length)), c:GR[600] },
                  { l:'Ort. NPS', v:(CUSTOMERS.reduce((s,c)=>s+c.nps,0)/CUSTOMERS.length).toFixed(1), c:AM[600] },
                ].map((k,i)=>(
                  <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}>
                    <div style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>{k.l}</div>
                    <div style={{ fontSize:22, fontWeight:900, color:k.c }}>{k.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:18 }}>
                <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Aylık Gelir Trendi</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={REVENUE_TREND}>
                      <defs><linearGradient id="crmRevG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={P.purple} stopOpacity={0.25}/><stop offset="95%" stopColor={P.purple} stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                      <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
                      <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
                      <Tooltip formatter={(v:number)=>[`₺${v.toLocaleString('tr-TR')}`, 'Gelir']}/>
                      <Area type="monotone" dataKey="revenue" stroke={P.purple} fill="url(#crmRevG)" strokeWidth={2.5}/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Segment Geliri</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={SEGMENT_REVENUE}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                      <XAxis dataKey="segment" tick={{ fontSize:9, fill:T.gray400 }}/>
                      <YAxis tick={{ fontSize:9, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
                      <Tooltip formatter={(v:number)=>[`₺${v.toLocaleString('tr-TR')}`, 'Gelir']}/>
                      <Bar dataKey="revenue" fill={P.purple} radius={[4,4,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {view==='birthday' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                {[{ title:'Yakışan Doğum Günleri', emoji:'🎂', data:BIRTHDAY_CUSTOMERS, field:'birthday' },
                  { title:'Yakışan Yıldönümleri', emoji:'💍', data:ANNIVERSARY_CUSTOMERS, field:'anniversary' }].map((section,si)=>(
                  <div key={si}>
                    <div style={{ fontSize:15, fontWeight:800, color:T.gray900, marginBottom:14 }}>{section.emoji} {section.title}</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                      {section.data.map(c=>(
                        <div key={c.id} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <div>
                            <div style={{ fontSize:13.5, fontWeight:800, color:T.gray900 }}>{c.name}</div>
                            <div style={{ fontSize:11.5, color:T.gray400, marginTop:2 }}>{(c as any)[section.field]} • {c.daysLeft} gün kaldı • {c.totalOrders} sipariş</div>
                            <div style={{ fontSize:11, color:T.gray400, marginTop:2 }}>{c.phone}</div>
                          </div>
                          <div style={{ display:'flex', gap:8 }}>
                            <a href={`https://wa.me/${c.phone.replace(/\s/g,'')}`} target="_blank" rel="noopener noreferrer" style={{ padding:'6px 12px', border:'none', borderRadius:8, background:'#25D366', color:'#fff', fontSize:11.5, fontWeight:700, cursor:'pointer', textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>WA</a>
                            <button style={{ padding:'6px 12px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:11.5, cursor:'pointer' }}>İletisim</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view==='tasks' && (
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:T.gray900, marginBottom:16 }}>Tüm Müşteri Görevleri ({pendingTasks.length} bekliyor)</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {pendingTasks.map((task:any,i:number)=>(
                  <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'14px 18px', display:'flex', gap:12, alignItems:'flex-start' }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:task.priority==='high'?RD[600]:task.priority==='medium'?AM[600]:GR[600], flexShrink:0, marginTop:5 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{task.text}</div>
                      <div style={{ fontSize:11.5, color:T.gray400, marginTop:2 }}>Müşteri: {task.customerName} • {task.dueDate}</div>
                    </div>
                    <button onClick={()=>navigate?.('customer360',{customerId:task.customerId})} style={{ fontSize:11.5, color:P.purple, background:P.pale, border:'none', borderRadius:7, padding:'5px 12px', cursor:'pointer', fontWeight:600 }}>Profil →</button>
                  </div>
                ))}
                {pendingTasks.length===0 && <div style={{ textAlign:'center', padding:'40px', color:T.gray400 }}><CheckCircle2 style={{ width:36, height:36, margin:'0 auto 12px', opacity:0.3 }}/><div>Tüm görevler tamamlandı!</div></div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedCustomer && <CustomerProfile c={selectedCustomer} onClose={()=>setSelectedCustomer(null)}/>}
    </div>
  );
}
