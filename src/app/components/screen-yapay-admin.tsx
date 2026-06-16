/* CICEKYOLLA — Proje & Dekorasyon Yönetim Merkezi
   16-Module Enterprise Admin: Dashboard · Analytics · Projects · Media · Sales · Blog · SEO
   Full source: github.com/Cicekyolla/cicekyolla-os */
import { useState } from 'react';
import type React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { Briefcase, CheckCircle2, BarChart2, Video, Camera, Users, FileText, TrendingUp, Star, Edit2, Plus, ExternalLink, Phone, Mail, Globe, Layers, Eye, BookOpen, Search, Zap, Upload, AlignLeft } from 'lucide-react';
import { T } from './ui-kit';
import { useNav } from '../App';
import { YAPAY_PROJECTS, YAPAY_TEAMS, YAPAY_MEDIA, YAPAY_METRICS, REFERENCE_COMPANIES, VIDEO_LIBRARY, THREE_SIXTY, BEFORE_AFTER_PAIRS, QUOTE_REQUESTS, DISCOVERY_REQUESTS, BLOG_POSTS, YAPAY_ANALYTICS, PROJECT_ANALYTICS, updateProjectStatus, type ProjectStatus, type QuoteStatus } from '../data/yapay-store';

const TEAL = { 600:'#0D9488', 700:'#0F766E', 50:'#F0FDFA', 100:'#CCFBF1', 200:'#99F6E4', 400:'#2DD4BF' };
const P    = { purple:'#7C3AED', mid:'#8B5CF6', pale:'#EDE9FE', deep:'#1E1B4B' };
const AM   = { 600:'#D97706', 50:'#FFFBEB', 100:'#FEF3C7' };
const GR   = { 600:'#16A34A', 50:'#F0FDF4', 100:'#DCFCE7' };
const RD   = { 600:'#DC2626', 50:'#FEF2F2' };
const BL   = { 600:'#2563EB', 50:'#EFF6FF', 100:'#DBEAFE' };

const fmt  = (n: number) => '₺' + n.toLocaleString('tr-TR');
const fmtK = (n: number) => n>=1000000 ? `₺${(n/1000000).toFixed(1)}M` : n>=1000 ? `₺${Math.round(n/1000)}K` : fmt(n);

type Module = 'dashboard'|'analytics'|'all-projects'|'completed'|'active'|'archived'|'before-after'|'videos'|'three-sixty'|'gallery'|'quotes'|'discovery'|'references'|'approvals'|'blog'|'seo';

const MODULES: { id:Module; icon:any; label:string; group:string; badge?:number|string; color?:string }[] = [
  { id:'dashboard',    icon:BarChart2,    label:'Dashboard',            group:'Genel' },
  { id:'analytics',    icon:TrendingUp,   label:'Analitik',             group:'Genel' },
  { id:'all-projects', icon:Briefcase,    label:'Tüm Projeler',         group:'Projeler', badge:YAPAY_PROJECTS.length },
  { id:'completed',    icon:CheckCircle2, label:'Tamamlanan',           group:'Projeler', badge:YAPAY_PROJECTS.filter(p=>p.status==='completed').length, color:GR[600] },
  { id:'active',       icon:Zap,          label:'Devam Eden',           group:'Projeler', badge:YAPAY_PROJECTS.filter(p=>['in-progress','installation'].includes(p.status)).length, color:AM[600] },
  { id:'archived',     icon:AlignLeft,    label:'Arşiv',                group:'Projeler' },
  { id:'before-after', icon:Layers,       label:'Öncesi / Sonrası',     group:'Medya', badge:BEFORE_AFTER_PAIRS.length },
  { id:'videos',       icon:Video,        label:'Video Merkezi',        group:'Medya', badge:VIDEO_LIBRARY.filter(v=>v.status==='published').length },
  { id:'three-sixty',  icon:Eye,          label:'360° Görüntüler',      group:'Medya', badge:THREE_SIXTY.filter(v=>v.status==='live').length },
  { id:'gallery',      icon:Camera,       label:'Fotoğraf Galerisi',    group:'Medya', badge:YAPAY_MEDIA.length },
  { id:'quotes',       icon:FileText,     label:'Teklif Talepleri',     group:'Satış', badge:QUOTE_REQUESTS.filter(q=>q.status==='new').length, color:AM[600] },
  { id:'discovery',    icon:Search,       label:'Keşif Talepleri',      group:'Satış', badge:DISCOVERY_REQUESTS.filter(d=>d.status==='new').length, color:AM[600] },
  { id:'references',   icon:Star,         label:'Referans Firmalar',    group:'Satış', badge:REFERENCE_COMPANIES.length },
  { id:'approvals',    icon:CheckCircle2, label:'Müşteri Onayları',    group:'Satış', badge:YAPAY_PROJECTS.filter(p=>p.approvalStatus==='pending').length, color:AM[600] },
  { id:'blog',         icon:BookOpen,     label:'Blog Merkezi',         group:'İçerik', badge:BLOG_POSTS.filter(b=>b.status==='published').length },
  { id:'seo',          icon:Globe,        label:'SEO Merkezi',          group:'İçerik' },
];

