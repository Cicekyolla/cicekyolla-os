// CICEKYOLLA OS — Delivery Operations Widget
import { useState } from 'react';
import { Truck, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { T } from './ui-kit';
import { ORDERS, COURIERS } from '../data/store';

export function DeliveryOperations() {
  const activeOrders = ORDERS.filter(o => !['delivered','cancelled'].includes(o.status));
  const activeCouriers = COURIERS.filter(c => c.status === 'active');
  const deliveredToday = ORDERS.filter(o => o.status === 'delivered').length;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Stats row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
        {[
          { icon:Truck, label:'Aktif Teslimat', value:String(activeOrders.length), color:'#2563EB' },
          { icon:CheckCircle2, label:'Bugün Teslim', value:String(deliveredToday), color:'#16A34A' },
          { icon:MapPin, label:'Aktif Kurye', value:String(activeCouriers.length), color:'#D97706' },
        ].map((s,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:10, border:`1px solid ${T.gray200}`, padding:'14px 16px', display:'flex', gap:10, alignItems:'center' }}>
            <div style={{ width:32, height:32, borderRadius:8, background:`${s.color}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <s.icon style={{ width:15, height:15, color:s.color }}/>
            </div>
            <div>
              <div style={{ fontSize:18, fontWeight:900, color:T.gray900 }}>{s.value}</div>
              <div style={{ fontSize:11, color:T.gray400 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Active orders list */}
      <div style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <div style={{ padding:'12px 16px', borderBottom:`1px solid ${T.gray100}`, fontSize:12.5, fontWeight:700, color:T.gray800 }}>Aktif Teslimatlar</div>
        <div style={{ maxHeight:200, overflowY:'auto' }}>
          {activeOrders.slice(0,6).map(o=>(
            <div key={o.id} style={{ padding:'10px 16px', borderBottom:`1px solid ${T.gray50}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:12.5, fontWeight:600, color:T.gray800 }}>{o.customer}</div>
                <div style={{ fontSize:11, color:T.gray400 }}>{o.district} • {o.courier || 'Atanmadı'}</div>
              </div>
              <div style={{ fontSize:12, fontWeight:700, color:'#7C3AED' }}>₺{o.amount.toLocaleString('tr-TR')}</div>
            </div>
          ))}
          {activeOrders.length === 0 && (
            <div style={{ padding:'20px', textAlign:'center', color:T.gray400, fontSize:13 }}>Tüm teslimatlar tamamlandı ✅</div>
          )}
        </div>
      </div>
    </div>
  );
}
