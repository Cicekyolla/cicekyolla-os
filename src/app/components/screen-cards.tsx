// CICEKYOLLA OS — Card Message Center
// Full 27KB source available at github.com/Cicekyolla/cicekyolla-os
import { useState } from 'react';
import { Plus, Edit2, Printer, Search, Check, X, Heart, Star, Cake } from 'lucide-react';
import { T } from './ui-kit';

type CardTemplate = {
  id: string; category: string; emoji: string; title: string; message: string;
  usageCount: number; rating: number; tags: string[];
};

const CARD_TEMPLATES: CardTemplate[] = [
  { id:'ct1', category:'Romantik', emoji:'💕', title:'Sonsuz Aşk', message:'Her gün seninle geçirmek, hayatımın en güzel hediyesi. Seni çok seviyorum.', usageCount:1247, rating:4.9, tags:['sevgili','romantik','yıldönümü'] },
  { id:'ct2', category:'Doğum Günü', emoji:'🎂', title:'Mutlu Yıllar!', message:'Bu özel gününde tüm dileklerinin gerçek olmasını dilerim. Nice mutlu yıllara!', usageCount:2840, rating:4.8, tags:['doğum günü','özel gün','kutlama'] },
  { id:'ct3', category:'Anneler Günü', emoji:'💐', title:'Dünyanın En İyi Anası', message:'Sevgin ve fedäkarlığın için teşekkürler. Seni çok seviyorum anne.', usageCount:987, rating:5.0, tags:['anne','anneler günü','sevgi'] },
  { id:'ct4', category:'Tebrik', emoji:'🎉', title:'Tebrikler!', message:'Bu başarı senin emeklerinin ürünü. Çok gurur duyuyorum. Bunu hak ettin!', usageCount:634, rating:4.7, tags:['tebrik','başarı','gurur'] },
  { id:'ct5', category:'Geçmiş Olsun', emoji:'💚', title:'Çabuk İyileş!', message:'İyi dileklerimi sana gönderiyorum. Çabuk iyileş, çiçekler gibi hayata kovuş!', usageCount:412, rating:4.6, tags:['geçmiş olsun','sağlık','iyileşme'] },
  { id:'ct6', category:'Sürpriz', emoji:'🌟', title:'İyi Ki Varsın!', message:'Seni düşündüm, bu çiçekleri sana gönderdim. İyi ki varsın hayatımda.', usageCount:523, rating:4.8, tags:['özel gün','sürpriz','sevgi'] },
  { id:'ct7', category:'Kurumsal', emoji:'🤝', title:'Değerli İş Birliğimiz', message:'Başarılı iş birliğimiz için teşekkürler. Gelecekte daha nice başarılara.', usageCount:298, rating:4.5, tags:['kurumsal','iş birliği','profesyonel'] },
  { id:'ct8', category:'Düğün', emoji:'💍', title:'Mutlu Olasınız!', message:'Bu güzel başlangıcınızı en güzel çiçeklerle kutluyoruz. Ömrünüze mutluluk dolsın.', usageCount:187, rating:4.9, tags:['düğün','nikah','mutluluk'] },
];

const CATEGORIES = ['Tümü','Romantik','Doğum Günü','Anneler Günü','Tebrik','Geçmiş Olsun','Sürpriz','Kurumsal','Düğün'];

const RECENT_CARDS = [
  { id:'rc1', orderId:'#8841', recipient:'Ayşe K.', template:'Sonsuz Aşk', printed:true, date:'Haz 14, 14:23' },
  { id:'rc2', orderId:'#8839', recipient:'Mehmet Y.', template:'Mutlu Yıllar!', printed:true, date:'Haz 14, 13:45' },
  { id:'rc3', orderId:'#8836', recipient:'Selin A.', template:'Custom', printed:false, date:'Haz 14, 13:12' },
  { id:'rc4', orderId:'#8831', recipient:'Can T.', template:'Tebrikler!', printed:true, date:'Haz 14, 11:58' },
  { id:'rc5', orderId:'#8828', recipient:'Özel Müşteri', template:'Değerli İş Birliğimiz', printed:false, date:'Haz 14, 11:30' },
];

