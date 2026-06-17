// CICEKYOLLA OS — Orders Table Widget
import { useState } from 'react';
import { Search } from 'lucide-react';
import { T, STATUS_MAP, fmtCurrency } from './ui-kit';
import { ORDERS } from '../data/store';

export function OrdersTable() {
  const [search, setSearch] = useState('');

  const filtered = ORDERS.filter(o =>
    !search ||
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 10);

  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
      {/* Search */}
      <div style={{ padding:'12px 16px', borderBottom:`1px solid ${T.gray100}`, display:'flex', alignItems:'center', gap:8, background:T.gray50 }}>
        <Search style={{ width:14, height:14, color:T.gray400 }}/>
        <input
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="Sipariş ara..."
          style={{ border:'none', outline:'none', background:'transparent', fontSize:13, color:T.gray700, flex:1 }}
        />
      </div>

      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ background:T.gray50 }}>
            {['Sipariş','Müşteri','Ürün','Tutar','Durum','Kurye'].map(h=>(
              <th key={h} style={{ padding:'9px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(order=>{
            const st = STATUS_MAP[order.status as keyof typeof STATUS_MAP];
            return (
              <tr key={order.id} style={{ borderBottom:`1px solid ${T.gray50}` }}
                onMouseEnter={e=>(e.currentTarget.style.background=T.gray50)}
                onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
              >
                <td style={{ padding:'10px 14px', fontSize:12, fontFamily:'monospace', color:'#7C3AED', fontWeight:700 }}>{order.id}</td>
                <td style={{ padding:'10px 14px', fontSize:12.5, color:T.gray800, fontWeight:600 }}>{order.customer}</td>
                <td style={{ padding:'10px 14px', fontSize:12, color:T.gray600 }}>{order.product}</td>
                <td style={{ padding:'10px 14px', fontSize:13, fontWeight:800, color:T.gray900 }}>{fmtCurrency(order.amount)}</td>
                <td style={{ padding:'10px 14px' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:st?.color, background:st?.bg, padding:'3px 8px', borderRadius:99 }}>{st?.label}</span>
                </td>
                <td style={{ padding:'10px 14px', fontSize:12, color:T.gray400 }}>{order.courier || '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
