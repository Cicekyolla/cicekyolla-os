// CICEKYOLLA OS — Customers List
import { useState } from 'react';
import { Search, Plus, MoreHorizontal, MapPin } from 'lucide-react';
import { T } from './ui-kit';

const SAMPLE_CUSTOMERS = [
  { id:1, name:'Ayşe Kaya',   email:'ayse@mail.com',   city:'Kadıköy',  orders:12, ltv:18420, segment:'VIP',      lastOrder:'14 Haz' },
  { id:2, name:'Mehmet Y.', email:'mehmet@mail.com',  city:'Beşiktaş', orders:7,  ltv:9840,  segment:'Premium',  lastOrder:'12 Haz' },
  { id:3, name:'Selin A.',  email:'selin@mail.com',   city:'Şişli',    orders:4,  ltv:5200,  segment:'Regular',  lastOrder:'10 Haz' },
  { id:4, name:'Can T.',    email:'can@mail.com',     city:'Ankara',   orders:2,  ltv:2100,  segment:'New',      lastOrder:'8 Haz'  },
  { id:5, name:'Zeynep D.', email:'zeynep@mail.com',  city:'Ataşehir', orders:19, ltv:32500, segment:'VIP',      lastOrder:'15 Haz' },
  { id:6, name:'Burcu M.',  email:'burcu@mail.com',   city:'Maltepe',  orders:8,  ltv:11200, segment:'Premium',  lastOrder:'11 Haz' },
];

const SEG_COLORS: Record<string,{c:string;bg:string}> = {
  VIP:     { c:'#7C3AED', bg:'#EDE9FE' },
  Premium: { c:'#D97706', bg:'#FFFBEB' },
  Regular: { c:'#2563EB', bg:'#EFF6FF' },
  New:     { c:'#16A34A', bg:'#F0FDF4' },
};

export function ScreenCustomers() {
  const [search, setSearch] = useState('');
  const filtered = SAMPLE_CUSTOMERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.includes(search));

  return (
    <div style={{ padding:'24px 28px', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Müşteri Listesi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>{SAMPLE_CUSTOMERS.length} müşteri</p>
        </div>
        <button style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#7C3AED', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Plus style={{ width:13, height:13 }}/> Müşteri Ekle
        </button>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:7, background:'#fff', border:`1px solid ${T.gray200}`, borderRadius:9, padding:'7px 12px', marginBottom:16 }}>
        <Search style={{ width:14, height:14, color:T.gray400 }}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Müşteri ara..." style={{ border:'none', outline:'none', fontSize:13, color:T.gray700, width:'100%' }}/>
      </div>

      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['Müşteri','Konum','Sipariş','LTV','Segment','Son Sipariş',''].map(h=>(
                <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c=>(
              <tr key={c.id} style={{ borderBottom:`1px solid ${T.gray50}` }}
                onMouseEnter={e=>(e.currentTarget.style.background=T.gray50)}
                onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
              >
                <td style={{ padding:'12px 14px' }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{c.name}</div>
                  <div style={{ fontSize:11, color:T.gray400 }}>{c.email}</div>
                </td>
                <td style={{ padding:'12px 14px', fontSize:12, color:T.gray500, display:'flex', alignItems:'center', gap:4 }}>
                  <MapPin style={{ width:11, height:11 }}/>{c.city}
                </td>
                <td style={{ padding:'12px 14px', fontSize:13, fontWeight:600, color:T.gray700 }}>{c.orders}</td>
                <td style={{ padding:'12px 14px', fontSize:13, fontWeight:800, color:'#7C3AED' }}>₺{c.ltv.toLocaleString('tr-TR')}</td>
                <td style={{ padding:'12px 14px' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:SEG_COLORS[c.segment]?.c, background:SEG_COLORS[c.segment]?.bg, padding:'3px 9px', borderRadius:99 }}>{c.segment}</span>
                </td>
                <td style={{ padding:'12px 14px', fontSize:12, color:T.gray400 }}>{c.lastOrder}</td>
                <td style={{ padding:'12px 14px' }}>
                  <button style={{ padding:'5px 10px', border:`1px solid ${T.gray200}`, borderRadius:7, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center' }}><MoreHorizontal style={{ width:13, height:13 }}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