const SC: Record<ProjectStatus,{l:string;c:string;bg:string}> = {
  lead:          { l:'Lead',         c:T.gray400, bg:T.gray50  },
  quote:         { l:'Teklif',       c:BL[600],   bg:BL[50]    },
  approved:      { l:'Onayandı',    c:GR[600],   bg:GR[50]    },
  'in-progress': { l:'Devam',        c:P.purple,  bg:P.pale    },
  installation:  { l:'Kurulum',      c:AM[600],   bg:AM[50]    },
  completed:     { l:'Tamamlandı',  c:TEAL[600], bg:TEAL[50]  },
  cancelled:     { l:'İptal',        c:RD[600],   bg:RD[50]    },
};

const QC: Record<QuoteStatus,{l:string;c:string;bg:string}> = {
  new:       { l:'Yeni',           c:BL[600],   bg:BL[50]   },
  contacted: { l:'İletişildi',    c:AM[600],   bg:AM[50]   },
  meeting:   { l:'Toplantı',       c:P.purple,  bg:P.pale   },
  proposal:  { l:'Teklif Verildi', c:TEAL[600], bg:TEAL[50] },
  won:       { l:'Kazanıldı',     c:GR[600],   bg:GR[50]   },
  lost:      { l:'Kaybedildi',     c:RD[600],   bg:RD[50]   },
};

function Chip({ label, color, bg }: { label:string; color:string; bg:string }) {
  return <span style={{ fontSize:11, fontWeight:700, color, background:bg, border:`1px solid ${color}25`, padding:'3px 10px', borderRadius:99, whiteSpace:'nowrap' }}>{label}</span>;
}

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

