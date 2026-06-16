// CICEKYOLLA OS — Courier Management Center
// Full source: github.com/Cicekyolla/cicekyolla-os
import { useState } from 'react';
import { MapPin, Phone, Star, Truck, Plus, Edit, Clock, Check, ChevronRight } from 'lucide-react';
import { T } from './ui-kit';
import { COURIERS } from '../data/store';

export function ScreenCouriers({ navigate, params }: { navigate?: (s:any,p?:any)=>void; params?: any }) {
  const [selected, setSelected] = useState<string|null>(null);
  const [filter, setFilter] = useState<'all'|'active'|'resting'|'offline'>('all');

  const filtered = COURIERS.filter(c => filter==='all' || c.status===filter);
  const detail = COURIERS.find(c => c.id === selected);

  return (
    <div style={{ display:'flex', height:'100%', overflow:'hidden' }}>
      {/* List */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <div style={{ padding:'20px 24px', borderBottom:`1px solid ${T.gray100}`, background:'#fff', flexShrink:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div>
              <h1 style={{ fontSize:20, fontWeight:900, color:T.gray900, margin:0 }}>Kurye Merkezi</h1>
              <p style={{ fontSize:12, color:T.gray400, margin:'3px 0 0' }}>{filtered.length} kurye</p>
            </div>
            <button style={{ padding:'8px 14px', border:'none', borderRadius:8, background:'#16A34A', color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
              <Plus style={{ width:12, height:12 }}/> Kurye Ekle
            </button>
          </div>
          <div style={{ display:'flex', gap:4 }}>
            {(['all','active','resting','offline'] as const).map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{ padding:'6px 12px', border:`1px solid ${filter===f?'#16A34A':T.gray200}`, borderRadius:7, background:filter===f?'#F0FDF4':'#fff', fontSize:11.5, fontWeight:filter===f?700:400, color:filter===f?'#15803D':T.gray500, cursor:'pointer' }}>
                {f==='all'?'Tümü':f==='active'?'Aktif':f==='resting'?'Dinleniyor':'Offline'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex:1, overflowY:'auto' }}>
          {filtered.map(courier=>{
            const statusColor = courier.status==='active'?'#16A34A':courier.status==='resting'?'#D97706':'#94A3B8';
            const statusLabel = courier.status==='active'?'Aktif':courier.status==='resting'?'Dinleniyor':'Offline';
            return (
              <div key={courier.id} onClick={()=>setSelected(selected===courier.id?null:courier.id)} style={{ padding:'14px 24px', borderBottom:`1px solid ${T.gray50}`, background:selected===courier.id?'#F0FDF4':'#fff', cursor:'pointer', transition:'background 0.1s', display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:42, height:42, borderRadius:'50%', background:`linear-gradient(135deg,${statusColor},${statusColor}AA)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:800, color:'#fff', flexShrink:0 }}>
                  {courier.name.charAt(0)}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{courier.name}</span>
                    <span style={{ fontSize:10.5, fontWeight:700, color:statusColor, background:`${statusColor}15`, padding:'2px 7px', borderRadius:99 }}>{statusLabel}</span>
                  </div>
                  <div style={{ display:'flex', gap:14 }}>
                    <span style={{ fontSize:11, color:T.gray400, display:'flex', alignItems:'center', gap:3 }}><MapPin style={{ width:10, height:10 }}/>{courier.zone}</span>
                    <span style={{ fontSize:11, color:T.gray400, display:'flex', alignItems:'center', gap:3 }}><Truck style={{ width:10, height:10 }}/>{courier.vehicle}</span>
                    <span style={{ fontSize:11, color:T.gray400, display:'flex', alignItems:'center', gap:3 }}><Star style={{ width:10, height:10 }}/>{courier.rating}</span>
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontSize:14, fontWeight:900, color:'#7C3AED' }}>{courier.todayDeliveries}</div>
                  <div style={{ fontSize:10.5, color:T.gray400 }}>teslimat</div>
                </div>
                <ChevronRight style={{ width:14, height:14, color:T.gray300 }}/>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      {detail && (
        <div style={{ width:320, borderLeft:`1px solid ${T.gray100}`, background:'#fff', overflow:'auto', flexShrink:0 }}>
          <div style={{ padding:'20px', borderBottom:`1px solid ${T.gray100}`, textAlign:'center' }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:'linear-gradient(135deg,#16A34A,#15803D)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:900, color:'#fff', margin:'0 auto 12px' }}>{detail.name.charAt(0)}</div>
            <div style={{ fontSize:16, fontWeight:900, color:T.gray900 }}>{detail.name}</div>
            <div style={{ fontSize:12, color:T.gray400, marginTop:4 }}>{detail.vehicle} • {detail.zone}</div>
          </div>
          <div style={{ padding:'16px 20px' }}>
            {[
              { l:'Telefon', v:detail.phone },
              { l:'Bugünkü Teslimat', v:`${detail.todayDeliveries} teslimat` },
              { l:'Rating', v:`★ ${detail.rating}/5` },
              { l:'Aktif Sipariş', v:detail.activeOrders },
            ].map(r=>(
              <div key={r.l} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:`1px solid ${T.gray50}` }}>
                <span style={{ fontSize:12, color:T.gray400 }}>{r.l}</span>
                <span style={{ fontSize:12.5, fontWeight:600, color:T.gray800 }}>{r.v}</span>
              </div>
            ))}
            <button style={{ width:'100%', marginTop:16, padding:'10px', border:'none', borderRadius:9, background:'#7C3AED', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
              <Phone style={{ width:13, height:13 }}/> Ara
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
