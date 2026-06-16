// CICEKYOLLA OS — Customer 360° View
// Full source: github.com/Cicekyolla/cicekyolla-os
import { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, ShoppingBag, Star, Gift, Calendar, TrendingUp, MessageSquare, Edit, Plus } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { T, fmtCurrency, fmtDate } from './ui-kit';
import { CUSTOMERS, ORDERS } from '../data/store';

export function ScreenCustomer360({ navigate, params }: { navigate?: (s:any,p?:any)=>void; params?: any }) {
  const customerId = params?.customerId;
  const customer = CUSTOMERS.find(c => c.id === customerId) || CUSTOMERS[0];
  const customerOrders = ORDERS.filter(o => o.customerId === customer.id);

  const [tab, setTab] = useState<'overview'|'orders'|'notes'|'timeline'>('overview');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(customer.notes || []);

  const SPEND_DATA = [
    { month:'Oca', spend:1840 },
    { month:'Şub', spend:2340 },
    { month:'Mar', spend:1640 },
    { month:'Nis', spend:3120 },
    { month:'May', spend:2840 },
    { month:'Haz', spend:4200 },
  ];

  function addNote() {
    if (!newNote.trim()) return;
    setNotes(n => [...n, { id: Date.now(), text: newNote, date: new Date().toLocaleDateString('tr-TR') }]);
    setNewNote('');
  }

  return (
    <div style={{ height:'100%', overflowY:'auto', background:T.gray50 }}>
      {/* Header */}
      <div style={{ background:'#fff', borderBottom:`1px solid ${T.gray100}`, padding:'16px 24px', display:'flex', alignItems:'center', gap:12 }}>
        <button onClick={()=>navigate?.('crm')} style={{ width:32, height:32, borderRadius:8, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <ArrowLeft style={{ width:14, height:14 }}/>
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:16, fontWeight:900, color:T.gray900 }}>Müşteri 360°</div>
          <div style={{ fontSize:12, color:T.gray400 }}>{customer.name} • Detaylı profil görünümü</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button style={{ padding:'7px 14px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <MessageSquare style={{ width:12, height:12 }}/> WhatsApp
          </button>
          <button style={{ padding:'7px 14px', border:'none', borderRadius:8, background:'#7C3AED', color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <Edit style={{ width:12, height:12 }}/> Düzenle
          </button>
        </div>
      </div>

      <div style={{ padding:'20px 24px', maxWidth:1100, margin:'0 auto' }}>
        {/* Profile card */}
        <div style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, padding:'24px 28px', marginBottom:20, display:'flex', gap:24, alignItems:'flex-start' }}>
          <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#7C3AED,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, fontWeight:900, color:'#fff', flexShrink:0 }}>
            {customer.name.charAt(0)}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:6 }}>
              <div style={{ fontSize:20, fontWeight:900, color:T.gray900 }}>{customer.name}</div>
              <span style={{ fontSize:11, fontWeight:700, color:'#7C3AED', background:'#EDE9FE', padding:'3px 10px', borderRadius:99 }}>{customer.segment}</span>
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <span style={{ fontSize:12.5, color:T.gray500, display:'flex', alignItems:'center', gap:4 }}><Phone style={{ width:12, height:12 }}/>{customer.phone}</span>
              <span style={{ fontSize:12.5, color:T.gray500, display:'flex', alignItems:'center', gap:4 }}><Mail style={{ width:12, height:12 }}/>{customer.email}</span>
              <span style={{ fontSize:12.5, color:T.gray500, display:'flex', alignItems:'center', gap:4 }}><MapPin style={{ width:12, height:12 }}/>{customer.city}</span>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, flexShrink:0 }}>
            {[
              { l:'LTV', v:fmtCurrency(customer.ltv), c:'#7C3AED' },
              { l:'Siparişler', v:customer.orderCount, c:'#16A34A' },
              { l:'NPS', v:customer.nps, c:'#2563EB' },
            ].map((m,i)=>(
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontSize:20, fontWeight:900, color:m.c }}>{m.v}</div>
                <div style={{ fontSize:10.5, color:T.gray400 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, marginBottom:20, background:T.gray100, borderRadius:10, padding:4, width:'fit-content' }}>
          {(['overview','orders','notes','timeline'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{ padding:'7px 16px', border:'none', borderRadius:8, background:tab===t?'#fff':'transparent', fontSize:12.5, fontWeight:tab===t?700:400, color:tab===t?T.gray900:T.gray500, cursor:'pointer', transition:'all 0.15s', boxShadow:tab===t?'0 1px 4px rgba(0,0,0,0.08)':'none' }}>
              {t==='overview'?'Genel':t==='orders'?'Siparişler':t==='notes'?'Notlar':'Zaman Tüneli'}
            </button>
          ))}
        </div>

        {tab==='overview' && (
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:18 }}>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Aylık Harcama Trendi</div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={SPEND_DATA}>
                  <defs>
                    <linearGradient id="c360G" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                  <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
                  <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${v}`}/>
                  <Tooltip formatter={(v:number)=>[fmtCurrency(v),'Harcama']}/>
                  <Area type="monotone" dataKey="spend" stroke="#7C3AED" fill="url(#c360G)" strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:14 }}>Müşteri Bilgileri</div>
              {[
                { l:'Müşteri Kodu', v:`CK-${customer.id}` },
                { l:'Kayıt Tarihi', v:customer.joinDate },
                { l:'Son Sipariş', v:customer.lastOrder },
                { l:'Tercih Kategori', v:customer.favoriteCategory },
                { l:'Churn Riski', v:customer.churnRisk },
              ].map(r=>(
                <div key={r.l} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:`1px solid ${T.gray50}` }}>
                  <span style={{ fontSize:11.5, color:T.gray400 }}>{r.l}</span>
                  <span style={{ fontSize:12, fontWeight:600, color:T.gray700 }}>{String(r.v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='orders' && (
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:T.gray50 }}>
                  {['Sipariş No','Tarih','Ürün','Tutar','Durum'].map(h=>(
                    <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerOrders.map(o=>(
                  <tr key={o.id} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                    <td style={{ padding:'11px 14px', fontSize:12, fontFamily:'monospace', color:'#7C3AED' }}>{o.id}</td>
                    <td style={{ padding:'11px 14px', fontSize:12, color:T.gray500 }}>{o.time}</td>
                    <td style={{ padding:'11px 14px', fontSize:12.5, color:T.gray700 }}>{o.product}</td>
                    <td style={{ padding:'11px 14px', fontSize:13, fontWeight:800, color:T.gray900 }}>{fmtCurrency(o.amount)}</td>
                    <td style={{ padding:'11px 14px' }}>
                      <span style={{ fontSize:11, fontWeight:700, color:'#16A34A', background:'#F0FDF4', padding:'3px 8px', borderRadius:99 }}>Teslim Edildi</span>
                    </td>
                  </tr>
                ))}
                {customerOrders.length===0 && (
                  <tr><td colSpan={5} style={{ padding:'32px', textAlign:'center', color:T.gray400, fontSize:13 }}>Bu müşteriye ait sipariş bulunamadı</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab==='notes' && (
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:14 }}>Müşteri Notları</div>
            <div style={{ display:'flex', gap:10, marginBottom:16 }}>
              <input value={newNote} onChange={e=>setNewNote(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addNote()} placeholder="Not ekle ve Enter'a bas..." style={{ flex:1, height:40, padding:'0 12px', border:`1.5px solid ${T.gray200}`, borderRadius:9, fontSize:13, outline:'none', color:T.gray800 }}
                onFocus={e=>e.target.style.borderColor='#7C3AED'} onBlur={e=>e.target.style.borderColor=T.gray200}
              />
              <button onClick={addNote} style={{ padding:'0 16px', border:'none', borderRadius:9, background:'#7C3AED', color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                <Plus style={{ width:12, height:12 }}/> Ekle
              </button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {notes.map((n:any) => (
                <div key={n.id} style={{ background:T.gray50, borderRadius:10, padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div style={{ fontSize:13, color:T.gray700 }}>{n.text}</div>
                  <div style={{ fontSize:11, color:T.gray400, flexShrink:0, marginLeft:12 }}>{n.date}</div>
                </div>
              ))}
              {notes.length===0 && <div style={{ textAlign:'center', padding:'24px', color:T.gray400, fontSize:13 }}>Henüz not yok. Yukardaki alana yazarak ekleyebilirsiniz.</div>}
            </div>
          </div>
        )}

        {tab==='timeline' && (
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:24, textAlign:'center' }}>
            <Calendar style={{ width:40, height:40, color:T.gray300, margin:'0 auto 12px' }}/>
            <div style={{ fontSize:15, fontWeight:600, color:T.gray500 }}>Müşteri zaman tüneli</div>
            <div style={{ fontSize:13, color:T.gray400, marginTop:6 }}>Tüm etkileşim geçmişi kronolojik sırada gösterilir</div>
          </div>
        )}
      </div>
    </div>
  );
}