function Dashboard() {
  const PIE = [
    { name:'Tamamlandı', value:7,  color:TEAL[600] },
    { name:'Devam',       value:4,  color:P.purple  },
    { name:'Teklif',      value:2,  color:AM[600]   },
    { name:'Lead',        value:3,  color:BL[600]   },
  ];
  return (
    <div>
      <SectionTitle title="Dashboard" sub="Proje & dekorasyon genel özeti"/>
      <div style={{ display:'flex', gap:14, marginBottom:24 }}>
        <KpiCard label="Toplam Proje" value={String(YAPAY_METRICS.totalProjects)} sub="proje" color={TEAL[600]} icon={Briefcase}/>
        <KpiCard label="Aylık Gelir" value={fmtK(YAPAY_METRICS.monthlyRevenue)} sub="bu ay" color={GR[600]} icon={TrendingUp} trend="+18%"/>
        <KpiCard label="Aktif Proje" value={String(YAPAY_METRICS.activeProjects)} sub="devam ediyor" color={AM[600]} icon={Zap}/>
        <KpiCard label="Memnuniyet" value={`${YAPAY_METRICS.clientSatisfaction}/5`} sub="ortalama" color={P.purple} icon={Star} trend="+0.2"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:18, marginBottom:24 }}>
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Proje Gelir Trendi</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={PROJECT_ANALYTICS}>
              <defs>
                <linearGradient id="yadG1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={TEAL[600]} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={TEAL[600]} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
              <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
              <Tooltip formatter={(v:number)=>[`₺${v.toLocaleString('tr-TR')}`, 'Gelir']}/>
              <Area type="monotone" dataKey="revenue" stroke={TEAL[600]} fill="url(#yadG1)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Proje Durumu</div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={PIE} cx="50%" cy="50%" innerRadius={45} outerRadius:70 dataKey="value" paddingAngle={2}>
                {PIE.map((entry,i)=><Cell key={i} fill={entry.color}/>)}
              </Pie>
              <Tooltip formatter={(v:number,name:string)=>[`${v} proje`,name]}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:8 }}>
            {PIE.map((e,i)=>(
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:e.color }}/>
                  <span style={{ fontSize:11, color:T.gray600 }}>{e.name}</span>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:T.gray800 }}>{e.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.gray100}`, fontSize:13, fontWeight:700, color:T.gray800 }}>Son Projeler</div>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <tbody>
            {YAPAY_PROJECTS.slice(0,6).map(p=>(
              <tr key={p.id} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                <td style={{ padding:'11px 20px', fontSize:13, fontWeight:700, color:T.gray900 }}>{p.title}</td>
                <td style={{ padding:'11px 20px', fontSize:12, color:T.gray400 }}>{p.client}</td>
                <td style={{ padding:'11px 20px', fontSize:12, color:T.gray400 }}>{p.location}</td>
                <td style={{ padding:'11px 20px', fontSize:13, fontWeight:800, color:TEAL[600] }}>{fmt(p.budget)}</td>
                <td style={{ padding:'11px 20px' }}><Chip label={SC[p.status].l} color={SC[p.status].c} bg={SC[p.status].bg}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AllProjects({ statusFilter }: { statusFilter?: ProjectStatus }) {
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState([...YAPAY_PROJECTS]);
  const filtered = projects.filter(p => {
    if (statusFilter && p.status !== statusFilter) {
      if (statusFilter === 'active' as any) {
        if (!['in-progress','installation'].includes(p.status)) return false;
      } else return false;
    }
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.client.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  function setStatus(id:string, status:ProjectStatus) {
    updateProjectStatus(id, status);
    setProjects(ps => ps.map(p => p.id===id ? {...p,status} : p));
  }
  return (
    <div>
      <SectionTitle
        title={statusFilter ? (SC[statusFilter]?.l + ' Projeler') : 'Tüm Projeler'}
        sub={`${filtered.length} proje`}
        actions={
          <div style={{ display:'flex', gap:10 }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Proje veya müşteri ara..." style={{ height:34, padding:'0 12px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:13, outline:'none' }}/>
            <button style={{ padding:'8px 14px', border:'none', borderRadius:9, background:TEAL[600], color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
              <Plus style={{ width:13, height:13 }}/> Yeni Proje
            </button>
          </div>
        }
      />
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['Proje','Müşteri','Konum','Bütçe','Alan','Durum','Onay',''].map(h=>(
                <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id} style={{ borderBottom:`1px solid ${T.gray50}` }}
                onMouseEnter={e=>(e.currentTarget.style.background=T.gray50)}
                onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
              >
                <td style={{ padding:'12px 14px' }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{p.title}</div>
                  <div style={{ fontSize:11, color:T.gray400, marginTop:1 }}>{p.type}</div>
                </td>
                <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>{p.client}</td>
                <td style={{ padding:'12px 14px', fontSize:12, color:T.gray500 }}>{p.location}</td>
                <td style={{ padding:'12px 14px', fontSize:13, fontWeight:800, color:TEAL[600] }}>{fmt(p.budget)}</td>
                <td style={{ padding:'12px 14px', fontSize:12, color:T.gray500 }}>{p.area}m²</td>
                <td style={{ padding:'12px 14px' }}><Chip label={SC[p.status].l} color={SC[p.status].c} bg={SC[p.status].bg}/></td>
                <td style={{ padding:'12px 14px' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:p.approvalStatus==='pending'?AM[600]:p.approvalStatus==='approved'?GR[600]:T.gray400 }}>
                    {p.approvalStatus==='pending'?'Bekliyor':p.approvalStatus==='approved'?'Onayandı':p.approvalStatus==='revision'?'Düzeltme':'—'}
                  </span>
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <button style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                    <Edit2 style={{ width:11, height:11 }}/> Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Quotes() {
  const [quotes, setQuotes] = useState([...QUOTE_REQUESTS]);
  return (
    <div>
      <SectionTitle title="Teklif Talepleri" sub={`${quotes.filter(q=>q.status==='new').length} yeni teklif`}/>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {quotes.map(q=>{
          const qc = QC[q.status];
          return (
            <div key={q.id} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'18px 20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                    <div style={{ fontSize:15, fontWeight:800, color:T.gray900 }}>{q.name}</div>
                    <span style={{ fontSize:10.5, color:T.gray400 }}>{q.company}</span>
                    <Chip label={qc.l} color={qc.c} bg={qc.bg}/>
                    {q.status==='new' && <span style={{ fontSize:10, fontWeight:800, color:'#fff', background:AM[600], padding:'2px 7px', borderRadius:99 }}>YENİ</span>}
                  </div>
                  <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
                    <span style={{ fontSize:12, color:T.gray500 }}>🏢 {q.type}</span>
                    <span style={{ fontSize:12, color:T.gray500 }}>📏 {q.area}m²</span>
                    <span style={{ fontSize:12, color:T.gray500 }}>💰 {q.budget}</span>
                    <span style={{ fontSize:12, color:T.gray500 }}>📅 {q.date}</span>
                  </div>
                  {q.message && <div style={{ fontSize:12.5, color:T.gray500, marginTop:8, fontStyle:'italic' }}>{q.message.substring(0,120)}...</div>}
                </div>
                <div style={{ display:'flex', gap:8, flexShrink:0, marginLeft:14 }}>
                  <button style={{ padding:'7px 12px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:11.5, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                    <Phone style={{ width:11, height:11 }}/> Ara
                  </button>
                  <button style={{ padding:'7px 14px', border:'none', borderRadius:8, background:TEAL[600], color:'#fff', fontSize:11.5, fontWeight:700, cursor:'pointer' }}>Yanıtla</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function References() {
  return (
    <div>
      <SectionTitle title="Referans Firmalar" sub={`${REFERENCE_COMPANIES.length} referans firma`}/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {REFERENCE_COMPANIES.map(r=>(
          <div key={r.id} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
              <div style={{ width:44, height:44, borderRadius:10, background:TEAL[50], display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{r.logo}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>{r.name}</div>
                <div style={{ fontSize:11.5, color:T.gray400 }}>{r.sector}</div>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              <div style={{ background:T.gray50, borderRadius:8, padding:'8px 10px' }}>
                <div style={{ fontSize:10, color:T.gray400 }}>Proje Sayısı</div>
                <div style={{ fontSize:16, fontWeight:900, color:TEAL[600] }}>{r.projectCount}</div>
              </div>
              <div style={{ background:T.gray50, borderRadius:8, padding:'8px 10px' }}>
                <div style={{ fontSize:10, color:T.gray400 }}>Toplam Değer</div>
                <div style={{ fontSize:16, fontWeight:900, color:TEAL[600] }}>{fmtK(r.totalValue)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Videos() {
  return (
    <div>
      <SectionTitle title="Video Merkezi" sub={`${VIDEO_LIBRARY.filter(v=>v.status==='published').length} yayında video`}
        actions={<button style={{ padding:'8px 14px', border:'none', borderRadius:9, background:TEAL[600], color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><Upload style={{ width:13, height:13 }}/> Video Yükle</button>}
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        {VIDEO_LIBRARY.map(v=>(
          <div key={v.id} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
            <div style={{ height:120, background:`linear-gradient(135deg,${TEAL[50]},#fff)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40, position:'relative' }}>
              🎥
              <div style={{ position:'absolute', bottom:8, right:8, fontSize:10, fontWeight:700, color:'#fff', background:'rgba(0,0,0,0.7)', padding:'2px 6px', borderRadius:4 }}>{v.duration}</div>
            </div>
            <div style={{ padding:'12px 14px' }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:T.gray900, marginBottom:4, lineHeight:1.3 }}>{v.title}</div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:10.5, fontWeight:700, color:v.status==='published'?GR[600]:AM[600], background:v.status==='published'?GR[50]:AM[50], padding:'2px 7px', borderRadius:99 }}>{v.status==='published'?'Yayında':'Taslak'}</span>
                <span style={{ fontSize:11, color:T.gray400 }}>{v.views} görüntü</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfter() {
  return (
    <div>
      <SectionTitle title="Öncesi / Sonrası Galerisi" sub={`${BEFORE_AFTER_PAIRS.length} çift`}/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {BEFORE_AFTER_PAIRS.map(pair=>(
          <div key={pair.id} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', height:120 }}>
              <div style={{ background:'#F3F4F6', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:4 }}>
                <span style={{ fontSize:36 }}>{pair.beforeEmoji}</span>
                <div style={{ fontSize:9, fontWeight:700, color:T.gray400 }}>ÖNCESİ</div>
              </div>
              <div style={{ background:TEAL[50], display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:4 }}>
                <span style={{ fontSize:36 }}>{pair.afterEmoji}</span>
                <div style={{ fontSize:9, fontWeight:700, color:TEAL[600] }}>SONRASI</div>
              </div>
            </div>
            <div style={{ padding:'12px 14px' }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{pair.title}</div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
                <span style={{ fontSize:11, color:T.gray400 }}>♥ {pair.likes} beğeni</span>
                <button style={{ fontSize:11.5, color:TEAL[600], background:TEAL[50], border:'none', borderRadius:7, padding:'4px 10px', cursor:'pointer' }}>Düzenle</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScreenYapayAdmin() {
  const [module, setModule] = useState<Module>('dashboard');
  const groups = [...new Set(MODULES.map(m=>m.group))];
  return (
    <div style={{ display:'flex', height:'100%', overflow:'hidden' }}>
      <aside style={{ width:220, flexShrink:0, background:'#1C2432', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'18px 16px 12px', borderBottom:'1px solid #2D3E50' }}>
          <div style={{ fontSize:11, fontWeight:900, color:'rgba(255,255,255,0.85)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:2 }}>Yapay Çiçek</div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>Proje Yönetim Merkezi</div>
        </div>
        <nav style={{ flex:1, overflowY:'auto', padding:'8px 6px' }}>
          {groups.map(group=>(
            <div key={group} style={{ marginBottom:4 }}>
              <div style={{ fontSize:9.5, fontWeight:700, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.12em', padding:'8px 10px 4px' }}>{group}</div>
              {MODULES.filter(m=>m.group===group).map(m=>(
                <button key={m.id} onClick={()=>setModule(m.id)} style={{ width:'100%', padding:'9px 10px', border:'none', borderRadius:8, background:module===m.id?'#253044':'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:9, marginBottom:2, transition:'all 0.12s', textAlign:'left' }}>
                  <m.icon style={{ width:14, height:14, color:module===m.id?TEAL[400]:'rgba(255,255,255,0.45)', flexShrink:0 }}/>
                  <span style={{ fontSize:12.5, fontWeight:module===m.id?600:400, color:module===m.id?'rgba(255,255,255,0.9)':'rgba(255,255,255,0.55)', flex:1 }}>{m.label}</span>
                  {m.badge!==undefined && m.badge!==0 && <span style={{ fontSize:9.5, fontWeight:800, color:'#fff', background:m.color||TEAL[600], borderRadius:99, padding:'1px 6px', flexShrink:0 }}>{m.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div style={{ padding:'10px 14px', borderTop:'1px solid #2D3E50', fontSize:10, color:'rgba(255,255,255,0.35)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E' }}/>
            <span>Canlı — değişiklikler anında yansır</span>
          </div>
        </div>
      </aside>
      <main style={{ flex:1, overflowY:'auto', padding:28, background:'#F5F7FA' }}>
        {module==='dashboard'    && <Dashboard/>}
        {module==='all-projects' && <AllProjects/>}
        {module==='completed'    && <AllProjects statusFilter="completed"/>}
        {module==='quotes'       && <Quotes/>}
        {module==='references'   && <References/>}
        {module==='videos'       && <Videos/>}
        {module==='before-after' && <BeforeAfter/>}
        {['analytics','active','archived','three-sixty','gallery','discovery','approvals','blog','seo'].includes(module) && (
          <div style={{ textAlign:'center', padding:'60px 20px', color:T.gray400 }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🛠️</div>
            <div style={{ fontSize:16, fontWeight:600 }}>{MODULES.find(m=>m.id===module)?.label} modülü yakında aktif</div>
          </div>
        )}
      </main>
    </div>
  );
}
