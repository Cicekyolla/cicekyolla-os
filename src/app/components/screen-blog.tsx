// CICEKYOLLA OS — Blog Management Center
import { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Clock, Tag, Search } from 'lucide-react';
import { T } from './ui-kit';

const POSTS = [
  { id:1, title:'En Romantik Çiçek Kombinasyonları 2026', status:'published', category:'Rehber', views:4820, date:'14 Haz 2026', author:'Ayşe K.', seoScore:92, excerpt:'Bu yaz sevgililer günü ve yıldönümü için en güzel çiçek kombinasyonlarını keşfedin...' },
  { id:2, title:'İstanbul\'a Çiçek Göndermenin En Kolay Yolu', status:'published', category:'Teslimat', views:3240, date:'12 Haz 2026', author:'Mehmet D.', seoScore:88, excerpt:'İstanbul genelinde aynı gün çiçek teslimatı artık çok kolay...' },
  { id:3, title:'Orkide Bakım Rehberi — Uzman İpuçları', status:'published', category:'Bakım', views:8940, date:'10 Haz 2026', author:'Selin A.', seoScore:95, excerpt:'Orkidenizi aylarca canlı tutmak için uzmanlarımızdan altın tavsiyeler...' },
  { id:4, title:'Düğün Çiçeği Nasıl Seçilir?', status:'draft', category:'Düğün', views:0, date:'16 Haz 2026', author:'Can T.', seoScore:76, excerpt:'Hayalinizdeki düğün için doğru çiçek seçimi rehberi...' },
  { id:5, title:'Kurumsal Hediyeleşmede Trend: Çiçek', status:'published', category:'Kurumsal', views:2180, date:'8 Haz 2026', author:'Zeynep M.', seoScore:84, excerpt:'B-to-B hediye sektöründe çiçeğin yükselişi ve kurumsal müşteri beklentileri...' },
  { id:6, title:'Yapay Çiçekte 2026 Trendleri', status:'published', category:'Dekorasyon', views:6420, date:'5 Haz 2026', author:'Burcu A.', seoScore:90, excerpt:'2026 yılında yapay çiçek ve dekorasyon dünyasında neler değişiyor...' },
];

const CATEGORIES = ['Rehber','Teslimat','Bakım','Düğün','Kurumsal','Dekorasyon','Trend'];

export function ScreenBlog() {
  const [filter, setFilter] = useState<'all'|'published'|'draft'>('all');
  const [search, setSearch] = useState('');

  const filtered = POSTS.filter(p => {
    if (filter==='published' && p.status!=='published') return false;
    if (filter==='draft' && p.status!=='draft') return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ padding:'24px 28px', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Blog Yönetimi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>{POSTS.filter(p=>p.status==='published').length} yayında, {POSTS.filter(p=>p.status==='draft').length} taslak</p>
        </div>
        <button style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#16A34A', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Plus style={{ width:13, height:13 }}/> Yeni Yazı
        </button>
      </div>

      <div style={{ display:'flex', gap:12, marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:7, background:'#fff', border:`1px solid ${T.gray200}`, borderRadius:9, padding:'7px 12px', flex:1 }}>
          <Search style={{ width:14, height:14, color:T.gray400 }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Blog yazısı ara..." style={{ border:'none', outline:'none', fontSize:13, color:T.gray700, width:'100%' }}/>
        </div>
        <div style={{ display:'flex', gap:4, background:T.gray100, borderRadius:9, padding:4 }}>
          {(['all','published','draft'] as const).map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{ padding:'6px 14px', border:'none', borderRadius:7, background:filter===f?'#fff':'transparent', fontSize:12, fontWeight:filter===f?700:400, color:filter===f?T.gray900:T.gray500, cursor:'pointer' }}>
              {f==='all'?'Tümü':f==='published'?'Yayında':'Taslak'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {filtered.map(post=>(
          <div key={post.id} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'18px 20px', display:'flex', gap:16, alignItems:'center' }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                <span style={{ fontSize:11, fontWeight:700, color:post.status==='published'?'#16A34A':'#D97706', background:post.status==='published'?'#F0FDF4':'#FFFBEB', padding:'2px 9px', borderRadius:99 }}>
                  {post.status==='published'?'Yayında':'Taslak'}
                </span>
                <span style={{ fontSize:11, color:T.gray400, background:T.gray100, padding:'2px 8px', borderRadius:99, display:'flex', alignItems:'center', gap:3 }}>
                  <Tag style={{ width:10, height:10 }}/> {post.category}
                </span>
              </div>
              <div style={{ fontSize:14.5, fontWeight:800, color:T.gray900, marginBottom:4 }}>{post.title}</div>
              <div style={{ fontSize:12.5, color:T.gray500, lineHeight:1.5, marginBottom:8 }}>{post.excerpt}</div>
              <div style={{ display:'flex', gap:16 }}>
                <span style={{ fontSize:11, color:T.gray400, display:'flex', alignItems:'center', gap:4 }}><Eye style={{ width:11, height:11 }}/> {post.views.toLocaleString('tr-TR')}</span>
                <span style={{ fontSize:11, color:T.gray400, display:'flex', alignItems:'center', gap:4 }}><Clock style={{ width:11, height:11 }}/> {post.date}</span>
                <span style={{ fontSize:11, color:T.gray400 }}>SEO: <span style={{ fontWeight:700, color:post.seoScore>=90?'#16A34A':post.seoScore>=75?'#D97706':'#DC2626' }}>{post.seoScore}/100</span></span>
              </div>
            </div>
            <div style={{ display:'flex', gap:8, flexShrink:0 }}>
              <button style={{ width:32, height:32, borderRadius:8, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Edit style={{ width:13, height:13, color:T.gray500 }}/></button>
              <button style={{ width:32, height:32, borderRadius:8, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Trash2 style={{ width:13, height:13, color:'#DC2626' }}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
