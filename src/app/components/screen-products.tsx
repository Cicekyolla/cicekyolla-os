// CICEKYOLLA OS — Enterprise Product Management ERP
// Full 74KB source at github.com/Cicekyolla/cicekyolla-os
// Features: Product catalog, variant mgmt, SEO, analytics, pricing, stock
import React, { useEffect, useState } from 'react';
import { Search, Plus, Filter, Download, Star, TrendingUp, Package, BarChart2, Edit2, Eye, ChevronDown, ChevronUp, X, Check, ToggleLeft, ToggleRight, Tag, Layers } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { T } from './ui-kit';
import type { StorefrontProduct } from '../data/products-store';
const P  = { purple:'#7C3AED', mid:'#8B5CF6', pale:'#EDE9FE', deep:'#1E1B4B' };
const GR = { 600:'#16A34A', 700:'#15803D', 50:'#F0FDF4', 100:'#DCFCE7' };
const AM = { 600:'#D97706', 50:'#FFFBEB', 100:'#FEF3C7' };
const BL = { 600:'#2563EB', 50:'#EFF6FF' };
const RD = { 600:'#DC2626', 50:'#FEF2F2' };

type ProdView = 'catalog'|'analytics'|'seo'|'pricing';
type ProdStatus = 'active'|'draft'|'archived'|'out-of-stock';

const STATUS_MAP: Record<ProdStatus, { l:string; c:string; bg:string }> = {
  active:       { l:'Aktif',        c:GR[600],  bg:GR[50]  },
  draft:        { l:'Taslak',       c:AM[600],  bg:AM[50]  },
  archived:     { l:'Arşiv',        c:T.gray400, bg:T.gray100 },
  'out-of-stock':{ l:'Stok Yok',   c:RD[600],  bg:RD[50]  },
};

