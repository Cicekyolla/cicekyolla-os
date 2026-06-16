import { useState } from 'react';
import { CheckCircle2, AlertCircle, Copy, ExternalLink, Eye, Edit } from 'lucide-react';
import { T } from './ui-kit';

const SCHEMA_TYPES = [
  { id:'org', type:'Organization', status:'active', score:95, fields:12, required:10, optional:2, issues:0 },
  { id:'local', type:'LocalBusiness', status:'active', score:92, fields:18, required:15, optional:3, issues:1 },
  { id:'product', type:'Product', status:'active', score:88, fields:14, required:11, optional:3, issues:2 },
  { id:'breadcrumb', type:'BreadcrumbList', status:'active', score:100, fields:4, required:4, optional:0, issues:0 },
  { id:'faq', type:'FAQPage', status:'active', score:94, fields:8, required:7, optional:1, issues:0 },
  { id:'review', type:'Review', status:'draft', score:76, fields:10, required:8, optional:2, issues:3 },
  { id:'article', type:'Article', status:'active', score:89, fields:12, required:10, optional:2, issues:1 },
  { id:'website', type:'WebSite', status:'active', score:97, fields:6, required:5, optional:1, issues:0 },
];

export function ScreenSchema() {
  const [selected, setSelected] = useState('org');
  const schema = SCHEMA_TYPES.find(s => s.id === selected)!;

  return (
    <div style={{ padding:'24px 28px', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Schema Merkezi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>JSON-LD yapısal veri yönetimi</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button style={{ padding:'9px 16px', border:`1px solid ${T.gray200}`, borderRadius:9, background:'#fff', fontSize:12.5, color:T.gray600, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><ExternalLink style={{ width:13, height:13 }}/> Google Test</button>
          <button style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#16A34A', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer' }}>Tümünü Deploy Et</button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'240px 1fr', gap:20 }}>
        {/* Left */}
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden', height:'fit-content' }}>
          {SCHEMA_TYPES.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ width:'100%', padding:'12px 16px', border:'none', background:selected===s.id?'#F0FDF4':'transparent', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:`1px solid ${T.gray50}`, transition:'all 0.12s' }}>
              <div style={{ textAlign:'left' }}>
                <div style={{ fontSize:13, fontWeight:selected===s.id?700:500, color:selected===s.id?'#166534':T.gray700 }}>{s.type}</div>
                <div style={{ fontSize:10.5, color:T.gray400 }}>{s.status==='active'?'Aktif':'Taslak'}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                {s.issues > 0 && <span style={{ fontSize:9.5, fontWeight:800, color:'#DC2626', background:'#FEF2F2', padding:'2px 6px', borderRadius:99 }}>{s.issues} hata</span>}
                <span style={{ fontSize:11, fontWeight:700, color:s.score>=90?'#16A34A':s.score>=75?'#D97706':'#DC2626' }}>{s.score}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right */}
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <div>
              <div style={{ fontSize:16, fontWeight:800, color:T.gray900 }}>{schema.type}</div>
              <div style={{ display:'flex', gap:10, marginTop:4 }}>
                <span style={{ fontSize:11, fontWeight:700, color:schema.status==='active'?'#16A34A':'#D97706', background:schema.status==='active'?'#F0FDF4':'#FFFBEB', padding:'2px 8px', borderRadius:99 }}>{schema.status==='active'?'Aktif':'Taslak'}</span>
                <span style={{ fontSize:11, fontWeight:700, color:schema.score>=90?'#16A34A':schema.score>=75?'#D97706':'#DC2626' }}>SEO Skoru: {schema.score}/100</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button style={{ padding:'7px 14px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><Copy style={{ width:12, height:12 }}/> Kopyala</button>
              <button style={{ padding:'7px 14px', border:'none', borderRadius:8, background:'#7C3AED', color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}><Edit style={{ width:12, height:12 }}/> Düzenle</button>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 }}>
            {[{l:'Toplam Alan',v:schema.fields},{l:'Zorunlu',v:schema.required},{l:'Hata',v:schema.issues}].map((s,i)=>(
              <div key={i} style={{ background:T.gray50, borderRadius:10, padding:'12px 14px' }}>
                <div style={{ fontSize:10, color:T.gray400, marginBottom:4 }}>{s.l}</div>
                <div style={{ fontSize:22, fontWeight:900, color:i===2&&s.v>0?'#DC2626':T.gray900 }}>{s.v}</div>
              </div>
            ))}
          </div>

          <div style={{ background:'#0F172A', borderRadius:10, padding:20, fontFamily:'monospace', fontSize:12, color:'#E2E8F0', lineHeight:1.8, overflowX:'auto' }}>
            <div style={{ color:'#94A3B8', marginBottom:8 }}>// JSON-LD Örnek</div>
            <div style={{ color:'#60A5FA' }}>{`{`}</div>
            <div style={{ paddingLeft:16 }}>
              <div><span style={{ color:'#F472B6' }}>"@context"</span><span style={{ color:'#E2E8F0' }}>: </span><span style={{ color:'#86EFAC' }}>"https://schema.org"</span>,</div>
              <div><span style={{ color:'#F472B6' }}>"@type"</span><span style={{ color:'#E2E8F0' }}>: </span><span style={{ color:'#86EFAC' }}>"Organization"</span>,</div>
              <div><span style={{ color:'#F472B6' }}>"name"</span><span style={{ color:'#E2E8F0' }}>: </span><span style={{ color:'#86EFAC' }}>"Cicekyolla"</span>,</div>
              <div><span style={{ color:'#F472B6' }}>"url"</span><span style={{ color:'#E2E8F0' }}>: </span><span style={{ color:'#86EFAC' }}>"https://cicekyolla.com"</span>,</div>
              <div><span style={{ color:'#F472B6' }}>"telephone"</span><span style={{ color:'#E2E8F0' }}>: </span><span style={{ color:'#86EFAC' }}>"0850 XXX XX XX"</span></div>
            </div>
            <div style={{ color:'#60A5FA' }}>{`}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
