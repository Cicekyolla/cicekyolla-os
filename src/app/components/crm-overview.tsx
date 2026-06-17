// CICEKYOLLA OS — CRM Overview Widget
import { Users, TrendingUp, Heart, Star } from 'lucide-react';
import { T } from './ui-kit';

const CRM_STATS = [
  { label:'Toplam Müşteri', value:'1.060', change:'+8.4%', color:'#7C3AED', icon:Users },
  { label:'VIP Müşteri', value:'48', change:'+3', color:'#D97706', icon:Star },
  { label:'Ort. LTV', value:'₺8.420', change:'+12.1%', color:'#16A34A', icon:TrendingUp },
  { label:'NPS Skoru', value:'8.7', change:'+0.3', color:'#2563EB', icon:Heart },
];

export function CrmOverview() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
      {CRM_STATS.map((s,i)=>(
        <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.07em' }}>{s.label}</span>
            <div style={{ width:28, height:28, borderRadius:7, background:`${s.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <s.icon style={{ width:13, height:13, color:s.color }}/>
            </div>
          </div>
          <div style={{ fontSize:22, fontWeight:900, color:T.gray900, letterSpacing:'-0.02em', marginBottom:4 }}>{s.value}</div>
          <span style={{ fontSize:11, fontWeight:700, color:'#16A34A' }}>{s.change}</span>
        </div>
      ))}
    </div>
  );
}