export function ScreenCards({ navigate, params }: { navigate?: (s:any, p?:any)=>void; params?: any }) {
  const [activeTab, setActiveTab] = useState<'templates'|'queue'|'history'>('templates');
  const [category, setCategory] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CardTemplate|null>(null);
  const [customMsg, setCustomMsg] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const filtered = CARD_TEMPLATES.filter(t => {
    if (category !== 'Tümü' && t.category !== category) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ padding:'24px 28px', maxWidth:1200, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Kart Mesaj Merkezi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>{CARD_TEMPLATES.length} şablon • Baskı kuyruğu yönetimi</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={()=>setActiveTab('queue')} style={{ padding:'9px 16px', border:`1px solid ${T.gray200}`, borderRadius:9, background:'#fff', fontSize:12.5, color:T.gray600, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <Printer style={{ width:13, height:13 }}/> Baskı Kuyruğu ({RECENT_CARDS.filter(c=>!c.printed).length})
          </button>
          <button onClick={()=>setSelected(null)||setPreviewMode(false)||setCustomMsg('')} style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#7C3AED', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <Plus style={{ width:13, height:13 }}/> Özel Kart Yaz
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, marginBottom:20, background:T.gray100, borderRadius:10, padding:4, width:'fit-content' }}>
        {(['templates','queue','history'] as const).map(tab=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} style={{ padding:'7px 16px', border:'none', borderRadius:8, background:activeTab===tab?'#fff':'transparent', fontSize:12.5, fontWeight:activeTab===tab?700:400, color:activeTab===tab?T.gray900:T.gray500, cursor:'pointer', transition:'all 0.15s', boxShadow:activeTab===tab?'0 1px 4px rgba(0,0,0,0.08)':'none' }}>
            {tab==='templates'?'Şablonlar':tab==='queue'?'Baskı Kuyruğu':'Geçmiş'}
          </button>
        ))}
      </div>

      {activeTab==='templates' && (
        <div style={{ display:'grid', gridTemplateColumns:selected?'1fr 380px':'1fr', gap:20 }}>
          <div>
            {/* Search & filter */}
            <div style={{ display:'flex', gap:10, marginBottom:16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:7, background:'#fff', border:`1px solid ${T.gray200}`, borderRadius:9, padding:'7px 12px', flex:1 }}>
                <Search style={{ width:14, height:14, color:T.gray400 }}/>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Kart mesajı veya kategori ara..." style={{ border:'none', outline:'none', fontSize:13, color:T.gray700, width:'100%' }}/>
              </div>
            </div>
            <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
              {CATEGORIES.map(cat=>(
                <button key={cat} onClick={()=>setCategory(cat)} style={{ padding:'6px 14px', border:`1px solid ${category===cat?'#7C3AED':T.gray200}`, borderRadius:99, background:category===cat?'#EDE9FE':'#fff', fontSize:12, fontWeight:category===cat?700:400, color:category===cat?'#7C3AED':T.gray500, cursor:'pointer' }}>{cat}</button>
              ))}
            </div>
            {/* Templates grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {filtered.map(t=>(
                <div key={t.id} onClick={()=>setSelected(t)} style={{ background:'#fff', borderRadius:14, border:`2px solid ${selected?.id===t.id?'#7C3AED':T.gray200}`, padding:'18px 20px', cursor:'pointer', transition:'all 0.15s', boxShadow:selected?.id===t.id?'0 0 0 4px rgba(124,58,237,0.08)':'none' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      <span style={{ fontSize:24 }}>{t.emoji}</span>
                      <div>
                        <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>{t.title}</div>
                        <span style={{ fontSize:10.5, color:'#7C3AED', background:'#EDE9FE', padding:'2px 8px', borderRadius:99 }}>{t.category}</span>
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:3 }}>
                      <Star style={{ width:11, height:11, color:'#FBBF24', fill:'#FBBF24' }}/>
                      <span style={{ fontSize:11, fontWeight:700, color:T.gray700 }}>{t.rating}</span>
                    </div>
                  </div>
                  <p style={{ fontSize:12.5, color:T.gray600, lineHeight:1.6, margin:'0 0 12px', fontStyle:'italic' }}>&#34;{t.message}&#34;</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:11, color:T.gray400 }}>{t.usageCount.toLocaleString('tr-TR')} kez kullanıldı</span>
                    <div style={{ display:'flex', gap:6 }}>
                      <button style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11, cursor:'pointer' }}>Düzenle</button>
                      <button onClick={e=>{e.stopPropagation(); setSelected(t); setPreviewMode(true);}} style={{ padding:'5px 10px', border:'none', borderRadius:7, background:'#7C3AED', color:'#fff', fontSize:11, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                        <Printer style={{ width:10, height:10 }}/> Yazdır
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview panel */}
          {selected && (
            <div style={{ position:'sticky', top:20 }}>
              <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.07)' }}>
                <div style={{ padding:'14px 18px', borderBottom:`1px solid ${T.gray100}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>Kart Önizleme</div>
                  <button onClick={()=>setSelected(null)} style={{ width:24, height:24, borderRadius:'50%', border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X style={{ width:12, height:12 }}/></button>
                </div>
                {/* Card preview */}
                <div style={{ margin:'20px', background:`linear-gradient(135deg,#FFF1F2,#FFF5F5)`, borderRadius:14, border:'1px solid #FECDD3', padding:'24px 20px', textAlign:'center' }}>
                  <div style={{ fontSize:36, marginBottom:12 }}>{selected.emoji}</div>
                  <div style={{ fontSize:16, fontWeight:900, color:'#9F1239', marginBottom:12 }}>{selected.title}</div>
                  <p style={{ fontSize:13.5, color:'#BE123C', lineHeight:1.8, fontStyle:'italic', margin:0 }}>&#34;{selected.message}&#34;</p>
                  <div style={{ marginTop:16, height:1, background:'#FECDD3' }}/>
                  <div style={{ fontSize:11.5, color:'#FB7185', marginTop:12 }}>Cicekyolla 🌹</div>
                </div>
                <div style={{ padding:'0 20px 20px' }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.gray700, marginBottom:8 }}>Mesaj Düzenle</div>
                  <textarea rows={4} defaultValue={selected.message} style={{ width:'100%', padding:'10px 12px', border:`1.5px solid ${T.gray200}`, borderRadius:9, fontSize:12.5, outline:'none', resize:'none', fontFamily:'inherit', lineHeight:1.6, boxSizing:'border-box' }}/>
                  <button style={{ width:'100%', marginTop:10, padding:'11px', border:'none', borderRadius:9, background:'#7C3AED', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                    <Printer style={{ width:13, height:13 }}/> Bu Kartı Yazdır
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab==='queue' && (
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:T.gray50 }}>
                {['Sipariş','Alıcı','Şablon','Durum','Tarih',''].map(h=>(
                  <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_CARDS.map(card=>(
                <tr key={card.id} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                  <td style={{ padding:'12px 14px', fontSize:12.5, fontFamily:'monospace', color:T.gray600 }}>{card.orderId}</td>
                  <td style={{ padding:'12px 14px', fontSize:13, fontWeight:600, color:T.gray800 }}>{card.recipient}</td>
                  <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>{card.template}</td>
                  <td style={{ padding:'12px 14px' }}>
                    <span style={{ fontSize:11, fontWeight:700, color:card.printed?'#16A34A':'#D97706', background:card.printed?'#F0FDF4':'#FFFBEB', padding:'3px 9px', borderRadius:99, display:'flex', alignItems:'center', gap:4, width:'fit-content' }}>
                      {card.printed?<Check style={{ width:10, height:10 }}/>:<Printer style={{ width:10, height:10 }}/>}
                      {card.printed?'Basıldı':'Bekliyor'}
                    </span>
                  </td>
                  <td style={{ padding:'12px 14px', fontSize:11.5, color:T.gray400 }}>{card.date}</td>
                  <td style={{ padding:'12px 14px' }}>
                    {!card.printed && (
                      <button style={{ padding:'6px 12px', border:'none', borderRadius:7, background:'#7C3AED', color:'#fff', fontSize:11.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                        <Printer style={{ width:11, height:11 }}/> Yazdır
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab==='history' && (
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:24, textAlign:'center' }}>
          <Heart style={{ width:40, height:40, color:'#FDA4AF', margin:'0 auto 12px' }}/>
          <div style={{ fontSize:15, fontWeight:600, color:T.gray500 }}>Geçmiş kart çıktıları burada listelenir</div>
          <div style={{ fontSize:13, color:T.gray400, marginTop:6 }}>Son 30 gün: 1.247 kart basıldı</div>
        </div>
      )}
    </div>
  );
}
