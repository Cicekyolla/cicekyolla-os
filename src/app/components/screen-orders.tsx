// CICEKYOLLA OS — Order Management Center
// Full 30KB source: github.com/Cicekyolla/cicekyolla-os
import { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Truck, Check, X, Clock, Package, ChevronDown } from 'lucide-react';
import { T, STATUS_MAP, fmtCurrency } from './ui-kit';
import { ORDERS } from '../data/store';

const STATUS_FILTERS = ['Tümü','Yeni','Hazırlanıyor','Hazır','Kuryede','Teslim Edildi','İptal'];

export function ScreenOrders({ navigate, params }: { navigate?: (s:any,p?:any)=>void; params?: any }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tümü');
  const [selected, setSelected] = useState<string|null>(null);
  const [sortBy, setSortBy] = useState<'date'|'amount'|'status'>('date');

  const filtered = ORDERS.filter(o => {
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()) || o.district.toLowerCase().includes(search.toLowerCase());
    const statusLabel = STATUS_MAP[o.status as keyof typeof STATUS_MAP]?.label;
    const matchStatus = statusFilter==='Tümü' || statusLabel === statusFilter;
    return matchSearch && matchStatus;
  });

  const detail = ORDERS.find(o => o.id === selected);

  return (
    <div style={{ display:'flex', height:'100%', overflow:'hidden' }}>
      {/* Main list */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        {/* Header */}
        <div style={{ padding:'20px 24px', borderBottom:`1px solid ${T.gray100}`, background:'#fff', flexShrink:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div>
              <h1 style={{ fontSize:20, fontWeight:900, color:T.gray900, margin:0 }}>Sipariş Merkezi</h1>
              <p style={{ fontSize:12, color:T.gray400, margin:'3px 0 0' }}>{filtered.length} sipariş gösteriliyor</p>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button style={{ padding:'8px 14px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
                <Download style={{ width:12, height:12 }}/> Excel
              </button>
              <button style={{ padding:'8px 16px', border:'none', borderRadius:8, background:'#16A34A', color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
                <Package style={{ width:12, height:12 }}/> Yeni Sipariş
              </button>
            </div>
          </div>
          {/* Search + Status filter */}
          <div style={{ display:'flex', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7, background:T.gray50, border:`1px solid ${T.gray200}`, borderRadius:8, padding:'7px 12px', flex:1 }}>
              <Search style={{ width:13, height:13, color:T.gray400, flexShrink:0 }}/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Sipariş no, müşteri, ilçe..." style={{ border:'none', outline:'none', background:'transparent', fontSize:12.5, color:T.gray700, width:'100%' }}/>
            </div>
            <div style={{ display:'flex', gap:4, overflowX:'auto', paddingBottom:2 }}>
              {STATUS_FILTERS.map(s=>(
                <button key={s} onClick={()=>setStatusFilter(s)} style={{ padding:'6px 12px', border:`1px solid ${statusFilter===s?'#16A34A':T.gray200}`, borderRadius:7, background:statusFilter===s?'#F0FDF4':'#fff', fontSize:11.5, fontWeight:statusFilter===s?700:400, color:statusFilter===s?'#15803D':T.gray500, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders list */}
        <div style={{ flex:1, overflowY:'auto' }}>
          {filtered.map(order=>{
            const st = STATUS_MAP[order.status as keyof typeof STATUS_MAP];
            const isSelected = selected === order.id;
            return (
              <div key={order.id} onClick={()=>setSelected(isSelected?null:order.id)} style={{ padding:'14px 24px', borderBottom:`1px solid ${T.gray50}`, background:isSelected?'#F0FDF4':'#fff', cursor:'pointer', transition:'background 0.1s', display:'flex', alignItems:'center', gap:14 }}>
                {/* Status dot */}
                <div style={{ width:8, height:8, borderRadius:'50%', background:st?.dot||T.gray300, flexShrink:0 }}/>
                {/* Order info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                    <span style={{ fontSize:12.5, fontWeight:800, color:T.gray900, fontFamily:'monospace' }}>{order.id}</span>
                    <span style={{ fontSize:11, fontWeight:600, color:st?.color, background:st?.bg, padding:'2px 8px', borderRadius:99 }}>{st?.label}</span>
                  </div>
                  <div style={{ fontSize:12.5, color:T.gray700, marginBottom:2 }}>{order.customer} — {order.product}</div>
                  <div style={{ display:'flex', gap:12 }}>
                    <span style={{ fontSize:11, color:T.gray400, display:'flex', alignItems:'center', gap:3 }}><Truck style={{ width:10, height:10 }}/>{order.district}</span>
                    <span style={{ fontSize:11, color:T.gray400 }}>{order.time}</span>
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontSize:14, fontWeight:900, color:'#7C3AED', marginBottom:4 }}>{fmtCurrency(order.amount)}</div>
                  <div style={{ fontSize:11, color:T.gray400 }}>{order.courier||'Kurye atanmadı'}</div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding:'48px', textAlign:'center', color:T.gray400 }}>
              <Package style={{ width:36, height:36, margin:'0 auto 12px', opacity:0.3 }}/>
              <div>Sipariş bulunamadı</div>
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {detail && (
        <div style={{ width:340, borderLeft:`1px solid ${T.gray100}`, background:'#fff', display:'flex', flexDirection:'column', overflow:'hidden', flexShrink:0 }}>
          <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.gray100}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>Sipariş Detayı</div>
            <button onClick={()=>setSelected(null)} style={{ width:24, height:24, borderRadius:'50%', border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X style={{ width:11, height:11 }}/></button>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'16px 20px' }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#7C3AED', fontFamily:'monospace', marginBottom:12 }}>{detail.id}</div>
            {[
              { l:'Müşteri', v:detail.customer },
              { l:'Ürün', v:detail.product },
              { l:'Tutar', v:fmtCurrency(detail.amount) },
              { l:'İlçe', v:detail.district },
              { l:'Kurye', v:detail.courier||'Atanmadı' },
              { l:'Zaman', v:detail.time },
            ].map(r=>(
              <div key={r.l} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${T.gray50}` }}>
                <span style={{ fontSize:12, color:T.gray400 }}>{r.l}</span>
                <span style={{ fontSize:12.5, fontWeight:600, color:T.gray800 }}>{r.v}</span>
              </div>
            ))}
            {/* Status actions */}
            <div style={{ marginTop:16 }}>
              <div style={{ fontSize:11.5, fontWeight:700, color:T.gray500, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>Durum Güncelle</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {['Hazırlanıyor','Hazır','Kuryede','Teslim Edildi'].map(s=>(
                  <button key={s} style={{ padding:'9px 14px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:12.5, color:T.gray600, cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:6, transition:'all 0.12s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#F0FDF4'}
                    onMouseLeave={e=>e.currentTarget.style.background='#fff'}
                  >
                    <Check style={{ width:12, height:12, color:'#16A34A' }}/>{s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
