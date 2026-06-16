// CICEKYOLLA OS — Completed Projects Portfolio
// Tamamlanan Yapay Çiçek Projeleri
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Star, MapPin, Calendar } from 'lucide-react';
import { T } from './ui-kit';
import { YAPAY_PROJECTS } from '../data/yapay-store';

const FILTER_TYPES = ['Tümü','Kurumsal Ofis','Otel & Konaklama','Restoran & Kafe','Düğün Salonu','Konut & Rezidans','Perakende & Moda'];

function BeforeAfterSlider({ before, after }: { before:string; after:string }) {
  const [showAfter, setShowAfter] = useState(true);
  return (
    <div onClick={()=>setShowAfter(s=>!s)} style={{ cursor:'pointer', background:`linear-gradient(135deg,${showAfter?'#F0FDFA':'#F3F4F6'},${showAfter?'#CCFBF1':'#E5E7EB'})`, height:200, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8, userSelect:'none', transition:'all 0.4s', position:'relative', overflow:'hidden' }}>
      <div style={{ fontSize:64 }}>{showAfter ? '✨' : '😐'}</div>
      <div style={{ fontSize:13, fontWeight:700, color:showAfter?'#0D9488':'#6B7280' }}>{showAfter?'Sonrası':'Öncesi'}</div>
      <div style={{ position:'absolute', bottom:10, right:12, fontSize:10, color:'rgba(0,0,0,0.4)', background:'rgba(255,255,255,0.7)', padding:'2px 8px', borderRadius:99 }}>Tıkla değiştir</div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: typeof YAPAY_PROJECTS[0]; onClose:()=>void }) {
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.7)', padding:24 }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:'#fff', borderRadius:20, maxWidth:720, width:'100%', maxHeight:'90vh', overflow:'auto' }}>
        {/* Header */}
        <div style={{ padding:'20px 24px', borderBottom:`1px solid ${T.gray100}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:18, fontWeight:900, color:T.gray900 }}>{project.title}</div>
            <div style={{ fontSize:12.5, color:T.gray400 }}>{project.client} • {project.location}</div>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:'50%', border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X style={{ width:14, height:14 }}/></button>
        </div>

        {/* Gallery */}
        <div style={{ padding:24 }}>
          <div style={{ background:'linear-gradient(135deg,#F0FDFA,#CCFBF1)', height:260, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:80, marginBottom:16, position:'relative' }}>
            ✨
            <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6 }}>
              {[0,1,2].map(i=>(
                <button key={i} onClick={()=>setImgIdx(i)} style={{ width:i===imgIdx?20:8, height:8, borderRadius:99, border:'none', background:i===imgIdx?'#0D9488':'rgba(255,255,255,0.6)', cursor:'pointer', transition:'all 0.2s' }}/>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
            {[
              { l:'Bütçe', v:`₺${(project.budget/1000).toFixed(0)}K` },
              { l:'Alan', v:`${project.area}m²` },
              { l:'Süre', v:'8 Hafta' },
              { l:'Puan', v:`★ ${project.rating||5.0}` },
            ].map((s,i)=>(
              <div key={i} style={{ background:T.gray50, borderRadius:10, padding:'12px', textAlign:'center' }}>
                <div style={{ fontSize:16, fontWeight:900, color:'#0D9488' }}>{s.v}</div>
                <div style={{ fontSize:10.5, color:T.gray400 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize:13.5, color:T.gray600, lineHeight:1.7, marginBottom:16 }}>{project.description}</div>

          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {project.tags.map(tag=>(
              <span key={tag} style={{ fontSize:11.5, color:'#0D9488', background:'#F0FDFA', border:'1px solid #CCFBF1', padding:'4px 10px', borderRadius:99 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScreenProjects() {
  const [filter, setFilter] = useState('Tümü');
  const [selected, setSelected] = useState<typeof YAPAY_PROJECTS[0]|null>(null);

  const completed = YAPAY_PROJECTS.filter(p => p.status==='completed');
  const filtered = filter==='Tümü' ? completed : completed.filter(p => p.type===filter);

  return (
    <div style={{ padding:'24px 28px', maxWidth:1200, margin:'0 auto' }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:24, fontWeight:900, color:T.gray900, margin:'0 0 6px', letterSpacing:'-0.03em' }}>Tamamlanan Projeler</h1>
        <p style={{ fontSize:13.5, color:T.gray400, margin:0 }}>{completed.length} başarılı proje • Öncesi & Sonrası görselleri</p>
      </div>

      {/* Filter bar */}
      <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
        {FILTER_TYPES.map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ padding:'7px 16px', border:`1px solid ${filter===f?'#0D9488':T.gray200}`, borderRadius:99, background:filter===f?'#F0FDFA':'#fff', fontSize:12.5, fontWeight:filter===f?700:400, color:filter===f?'#0D9488':T.gray500, cursor:'pointer', transition:'all 0.15s' }}>{f}</button>
        ))}
      </div>

      {/* Project grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
        {filtered.map(project=>(
          <div key={project.id} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.18s', cursor:'pointer' }}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.10)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; }}
          >
            <BeforeAfterSlider before="" after=""/>
            <div style={{ padding:'16px 18px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                <div style={{ flex:1, minWidth:0, marginRight:8 }}>
                  <div style={{ fontSize:14.5, fontWeight:800, color:T.gray900, lineHeight:1.3, marginBottom:4 }}>{project.title}</div>
                  <div style={{ fontSize:12, color:T.gray400 }}>{project.client}</div>
                </div>
                {project.rating && (
                  <div style={{ display:'flex', alignItems:'center', gap:3, flexShrink:0 }}>
                    <Star style={{ width:12, height:12, color:'#FBBF24', fill:'#FBBF24' }}/>
                    <span style={{ fontSize:12, fontWeight:700, color:T.gray700 }}>{project.rating}</span>
                  </div>
                )}
              </div>
              <div style={{ display:'flex', gap:12, marginBottom:12 }}>
                <span style={{ fontSize:11, color:T.gray400, display:'flex', alignItems:'center', gap:3 }}><MapPin style={{ width:10, height:10 }}/>{project.location}</span>
                <span style={{ fontSize:11, color:T.gray400 }}>₺{(project.budget/1000).toFixed(0)}K</span>
                <span style={{ fontSize:11, color:T.gray400 }}>{project.area}m²</span>
              </div>
              <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:12 }}>
                {project.tags.slice(0,3).map(tag=>(
                  <span key={tag} style={{ fontSize:10.5, color:'#0D9488', background:'#F0FDFA', border:'1px solid #CCFBF1', padding:'2px 8px', borderRadius:99 }}>{tag}</span>
                ))}
              </div>
              <button onClick={()=>setSelected(project)} style={{ width:'100%', padding:'8px', border:'none', borderRadius:9, background:'linear-gradient(135deg,#0D9488,#0F766E)', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer' }}>Projeyi Gör</button>
            </div>
          </div>
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={()=>setSelected(null)}/>}
    </div>
  );
}
