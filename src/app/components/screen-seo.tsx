/* CICEKYOLLA — SEO Merkezi
   12 Modules: Overview · SEO Reports · Meta Manager · Schema Builder
               Redirect Manager · Sitemap · Canonical · City Pages
               District Pages · Content Manager · Blog Manager · 404 Errors
   Full source: github.com/Cicekyolla/cicekyolla-os */
import { useState } from 'react';
import type React from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, FileText, RefreshCw, MapPin, BookOpen, BarChart2, AlertTriangle, Link, CheckCircle2, Edit2, Plus, Download, ArrowUp, ArrowDown, Search, Zap } from 'lucide-react';
import { T } from './ui-kit';

const BL = { 600:'#2563EB', 700:'#1D4ED8', 50:'#EFF6FF', 100:'#DBEAFE' };
const GR = { 600:'#16A34A', 50:'#F0FDF4', 100:'#DCFCE7' };
const AM = { 600:'#D97706', 50:'#FFFBEB', 100:'#FEF3C7' };
const RD = { 600:'#DC2626', 50:'#FEF2F2' };
const P  = { purple:'#7C3AED', pale:'#EDE9FE' };

type SEOModule = 'overview'|'reports'|'meta'|'schema'|'redirects'|'sitemap'|'canonical'|'cities'|'districts'|'content'|'blog'|'errors';

const MODULES: { id:SEOModule; icon:any; label:string; sub:string }[] = [
  { id:'overview',   icon:BarChart2,    label:'Genel Bakış',       sub:'SEO skoru & trafik' },
  { id:'reports',    icon:BarChart2,    label:'SEO Raporları',    sub:'Anahtar kelime & trafik' },
  { id:'meta',       icon:FileText,     label:'Meta Yöneticisi',   sub:'Title & description' },
  { id:'schema',     icon:Link,         label:'Schema Builder',    sub:'JSON-LD yapısal veri' },
  { id:'redirects',  icon:RefreshCw,    label:'Yönlendirme',       sub:'301/302 yönlendir.' },
  { id:'sitemap',    icon:Globe,        label:'Sitemap',            sub:'Sitemap yönetimi' },
  { id:'canonical',  icon:Link,         label:'Canonical',          sub:'URL tekrarı önleme' },
  { id:'cities',     icon:MapPin,       label:'Şehir Sayfaları',    sub:'Lokal SEO sayfaları' },
  { id:'districts',  icon:MapPin,       label:'İlçe Sayfaları',     sub:'İlçe bazlı SEO' },
  { id:'content',    icon:Zap,          label:'İçerik Yöneticisi',  sub:'SEO içerik üretimi' },
  { id:'blog',       icon:BookOpen,     label:'Blog Yöneticisi',   sub:'Blog SEO' },
  { id:'errors',     icon:AlertTriangle,label:'404 Hataları',      sub:'Kırık bağlantılar' },
];

const ORGANIC_TREND = [
  { month:'Oca', organic:1840, impressions:42000 },
  { month:'Şub', organic:2120, impressions:48000 },
  { month:'Mar', organic:1980, impressions:45000 },
  { month:'Nis', organic:2340, impressions:53000 },
  { month:'May', organic:2680, impressions:61000 },
  { month:'Haz', organic:3040, impressions:69000 },
];

const TOP_KEYWORDS = [
  { kw:'çiçek gönder İstanbul', pos:3,  clicks:842, impressions:18400, ctr:'4.6%', trend:'up'   },
  { kw:'aynı gün çiçek',      pos:1,  clicks:1240, impressions:32000, ctr:'3.9%', trend:'up'   },
  { kw:'gül buketi',           pos:5,  clicks:480, impressions:12000, ctr:'4.0%', trend:'same' },
  { kw:'orkide sipariş',       pos:7,  clicks:312, impressions:8400, ctr:'3.7%', trend:'up'   },
  { kw:'doğum günü çiçek',     pos:4,  clicks:624, impressions:15600, ctr:'4.0%', trend:'down' },
  { kw:'çiçek kargo türkiye',  pos:2,  clicks:920, impressions:22000, ctr:'4.2%', trend:'up'   },
];

