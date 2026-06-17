// CICEKYOLLA OS — Storefront Pages (PHASE 2 LOCKED)
// ProductPage: 5-image gallery, zoom, 360, video, 5 tabs, FBT, upsells, FAQ, SEO schema
// AccountPage: CRM-connected loyalty dashboard, birthday reminders, recommendations
// CategoryPage: Responsive sidebar + product grid
// Plus: Login, Blog, Delivery, FAQ, About, Contact, Corporate, Artificial, Legal, Cart
// Full 114KB source: github.com/Cicekyolla/cicekyolla-os
import { useState, useEffect } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import type React from 'react';
import {
  ShoppingBag, Star, Heart, Share2, Check, Truck, Clock, Shield,
  ChevronRight, ChevronLeft, Phone, Mail, MapPin, Minus, Plus, X,
  Lock, Eye, EyeOff, Package, RefreshCw, LogOut, Settings, CheckCircle2, ZoomIn,
} from 'lucide-react';
import { T } from './ui-kit';
import { useNav } from '../App';
import { STOREFRONT_PRODUCTS, FEATURED_PRODUCTS } from '../data/products-store';
import { UPSELL_CATALOG } from '../data/revenue-store';
import { KargoGuaranteeBox } from './screen-kargo';

const P    = { purple:'#7C3AED', mid:'#8B5CF6', light:'#A78BFA', pale:'#EDE9FE', lilac:'#DDD6FE', deep:'#1E1B4B', border:'#DDD6FE' };
const GR   = { 600:'#16A34A', 700:'#15803D', 50:'#F0FDF4', 100:'#DCFCE7' };
const AM   = { 600:'#D97706', 700:'#B45309', 50:'#FFFBEB' };
const BL   = { 600:'#2563EB', 50:'#EFF6FF', 100:'#DBEAFE' };

const fmt = (n: number) => '₺' + n.toLocaleString('tr-TR');

type SFPage = 'category'|'product'|'login'|'account'|'blog-detail'|'delivery-regions'|'faq'|'about'|'contact'|'kvkk'|'contract'|'corporate'|'artificial';

// Sample products (legacy compat + store fallback)
const PRODUCTS_SAMPLE = [
  { id:1, name:'51 Kırmızı Güller', price:1240, emoji:'🌹', cat:'Güller', rating:4.9, reviews:847 },
  { id:2, name:'Lux Orkide', price:980, emoji:'🌸', cat:'Orkideler', rating:4.8, reviews:423 },
  { id:3, name:'Premium Hediye Seti', price:1580, emoji:'🎁', cat:'Hediye Seti', rating:4.9, reviews:634 },
  { id:4, name:'Renkli Mevsim Buketi', price:680, emoji:'💐', cat:'Karışık', rating:4.7, reviews:312 },
  { id:5, name:'25 Beyaz Gül', price:840, emoji:'🤍', cat:'Güller', rating:4.8, reviews:287 },
  { id:6, name:'Tropik Sepet', price:1180, emoji:'🌊', cat:'Sepet', rating:4.6, reviews:198 },
];

const CART_ITEMS = [
  { id:1, name:'51 Kırmızı Gül Buketi', price:1240, emoji:'🌹', qty:1, variant:'Büyük Boy' },
  { id:2, name:'Lux Orkide', price:980, emoji:'🌸', qty:1, variant:'3 Dal' },
];

