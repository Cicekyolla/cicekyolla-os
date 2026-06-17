// CICEKYOLLA OS — SEO Overview Widget
import { Globe, TrendingUp, Search, AlertTriangle } from 'lucide-react';
import { T } from './ui-kit';

const SEO_METRICS = [
  { label:'Organik Trafik', value:'3.040', change:'+18%', color:'#2563EB', icon:TrendingUp },
  { label:'SEO Skoru', value:'84/100', change:'+3pp', color:'#16A34A', icon:Globe },
  { label:'Anahtar Kelime', value:'142', change:'+12', color:'#7C3AED', icon:Search },
  { label:'404 Hatalar', value:'3', change:'-2', color:'#DC2626', icon:AlertTriangle },
];

export function SeoOverview() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
      {SEO_METRICS.map((s,i)=>(
        <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.07em' }}>{s.label}</span>
            <div style={{ width:28, height:28, borderRadius:7, background:`${s.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <s.icon style={{ width:13, height:13, color:s.color }}/>
            </div>
          </div>
          <div style={{ fontSize:22, fontWeight:900, color:T.gray900, letterSpacing:'-0.02em', marginBottom:4 }}>{s.value}</div>
          <span style={{ fontSize:11, fontWeight:700, color:i===3?'#DC2626':'#16A34A' }}>{s.change}</span>
        </div>
      ))}
    </div>
  );
}