const META_PAGES = [
  { id:'home',      page:'Anasayfa',              title:'Cicekyolla — Türkiye\'nin En Büyük Çiçek Ekosistemi', desc:'Aynı gün çiçek teslimatı İstanbul...', score:92, status:'active' },
  { id:'category',  page:'Kategori: Güller',       title:'Gül Buketi Siparişi — Cicekyolla',                desc:'En taze güller...',                     score:88, status:'active' },
  { id:'product',   page:'Ürün: 51 Kırmızı Gül',   title:'51 Kırmızı Gül Buketi...',                       desc:'Ecuador ithal...',                       score:85, status:'active' },
  { id:'kargo',     page:'Türkiye Kargo',          title:'Türkiye Geneli Çiçek Kargo...',                 desc:'81 ile çiçek kargo...',                  score:79, status:'draft'  },
  { id:'yapay',     page:'Yapay Çiçek',           title:'Premium Yapay Çiçek...',                        desc:'Bakım gerektirmeyen...',                 score:76, status:'active' },
];

const SCHEMA_ITEMS = [
  { type:'Organization',   status:'active', score:95, issues:0 },
  { type:'LocalBusiness',  status:'active', score:92, issues:1 },
  { type:'Product',        status:'active', score:88, issues:2 },
  { type:'BreadcrumbList', status:'active', score:100, issues:0 },
  { type:'FAQPage',        status:'active', score:94, issues:0 },
  { type:'Article',        status:'active', score:89, issues:1 },
  { type:'WebSite',        status:'active', score:97, issues:0 },
  { type:'Review',         status:'draft',  score:76, issues:3 },
];

const REDIRECTS = [
  { from:'/cicekler/guller', to:'/kategori/guller', type:'301', hits:1240, date:'10 Haz 2026' },
  { from:'/sepet', to:'/checkout', type:'301', hits:840, date:'5 Haz 2026' },
  { from:'/hakkimizda-eski', to:'/hakkimizda', type:'301', hits:124, date:'1 Haz 2026' },
  { from:'/yapay-cicek-istanbul', to:'/yapay-cicek', type:'302', hits:67, date:'28 May 2026' },
];

const CITY_PAGES = [
  { city:'İstanbul',  population:'15.8M', traffic:'4.200 organik/ay', status:'active', score:91, lastUpdated:'15 Haz' },
  { city:'Ankara',    population:'5.6M',  traffic:'1.840 organik/ay', status:'active', score:87, lastUpdated:'14 Haz' },
  { city:'İzmir',    population:'4.4M',  traffic:'1.240 organik/ay', status:'active', score:83, lastUpdated:'13 Haz' },
  { city:'Bursa',     population:'3.1M',  traffic:'680 organik/ay',   status:'active', score:79, lastUpdated:'12 Haz' },
  { city:'Antalya',   population:'2.6M',  traffic:'520 organik/ay',   status:'draft',  score:65, lastUpdated:'10 Haz' },
  { city:'Adana',     population:'2.2M',  traffic:'0 organik/ay',     status:'planned',score:0,  lastUpdated:'—' },
  { city:'Konya',     population:'2.3M',  traffic:'0 organik/ay',     status:'planned',score:0,  lastUpdated:'—' },
  { city:'Kayseri',   population:'1.4M',  traffic:'0 organik/ay',     status:'planned',score:0,  lastUpdated:'—' },
];

const BLOG_POSTS_SEO = [
  { title:'En Romantik Çiçek Kombinasyonları', score:92, kwCount:8, wordCount:1840, links:6, status:'published' },
  { title:'İstanbul\'a Çiçek Gönderme Rehberi', score:88, kwCount:6, wordCount:2100, links:8, status:'published' },
  { title:'Orkide Bakım Rehberi',                score:95, kwCount:12, wordCount:2400, links:10, status:'published' },
  { title:'Düğün Çiçeği Seçim Rehberi',          score:76, kwCount:5, wordCount:1200, links:3, status:'draft' },
];

const ERRORS_404 = [
  { url:'/cicekler/orkide-mor', hits:124, lastHit:'14 Haz', suggestion:'/kategori/orkideler' },
  { url:'/hediye/set-premium',  hits:87,  lastHit:'13 Haz', suggestion:'/upsell/hediye-seti' },
  { url:'/blog/eski-yazi',      hits:34,  lastHit:'12 Haz', suggestion:'/blog' },
];

