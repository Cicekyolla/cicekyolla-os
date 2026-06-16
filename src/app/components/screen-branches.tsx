// CICEKYOLLA OS — Branch Management Center
import { useState } from 'react';
import { Plus, MapPin, Phone, Edit } from 'lucide-react';
import { T } from './ui-kit';

const BRANCHES = [
  { id:1, name:'Kadıköy Merkez', city:'İstanbul', address:'Bağdat Cad. No:142', phone:'0216 111 22 33', manager:'Ahmet Y.', staff:8, status:'active', dailyOrders:45, monthlyRevenue:284000 },
  { id:2, name:'Beşiktaş Şubesi', city:'İstanbul', address:'Barbaros Blv. No:67', phone:'0212 444 55 66', manager:'Fatma K.', staff:6, status:'active', dailyOrders:32, monthlyRevenue:198000 },
  { id:3, name:'Ankara Merkez', city:'Ankara', address:'Çankaya Mah. No:28', phone:'0312 777 88 99', manager:'Mehmet S.', staff:5, status:'active', dailyOrders:28, monthlyRevenue:165000 },
  { id:4, name:'İzmir Şubesi', city:'İzmir', address:'Konak Mah. No:14', phone:'0232 111 22 33', manager:'Selin A.', staff:4, status:'active', dailyOrders:18, monthlyRevenue:112000 },
  { id:5, name:'Bursa Şubesi', city:'Bursa', address:'Osmangazi No:45', phone:'0224 444 55 66', manager:'Can D.', staff:3, status:'planned', dailyOrders:0, monthlyRevenue:0 },
];

export function ScreenBranches() {
  const [selected, setSelected] = useState<number|null>(null);

  return (
    <div style={{ padding:'24px 28px', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Şube Merkezi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>{BRANCHES.filter(b=>b.status==='active').length} aktif şube</p>
        </div>
        <button style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#16A34A', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Plus style={{ width:13, height:13 }}/> Yeni Şube
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {BRANCHES.map(b=>(
          <div key={b.id} onClick={()=>setSelected(selected===b.id?null:b.id)} style={{ background:'#fff', borderRadius:14, border:`2px solid ${selected===b.id?'#16A34A':T.gray200}`, padding:20, cursor:'pointer', transition:'all 0.15s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
              <div style={{ fontSize:14.5, fontWeight:800, color:T.gray900 }}>{b.name}</div>
              <span style={{ fontSize:10.5, fontWeight:700, color:b.status==='active'?'#16A34A':'#D97706', background:b.status==='active'?'#F0FDF4':'#FFFBEB', padding:'3px 8px', borderRadius:99 }}>
                {b.status==='active'?'Aktif':'Planlanıyor'}
              </span>
            </div>
            <div style={{ fontSize:12, color:T.gray500, display:'flex', alignItems:'center', gap:5, marginBottom:6 }}>
              <MapPin style={{ width:12, height:12 }}/>{b.city} — {b.address}
            </div>
            <div style={{ fontSize:12, color:T.gray500, display:'flex', alignItems:'center', gap:5, marginBottom:12 }}>
              <Phone style={{ width:12, height:12 }}/>{b.phone}
            </div>
            {b.status==='active' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[{l:'Günlük Sipariş',v:b.dailyOrders},{l:'Aylık Gelir',v:`₺${(b.monthlyRevenue/1000).toFixed(0)}K`}].map((s,i)=>(
                  <div key={i} style={{ background:T.gray50, borderRadius:8, padding:'8px 10px' }}>
                    <div style={{ fontSize:10, color:T.gray400 }}>{s.l}</div>
                    <div style={{ fontSize:16, fontWeight:900, color:T.gray900 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
