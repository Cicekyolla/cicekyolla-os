// CICEKYOLLA OS — Google Ads Center
import { useState } from 'react';
import { Plus, ExternalLink, TrendingUp, BarChart2, Target, DollarSign, Eye, MousePointer } from 'lucide-react';
import { T } from './ui-kit';

const CAMPAIGNS = [
  { id:1, name:'Güller — Genel Arama', status:'active', budget:2500, spend:1847, clicks:2340, impressions:48200, ctr:4.85, cpc:0.79, conversions:89, roas:4.2 },
  { id:2, name:'Orkide — Alışveriş', status:'active', budget:1800, spend:1234, clicks:1820, impressions:31400, ctr:5.80, cpc:0.68, conversions:67, roas:5.1 },
  { id:3, name:'Hediye Seti — Remarketing', status:'active', budget:1200, spend:987, clicks:1240, impressions:22800, ctr:5.44, cpc:0.80, conversions:54, roas:6.3 },
  { id:4, name:'Doğum Günü — Display', status:'paused', budget:800, spend:0, clicks:0, impressions:0, ctr:0, cpc:0, conversions:0, roas:0 },
  { id:5, name:'Kargo — Türkiye Geneli', status:'active', budget:3000, spend:2456, clicks:3120, impressions:67400, ctr:4.63, cpc:0.79, conversions:142, roas:3.8 },
];

const METRICS = {
  totalSpend: 6524, totalRevenue: 28400, roas: 4.35, totalClicks: 8520,
  totalConversions: 352, avgCpc: 0.77, impressionShare: 42.3,
};

export function ScreenAds() {
  const [tab, setTab] = useState<'campaigns'|'keywords'|'performance'>('campaigns');

  return (
    <div style={{ padding:'24px 28px', maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Google Ads Merkezi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>5 aktif kampanya — ROAS: {METRICS.roas}x</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button style={{ padding:'9px 16px', border:`1px solid ${T.gray200}`, borderRadius:9, background:'#fff', fontSize:12.5, color:T.gray600, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <ExternalLink style={{ width:13, height:13 }}/> Google Ads'e Git
          </button>
          <button style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#4285F4', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <Plus style={{ width:13, height:13 }}/> Yeni Kampanya
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Toplam Harcama', value:`₺${METRICS.totalSpend.toLocaleString('tr-TR')}`, icon:DollarSign, color:'#DC2626' },
          { label:'Toplam Gelir',   value:`₺${METRICS.totalRevenue.toLocaleString('tr-TR')}`, icon:TrendingUp, color:'#16A34A' },
          { label:'ROAS',           value:`${METRICS.roas}x`, icon:Target, color:'#7C3AED' },
          { label:'Toplam Tıklama', value:METRICS.totalClicks.toLocaleString('tr-TR'), icon:MousePointer, color:'#2563EB' },
        ].map((m,i) => (
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

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, marginBottom:20, background:T.gray100, borderRadius:10, padding:4, width:'fit-content' }}>
        {(['campaigns','keywords','performance'] as const).map(t => (
          <button key={t} onClick={()=>setTab(t)} style={{ padding:'7px 16px', border:'none', borderRadius:8, background:tab===t?'#fff':'transparent', fontSize:12.5, fontWeight:tab===t?700:400, color:tab===t?T.gray900:T.gray500, cursor:'pointer', transition:'all 0.15s', boxShadow:tab===t?'0 1px 4px rgba(0,0,0,0.08)':'none' }}>
            {t==='campaigns'?'Kampanyalar':t==='keywords'?'Anahtar Kelimeler':'Performans'}
          </button>
        ))}
      </div>

      {/* Campaigns table */}
      {tab==='campaigns' && (
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:T.gray50 }}>
                {['Kampanya','Durum','Bütçe','Harcama','Tıklama','CTR','ROAS',''].map(h=>(
                  <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((c,i) => (
                <tr key={c.id} style={{ borderBottom:`1px solid ${T.gray50}` }}
                  onMouseEnter={e=>(e.currentTarget.style.background=T.gray50)}
                  onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
                >
                  <td style={{ padding:'12px 14px', fontSize:13, fontWeight:600, color:T.gray800 }}>{c.name}</td>
                  <td style={{ padding:'12px 14px' }}>
                    <span style={{ fontSize:11, fontWeight:700, color:c.status==='active'?'#16A34A':'#D97706', background:c.status==='active'?'#F0FDF4':'#FFFBEB', padding:'3px 9px', borderRadius:99 }}>
                      {c.status==='active'?'Aktif':'Durduruldu'}
                    </span>
                  </td>
                  <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>₺{c.budget.toLocaleString('tr-TR')}</td>
                  <td style={{ padding:'12px 14px', fontSize:12.5, fontWeight:600, color:T.gray800 }}>₺{c.spend.toLocaleString('tr-TR')}</td>
                  <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>{c.clicks.toLocaleString('tr-TR')}</td>
                  <td style={{ padding:'12px 14px', fontSize:12.5, color:T.gray600 }}>%{c.ctr}</td>
                  <td style={{ padding:'12px 14px' }}>
                    <span style={{ fontSize:12.5, fontWeight:700, color:c.roas>=4?'#16A34A':c.roas>=2?'#D97706':'#DC2626' }}>{c.roas}x</span>
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <button style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', fontSize:11.5, cursor:'pointer' }}>•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab==='performance' && (
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:24, textAlign:'center' }}>
          <BarChart2 style={{ width:48, height:48, color:T.gray300, margin:'0 auto 12px' }}/>
          <div style={{ fontSize:15, fontWeight:600, color:T.gray500 }}>Performans grafikleri çok yakında</div>
          <div style={{ fontSize:13, color:T.gray400, marginTop:6 }}>Google Ads API entegrasyonu ile canlı veri</div>
        </div>
      )}
    </div>
  );
}