const CONTENT_TEMPLATES = [
  { id:'lokasyon', name:'Lokasyon Sayfası', desc:'Sehir/ilçe bazlı SEO sayfası', icon:'📍', count:81 },
  { id:'kategori', name:'Kategori Sayfası', desc:Ürün kategori optimizasyonu', icon:'🌹', count:24 },
  { id:'urun',     name:'Ürün Sayfası',     desc:'Product SEO schema + copy',    icon:'📦', count:48 },
  { id:'proje',    name:'Proje Sayfası',    desc:'Yapay çiçek proje sayfaları',    icon:'🏗️', count:12 },
  { id:'blog',     name:'Blog Makalesi',    desc:'SEO odaklı blog içeriği',        icon:'📝', count:32 },
  { id:'kargo',    name:'Kargo Sayfası',    desc:'Sehir bazlı kargo landing',     icon:'🚚', count:81 },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? GR[600] : score >= 75 ? AM[600] : RD[600];
  const bg    = score >= 90 ? GR[50]  : score >= 75 ? AM[50]  : RD[50];
  return <span style={{ fontSize:11, fontWeight:800, color, background:bg, padding:'3px 9px', borderRadius:99 }}>{score}</span>;
}

function STitle({ title, sub, actions }:{ title:string; sub?:string; actions?:React.ReactNode }) {
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

function Overview() {
  return (
    <div>
      <STitle title="SEO Genel Bakış" sub="Organik trafik, keyword sıralamaları ve teknik sağlık"/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {[
          { l:'Organik Trafik', v:'3.040', sub:'bu ay', c:BL[600], trend:'+18%' },
          { l:'SEO Skoru', v:'84/100', sub:'genel', c:GR[600], trend:'+3pp' },
          { l:'Anahtar Kelime', v:'142', sub:'ilk 10’da', c:P.purple },
          { l:'Hata Sayısı', v:'3', sub:'404 hata', c:RD[600] },
        ].map((k,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}>
            <div style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>{k.l}</div>
            <div style={{ fontSize:22, fontWeight:900, color:k.c }}>{k.v}</div>
            <div style={{ display:'flex', gap:4, marginTop:4 }}>
              {k.trend && <span style={{ fontSize:11, fontWeight:700, color:GR[600] }}>{k.trend}</span>}
              <span style={{ fontSize:11, color:T.gray400 }}>{k.sub}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20, marginBottom:18 }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Organik Trafik Trendi</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={ORGANIC_TREND}>
            <defs>
              <linearGradient id="seoIdxG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={BL[600]} stopOpacity={0.25}/>
                <stop offset="95%" stopColor={BL[600]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
            <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
            <YAxis tick={{ fontSize:10, fill:T.gray400 }}/>
            <Tooltip/>
            <Area type="monotone" dataKey="organic" stroke={BL[600]} fill="url(#seoIdxG)" strokeWidth={2.5} name="Organik Trafik"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Reports() {
  return (
    <div>
      <STitle title="SEO Raporları" sub="Anahtar kelime sıralamaları ve organik trafik"
        actions={<button style={{ padding:'7px 14px', border:`1px solid ${T.gray200}`, borderRadius:9, background:'#fff', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><Download style={{ width:12, height:12 }}/> CSV</button>}
      />
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden', marginBottom:18 }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['Anahtar Kelime','Konum','Tıklama','Gösterim','CTR','Trend'].map(h=>(
                <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOP_KEYWORDS.map((kw,i)=>(
              <tr key={i} style={{ borderBottom:`1px solid ${T.gray50}` }}
                onMouseEnter={e=>(e.currentTarget.style.background=T.gray50)}
                onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
              >
                <td style={{ padding:'11px 14px', fontSize:13, fontWeight:600, color:T.gray800 }}>{kw.kw}</td>
                <td style={{ padding:'11px 14px' }}>
                  <span style={{ fontSize:14, fontWeight:900, color:kw.pos<=3?GR[600]:kw.pos<=7?AM[600]:RD[600] }}>#{kw.pos}</span>
                </td>
                <td style={{ padding:'11px 14px', fontSize:12.5, color:T.gray700 }}>{kw.clicks.toLocaleString('tr-TR')}</td>
                <td style={{ padding:'11px 14px', fontSize:12.5, color:T.gray500 }}>{kw.impressions.toLocaleString('tr-TR')}</td>
                <td style={{ padding:'11px 14px', fontSize:12.5, color:T.gray700 }}>{kw.ctr}</td>
                <td style={{ padding:'11px 14px' }}>
                  {kw.trend==='up' ? <ArrowUp style={{ width:14, height:14, color:GR[600] }}/> : kw.trend==='down' ? <ArrowDown style={{ width:14, height:14, color:RD[600] }}/> : <span style={{ color:T.gray300 }}>→</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetaManager() {
  const [editing, setEditing] = useState<string|null>(null);
  return (
    <div>
      <STitle title="Meta Yöneticisi" sub="Tüm sayfa meta etiketleri — inline düzenleme"
        actions={<button style={{ padding:'7px 14px', border:'none', borderRadius:9, background:BL[600], color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><Plus style={{ width:12, height:12 }}/> Yeni Meta</button>}
      />
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {META_PAGES.map(page=>(
          <div key={page.id} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 20px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  <div style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>{page.page}</div>
                  <span style={{ fontSize:10.5, fontWeight:700, color:page.status==='active'?GR[600]:AM[600], background:page.status==='active'?GR[50]:AM[50], padding:'2px 8px', borderRadius:99 }}>{page.status==='active'?'Aktif':'Taslak'}</span>
                  <ScoreBadge score={page.score}/>
                </div>
                {editing===page.id ? (
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    <input defaultValue={page.title} style={{ width:'100%', height:36, padding:'0 10px', border:`1.5px solid ${BL[600]}`, borderRadius:8, fontSize:12.5, outline:'none', boxSizing:'border-box' }}/>
                    <input defaultValue={page.desc} style={{ width:'100%', height:36, padding:'0 10px', border:`1.5px solid ${BL[600]}`, borderRadius:8, fontSize:12.5, outline:'none', boxSizing:'border-box' }}/>
                    <div style={{ display:'flex', gap:8 }}>
                      <button onClick={()=>setEditing(null)} style={{ padding:'6px 14px', border:'none', borderRadius:7, background:GR[600], color:'#fff', fontSize:11.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><CheckCircle2 style={{ width:11, height:11 }}/> Kaydet</button>
                      <button onClick={()=>setEditing(null)} style={{ padding:'6px 12px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer' }}>Vazgeç</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:BL[600] }}>{page.title}</div>
                    <div style={{ fontSize:12, color:T.gray400, marginTop:2 }}>{page.desc}</div>
                  </div>
                )}
              </div>
              <button onClick={()=>setEditing(editing===page.id?null:page.id)} style={{ padding:'6px 12px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:11.5, cursor:'pointer', display:'flex', alignItems:'center', gap:4, flexShrink:0, marginLeft:12 }}>
                <Edit2 style={{ width:11, height:11 }}/> Düzenle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchemaBuilder() {
  return (
    <div>
      <STitle title="Schema Builder" sub="JSON-LD yapısal veri yönetimi"/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {SCHEMA_ITEMS.map(s=>(
          <div key={s.type} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{s.type}</div>
              <ScoreBadge score={s.score}/>
            </div>
            <span style={{ fontSize:10.5, fontWeight:700, color:s.status==='active'?GR[600]:AM[600], background:s.status==='active'?GR[50]:AM[50], padding:'2px 8px', borderRadius:99 }}>{s.status==='active'?'Aktif':'Taslak'}</span>
            {s.issues>0 && <div style={{ fontSize:11, color:RD[600], marginTop:6 }}>{s.issues} hata</div>}
            <button style={{ width:'100%', marginTop:10, padding:'6px 0', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer' }}>Test Et</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RedirectManager() {
  const [redirects, setRedirects] = useState(REDIRECTS);
  return (
    <div>
      <STitle title="Yönlendirme Yöneticisi" sub={`${redirects.length} aktif yönlendirme`}
        actions={
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ padding:'7px 14px', border:`1px solid ${T.gray200}`, borderRadius:9, background:'#fff', fontSize:12, cursor:'pointer' }}>CSV İçe Aktar</button>
            <button style={{ padding:'7px 14px', border:'none', borderRadius:9, background:BL[600], color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><Plus style={{ width:12, height:12 }}/> Yönlendirme Ekle</button>
          </div>
        }
      />
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['Kaynak URL','Hedef URL','Tip','Vurunum','Tarih',''].map(h=>(
                <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {redirects.map((r,i)=>(
              <tr key={i} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                <td style={{ padding:'11px 14px', fontSize:12, fontFamily:'monospace', color:T.gray600 }}>{r.from}</td>
                <td style={{ padding:'11px 14px', fontSize:12, fontFamily:'monospace', color:BL[600] }}>{r.to}</td>
                <td style={{ padding:'11px 14px' }}><span style={{ fontSize:11, fontWeight:700, color:'#fff', background:r.type==='301'?GR[600]:AM[600], padding:'2px 8px', borderRadius:99 }}>{r.type}</span></td>
                <td style={{ padding:'11px 14px', fontSize:12.5, color:T.gray600 }}>{r.hits.toLocaleString('tr-TR')}</td>
                <td style={{ padding:'11px 14px', fontSize:11.5, color:T.gray400 }}>{r.date}</td>
                <td style={{ padding:'11px 14px' }}>
                  <div style={{ display:'flex', gap:6 }}>
                    <button style={{ padding:'4px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11, cursor:'pointer' }}>Düzenle</button>
                    <button onClick={()=>setRedirects(rs=>rs.filter((_,j)=>j!==i))} style={{ padding:'4px 10px', border:`1px solid ${RD[50]}`, borderRadius:7, background:RD[50], color:RD[600], fontSize:11, cursor:'pointer', fontWeight:700 }}>Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CityPages() {
  return (
    <div>
      <STitle title="Şehir Sayfaları" sub={`${CITY_PAGES.filter(c=>c.status==='active').length} aktif / ${CITY_PAGES.length} toplam şehir sayfası`}
        actions={
          <button style={{ padding:'7px 14px', border:'none', borderRadius:9, background:BL[600], color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <Zap style={{ width:12, height:12 }}/> Toplu Oluştur
          </button>
        }
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        {CITY_PAGES.map(city=>(
          <div key={city.city} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div style={{ fontSize:15, fontWeight:800, color:T.gray900 }}>{city.city}</div>
              <span style={{ fontSize:10.5, fontWeight:700, color:city.status==='active'?GR[600]:city.status==='draft'?AM[600]:T.gray400, background:city.status==='active'?GR[50]:city.status==='draft'?AM[50]:T.gray100, padding:'2px 8px', borderRadius:99 }}>{city.status==='active'?'Aktif':city.status==='draft'?'Taslak':'Planlanan'}</span>
            </div>
            <div style={{ fontSize:11, color:T.gray400, marginBottom:8 }}>{city.population} nüfus</div>
            <div style={{ fontSize:12, fontWeight:600, color:BL[600], marginBottom:6 }}>{city.traffic}</div>
            {city.score > 0 && (
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                <div style={{ flex:1, height:4, borderRadius:99, background:T.gray100, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${city.score}%`, background:city.score>=85?GR[600]:city.score>=70?AM[600]:RD[600], borderRadius:99 }}/>
                </div>
                <ScoreBadge score={city.score}/>
              </div>
            )}
            <div style={{ display:'flex', gap:6, marginTop:8 }}>
              <button style={{ flex:1, padding:'6px 0', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11, cursor:'pointer' }}>Düzenle</button>
              {city.status!=='active' && <button style={{ flex:1, padding:'6px 0', border:'none', borderRadius:7, background:BL[600], color:'#fff', fontSize:11, fontWeight:700, cursor:'pointer' }}>Yayınla</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentManager() {
  return (
    <div>
      <STitle title="İçerik Yöneticisi" sub="SEO içerik şablonları ve otomatik üretim"/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {CONTENT_TEMPLATES.map(tmpl=>(
          <div key={tmpl.id} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px' }}>
            <div style={{ fontSize:28, marginBottom:10 }}>{tmpl.icon}</div>
            <div style={{ fontSize:14.5, fontWeight:800, color:T.gray900, marginBottom:4 }}>{tmpl.name}</div>
            <div style={{ fontSize:12.5, color:T.gray400, marginBottom:12 }}>{tmpl.desc}</div>
            <div style={{ fontSize:11, color:T.gray400, marginBottom:14 }}>{tmpl.count} sayfa</div>
            <button style={{ width:'100%', padding:'8px 0', border:'none', borderRadius:9, background:BL[600], color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>
              <Zap style={{ width:12, height:12 }}/> AI ile Oluştur
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogManager() {
  return (
    <div>
      <STitle title="Blog Yöneticisi" sub="Blog yazıları SEO performansı"/>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {BLOG_POSTS_SEO.map((post,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 20px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:T.gray900 }}>{post.title}</div>
                  <span style={{ fontSize:10.5, fontWeight:700, color:post.status==='published'?GR[600]:AM[600], background:post.status==='published'?GR[50]:AM[50], padding:'2px 8px', borderRadius:99 }}>{post.status==='published'?'Yayında':'Taslak'}</span>
                </div>
                <div style={{ display:'flex', gap:16 }}>
                  {[
                    { l:'Kelimeler', v:post.wordCount.toLocaleString('tr-TR') },
                    { l:'Anahtar Kelime', v:post.kwCount },
                    { l:'Bağlantılar', v:post.links },
                  ].map((s,j)=>(
                    <span key={j} style={{ fontSize:11, color:T.gray400 }}>{s.l}: <strong style={{ color:T.gray700 }}>{s.v}</strong></span>
                  ))}
                </div>
              </div>
              <ScoreBadge score={post.score}/>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ flex:1, height:5, borderRadius:99, background:T.gray100, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${post.score}%`, borderRadius:99, background:post.score>=90?GR[600]:post.score>=75?AM[600]:RD[600] }}/>
              </div>
              <span style={{ fontSize:10.5, color:T.gray400 }}>SEO Skoru</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorPages() {
  return (
    <div>
      <STitle title="404 Hataları" sub={`${ERRORS_404.length} kırık bağlantı tespit edildi`}
        actions={<button style={{ padding:'7px 14px', border:'none', borderRadius:9, background:RD[600], color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' }}>Toplu Düzelt</button>}
      />
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {ERRORS_404.map((e,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:12, fontFamily:'monospace', color:RD[600], marginBottom:4 }}>{e.url}</div>
              <div style={{ fontSize:11, color:T.gray400 }}>{e.hits} istek • Son: {e.lastHit}</div>
              <div style={{ fontSize:11, color:GR[600], marginTop:4 }}>Tavsiye: {e.suggestion}</div>
            </div>
            <button style={{ padding:'7px 14px', border:'none', borderRadius:8, background:GR[600], color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' }}>301 Ekle</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScreenSEO() {
  const [module, setModule] = useState<SEOModule>('overview');
  return (
    <div style={{ display:'flex', height:'100%', background:'#F5F7FA', overflow:'hidden' }}>
      <aside style={{ width:220, flexShrink:0, background:'#fff', borderRight:`1px solid ${T.gray200}`, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'18px 16px 12px', borderBottom:`1px solid ${T.gray100}` }}>
          <div style={{ fontSize:12, fontWeight:900, color:BL[600], textTransform:'uppercase', letterSpacing:'0.1em' }}>SEO Merkezi</div>
          <div style={{ fontSize:10.5, color:T.gray400, marginTop:2 }}>Arama motoru optimizasyonu</div>
        </div>
        <nav style={{ flex:1, overflowY:'auto', padding:'10px 8px' }}>
          {MODULES.map(m=>(
            <button key={m.id} onClick={()=>setModule(m.id)} style={{ width:'100%', padding:'10px 12px', border:'none', borderRadius:10, background:module===m.id?BL[50]:'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:10, marginBottom:3, transition:'all 0.12s', textAlign:'left' }}>
              <m.icon style={{ width:15, height:15, color:module===m.id?BL[600]:T.gray400, flexShrink:0 }}/>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:12.5, fontWeight:module===m.id?700:500, color:module===m.id?BL[600]:T.gray700 }}>{m.label}</div>
                <div style={{ fontSize:10, color:T.gray400, marginTop:1 }}>{m.sub}</div>
              </div>
            </button>
          ))}
        </nav>
        <div style={{ padding:'12px 16px', borderTop:`1px solid ${T.gray100}`, fontSize:10, color:T.gray400 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#22C55E' }}/>
            <span style={{ fontWeight:600, color:GR[600] }}>GSC Bağlı</span>
            <span> — canlı veri</span>
          </div>
        </div>
      </aside>
      <main style={{ flex:1, overflowY:'auto', padding:28 }}>
        {module==='overview'  && <Overview/>}
        {module==='reports'   && <Reports/>}
        {module==='meta'      && <MetaManager/>}
        {module==='schema'    && <SchemaBuilder/>}
        {module==='redirects' && <RedirectManager/>}
        {module==='cities'    && <CityPages/>}
        {module==='content'   && <ContentManager/>}
        {module==='blog'      && <BlogManager/>}
        {module==='errors'    && <ErrorPages/>}
        {['sitemap','canonical','districts'].includes(module) && (
          <div style={{ textAlign:'center', padding:'60px', color:T.gray400 }}>
            <Globe style={{ width:48, height:48, margin:'0 auto 12px', opacity:0.3 }}/>
            <div style={{ fontSize:15, fontWeight:600 }}>{MODULES.find(m=>m.id===module)?.label} — yakında aktif</div>
          </div>
        )}
      </main>
    </div>
  );
}
