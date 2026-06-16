// CICEKYOLLA OS — Route Planner
import { useState } from 'react';
import { MapPin, Truck, Clock, Check, Navigation } from 'lucide-react';
import { T } from './ui-kit';

const ROUTES = [
  { id:'r1', courier:'Mehmet K.', vehicle:'Motosiklet', zone:'Kadıköy / Úsküdar', orders:8, completed:5, eta:'14:30', status:'active', color:'#16A34A' },
  { id:'r2', courier:'Ali D.', vehicle:'Motosiklet', zone:'Beşiktaş / Şişli', orders:6, completed:3, eta:'15:15', status:'active', color:'#2563EB' },
  { id:'r3', courier:'Ayşe S.', vehicle:'Bisiklet', zone:'Cihangir / Beyoğlu', orders:5, completed:5, eta:'13:45', status:'completed', color:'#7C3AED' },
  { id:'r4', courier:'Can T.', vehicle:'Motosiklet', zone:'Ataşehir / Maltepe', orders:9, completed:2, eta:'16:00', status:'active', color:'#D97706' },
  { id:'r5', courier:'Zeynep A.', vehicle:'Araba', zone:'Bakırköy / Aks. / Avr.', orders:12, completed:4, eta:'17:30', status:'active', color:'#0891B2' },
];

export function ScreenRoutes() {
  const [selected, setSelected] = useState<string|null>('r1');
  const route = ROUTES.find(r => r.id === selected);

  return (
    <div style={{ padding:'24px 28px', maxWidth:1200, margin:'0 auto' }}>
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Rota Planlayıcı</h1>
        <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>Aktif kurye rotaları ve teslimat durumu</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap:20 }}>
        {/* Route list */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {ROUTES.map(r => (
            <div key={r.id} onClick={()=>setSelected(r.id)} style={{ background:'#fff', borderRadius:12, border:`2px solid ${selected===r.id?r.color:T.gray200}`, padding:'14px 16px', cursor:'pointer', transition:'all 0.15s' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:800, color:T.gray900 }}>{r.courier}</div>
                  <div style={{ fontSize:11, color:T.gray400 }}>{r.vehicle} — {r.zone}</div>
                </div>
                <span style={{ fontSize:10.5, fontWeight:700, color:r.status==='completed'?'#16A34A':r.color, background:r.status==='completed'?'#F0FDF4':`${r.color}15`, padding:'3px 8px', borderRadius:99 }}>
                  {r.status==='completed'?'Tamamlandı':'Aktif'}
                </span>
              </div>
              <div style={{ display:'flex', gap:12 }}>
                <div style={{ display:'flex', gap:4, alignItems:'center', fontSize:11, color:T.gray500 }}>
                  <Truck style={{ width:11, height:11 }}/> {r.completed}/{r.orders} teslimat
                </div>
                <div style={{ display:'flex', gap:4, alignItems:'center', fontSize:11, color:T.gray500 }}>
                  <Clock style={{ width:11, height:11 }}/> ETA: {r.eta}
                </div>
              </div>
              <div style={{ marginTop:8, height:4, borderRadius:99, background:T.gray100, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${(r.completed/r.orders)*100}%`, background:r.status==='completed'?'#16A34A':r.color, borderRadius:99 }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        {route && (
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
            <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.gray100}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:15, fontWeight:800, color:T.gray900 }}>{route.courier} — {route.zone}</div>
              <button style={{ padding:'7px 14px', border:'none', borderRadius:8, background:route.color, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
                <Navigation style={{ width:12, height:12 }}/> Canlı Takip
              </button>
            </div>
            <div style={{ height:400, background:`linear-gradient(135deg,#1E293B,#0F172A)`, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12 }}>
              <MapPin style={{ width:48, height:48, color:route.color }}/>
              <div style={{ fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.7)' }}>Harita Entegrasyonu</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>Google Maps API bağlantısı yapılandırılıyor</div>
            </div>
            <div style={{ padding:'16px 20px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
                {[
                  { l:'Toplam Sipariş', v:route.orders, icon:Truck },
                  { l:'Tamamlanan', v:route.completed, icon:Check },
                  { l:'Kalan', v:route.orders-route.completed, icon:MapPin },
                  { l:'ETA', v:route.eta, icon:Clock },
                ].map((s,i)=>(
                  <div key={i} style={{ background:T.gray50, borderRadius:10, padding:'12px 14px', textAlign:'center' }}>
                    <s.icon style={{ width:16, height:16, color:route.color, margin:'0 auto 6px' }}/>
                    <div style={{ fontSize:18, fontWeight:900, color:T.gray900 }}>{s.v}</div>
                    <div style={{ fontSize:10.5, color:T.gray400 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
