// CICEKYOLLA OS — Meta Ads Center
import { useState } from 'react';
import { Share2, Plus, TrendingUp, Eye, MousePointer, Target } from 'lucide-react';
import { T } from './ui-kit';

const META_CAMPAIGNS = [
  { id:1, name:'Güller — Facebook Feed', platform:'Facebook', status:'active', budget:1500, spend:1124, reach:42800, clicks:1840, ctr:4.30, cpc:0.61, roas:5.2 },
  { id:2, name:'Orkide — Instagram', platform:'Instagram', status:'active', budget:1200, spend:890, reach:31200, clicks:1320, ctr:4.23, cpc:0.67, roas:4.8 },
  { id:3, name:'Hediye Seti — Remarketing', platform:'Facebook', status:'active', budget:800, spend:654, reach:18400, clicks:980, ctr:5.33, cpc:0.67, roas:7.1 },
  { id:4, name:'Doğum Günü — Stories', platform:'Instagram', status:'paused', budget:600, spend:0, reach:0, clicks:0, ctr:0, cpc:0, roas:0 },
];

export function ScreenMeta() {
  const [tab, setTab] = useState<'campaigns'|'creative'>('campaigns');

  return (
    <div style={{ padding:'24px 28px', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Meta Ads Merkezi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>Facebook & Instagram Reklamları</p>
        </div>
        <button style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#1877F2', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Plus style={{ width:13, height:13 }}/> Yeni Kampanya
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Toplam Erişim', value:'92.4K', icon:Eye, color:'#1877F2' },
          { label:'Toplam Tıklama', value:'4.140', icon:MousePointer, color:'#7C3AED' },
          { label:'Ort. ROAS', value:'5.4x', icon:TrendingUp, color:'#16A34A' },
          { label:'Ak. Kampanya', value:'3', icon:Target, color:'#D97706' },
        ].map((m,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <span style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.07em' }}>{m.label}</span>
              <div style={{ width:28, height:28, borderRadius:7, background:`${m.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <m.icon style={{ width:13, height:13, color:m.color }}/>
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:900, color:T.gray900 }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['Kampanya','Platform','Durum','Harcama','Erişim','CTR','ROAS'].map(h=>(
                <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {META_CAMPAIGNS.map(c=>(
              <tr key={c.id} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                <td style={{ padding:'12px 14px', fontSize:13, fontWeight:600, color:T.gray800 }}>{c.name}</td>
                <td style={{ padding:'12px 14px' }}>
                  <span style={{ fontSize:11.5, fontWeight:700, color:c.platform==='Facebook'?'#1877F2':'#E1306C' }}>
                    <Share2 style={{ width:11, height:11, display:'inline', marginRight:4 }}/>{c.platform}
                  </span>
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:c.status==='active'?'#16A34A':'#D97706', background:c.status==='active'?'#F0FDF4':'#FFFBEB', padding:'3px 9px', borderRadius:99 }}>
                    {c.status==='active'?'Aktif':'Durduruldu'}
                  </span>
                </td>
                <td style={{ padding:'12px 14px', fontSize:12.5, fontWeight:600, color:T.gray800 }}>₺{c.spend.toLocaleString('tr-TR')}</td>
                <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>{c.reach.toLocaleString('tr-TR')}</td>
                <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>%{c.ctr}</td>
                <td style={{ padding:'12px 14px' }}>
                  <span style={{ fontSize:12.5, fontWeight:700, color:c.roas>=5?'#16A34A':c.roas>=3?'#D97706':'#DC2626' }}>{c.roas}x</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