/* ── Nav Breadcrumb ── */
function NavBreadcrumb({ items }: { items: string[] }) {
  return (
    <div style={{ display:'flex', gap:6, alignItems:'center', marginBottom:20, flexWrap:'wrap' }}>
      {items.map((item,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:6 }}>
          {i>0&&<ChevronRight style={{ width:12, height:12, color:T.gray300 }}/>}
          <span style={{ fontSize:13, color:i<items.length-1?T.gray400:T.gray700, fontWeight:i===items.length-1?600:400, cursor:i<items.length-1?'pointer':'default' }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Product Card ── */
function ProductCard({ p }: { p: typeof PRODUCTS_SAMPLE[0] }) {
  const { navigate } = useNav();
  const [wish, setWish] = useState(false);
  const [added, setAdded] = useState(false);
  return (
    <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, overflow:'hidden', cursor:'pointer', transition:'all 0.18s', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.10)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; }}
      onClick={()=>navigate('sf-product')}
    >
      <div style={{ height:160, background:`linear-gradient(135deg,${P.pale},#fff)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:72, position:'relative' }}>
        {p.emoji}
        <button onClick={e=>{e.stopPropagation();setWish(w=>!w);}} style={{ position:'absolute', top:10, right:10, width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart style={{ width:14, height:14, color:wish?'#DC2626':'#9CA3AF', fill:wish?'#DC2626':'none' }}/>
        </button>
      </div>
      <div style={{ padding:'14px 16px' }}>
        <div style={{ fontSize:11, color:T.gray400, marginBottom:4 }}>{p.cat}</div>
        <div style={{ fontSize:14, fontWeight:800, color:T.gray900, marginBottom:6, lineHeight:1.3 }}>{p.name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:10 }}>
          <span style={{ fontSize:11, color:'#FBBF24' }}>★ {p.rating}</span>
          <span style={{ fontSize:10.5, color:T.gray400 }}>({p.reviews})</span>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:18, fontWeight:900, color:GR[600] }}>{fmt(p.price)}</div>
          <button onClick={e=>{e.stopPropagation();setAdded(true);setTimeout(()=>setAdded(false),2000);}} style={{ padding:'7px 14px', border:'none', borderRadius:9, background:added?GR[600]:`linear-gradient(135deg,${GR[600]},${GR[700]})`, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', transition:'all 0.2s' }}>
            {added?'✓ Eklendi':'Sepete Ekle'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Category Page ── */
function CategoryPage() {
  const { isMobile, isTablet } = useResponsive();
  const [cat, setCat] = useState('Tümü');
  const cats = ['Tümü','Güller','Orkideler','Laleler','Karışık','Özel Set'];
  const filtered = cat==='Tümü'?PRODUCTS_SAMPLE:PRODUCTS_SAMPLE.filter(p=>p.cat===cat);
  const colCount = isMobile?2:isTablet?2:3;

  return (
    <div style={{ padding:isMobile?'16px 12px':'24px 32px', maxWidth:1200, margin:'0 auto' }}>
      <NavBreadcrumb items={['Ana Sayfa','Kategoriler','Çiçekler']}/>

      {isMobile&&(
        <div style={{ marginBottom:16 }}>
          <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:6, scrollbarWidth:'none' }}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{ flexShrink:0, padding:'7px 14px', border:`2px solid ${cat===c?P.purple:T.gray200}`, borderRadius:99, background:cat===c?P.pale:'#fff', color:cat===c?P.purple:T.gray600, fontWeight:cat===c?700:400, fontSize:12, cursor:'pointer' }}>{c}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:24 }}>
        {!isMobile&&(
          <div style={{ width:200, flexShrink:0 }}>
            <div style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'14px', marginBottom:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:T.gray700, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.08em' }}>Kategoriler</div>
              {cats.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 8px', borderRadius:7, border:'none', cursor:'pointer', marginBottom:4, background:cat===c?P.pale:'transparent', color:cat===c?P.purple:T.gray600, fontWeight:cat===c?600:400, fontSize:12.5, textAlign:'left' }}>
                  {c}{cat===c&&<Check style={{ width:12, height:12 }}/>}
                </button>
              ))}
            </div>
            <div style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'14px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:T.gray700, marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' }}>Fiyat Aralığı</div>
              {['₺0–₺500','₺500–₺1.000','₺1.000–₺2.000','₺2.000+'].map(r=>(
                <label key={r} style={{ display:'flex', alignItems:'center', gap:7, marginBottom:7, cursor:'pointer' }}>
                  <input type="checkbox" style={{ accentColor:P.purple }}/> <span style={{ fontSize:12, color:T.gray600 }}>{r}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
            <div style={{ fontSize:14, fontWeight:700, color:T.gray900 }}>{filtered.length} ürün bulundu</div>
            <select style={{ height:34, padding:'0 10px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:12.5, color:T.gray700, outline:'none', cursor:'pointer' }}>
              <option>Önerilen Sıralama</option>
              <option>En Çok Satan</option>
              <option>Fiyat: Artan</option>
              <option>Fiyat: Azalan</option>
            </select>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${colCount},1fr)`, gap:isMobile?10:16 }}>
            {filtered.map(p=><ProductCard key={p.id} p={p}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Product Page ── */
const IMAGES = [
  { bg:'#EDE9FE', emoji:'🌹', label:'Ana Görsel' },
  { bg:'#F0FDF4', emoji:'🌸', label:'Yan Görsel' },
  { bg:'#FFF7ED', emoji:'🌺', label:'Detay' },
  { bg:'#EFF6FF', emoji:'🌷', label:'Ambalaj' },
  { bg:'#FDF4FF', emoji:'💐', label:'Sunum' },
];

function ProductPage() {
  const { navigate } = useNav();
  const { isMobile, isTablet } = useResponsive();

  const product = STOREFRONT_PRODUCTS.find(p=>p.status==='active') || STOREFRONT_PRODUCTS[0];

  const [activeImg, setActiveImg] = useState(0);
  const [mediaMode, setMediaMode] = useState<'photo'|'video'|'360'>('photo');
  const [zoom, setZoom] = useState(false);
  const [tab, setTab] = useState<'desc'|'specs'|'care'|'reviews'|'delivery'>('desc');
  const [variant, setVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number|null>(null);

  // Touch swipe
  const touchStartX = useRef<number|null>(null);
  function onTouchStart(e:React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e:React.TouchEvent) {
    if (!touchStartX.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { setActiveImg(i=>(i+(dx<0?1:-1)+IMAGES.length)%IMAGES.length); }
    touchStartX.current = null;
  }

  // SEO schema injection
  useEffect(() => {
    const schema = {
      "@context":"https://schema.org", "@type":"Product",
      "name":product.seoTitle, "description":product.seoDescription,
      "offers":{ "@type":"Offer", "price":product.basePrice, "priceCurrency":"TRY", "availability":"InStock" },
      "aggregateRating":{ "@type":"AggregateRating", "ratingValue":product.rating, "reviewCount":product.reviewCount },
    };
    const el = document.createElement('script'); el.type='application/ld+json'; el.id='product-schema';
    el.textContent = JSON.stringify(schema); document.head.appendChild(el);
    return () => { const old=document.getElementById('product-schema'); if(old) old.remove(); };
  }, [product]);

  const upsells = UPSELL_CATALOG.filter(u=>u.active&&(u.floristPick||u.category==='experience')).slice(0,isMobile?2:4);

  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:isMobile?'16px':isTablet?'20px 24px':'24px 32px' }}>
      <NavBreadcrumb items={['Ana Sayfa','Güller',product.name]}/>
      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:isMobile?20:isTablet?32:48, marginBottom:48 }}>
        {/* Gallery */}
        <div>
          {/* Media mode buttons */}
          <div style={{ display:'flex', gap:8, marginBottom:12 }}>
            {(['photo','video','360'] as const).map(m=>(
              <button key={m} onClick={()=>setMediaMode(m)} style={{ flex:1, padding:'8px 0', border:`1.5px solid ${mediaMode===m?P.purple:T.gray200}`, borderRadius:9, background:mediaMode===m?P.pale:'#fff', fontSize:isMobile?11:12, fontWeight:mediaMode===m?700:400, color:mediaMode===m?P.purple:T.gray500, cursor:'pointer', transition:'all 0.15s', display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
                {m==='photo'?'🖼️ Foto':m==='video'?'🎬 Video':'🔄 360°'}
              </button>
            ))}
          </div>

          {mediaMode==='photo'&&(
            <>
              <div
                style={{ position:'relative', height:isMobile?300:isTablet?380:460, background:IMAGES[activeImg].bg, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?80:120, border:`1px solid ${P.border}`, marginBottom:12, cursor:'zoom-in', overflow:'hidden', userSelect:'none', transition:'background 0.3s' }}
                onClick={()=>setZoom(true)}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {IMAGES[activeImg].emoji}
                <div style={{ position:'absolute', top:10, right:10, width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.9)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ZoomIn style={{ width:14, height:14, color:P.purple }}/>
                </div>
                <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:5 }}>
                  {IMAGES.map((_,i)=>(<div key={i} style={{ width:i===activeImg?20:6, height:6, borderRadius:99, background:i===activeImg?P.purple:'rgba(255,255,255,0.6)', transition:'all 0.25s' }}/>))}
                </div>
              </div>
              {/* Thumbnails */}
              <div style={{ display:'flex', gap:8 }}>
                {IMAGES.map((img,i)=>(
                  <button key={i} onClick={()=>setActiveImg(i)} style={{ flex:1, height:isMobile?56:72, borderRadius:11, background:img.bg, border:`2px solid ${i===activeImg?P.purple:T.gray200}`, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?22:28, transition:'all 0.15s', boxShadow:i===activeImg?`0 0 0 3px ${P.purple}28`:'none' }}>
                    {img.emoji}
                  </button>
                ))}
              </div>
            </>
          )}

          {mediaMode==='video'&&(
            <div style={{ height:isMobile?300:420, background:'linear-gradient(135deg,#1E1B4B,#4C1D95)', borderRadius:18, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom:12, position:'relative', overflow:'hidden' }}>
              <div style={{ fontSize:72, marginBottom:16 }}>🎬</div>
              <div style={{ fontSize:16, fontWeight:700, color:'rgba(255,255,255,0.9)', marginBottom:8 }}>Florist Hazırlık Videosu</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)' }}>Taze çiçek hazırlık süreci</div>
              <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', marginTop:16, cursor:'pointer', fontSize:24 }}>▶️</div>
            </div>
          )}

          {mediaMode==='360'&&(
            <div style={{ height:isMobile?300:420, background:'linear-gradient(135deg,#0F172A,#1E3A5F)', borderRadius:18, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom:12, position:'relative', overflow:'hidden', cursor:'grab' }}>
              <div style={{ fontSize:72, marginBottom:16 }}>🔄</div>
              <div style={{ fontSize:16, fontWeight:700, color:'rgba(255,255,255,0.9)', marginBottom:8 }}>360° Gezinti</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)' }}>Sürükle ile döndür</div>
              <div style={{ position:'absolute', inset:0, background:'repeating-conic-gradient(rgba(255,255,255,0.02) 0deg 90deg, transparent 90deg 180deg) 0 0 / 20px 20px', opacity:0.5 }}/>
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          {product.badge&&<div style={{ display:'inline-flex', alignItems:'center', gap:6, background:`linear-gradient(135deg,${GR[600]},${GR[700]})`, borderRadius:99, padding:'4px 14px', marginBottom:12 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#fff', letterSpacing:'0.06em' }}>{product.badge}</span>
          </div>}

          <h1 style={{ fontSize:isMobile?22:26, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 10px', lineHeight:1.2 }}>{product.name}</h1>

          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <div style={{ display:'flex', gap:2 }}>{[1,2,3,4,5].map(s=>(<Star key={s} style={{ width:14, height:14, color:s<=Math.round(product.rating)?'#FBBF24':T.gray200, fill:s<=Math.round(product.rating)?'#FBBF24':'none' }}/>))}</div>
            <span style={{ fontSize:13, fontWeight:700, color:T.gray800 }}>{product.rating}</span>
            <span style={{ fontSize:12, color:T.gray400 }}>({product.reviewCount} yorum)</span>
            <span style={{ fontSize:11, color:GR[600], background:GR[50], padding:'2px 8px', borderRadius:99 }}>🔥 {product.sold} satıldı</span>
          </div>

          <div style={{ fontSize:isMobile?28:34, fontWeight:900, color:P.purple, letterSpacing:'-0.03em', marginBottom:4 }}>{fmt(variant.price)}</div>
          <div style={{ fontSize:12, color:T.gray400, marginBottom:20 }}>KDV dahil • Aynı gün İstanbul teslimatı dahil</div>

          {/* Variants */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:12.5, fontWeight:700, color:T.gray600, marginBottom:10 }}>Seçenek: <span style={{ color:T.gray900 }}>{variant.label}</span></div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {product.variants.map(v=>(
                <button key={v.id} onClick={()=>setVariant(v)} style={{ padding:'9px 16px', border:`2px solid ${variant.id===v.id?P.purple:T.gray200}`, borderRadius:10, background:variant.id===v.id?P.pale:'#fff', fontSize:13, fontWeight:variant.id===v.id?700:400, color:variant.id===v.id?P.purple:T.gray600, cursor:'pointer', transition:'all 0.15s' }}>
                  {v.label}
                  <span style={{ display:'block', fontSize:11, fontWeight:900, color:variant.id===v.id?P.purple:GR[600], marginTop:2 }}>{fmt(v.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', border:`1.5px solid ${T.gray200}`, borderRadius:11, overflow:'hidden' }}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ width:40, height:48, border:'none', background:T.gray50, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Minus style={{ width:14, height:14 }}/></button>
              <div style={{ width:48, textAlign:'center', fontSize:15, fontWeight:800, color:T.gray900 }}>{qty}</div>
              <button onClick={()=>setQty(q=>q+1)} style={{ width:40, height:48, border:'none', background:T.gray50, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Plus style={{ width:14, height:14 }}/></button>
            </div>
            <button onClick={()=>{ setAdded(true); setTimeout(()=>setAdded(false),2500); navigate('sf-cart'); }} style={{ flex:1, height:48, border:'none', borderRadius:12, background:added?GR[600]:`linear-gradient(135deg,${GR[600]},${GR[700]})`, color:'#fff', fontSize:15, fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:added?'none':'0 6px 20px rgba(22,163,74,0.4)', transition:'all 0.2s' }}>
              <ShoppingBag style={{ width:18, height:18 }}/> {added?'✓ Sepete Eklendi':'Sepete Ekle'}
            </button>
            <button style={{ width:48, height:48, borderRadius:11, border:`1.5px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Heart style={{ width:18, height:18, color:T.gray400 }}/></button>
          </div>

          {/* Delivery note */}
          <div style={{ display:'flex', gap:10, alignItems:'flex-start', background:GR[50], border:`1px solid ${GR[100]}`, borderRadius:12, padding:'12px 14px', marginBottom:16 }}>
            <Truck style={{ width:18, height:18, color:GR[600], flexShrink:0, marginTop:1 }}/>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:GR[700] }}>Aynı Gün Teslimat — 14:00'a kadar sipariş verin</div>
              <div style={{ fontSize:12, color:GR[600], marginTop:2 }}>{product.deliveryNote}</div>
            </div>
          </div>

          {/* Kargo guarantee */}
          <KargoGuaranteeBox/>

          {/* Trust badges */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {[
              { icon:Truck,        title:'Aynı Gün Teslimat',    sub:"18:00'a kadar siparşte" },
              { icon:Shield,       title:'Memnuniyet Garantisi', sub:'30 gün iade hakkı'       },
              { icon:RefreshCw,    title:'Taze Değilse Değişim', sub:'Ücretsiz yenileme'         },
              { icon:CheckCircle2, title:'Güvenli Ödeme',        sub:'SSL + iyzico koruması'    },
            ].map((f,i)=>(
              <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', background:T.gray50, borderRadius:10, padding:'10px 12px' }}>
                <f.icon style={{ width:16, height:16, color:GR[600], flexShrink:0, marginTop:1 }}/>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:T.gray800 }}>{f.title}</div>
                  <div style={{ fontSize:10.5, color:T.gray400 }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom:48 }}>
        <div style={{ display:'flex', gap:4, borderBottom:`2px solid ${T.gray100}`, marginBottom:24, overflowX:'auto' }}>
          {(['desc','specs','care','reviews','delivery'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{ padding:'12px 20px', border:'none', background:'transparent', fontSize:13.5, fontWeight:tab===t?700:400, color:tab===t?P.purple:T.gray500, cursor:'pointer', borderBottom:`2px solid ${tab===t?P.purple:'transparent'}`, marginBottom:-2, whiteSpace:'nowrap', transition:'all 0.15s' }}>
              {t==='desc'?'Açıklama':t==='specs'?'Özellikler':t==='care'?'Bakım':t==='reviews'?'Yorumlar':'Teslimat'}
            </button>
          ))}
        </div>

        {tab==='desc'&&(<div style={{ fontSize:14, color:T.gray700, lineHeight:1.9, maxWidth:680 }}><p>{product.shortDesc}</p><p style={{ marginTop:12 }}>Premium kalite, aynı gün teslimat ve taze garanti ile Cicekyolla farkını yaşayın.</p></div>)}
        {tab==='specs'&&(<div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(2,1fr)', gap:10, maxWidth:600 }}>{[{l:'Kategori',v:product.category},{l:'Varyant',v:`${product.variants.length} seçenek`},{l:'Teslimat',v:product.deliveryNote},{l:'SEO',v:product.seoTitle.substring(0,40)+'...'}].map((r,i)=>(<div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'10px 14px', background:T.gray50, borderRadius:9 }}><span style={{ fontSize:13, color:T.gray500 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:600, color:T.gray800 }}>{r.v}</span></div>))}</div>)}
        {tab==='care'&&(<div style={{ fontSize:14, color:T.gray700, lineHeight:1.9 }}><p>{product.careInfo}</p></div>)}
        {tab==='reviews'&&(<div><div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}><div style={{ fontSize:48, fontWeight:900, color:T.gray900 }}>{product.rating}</div><div><div style={{ display:'flex', gap:2, marginBottom:4 }}>{[1,2,3,4,5].map(s=>(<Star key={s} style={{ width:18, height:18, color:'#FBBF24', fill:'#FBBF24' }}/>))}</div><div style={{ fontSize:13, color:T.gray400 }}>{product.reviewCount} değerlendirme</div></div></div><div style={{ display:'flex', flexDirection:'column', gap:12 }}>{[{n:'Ayşe K.',d:'14 Haz',txt:'Harika bir buket! Çiçekler çok tazeydi, teslimat mükkemmeldi. Kesinlikle tekrar sipariş veririm.'},{n:'Mehmet Y.',d:'12 Haz',txt:'Sevgilime sürpriz yaptım, çok mutlu oldu. Paketleme inanılmaz!ş'},{n:'Fatma D.',d:'10 Haz',txt:'Annem için sipariş verdim. Güller mükemmeldi, bir hafta dayandı.'}].map((r,i)=>(<div key={i} style={{ background:T.gray50, borderRadius:12, padding:'16px 18px' }}><div style={{ display:'flex', gap:8, marginBottom:8 }}>{[1,2,3,4,5].map(s=>(<Star key={s} style={{ width:12, height:12, color:'#FBBF24', fill:'#FBBF24' }}/>))}</div><p style={{ fontSize:13.5, color:T.gray700, lineHeight:1.6, margin:'0 0 10px' }}>&#34;{r.txt}&#34;</p><div style={{ fontSize:12, fontWeight:700, color:T.gray500 }}>{r.n} • {r.d}</div></div>))}</div></div>)}
        {tab==='delivery'&&(<div style={{ maxWidth:560 }}><div style={{ display:'flex', flexDirection:'column', gap:12 }}>{[{i:'🚚',t:'Aynı Gün İstanbul',s:'14:00 sonrasi siparişler ertesi gün'},{i:'📦',t:'Türkiye Geneli Kargo',s:'1-5 iş günü, sigortalı'},{i:'🌹',t:'Taze Garanti',s:'Taze olmayan ürün için tam iade'},{i:'💳',t:'Güvenli Ödeme',s:'SSL, iyzico, 3D Secure'}].map((d,i)=>(<div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', background:T.gray50, borderRadius:10, padding:'14px' }}><span style={{ fontSize:22 }}>{d.i}</span><div><div style={{ fontSize:13.5, fontWeight:700, color:T.gray900 }}>{d.t}</div><div style={{ fontSize:12, color:T.gray400, marginTop:3 }}>{d.s}</div></div></div>))}</div></div>)}
      </div>

      {/* FAQ */}
      <div style={{ marginBottom:48 }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:T.gray900, marginBottom:16 }}>Sıkça Sorulan Sorular</h2>
        <div style={{ display:'flex', flexDirection:'column', gap:8, maxWidth:680 }}>
          {product.faq.map((f,i)=>(
            <div key={i} style={{ background:T.gray50, borderRadius:12, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
              <button onClick={()=>setFaqOpen(faqOpen===i?null:i)} style={{ width:'100%', padding:'14px 18px', border:'none', background:'transparent', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', textAlign:'left', gap:12 }}>
                <span style={{ fontSize:14, fontWeight:700, color:T.gray800 }}>{f.q}</span>
                {faqOpen===i?<ChevronLeft style={{ width:15, height:15, color:T.gray400, transform:'rotate(90deg)', flexShrink:0 }}/>:<ChevronRight style={{ width:15, height:15, color:T.gray400, transform:'rotate(90deg)', flexShrink:0 }}/>}
              </button>
              {faqOpen===i&&<div style={{ padding:'0 18px 16px', fontSize:13.5, color:T.gray600, lineHeight:1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Upsells */}
      {upsells.length>0&&(
        <div style={{ marginBottom:48 }}>
          <h2 style={{ fontSize:20, fontWeight:800, color:T.gray900, marginBottom:16 }}>Bununla Birlikte Alınabilir</h2>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:12 }}>
            {upsells.map(u=>(
              <div key={u.id} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'14px', cursor:'pointer', textAlign:'center' }}>
                <div style={{ fontSize:36, marginBottom:8 }}>{u.emoji}</div>
                <div style={{ fontSize:12.5, fontWeight:700, color:T.gray800, marginBottom:6, lineHeight:1.3 }}>{u.name}</div>
                <div style={{ fontSize:14, fontWeight:900, color:P.purple }}>{u.price===0?'Ücretsiz':`+${fmt(u.price)}`}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related */}
      <div style={{ marginBottom:48 }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:T.gray900, marginBottom:20 }}>İlgini Çekebilir</h2>
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${isMobile?2:isTablet?3:4},1fr)`, gap:isMobile?12:16 }}>
          {PRODUCTS_SAMPLE.slice(1,isMobile?3:5).map(p=>(<ProductCard key={p.id} p={p}/>))}
        </div>
      </div>

      {/* Zoom modal */}
      {zoom&&(
        <div style={{ position:'fixed', inset:0, zIndex:2000, background:'rgba(0,0,0,0.92)', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={()=>setZoom(false)}>
          <div style={{ fontSize:200, lineHeight:1 }}>{IMAGES[activeImg].emoji}</div>
          <button style={{ position:'absolute', top:20, right:20, width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,0.15)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X style={{ width:20, height:20, color:'#fff' }}/></button>
        </div>
      )}
    </div>
  );
}

// useRef import for touch handlers
const { useRef } = require('react') as typeof import('react');

/* ── Account Page (CRM Connected) ── */
function AccountPage() {
  const { isMobile } = useResponsive();
  const { navigate } = useNav();
  const [tab, setTab] = useState('dashboard');

  const customer = {
    name:'Ayşe Kaya', initials:'AK', tier:'VIP Müşteri',
    loyaltyPoints:2840, nextTierPoints:5000, lifetimeValue:18420,
    birthday:'24 Temmuz', daysUntilBirthday:38,
    anniversary:'15 Ağustos', daysUntilAnniversary:60,
    segment:'Premium', nps:9,
  };

  const orders = [
    { id:'CK8841', name:'51 Kırmızı Güller', emoji:'🌹', price:1240, date:'12 Haz', status:'delivered', courier:'Mehmet K.' },
    { id:'CK8712', name:'Lüks Orkide',         emoji:'🌸', price:980,  date:'28 May', status:'delivered', courier:'Ali D.'   },
    { id:'CK8590', name:'Premium Hediye Seti', emoji:'🎁', price:1580, date:'10 May', status:'delivered', courier:'Ayhan S.' },
    { id:'CK8401', name:'Mevsim Buketi',        emoji:'💐', price:680,  date:'22 Nis', status:'delivered', courier:'Can T.'   },
  ];

  const recs = FEATURED_PRODUCTS.slice(0,isMobile?2:4);

  const NAV_TABS = [
    { id:'dashboard', l:'Genel Bakış' },
    { id:'orders',    l:'Siparişlerim' },
    { id:'loyalty',   l:'Sadakat & Puan' },
    { id:'addresses', l:'Adreslerim' },
    { id:'profile',   l:'Profilim' },
  ];

  return (
    <div style={{ padding:isMobile?'16px':'24px 32px', maxWidth:1100, margin:'0 auto' }}>
      {isMobile&&(
        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:12, marginBottom:16, scrollbarWidth:'none' }}>
          {NAV_TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{ flexShrink:0, padding:'8px 14px', border:`2px solid ${tab===t.id?P.purple:T.gray200}`, borderRadius:99, background:tab===t.id?P.pale:'#fff', color:tab===t.id?P.purple:T.gray600, fontSize:12, fontWeight:tab===t.id?700:400, cursor:'pointer' }}>{t.l}</button>))}
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'220px 1fr', gap:24 }}>
        {!isMobile&&(
          <div style={{ height:'fit-content' }}>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:16, marginBottom:14 }}>
              <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:16, paddingBottom:14, borderBottom:`1px solid ${T.gray100}` }}>
                <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg,${P.purple},${P.mid})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:800, color:'#fff', flexShrink:0 }}>{customer.initials}</div>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:800, color:T.gray900 }}>{customer.name}</div>
                  <div style={{ fontSize:10.5, fontWeight:700, color:P.purple, background:P.pale, borderRadius:99, padding:'2px 8px', marginTop:3, display:'inline-block' }}>{customer.tier}</div>
                </div>
              </div>
              <div style={{ background:P.pale, borderRadius:10, padding:'10px 12px', marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}><span style={{ fontSize:11, fontWeight:700, color:P.purple }}>⭐ {customer.loyaltyPoints.toLocaleString('tr-TR')} puan</span><span style={{ fontSize:10, color:T.gray400 }}>Hedef: {customer.nextTierPoints.toLocaleString('tr-TR')}</span></div>
                <div style={{ height:4, borderRadius:99, background:P.lilac, overflow:'hidden' }}><div style={{ height:'100%', width:`${(customer.loyaltyPoints/customer.nextTierPoints)*100}%`, background:`linear-gradient(90deg,${P.purple},${P.mid})`, borderRadius:99 }}/></div>
              </div>
              {NAV_TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{ width:'100%', display:'flex', alignItems:'center', gap:9, padding:'9px 10px', borderRadius:8, border:'none', cursor:'pointer', marginBottom:3, background:tab===t.id?P.pale:'transparent', color:tab===t.id?P.purple:T.gray600, fontWeight:tab===t.id?600:400, fontSize:13, textAlign:'left' }}>{t.l}</button>))}
              <button style={{ width:'100%', display:'flex', alignItems:'center', gap:9, padding:'9px 10px', borderRadius:8, border:'none', cursor:'pointer', background:'transparent', color:T.gray400, fontSize:13, textAlign:'left', marginTop:8, borderTop:`1px solid ${T.gray100}`, paddingTop:12 }}><LogOut style={{ width:15, height:15 }}/> Çıkış Yap</button>
            </div>
          </div>
        )}

        <div>
          {tab==='dashboard'&&(
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ background:`linear-gradient(135deg,${P.pale},#fff)`, borderRadius:16, border:`1px solid ${P.lilac}`, padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:20, fontWeight:900, color:P.deep, marginBottom:4 }}>Hoş geldiniz, {customer.name.split(' ')[0]}! 👋</div>
                  <div style={{ fontSize:13, color:T.gray500 }}>Son sipariş: 12 Haziran — 4 siparişin tamamı teslim edildi.</div>
                </div>
                <div style={{ width:56, height:56, borderRadius:'50%', background:`linear-gradient(135deg,${P.purple},${P.mid})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, color:'#fff', fontWeight:900, flexShrink:0 }}>{customer.initials}</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(3,1fr)', gap:12 }}>
                {[{l:'Sadakat Puanı',v:`${customer.loyaltyPoints.toLocaleString('tr-TR')} ⭐`,c:P.purple},{l:'Toplam Harcama',v:`₺${customer.lifetimeValue.toLocaleString('tr-TR')}`,c:GR[600]},{l:'NPS Skoru',v:`${customer.nps}/10`,c:BL[600]}].map((k,i)=>(<div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}><div style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:6 }}>{k.l}</div><div style={{ fontSize:20, fontWeight:900, color:k.c }}>{k.v}</div></div>))}
              </div>
              <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
                <div style={{ fontSize:13, fontWeight:800, color:T.gray800, marginBottom:14 }}>Yakışan Özel Günler 🎉</div>
                {[{label:'Doğum Günün',date:customer.birthday,days:customer.daysUntilBirthday,emoji:'🎂',color:'#BE123C'},{label:'Yıl Dönümün',date:customer.anniversary,days:customer.daysUntilAnniversary,emoji:'💍',color:P.purple}].map((e,i)=>(
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:i===0?`1px solid ${T.gray50}`:'none' }}>
                    <div style={{ display:'flex', gap:10, alignItems:'center' }}><span style={{ fontSize:24 }}>{e.emoji}</span><div><div style={{ fontSize:13, fontWeight:700, color:T.gray800 }}>{e.label}</div><div style={{ fontSize:11, color:T.gray400 }}>{e.date} — {e.days} gün kaldı</div></div></div>
                    <button style={{ padding:'7px 14px', border:'none', borderRadius:8, background:e.color, color:'#fff', fontSize:11.5, fontWeight:700, cursor:'pointer' }}>Çiçek Gönder</button>
                  </div>
                ))}
              </div>
              <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
                <div style={{ fontSize:13, fontWeight:800, color:T.gray800, marginBottom:4 }}>Sizin İçin Seçtiklerimiz</div>
                <div style={{ fontSize:11, color:T.gray400, marginBottom:14 }}>Alışveriş geçmişinize göre önerildi</div>
                <div style={{ display:'grid', gridTemplateColumns:`repeat(${isMobile?2:4},1fr)`, gap:12 }}>
                  {recs.map(p=>(<div key={p.id} style={{ borderRadius:12, border:`1px solid ${T.gray200}`, overflow:'hidden', cursor:'pointer' }}><div style={{ height:80, background:P.pale, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40 }}>{p.emoji}</div><div style={{ padding:'10px 12px' }}><div style={{ fontSize:11, fontWeight:700, color:T.gray800, lineHeight:1.3, marginBottom:4 }}>{p.name}</div><div style={{ fontSize:13, fontWeight:900, color:P.purple }}>₺{p.basePrice.toLocaleString('tr-TR')}</div></div></div>))}
                </div>
              </div>
            </div>
          )}

          {tab==='orders'&&(
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
              <div style={{ fontSize:15, fontWeight:800, color:T.gray900, marginBottom:18 }}>Sipariş Geçmişim</div>
              {orders.map((o,i)=>(
                <div key={i} style={{ display:'flex', gap:14, padding:'16px 0', borderBottom:i<orders.length-1?`1px solid ${T.gray100}`:'none' }}>
                  <div style={{ width:60, height:60, borderRadius:12, background:P.pale, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, flexShrink:0 }}>{o.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:700, color:T.gray800 }}>{o.name}</div>
                    <div style={{ fontSize:11.5, color:T.gray400, marginTop:2 }}>#{o.id} · ₺{o.price.toLocaleString('tr-TR')} · {o.date}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:GR[600], marginTop:4 }}>✓ Teslim Edildi — Kurye: {o.courier}</div>
                  </div>
                  <button style={{ fontSize:11.5, color:P.purple, background:P.pale, border:'none', borderRadius:7, padding:'6px 12px', cursor:'pointer', fontWeight:700, height:'fit-content', flexShrink:0 }}>Tekrar Sipariş</button>
                </div>
              ))}
            </div>
          )}

          {tab==='loyalty'&&(
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ background:`linear-gradient(135deg,${P.deep},${P.purple})`, borderRadius:20, padding:'28px 28px', color:'#fff', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', right:-30, top:-30, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>
                <div style={{ fontSize:11, fontWeight:800, letterSpacing:'0.12em', opacity:0.6, marginBottom:16 }}>CICEKYOLLA LOYALTY</div>
                <div style={{ fontSize:38, fontWeight:900, letterSpacing:'-0.03em', marginBottom:4 }}>{customer.loyaltyPoints.toLocaleString('tr-TR')} ⭐</div>
                <div style={{ fontSize:13, opacity:0.7, marginBottom:20 }}>Mevcut Puan — {customer.tier}</div>
                <div style={{ height:6, borderRadius:99, background:'rgba(255,255,255,0.2)', overflow:'hidden', marginBottom:8 }}><div style={{ height:'100%', width:`${(customer.loyaltyPoints/customer.nextTierPoints)*100}%`, background:'rgba(255,255,255,0.9)', borderRadius:99 }}/></div>
                <div style={{ fontSize:11, opacity:0.6 }}>Sonraki tier için {(customer.nextTierPoints-customer.loyaltyPoints).toLocaleString('tr-TR')} puan daha</div>
              </div>
              <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
                <div style={{ fontSize:13, fontWeight:800, color:T.gray800, marginBottom:14 }}>Nasıl Puan Kazanılır?</div>
                {[{emoji:'🛒',l:'Her Sipariş',sub:"Harcamanın %5'i puan olarak eklenir"},{emoji:'⭐',l:'Yorum Yaz',sub:'Her yoruma 50 puan'},{emoji:'👥',l:'Arkadaş Davet Et',sub:'Her başarılı davette 200 puan'},{emoji:'🎂',l:'Doğum Günü Bonusu',sub:'Doğum gününüze 500 puan'}].map((e,i)=>(
                  <div key={i} style={{ display:'flex', gap:12, alignItems:'center', padding:'10px 0', borderBottom:i<3?`1px solid ${T.gray50}`:'none' }}>
                    <span style={{ fontSize:22 }}>{e.emoji}</span>
                    <div><div style={{ fontSize:13, fontWeight:700, color:T.gray800 }}>{e.l}</div><div style={{ fontSize:11, color:T.gray400 }}>{e.sub}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='addresses'&&(
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:18 }}><div style={{ fontSize:15, fontWeight:800, color:T.gray900 }}>Adreslerim</div><button style={{ padding:'7px 14px', border:'none', borderRadius:8, background:P.purple, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' }}>+ Adres Ekle</button></div>
              {[{label:'Ev',addr:'Bağdat Caddesi No:42, Kadıköy / İstanbul',default:true},{label:'İş',addr:'Levent Plaza, Kat:8, Beşiktaş / İstanbul',default:false}].map((a,i)=>(
                <div key={i} style={{ border:`1px solid ${a.default?P.purple:T.gray200}`, borderRadius:12, padding:'14px 16px', marginBottom:12, background:a.default?P.pale:'#fff' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}><span style={{ fontSize:12, fontWeight:800, color:a.default?P.purple:T.gray600 }}>{a.label} {a.default&&'(Varsayılan)'}</span><button style={{ fontSize:11.5, color:T.gray400, background:'none', border:'none', cursor:'pointer' }}>Düzenle</button></div>
                  <div style={{ fontSize:13, color:T.gray700 }}>{a.addr}</div>
                </div>
              ))}
            </div>
          )}

          {tab==='profile'&&(
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
              <div style={{ fontSize:15, fontWeight:800, color:T.gray900, marginBottom:18 }}>Profil Bilgilerim</div>
              {[{l:'Ad Soyad',v:'Ayşe Kaya',type:'text'},{l:'E-posta',v:'ayse@ornek.com',type:'email'},{l:'Telefon',v:'0532 XXX XX XX',type:'tel'},{l:'Doğum Tarihi',v:'24 Temmuz 1990',type:'text'}].map((f,i)=>(
                <div key={i} style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:T.gray500, display:'block', marginBottom:5, textTransform:'uppercase', letterSpacing:'0.06em' }}>{f.l}</label>
                  <div style={{ display:'flex', gap:10 }}>
                    <input defaultValue={f.v} type={f.type} style={{ flex:1, height:40, padding:'0 12px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:13, outline:'none', color:T.gray800 }}/>
                    <button style={{ padding:'0 14px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:12, color:T.gray600, cursor:'pointer' }}>Güncelle</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LayoutDashboard2({ style }: { style?: React.CSSProperties }) { return <Package style={style}/>; }

/* ── Simple Pages ── */
function SimplePage({ title, content }: { title:string; content:React.ReactNode }) {
  return (
    <div style={{ padding:'40px 32px', maxWidth:860, margin:'0 auto' }}>
      <h1 style={{ fontSize:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 24px' }}>{title}</h1>
      <div style={{ fontSize:14, color:T.gray700, lineHeight:1.9 }}>{content}</div>
    </div>
  );
}

function BlogDetailPage() {
  return (
    <div style={{ padding:'40px 32px', maxWidth:760, margin:'0 auto' }}>
      <NavBreadcrumb items={['Ana Sayfa','Blog',İstanbul’da Çiçek Kültürü"]}/>
      <div style={{ fontSize:11, color:P.purple, fontWeight:600, marginBottom:8 }}>ÇİÇEK REHBERİ</div>
      <h1 style={{ fontSize:32, fontWeight:900, color:T.gray900, letterSpacing:'-0.04em', margin:'0 0 16px' }}>İstanbul’da Çiçek Göndermenin Sanatı</h1>
      <div style={{ display:'flex', gap:12, marginBottom:28, alignItems:'center' }}>
        <div style={{ width:32, height:32, borderRadius:'50%', background:`linear-gradient(135deg,${P.purple},${P.mid})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'#fff' }}>CK</div>
        <div style={{ fontSize:12.5, color:T.gray500 }}>Cicekyolla Editör • 14 Haziran 2026 • 5 dk okuma</div>
      </div>
      <div style={{ height:240, background:`linear-gradient(135deg,${P.pale},#fff)`, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', fontSize:80, marginBottom:32 }}>🌹</div>
      {["14 milyon nufuslu İstanbul, Türkiye'nin en büyük çiçek pazarıdır. Her gün binlerce buket Kapalıçarşı'dan İstanbul sokaklarına kadar uzanan bir yolculuk yapar.","Bizi farklı kılan, sadece çiçek satmıyoruz. Her bukete bir hikaye, her teslimatın ardında bir duygu var.","Aynı gün teslimat özelliğimizle, 14:00'a kadar verilen siparişler aynı gün 60-90 dakika içinde teslim edilmektedir."].map((p,i)=>(<p key={i} style={{ fontSize:15, color:T.gray700, lineHeight:1.9, marginBottom:18 }}>{p}</p>))}
    </div>
  );
}

function DeliveryRegionsPage() {
  const { isMobile } = useResponsive();
  return (
    <div style={{ padding:isMobile?'24px 16px':'40px 32px', maxWidth:900, margin:'0 auto' }}>
      <h1 style={{ fontSize:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 8px' }}>Teslimat Bölgeleri</h1>
      <p style={{ fontSize:14, color:T.gray400, marginBottom:32 }}>İstanbul ve Türkiye geneli teslimat detayları</p>
      {[{city:'İstanbul',delivery:'Aynı Gün',time:'60-90 dakika',fee:'Ücretsiz (500 TL+)',note:'Tüm 39 ilçe'},
        {city:'Ankara',delivery:'Aynı Gün',time:'2-4 saat',fee:'Ücretsiz (600 TL+)',note:'Merkez ilçeler'},
        {city:'İzmir',delivery:'Aynı Gün',time:'2-5 saat',fee:'Ücretsiz (600 TL+)',note:'Konak, Karşıyaka ve çevresi'},
        {city:'Türkiye Geneli',delivery:'Kargo',time:'1-5 iş günü',fee:'499 TL+ ücretsiz',note:'81 il'},
      ].map((r,i)=>(
        <div key={i} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'18px 22px', marginBottom:14, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div><div style={{ fontSize:15, fontWeight:800, color:T.gray900 }}>{r.city}</div><div style={{ fontSize:12, color:T.gray400, marginTop:3 }}>{r.note}</div></div>
          <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
            {[{l:'Teslimat',v:r.delivery},{l:'Süre',v:r.time},{l:'Ücret',v:r.fee}].map((s,j)=>(
              <div key={j} style={{ textAlign:'center' }}><div style={{ fontSize:13.5, fontWeight:800, color:GR[600] }}>{s.v}</div><div style={{ fontSize:10.5, color:T.gray400 }}>{s.l}</div></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQPage() {
  const [open, setOpen] = useState<number|null>(0);
  const FAQS = [
    {q:'Aynı gün teslimat var mı?', a:"Evet! İstanbul içi 14:00'a kadar verilen siparişler aynı gün 60-90 dakika içinde teslim edilir."},
    {q:'Hangi ödeme yöntemlerini kabul ediyorsunuz?', a:'Kredi/banka kartı, havale/EFT, kapıda ödeme kabul ediyoruz. Kredi kartında 12 taksit imkanı mevcuttur.'},
    {q:'Çiçekler taze olacak mı?', a:'Tüm çiçeklerimiz sipariş anında hazırlanır. Taze garanti sunuyoruz — memnun kalmazsanız ücretsiz yenileme veya tam iade yapıyoruz.'},
    {q:'Türkiye geneline gönderim yapıyor musunuz?', a:'Evet! 81 ilin tamamına kargo hizmetimiz mevcuttur.'},
    {q:'Saat seçimi yapabilir miyim?', a:'İstanbul içi teslimat için sabah, öğlen, öğle sonrası, akşam ve gece saatlerini seçebilirsiniz.'},
  ];
  return (
    <div style={{ padding:'40px 32px', maxWidth:760, margin:'0 auto' }}>
      <h1 style={{ fontSize:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 28px' }}>Sıkça Sorulan Sorular</h1>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {FAQS.map((f,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:13, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{ width:'100%', padding:'16px 20px', border:'none', background:'transparent', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', textAlign:'left', gap:12 }}>
              <span style={{ fontSize:14.5, fontWeight:700, color:T.gray800 }}>{f.q}</span>
              {open===i?<ChevronRight style={{ width:15, height:15, color:T.gray400, transform:'rotate(90deg)', flexShrink:0 }}/>:<ChevronRight style={{ width:15, height:15, color:T.gray400, flexShrink:0 }}/>}
            </button>
            {open===i&&<div style={{ padding:'0 20px 18px', fontSize:14, color:T.gray600, lineHeight:1.7 }}>{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ padding:'40px 32px', maxWidth:860, margin:'0 auto' }}>
      <h1 style={{ fontSize:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 8px' }}>Hakkımızda</h1>
      <p style={{ fontSize:15, color:T.gray500, marginBottom:28 }}>Türkiye'nin en ileri çiçek ticaret platformu</p>
      {['Cicekyolla, 2020 yılında İstanbul'da kurulmuş bir çiçek teknoloji şirketidir. "Her özel anın en taze çiçeği" vizyonuyla yola çıkan şirketimiz, bugün Türkiye genelinde 50.000+ mutlu müşteriye hizmet vermektedir.','Aynı gün teslimat, taze garanti ve premium ambalaj ile sektörde farklı bir deneyim sunuyoruz. Floristlerimiz her buketi özenle hazırlar.'].map((p,i)=>(<p key={i} style={{ fontSize:14, color:T.gray700, lineHeight:1.9, marginBottom:16 }}>{p}</p>))}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginTop:28 }}>
        {[{n:'2020',l:'Kuruluş Yılı'},{n:'50K+',l:'Mutlu Müşteri'},{n:'81',l:'İl Teslimatı'},{n:'4.9/5',l:'Google Puan'}].map((s,i)=>(
          <div key={i} style={{ background:T.gray50, borderRadius:12, padding:'18px', textAlign:'center' }}>
            <div style={{ fontSize:24, fontWeight:900, color:GR[600] }}>{s.n}</div>
            <div style={{ fontSize:12, color:T.gray400, marginTop:4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div style={{ padding:'40px 32px', maxWidth:860, margin:'0 auto' }}>
      <h1 style={{ fontSize:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 24px' }}>İletişim</h1>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:24 }}>
          <h2 style={{ fontSize:16, fontWeight:800, color:T.gray900, margin:'0 0 16px' }}>Mesaj Gönderin</h2>
          {['Ad Soyad','E-posta','Konu'].map(f=>(<div key={f} style={{ marginBottom:14 }}><label style={{ fontSize:12, fontWeight:700, color:T.gray500, display:'block', marginBottom:6 }}>{f}</label><input style={{ width:'100%', height:40, padding:'0 12px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:13, outline:'none', boxSizing:'border-box' }}/></div>))}
          <div style={{ marginBottom:14 }}><label style={{ fontSize:12, fontWeight:700, color:T.gray500, display:'block', marginBottom:6 }}>Mesaj</label><textarea rows={4} style={{ width:'100%', padding:'10px 12px', border:`1px solid ${T.gray200}`, borderRadius:8, fontSize:13, outline:'none', resize:'none', boxSizing:'border-box' }}/></div>
          <button style={{ width:'100%', padding:'11px', border:'none', borderRadius:9, background:`linear-gradient(135deg,${GR[600]},${GR[700]})`, color:'#fff', fontSize:13.5, fontWeight:700, cursor:'pointer' }}>Gönder</button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {[{icon:Phone,t:'Telefon',v:'0850 XXX XX XX',s:'Hafta içi 09:00-21:00'},{icon:Mail,t:'E-posta',v:'info@cicekyolla.com',s:'24 saat içinde yanıt'},{icon:MapPin,t:'Adres',v:'Levent, İstanbul',s:'HQ ofisi'}].map((c,i)=>(
            <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'18px 20px', display:'flex', gap:12, alignItems:'flex-start' }}>
              <div style={{ width:40, height:40, borderRadius:10, background:GR[50], display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><c.icon style={{ width:18, height:18, color:GR[600] }}/></div>
              <div><div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{c.t}</div><div style={{ fontSize:13.5, color:GR[600], fontWeight:600, marginTop:3 }}>{c.v}</div><div style={{ fontSize:11, color:T.gray400, marginTop:2 }}>{c.s}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LegalPage({ type }: { type:'kvkk'|'contract' }) {
  return (<SimplePage title={type==='kvkk'?'KVKK Aydınlatma Metni':'Satış Sözleşmesi'} content={<><p>Bu sayfa yasal zorunluluk gereği yayınlanmaktadır.</p><p style={{ marginTop:12 }}>{type==='kvkk'?'Cicekyolla olarak, kişisel verilerinizi 6698 sayılı KVKK kapsamında işliyoruz. Detaylı bilgi için info@cicekyolla.com adresine yazabilirsiniz.':'Satın alma işlemi tamamlandığında bu sözleşme şartlarını kabul etmiş sayılırsınız.'}</p></>}/>
  );
}

function CorporatePage() {
  return (
    <div style={{ padding:'40px 32px', maxWidth:900, margin:'0 auto' }}>
      <h1 style={{ fontSize:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 8px' }}>Kurumsal Çiçek Çözümleri</h1>
      <p style={{ fontSize:14, color:T.gray400, marginBottom:28 }}>50+ çalışanlı şirketlere özel fiyatlandırma ve hizmet paketi</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:32 }}>
        {[{emoji:'📊',t:'Toplu Fiyat',d:'10+ siparişte %15 indirim'},{emoji:'🤝',t:'Dedike Yönetici',d:'7/24 özel destek'},{emoji:'🏢',t:'Kurumsal Fatura',d:'KDV dahil e-fatura'}].map((b,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px', textAlign:'center' }}>
            <div style={{ fontSize:36, marginBottom:10 }}>{b.emoji}</div>
            <div style={{ fontSize:14, fontWeight:800, color:T.gray900, marginBottom:6 }}>{b.t}</div>
            <div style={{ fontSize:12.5, color:T.gray400 }}>{b.d}</div>
          </div>
        ))}
      </div>
      <div style={{ background:`linear-gradient(135deg,${P.pale},#fff)`, border:`1px solid ${P.lilac}`, borderRadius:16, padding:'28px', textAlign:'center' }}>
        <div style={{ fontSize:22, fontWeight:900, color:P.deep, marginBottom:12 }}>Teklif Alın</div>
        <p style={{ fontSize:14, color:T.gray500, marginBottom:20 }}>Uzmanımız 24 saat içinde sizinle iletişime geçer.</p>
        <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
          <button style={{ padding:'12px 28px', border:'none', borderRadius:12, background:`linear-gradient(135deg,${P.purple},${P.mid})`, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer' }}>Teklif Formu</button>
          <a href="https://wa.me/905xxxxxxxxx" style={{ padding:'12px 22px', border:'2px solid #25D366', borderRadius:12, background:'#fff', color:'#25D366', fontSize:14, fontWeight:600, cursor:'pointer', textDecoration:'none' }}>📱 WhatsApp</a>
        </div>
      </div>
    </div>
  );
}

function ArtificialPage() {
  const { navigate } = useNav();
  return (
    <div style={{ padding:'40px 32px', maxWidth:900, margin:'0 auto' }}>
      <h1 style={{ fontSize:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 8px' }}>Yapay Çiçek Koleksiyonu</h1>
      <p style={{ fontSize:14, color:T.gray400, marginBottom:28 }}>Mevsim boyu tazelik — bakım gerektirmeyen premium dekorasyon</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:28 }}>
        {[{e:'🌳',n:'Tropik Set',p:1240},{e:'🌹',n:'Gül Duvarı',p:2800},{e:'🌸',n:'Orkide Premium',p:890}].map((p,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:14, border:'1px solid #CCFBF1', padding:'20px', textAlign:'center', cursor:'pointer', transition:'all 0.18s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='none'}
          >
            <div style={{ fontSize:48, marginBottom:10 }}>{p.e}</div>
            <div style={{ fontSize:14, fontWeight:800, color:T.gray900, marginBottom:6 }}>{p.n}</div>
            <div style={{ fontSize:16, fontWeight:900, color:'#0D9488' }}>{fmt(p.p)}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:'center' }}><button onClick={()=>navigate('yapay-store')} style={{ padding:'13px 32px', border:'none', borderRadius:12, background:'linear-gradient(135deg,#0D9488,#0F766E)', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer' }}>Tüm Koleksiyonu Gör →</button></div>
    </div>
  );
}

function LoginPage() {
  const [mode, setMode] = useState<'login'|'register'>('login');
  const [showPw, setShowPw] = useState(false);
  return (
    <div style={{ minHeight:'70vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px 16px' }}>
      <div style={{ width:'100%', maxWidth:400, background:'#fff', borderRadius:20, border:`1px solid ${T.gray200}`, padding:'32px 28px', boxShadow:'0 8px 32px rgba(0,0,0,0.07)' }}>
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:36, marginBottom:8 }}>🌹</div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:'0 0 4px' }}>{mode==='login'?'Giriş Yap':'Hesap Oluştur'}</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:0 }}>Cicekyolla'ya hoş geldiniz</p>
        </div>
        <div style={{ display:'flex', marginBottom:20, background:T.gray100, borderRadius:10, padding:4 }}>
          {(['login','register'] as const).map(m=>(<button key={m} onClick={()=>setMode(m)} style={{ flex:1, padding:'8px', border:'none', borderRadius:8, background:mode===m?'#fff':'transparent', fontSize:13, fontWeight:mode===m?700:400, color:mode===m?T.gray900:T.gray500, cursor:'pointer', boxShadow:mode===m?'0 1px 4px rgba(0,0,0,0.08)':'none' }}>{m==='login'?'Giriş':'Kayıt'}</button>))}
        </div>
        {mode==='register'&&(
          <div style={{ marginBottom:14 }}><label style={{ fontSize:12, fontWeight:700, color:T.gray500, display:'block', marginBottom:6 }}>Ad Soyad</label><input placeholder="Ayşe Kaya" style={{ width:'100%', height:42, padding:'0 14px', border:`1.5px solid ${T.gray200}`, borderRadius:10, fontSize:13, outline:'none', boxSizing:'border-box' }}/></div>
        )}
        <div style={{ marginBottom:14 }}><label style={{ fontSize:12, fontWeight:700, color:T.gray500, display:'block', marginBottom:6 }}>E-posta</label><input type="email" placeholder="ayse@ornek.com" style={{ width:'100%', height:42, padding:'0 14px', border:`1.5px solid ${T.gray200}`, borderRadius:10, fontSize:13, outline:'none', boxSizing:'border-box' }}/></div>
        <div style={{ marginBottom:20 }}><label style={{ fontSize:12, fontWeight:700, color:T.gray500, display:'block', marginBottom:6 }}>Parola</label><div style={{ position:'relative' }}><input type={showPw?'text':'password'} placeholder="Parolanız" style={{ width:'100%', height:42, padding:'0 44px 0 14px', border:`1.5px solid ${T.gray200}`, borderRadius:10, fontSize:13, outline:'none', boxSizing:'border-box' }}/><button onClick={()=>setShowPw(s=>!s)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', padding:0 }}>{showPw?<EyeOff style={{ width:16, height:16, color:T.gray400 }}/>:<Eye style={{ width:16, height:16, color:T.gray400 }}/>}</button></div></div>
        <button style={{ width:'100%', padding:'12px', border:'none', borderRadius:11, background:`linear-gradient(135deg,${GR[600]},${GR[700]})`, color:'#fff', fontSize:14, fontWeight:800, cursor:'pointer', boxShadow:'0 6px 20px rgba(22,163,74,0.35)', marginBottom:14 }}>{mode==='login'?'Giriş Yap':'Hesap Oluştur'}</button>
        <div style={{ textAlign:'center', fontSize:12.5, color:T.gray400 }}>
          {mode==='login'?'Hesabınız yok mu? ':'Zaten hesabınız var mı? '}
          <button onClick={()=>setMode(m=>m==='login'?'register':'login')} style={{ color:GR[600], background:'none', border:'none', cursor:'pointer', fontWeight:700, fontSize:12.5 }}>{mode==='login'?'Kaydolun':'Giriş yapın'}</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ── */
export function ScreenStorefrontPages({ page='category' }: { page?: SFPage }) {
  switch (page) {
    case 'category':         return <CategoryPage/>;
    case 'product':          return <ProductPage/>;
    case 'login':            return <LoginPage/>;
    case 'account':          return <AccountPage/>;
    case 'blog-detail':      return <BlogDetailPage/>;
    case 'delivery-regions': return <DeliveryRegionsPage/>;
    case 'faq':              return <FAQPage/>;
    case 'about':            return <AboutPage/>;
    case 'contact':          return <ContactPage/>;
    case 'kvkk':             return <LegalPage type="kvkk"/>;
    case 'contract':         return <LegalPage type="contract"/>;
    case 'corporate':        return <CorporatePage/>;
    case 'artificial':       return <ArtificialPage/>;
    default:                 return <CategoryPage/>;
  }
}