function SeoBar({ score }: { score: number }) {
  const color = score>=85?GR[600]:score>=70?AM[600]:RD[600];
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <div style={{ flex:1, height:4, borderRadius:99, background:T.gray100, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${score}%`, background:color, borderRadius:99 }}/>
      </div>
      <span style={{ fontSize:11, fontWeight:700, color, minWidth:24 }}>{score}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: ProdStatus }) {
  const cfg = STATUS_MAP[status];
  return <span style={{ fontSize:11, fontWeight:700, color:cfg.c, background:cfg.bg, padding:'3px 9px', borderRadius:99 }}>{cfg.l}</span>;
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

function ProductDrawer({ product, onClose }: { product: StorefrontProduct; onClose:()=>void }) {
  const [tab, setTab] = useState<'info'|'variants'|'seo'|'faq'>('info');
  const [active, setActive] = useState(product.status==='active');
  const [featured, setFeatured] = useState(product.featured);

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', justifyContent:'flex-end', background:'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ width:520, background:'#fff', height:'100%', overflowY:'auto', boxShadow:'-8px 0 32px rgba(0,0,0,0.12)' }}>
        {/* Drawer header */}
        <div style={{ padding:'20px 24px', borderBottom:`1px solid ${T.gray100}`, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div style={{ display:'flex', gap:14, alignItems:'center' }}>
            <div style={{ width:56, height:56, borderRadius:14, background:P.pale, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, flexShrink:0 }}>{product.emoji}</div>
            <div>
              <div style={{ fontSize:16, fontWeight:900, color:T.gray900, lineHeight:1.3 }}>{product.name}</div>
              <div style={{ fontSize:12, color:T.gray400, marginTop:2 }}>{product.category}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ width:28, height:28, borderRadius:'50%', border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X style={{ width:12, height:12 }}/></button>
        </div>

        {/* Quick toggles */}
        <div style={{ padding:'14px 24px', borderBottom:`1px solid ${T.gray100}`, display:'flex', gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:12.5, fontWeight:600, color:T.gray700 }}>Aktif</span>
            <button onClick={()=>{ setActive(a=>!a); }} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
              {active?<ToggleRight style={{ width:28, height:28, color:GR[600] }}/>:<ToggleLeft style={{ width:28, height:28, color:T.gray300 }}/>}
            </button>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:12.5, fontWeight:600, color:T.gray700 }}>Vitrin</span>
            <button onClick={()=>{ setFeatured(f=>!f); }} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
              {featured?<ToggleRight style={{ width:28, height:28, color:AM[600] }}/>:<ToggleLeft style={{ width:28, height:28, color:T.gray300 }}/>}
            </button>
          </div>
          {product.isBestSeller&&<span style={{ fontSize:11, fontWeight:700, color:AM[600], background:AM[50], padding:'3px 9px', borderRadius:99 }}>En Çok Satan</span>}
          {product.isNew&&<span style={{ fontSize:11, fontWeight:700, color:BL[600], background:BL[50], padding:'3px 9px', borderRadius:99 }}>Yeni</span>}
        </div>

        {/* Drawer tabs */}
        <div style={{ display:'flex', gap:4, padding:'12px 24px', borderBottom:`1px solid ${T.gray100}`, background:T.gray50 }}>
          {(['info','variants','seo','faq'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{ padding:'6px 14px', border:'none', borderRadius:8, background:tab===t?'#fff':'transparent', fontSize:12.5, fontWeight:tab===t?700:400, color:tab===t?P.purple:T.gray500, cursor:'pointer', boxShadow:tab===t?'0 1px 4px rgba(0,0,0,0.08)':'none' }}>
              {t==='info'?'Bilgi':t==='variants'?'Varyantlar':t==='seo'?'SEO':'SSS'}
            </button>
          ))}
        </div>

        <div style={{ padding:'20px 24px' }}>
          {tab==='info'&&(
            <div>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Kategori</label>
                <div style={{ fontSize:13.5, color:T.gray800, fontWeight:600 }}>{product.category}</div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Açıklama</label>
                <textarea defaultValue={product.shortDesc} rows={3} style={{ width:'100%', padding:'10px 12px', border:`1.5px solid ${T.gray200}`, borderRadius:9, fontSize:13, outline:'none', resize:'vertical', fontFamily:'inherit', lineHeight:1.5, boxSizing:'border-box' }}/>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Bakım Bilgisi</label>
                <div style={{ fontSize:13, color:T.gray600, background:T.gray50, borderRadius:8, padding:'10px 12px', lineHeight:1.6 }}>{product.careInfo}</div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Etiketler</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {(product.tags ?? []).map(tag=>(<span key={tag} style={{ fontSize:12, color:P.purple, background:P.pale, border:`1px solid ${P.pale}`, padding:'3px 10px', borderRadius:99 }}>{tag}</span>))}
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
                {[{ l:'Puan', v:`★ ${product.rating}` },{ l:'Yorum', v:product.reviewCount },{ l:'Satış', v:product.sold ?? 0 }].map((m,i)=>(
                  <div key={i} style={{ background:T.gray50, borderRadius:10, padding:'12px', textAlign:'center' }}>
                    <div style={{ fontSize:18, fontWeight:900, color:T.gray900 }}>{m.v}</div>
                    <div style={{ fontSize:10.5, color:T.gray400 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='variants'&&(
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:14 }}>Varyantlar & Fiyatlar</div>
              {(product.variants ?? []).map((v,i)=>(
                <div key={v.id} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'14px 16px', marginBottom:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:13.5, fontWeight:700, color:T.gray900 }}>{v.label}</div>
                    <div style={{ fontSize:11.5, color:T.gray400, marginTop:2 }}>Stok: {v.stock}</div>
                  </div>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <input defaultValue={v.price} type="number" style={{ width:90, height:36, padding:'0 10px', border:`1.5px solid ${T.gray200}`, borderRadius:8, fontSize:13, fontWeight:700, color:P.purple, outline:'none', textAlign:'right' }}/>
                    <button style={{ padding:'7px 12px', border:'none', borderRadius:8, background:GR[600], color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Check style={{ width:11, height:11 }}/></button>
                  </div>
                </div>
              ))}
              <button style={{ width:'100%', padding:'10px', border:`2px dashed ${T.gray200}`, borderRadius:10, background:'transparent', fontSize:13, color:T.gray400, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <Plus style={{ width:13, height:13 }}/> Varyant Ekle
              </button>
            </div>
          )}

          {tab==='seo'&&(
            <div>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>SEO Başlık</label>
                <input defaultValue={product.seoTitle} style={{ width:'100%', height:40, padding:'0 12px', border:`1.5px solid ${T.gray200}`, borderRadius:9, fontSize:13, outline:'none', color:T.gray800, boxSizing:'border-box' }}/>
                <div style={{ fontSize:11, color:T.gray400, marginTop:4 }}>{(product.seoTitle ?? '').length}/60 karakter</div>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Meta Açıklama</label>
                <textarea defaultValue={product.seoDescription} rows={3} style={{ width:'100%', padding:'10px 12px', border:`1.5px solid ${T.gray200}`, borderRadius:9, fontSize:13, outline:'none', resize:'none', fontFamily:'inherit', boxSizing:'border-box' }}/>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Anahtar Kelimeler</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {(product.seoKeywords ?? []).map(kw=>(<span key={kw} style={{ fontSize:12, color:BL[600], background:BL[50], border:`1px solid ${BL[50]}`, padding:'3px 10px', borderRadius:99 }}>{kw}</span>))}
                </div>
              </div>
              {/* Google preview */}
              <div style={{ background:T.gray50, borderRadius:10, padding:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.gray400, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.07em' }}>Google Önizleme</div>
                <div style={{ fontSize:12, color:T.gray400, marginBottom:3 }}>https://cicekyolla.com/urun/{product.id}</div>
                <div style={{ fontSize:15, fontWeight:400, color:'#1558D6', marginBottom:3, cursor:'pointer' }}>{product.seoTitle}</div>
                <div style={{ fontSize:13, color:T.gray500, lineHeight:1.5 }}>{product.seoDescription}</div>
              </div>
            </div>
          )}

          {tab==='faq'&&(
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:14 }}>Sik Sorulan Sorular ({(product.faq ?? []).length})</div>
              {(product.faq ?? []).map((f,i)=>(
                <div key={i} style={{ background:T.gray50, borderRadius:10, padding:'14px 16px', marginBottom:10 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:6 }}>{f.q}</div>
                  <div style={{ fontSize:12.5, color:T.gray600, lineHeight:1.5 }}>{f.a}</div>
                </div>
              ))}
              <button style={{ width:'100%', padding:'10px', border:`2px dashed ${T.gray200}`, borderRadius:10, background:'transparent', fontSize:13, color:T.gray400, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <Plus style={{ width:13, height:13 }}/> Soru Ekle
              </button>
            </div>
          )}
        </div>

        {/* Drawer footer */}
        <div style={{ position:'sticky', bottom:0, background:'#fff', borderTop:`1px solid ${T.gray100}`, padding:'14px 24px', display:'flex', gap:10 }}>
          <button style={{ flex:1, padding:'10px', border:'none', borderRadius:10, background:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:13.5, fontWeight:800, cursor:'pointer' }}>Değişiklikleri Kaydet</button>
          <button style={{ padding:'10px 16px', border:`1px solid ${T.gray200}`, borderRadius:10, background:'#fff', fontSize:13, color:T.gray600, cursor:'pointer' }}>Sayfa Görünümü</button>
        </div>
      </div>
    </div>
  );
}

const CATEGORY_STATS = [
  { category:'Güller',         products:48, revenue:184000, growth:'+12%' },
  { category:'Orkideler',     products:24, revenue:98000,  growth:'+8%'  },
  { category:'Hediye Seti',   products:18, revenue:76000,  growth:'+22%' },
  { category:'Karışık Buket', products:32, revenue:62000,  growth:'+5%'  },
  { category:'Kargo',         products:20, revenue:68000,  growth:'+31%' },
];

const MONTHLY_PRODUCT_DATA = [
  { month:'Oca', revenue:284000, orders:1840, newProducts:3 },
  { month:'Şub', revenue:312000, orders:2020, newProducts:2 },
  { month:'Mar', revenue:298000, orders:1930, newProducts:5 },
  { month:'Nis', revenue:341000, orders:2210, newProducts:1 },
  { month:'May', revenue:378000, orders:2450, newProducts:4 },
  { month:'Haz', revenue:405000, orders:2620, newProducts:2 },
];

export function ScreenProducts() {
  const [view, setView] = useState<ProdView>('catalog');
 const [products, setProducts] = useState<StorefrontProduct[]>([]);
 useEffect(() => {
  fetch('/api/products')
    .then((res) => res.json())
    .then((data) => {
      // Safe mapping layer: normalize any /api/products row into a complete
      // StorefrontProduct so the UI never reads an undefined field.
      const mapped: StorefrontProduct[] = (data.products || []).map((p: any) => ({
        id: p.id,
        numId: p.sku || p.num_id || p.id || '',
        name: p.name || '',
        category: p.category_name || p.category || 'Genel',
        emoji: p.emoji || '🌹',
        status: p.is_active === false ? 'draft' : (p.status || 'active'),
        featured: Boolean(p.is_featured),
        isBestSeller: Boolean(p.is_best_seller),
        isNew: Boolean(p.is_new),
        basePrice: Number(p.price || p.base_price || 0),
        shortDesc: p.short_desc || p.description || '',
        careInfo: p.care_info || '',
        tags: Array.isArray(p.tags) ? p.tags : [],
        rating: Number(p.rating || 0),
        reviewCount: Number(p.review_count || 0),
        sold: Number(p.sales || p.sold || 0),
        variants: Array.isArray(p.variants) ? p.variants : [],
        seoTitle: p.seo_title || p.name || '',
        seoDescription: p.seo_description || p.short_desc || '',
        seoKeywords: Array.isArray(p.seo_keywords) ? p.seo_keywords : [],
        faq: Array.isArray(p.faq) ? p.faq : [],
      }));

      setProducts(mapped);
    })
    .catch(() => {
      setProducts([]);
    });
}, []);
  const [search, setSearch] = useState('');
  
  

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [catFilter, setCatFilter] = useState<string>('all');
  const [selected, setSelected] = useState<StorefrontProduct|null>(null);
  const [sortBy, setSortBy] = useState<'name'|'price'|'rating'|'sales'>('sales');

  function toggleActive(id: string) {
    
    setProducts(ps => ps.map(p => p.id===id ? { ...p, status:p.status==='active'?'draft':'active' } : p));
  }

  const categories = [...new Set(products.map(p=>p.category))];

  let filtered = products.filter(p => {
    if (statusFilter!=='all' && p.status!==statusFilter) return false;
    if (catFilter!=='all' && p.category!==catFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (sortBy==='price') filtered=[...filtered].sort((a,b)=>(b.basePrice||0)-(a.basePrice||0));
  if (sortBy==='rating') filtered=[...filtered].sort((a,b)=>b.rating-a.rating);
  if (sortBy==='sales') filtered=[...filtered].sort((a,b)=>(b.sold||0)-(a.sold||0));
  if (sortBy==='name') filtered=[...filtered].sort((a,b)=>a.name.localeCompare(b.name,'tr'));

  const activeCount = products.filter(p=>p.status==='active').length;
  const featuredCount = products.filter(p=>p.featured).length;
  const avgRating = (products.reduce((s,p)=>s+p.rating,0)/products.length).toFixed(1);
  const totalRevenue = products.reduce((s,p)=>s+(p.basePrice||0)*(p.sold||0),0);

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflow:'hidden', background:T.gray50 }}>
      {/* Header */}
      <div style={{ background:'#fff', borderBottom:`1px solid ${T.gray200}`, padding:'16px 24px', flexShrink:0 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <div>
            <h1 style={{ fontSize:20, fontWeight:900, color:T.gray900, margin:0 }}>Ürün Yönetimi</h1>
            <p style={{ fontSize:12.5, color:T.gray400, margin:'3px 0 0' }}>{products.length} ürün • {activeCount} aktif • {featuredCount} vitrin</p>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <div style={{ display:'flex', gap:4, background:T.gray100, borderRadius:9, padding:4 }}>
              {(['catalog','analytics','seo','pricing'] as ProdView[]).map(v=>(
                <button key={v} onClick={()=>setView(v)} style={{ padding:'6px 14px', border:'none', borderRadius:7, background:view===v?'#fff':'transparent', fontSize:12, fontWeight:view===v?700:400, color:view===v?T.gray900:T.gray500, cursor:'pointer' }}>
                  {v==='catalog'?'Katalog':v==='analytics'?'Analitik':v==='seo'?'SEO':'Fiyatlandırma'}
                </button>
              ))}
            </div>
            <button style={{ padding:'8px 14px', border:`1px solid ${T.gray200}`, borderRadius:9, background:'#fff', fontSize:12.5, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><Download style={{ width:13, height:13 }}/> Excel</button>
            <button style={{ padding:'8px 16px', border:'none', borderRadius:9, background:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><Plus style={{ width:13, height:13 }}/> Yeni Ürün</button>
          </div>
        </div>

        {/* Search & filters */}
        {view==='catalog'&&(
          <div style={{ display:'flex', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7, background:T.gray50, border:`1px solid ${T.gray200}`, borderRadius:9, padding:'7px 12px', flex:1 }}>
              <Search style={{ width:13, height:13, color:T.gray400 }}/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ürün adı veya kategori ara..." style={{ border:'none', outline:'none', background:'transparent', fontSize:13, color:T.gray700, width:'100%' }}/>
            </div>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{ height:36, padding:'0 10px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:12.5, color:T.gray700, outline:'none', cursor:'pointer' }}>
              <option value="all">Tüm Durumlar</option>
              {Object.entries(STATUS_MAP).map(([k,v])=>(<option key={k} value={k}>{v.l}</option>))}
            </select>
            <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} style={{ height:36, padding:'0 10px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:12.5, color:T.gray700, outline:'none', cursor:'pointer' }}>
              <option value="all">Tüm Kategoriler</option>
              {categories.map(c=>(<option key={c} value={c}>{c}</option>))}
            </select>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value as any)} style={{ height:36, padding:'0 10px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:12.5, color:T.gray700, outline:'none', cursor:'pointer' }}>
              <option value="sales">En Çok Satan</option>
              <option value="price">Fiyat (Yüksek)</option>
              <option value="rating">En Yüksek Puan</option>
              <option value="name">Alfabetik</option>
            </select>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
        {/* KPI row (always visible) */}
        <div style={{ display:'flex', gap:14, marginBottom:24 }}>
          <KpiCard label="Aktif Ürün" value={String(activeCount)} sub="katalogda" color={GR[600]} icon={Package} trend="+2"/>
          <KpiCard label="Vitrin Ürünü" value={String(featuredCount)} sub="ana sayfada" color={AM[600]} icon={Star}/>
          <KpiCard label="Ort. Puan" value={avgRating} sub="müşteri yorumu" color={P.purple} icon={TrendingUp}/>
          <KpiCard label="Toplam Gelir (Tahm.)" value={`₺${Math.round(totalRevenue/1000)}K`} sub="tüm ürünler" color={BL[600]} icon={BarChart2}/>
        </div>

        {/* CATALOG VIEW */}
        {view==='catalog'&&(
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:T.gray50 }}>
                  {['Ürün','Kategori','Fiyat','Puan','Satış','SEO','Durum','Vitrin',''].map(h=>(
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
                      <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                        <div style={{ width:44, height:44, borderRadius:11, background:P.pale, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{p.emoji}</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{p.name}</div>
                          <div style={{ fontSize:11, color:T.gray400, marginTop:1 }}>{p.numId}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:'12px 14px' }}>
                      <span style={{ fontSize:11.5, fontWeight:600, color:BL[600], background:BL[50], padding:'3px 8px', borderRadius:99 }}>{p.category}</span>
                    </td>
                    <td style={{ padding:'12px 14px' }}>
                      <div style={{ fontSize:13.5, fontWeight:800, color:P.purple }}>₺{(p.basePrice ?? 0).toLocaleString('tr-TR')}</div>
                      <div style={{ fontSize:10.5, color:T.gray400 }}>{(p.variants?.length ?? 0)} varyant</div>
                    </td>
                    <td style={{ padding:'12px 14px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                        <Star style={{ width:12, height:12, color:'#FBBF24', fill:'#FBBF24' }}/>
                        <span style={{ fontSize:12.5, fontWeight:700, color:T.gray800 }}>{p.rating}</span>
                        <span style={{ fontSize:11, color:T.gray400 }}>({p.reviewCount})</span>
                      </div>
                    </td>
                    <td style={{ padding:'12px 14px', fontSize:13, fontWeight:700, color:T.gray800 }}>{(p.sold ?? 0).toLocaleString('tr-TR')}</td>
                    <td style={{ padding:'12px 14px', minWidth:100 }}>
                      <SeoBar score={Math.round(85+p.rating*2)}/>
                    </td>
                    <td style={{ padding:'12px 14px' }}><StatusBadge status={p.status as ProdStatus}/></td>
                    <td style={{ padding:'12px 14px' }}>
                      <button onClick={()=>{  setProducts(ps=>ps.map(x=>x.id===p.id?{...x,featured:!x.featured}:x)); }} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
                        {p.featured?<ToggleRight style={{ width:26, height:26, color:AM[600] }}/>:<ToggleLeft style={{ width:26, height:26, color:T.gray300 }}/>}
                      </button>
                    </td>
                    <td style={{ padding:'12px 14px' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={()=>setSelected(p)} style={{ width:30, height:30, borderRadius:8, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Edit2 style={{ width:13, height:13, color:T.gray500 }}/></button>
                        <button style={{ width:30, height:30, borderRadius:8, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Eye style={{ width:13, height:13, color:T.gray500 }}/></button>
                        <button onClick={()=>toggleActive(p.id)} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
                          {p.status==='active'?<ToggleRight style={{ width:26, height:26, color:GR[600] }}/>:<ToggleLeft style={{ width:26, height:26, color:T.gray300 }}/>}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length===0&&(
              <div style={{ padding:'48px', textAlign:'center', color:T.gray400 }}>
                <Package style={{ width:36, height:36, margin:'0 auto 12px', opacity:0.3 }}/>
                <div style={{ fontSize:14 }}>Filtre sonucunda ürün bulunamadı</div>
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS VIEW */}
        {view==='analytics'&&(
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:18, marginBottom:24 }}>
              <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
                <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Aylık Satış Trendi</div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={MONTHLY_PRODUCT_DATA}>
                    <defs>
                      <linearGradient id="prodRevG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={P.purple} stopOpacity={0.25}/>
                        <stop offset="95%" stopColor={P.purple} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                    <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
                    <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
                    <Tooltip formatter={(v:number)=>[`₺${v.toLocaleString('tr-TR')}`, 'Gelir']}/>
                    <Area type="monotone" dataKey="revenue" stroke={P.purple} fill="url(#prodRevG)" strokeWidth={2.5}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
                <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Kategori Geliri</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={CATEGORY_STATS} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={T.gray100} horizontal={false}/>
                    <XAxis type="number" tick={{ fontSize:9, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
                    <YAxis type="category" dataKey="category" tick={{ fontSize:10, fill:T.gray400 }} width={80}/>
                    <Tooltip formatter={(v:number)=>[`₺${v.toLocaleString('tr-TR')}`, 'Gelir']}/>
                    <Bar dataKey="revenue" fill={P.purple} radius={[0,4,4,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
              <div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.gray100}`, fontSize:13, fontWeight:700, color:T.gray800 }}>Kategori Performansı</div>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead><tr style={{ background:T.gray50 }}>{['Kategori','Ürün','Aylık Gelir','Trend'].map(h=>(<th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>))}</tr></thead>
                <tbody>
                  {CATEGORY_STATS.map((c,i)=>(
                    <tr key={i} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                      <td style={{ padding:'11px 14px', fontSize:13, fontWeight:600, color:T.gray800 }}>{c.category}</td>
                      <td style={{ padding:'11px 14px', fontSize:12.5, color:T.gray600 }}>{c.products}</td>
                      <td style={{ padding:'11px 14px', fontSize:13, fontWeight:800, color:P.purple }}>₺{c.revenue.toLocaleString('tr-TR')}</td>
                      <td style={{ padding:'11px 14px' }}><span style={{ fontSize:11.5, fontWeight:700, color:GR[600], background:GR[50], padding:'3px 8px', borderRadius:99 }}>{c.growth}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SEO VIEW */}
        {view==='seo'&&(
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:T.gray50 }}>
                  {['Ürün','SEO Skoru','SEO Başlık','Anahtar Kelime',''].map(h=>(
                    <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p=>{
                  const seoScore=Math.round(85+p.rating*2);
                  return (
                    <tr key={p.id} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                      <td style={{ padding:'12px 14px' }}><div style={{ display:'flex', gap:8, alignItems:'center' }}><span style={{ fontSize:20 }}>{p.emoji}</span><div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{p.name}</div></div></td>
                      <td style={{ padding:'12px 14px', minWidth:120 }}><SeoBar score={seoScore}/></td>
                      <td style={{ padding:'12px 14px', fontSize:12, color:T.gray600, maxWidth:200 }}><div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.seoTitle}</div></td>
                      <td style={{ padding:'12px 14px' }}><div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>{(p.seoKeywords ?? []).slice(0,2).map(kw=>(<span key={kw} style={{ fontSize:10.5, color:BL[600], background:BL[50], padding:'2px 7px', borderRadius:99 }}>{kw}</span>))}</div></td>
                      <td style={{ padding:'12px 14px' }}><button onClick={()=>setSelected(p)} style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Edit2 style={{ width:11, height:11 }}/> Düzenle</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PRICING VIEW */}
        {view==='pricing'&&(
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:T.gray50 }}>
                  {['Ürün','Baz Fiyat','Varyantlar','Stok','Satış','Fiyat Güncelle',''].map(h=>(
                    <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p=>(
                  <tr key={p.id} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                    <td style={{ padding:'12px 14px' }}><div style={{ display:'flex', gap:8, alignItems:'center' }}><span style={{ fontSize:20 }}>{p.emoji}</span><div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{p.name}</div></div></td>
                    <td style={{ padding:'12px 14px', fontSize:14, fontWeight:900, color:P.purple }}>₺{(p.basePrice ?? 0).toLocaleString('tr-TR')}</td>
                    <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>{(p.variants?.length ?? 0)} varyant</td>
                    <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>{(p.variants ?? []).reduce((s,v)=>s+v.stock,0)}</td>
                    <td style={{ padding:'12px 14px', fontSize:12.5, fontWeight:600, color:T.gray800 }}>{(p.sold ?? 0).toLocaleString('tr-TR')}</td>
                    <td style={{ padding:'12px 14px' }}>
                      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                        <input defaultValue={p.basePrice ?? 0} type="number" style={{ width:100, height:32, padding:'0 8px', border:`1.5px solid ${T.gray200}`, borderRadius:7, fontSize:13, fontWeight:700, color:P.purple, outline:'none', textAlign:'right' }}/>
                        <button style={{ padding:'6px 12px', border:'none', borderRadius:7, background:GR[600], color:'#fff', fontSize:11.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Check style={{ width:11, height:11 }}/> Kaydet</button>
                      </div>
                    </td>
                    <td style={{ padding:'12px 14px' }}><button onClick={()=>setSelected(p)} style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer' }}>Tüm Varyantlar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected&&<ProductDrawer product={selected} onClose={()=>setSelected(null)}/>}
    </div>
  );
}
