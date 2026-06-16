// CICEKYOLLA OS — Executive Dashboard
// Full 38KB source: github.com/Cicekyolla/cicekyolla-os
import { useState } from 'react';
import { TrendingUp, ShoppingBag, Users, Truck, BarChart2, DollarSign, Clock, Star, ArrowUp, ArrowDown, ChevronRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { T, STATUS_MAP, fmtCurrency } from './ui-kit';
import { ORDERS, COURIERS, CUSTOMERS } from '../data/store';
import { REVENUE_METRICS, DAILY_REVENUE } from '../data/revenue-store';

const REVENUE_TREND = [
  { month:'Oca', revenue:284000, target:280000 },
  { month:'Şub', revenue:312000, target:300000 },
  { month:'Mar', revenue:298000, target:310000 },
  { month:'Nis', revenue:341000, target:330000 },
  { month:'May', revenue:378000, target:360000 },
  { month:'Haz', revenue:405000, target:400000 },
];

const ORDER_STATUS_PIE = [
  { name:'Teslim Edildi', value:54, color:'#16A34A' },
  { name:'Teslimatta',   value:18, color:'#3B82F6' },
  { name:'Hazırlanıyor', value:12, color:'#8B5CF6' },
  { name:'Bekliyor',    value:15, color:'#F97316' },
  { name:'İptal',       value:3,  color:'#EF4444' },
];

const CATEGORY_REVENUE = [
  { cat:'Güller',  revenue:124000, orders:820 },
  { cat:'Orkide',  revenue:88000,  orders:540 },
  { cat:'Hediye',  revenue:76000,  orders:420 },
  { cat:'Kargo',   revenue:68000,  orders:380 },
  { cat:'Yapay',   revenue:49000,  orders:120 },
];

export function ScreenDashboard({ navigate }: { navigate: (s:any, p?:any)=>void }) {
  const activeOrders = ORDERS.filter(o => !['delivered','cancelled'].includes(o.status));
  const activeCouriers = COURIERS.filter(c => c.status==='active');
  const todayRevenue = 42840;
  const totalRevenue = 405000;

  return (
    <div style={{ padding:'20px 24px', maxWidth:1400, margin:'0 auto' }}>
      {/* KPI strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Bugünkü Gelir',    value:fmtCurrency(todayRevenue),  change:'+12.4%', up:true,  color:'#16A34A', icon:DollarSign },
          { label:'Aylık Gelir',      value:fmtCurrency(totalRevenue),  change:'+7.1%',  up:true,  color:'#7C3AED', icon:TrendingUp },
          { label:'Aktif Sipariş',    value:String(activeOrders.length), change:'+3',     up:true,  color:'#2563EB', icon:ShoppingBag },
          { label:'Aktif Kurye',      value:String(activeCouriers.length), change:'0',   up:true,  color:'#0891B2', icon:Truck },
          { label:'Ortalama AOV',     value:fmtCurrency(REVENUE_METRICS.currentAOV), change:`+${REVENUE_METRICS.aovGrowthMoM}%`, up:true, color:'#D97706', icon:BarChart2 },
          { label:'Müşteri Memnuniyeti', value:'4.9/5',               change:'+0.1',  up:true,  color:'#DB2777', icon:Star },
        ].map((kpi,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'16px 18px', cursor:'default' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.08em', lineHeight:1.3 }}>{kpi.label}</span>
              <div style={{ width:28, height:28, borderRadius:8, background:`${kpi.color}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <kpi.icon style={{ width:13, height:13, color:kpi.color }}/>
              </div>
            </div>
            <div style={{ fontSize:20, fontWeight:900, color:T.gray900, letterSpacing:'-0.02em', marginBottom:4 }}>{kpi.value}</div>
            <div style={{ display:'flex', alignItems:'center', gap:3 }}>
              {kpi.up ? <ArrowUp style={{ width:10, height:10, color:'#16A34A' }}/> : <ArrowDown style={{ width:10, height:10, color:'#DC2626' }}/>}
              <span style={{ fontSize:11, fontWeight:700, color:kpi.up?'#16A34A':'#DC2626' }}>{kpi.change}</span>
              <span style={{ fontSize:10.5, color:T.gray400 }}>vs geçen ay</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:18, marginBottom:24 }}>
        {/* Revenue trend */}
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px 22px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>Aylık Gelir Trendi</div>
              <div style={{ fontSize:11.5, color:T.gray400 }}>Hedef vs Gerçekleşen</div>
            </div>
            <button onClick={()=>navigate('revenue')} style={{ fontSize:11.5, color:'#7C3AED', background:'#EDE9FE', border:'none', borderRadius:7, padding:'5px 10px', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>Detay <ChevronRight style={{ width:11, height:11 }}/></button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={REVENUE_TREND}>
              <defs>
                <linearGradient id="dashRevG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
              <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
              <Tooltip formatter={(v:number, name:string) => [fmtCurrency(v), name==='revenue'?'Gelir':'Hedef']}/>
              <Area type="monotone" dataKey="revenue" stroke="#16A34A" fill="url(#dashRevG)" strokeWidth={2.5}/>
              <Line type="monotone" dataKey="target" stroke="#D97706" strokeWidth={2} strokeDasharray="5 3" dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Order status pie */}
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px 22px' }}>
          <div style={{ fontSize:14, fontWeight:800, color:T.gray900, marginBottom:16 }}>Sipariş Durumu</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={ORDER_STATUS_PIE} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={2}>
                {ORDER_STATUS_PIE.map((entry,i) => <Cell key={i} fill={entry.color}/>)}
              </Pie>
              <Tooltip formatter={(v:number,name:string)=>[`${v} sipariş`,name]}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:8 }}>
            {ORDER_STATUS_PIE.map((e,i)=>(
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:e.color }}/>
                  <span style={{ fontSize:11, color:T.gray600 }}>{e.name}</span>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:T.gray800 }}>{e.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px 22px' }}>
          <div style={{ fontSize:14, fontWeight:800, color:T.gray900, marginBottom:16 }}>Kategori Geliri</div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={CATEGORY_REVENUE} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={T.gray100} horizontal={false}/>
              <XAxis type="number" tick={{ fontSize:9, fill:T.gray400 }} tickFormatter={v=>`${Math.round(v/1000)}K`}/>
              <YAxis type="category" dataKey="cat" tick={{ fontSize:10, fill:T.gray400 }} width={44}/>
              <Tooltip formatter={(v:number)=>[fmtCurrency(v),'Gelir']}/>
              <Bar dataKey="revenue" fill="#7C3AED" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active orders + live couriers */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:24 }}>
        {/* Active orders */}
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.gray100}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>Aktif Siparişler</div>
            <button onClick={()=>navigate('orders')} style={{ fontSize:11.5, color:'#7C3AED', background:'#EDE9FE', border:'none', borderRadius:7, padding:'4px 10px', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>Tümünü Gör <ChevronRight style={{ width:11, height:11 }}/></button>
          </div>
          <div style={{ maxHeight:280, overflowY:'auto' }}>
            {activeOrders.slice(0,8).map(order => {
              const st = STATUS_MAP[order.status as keyof typeof STATUS_MAP];
              return (
                <div key={order.id} onClick={()=>navigate('orders',{orderId:order.id})} style={{ padding:'11px 20px', borderBottom:`1px solid ${T.gray50}`, display:'flex', alignItems:'center', gap:12, cursor:'pointer', transition:'background 0.1s' }}
                  onMouseEnter={e=>e.currentTarget.style.background=T.gray50}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                >
                  <div style={{ width:7, height:7, borderRadius:'50%', background:st?.dot, flexShrink:0 }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12.5, fontWeight:700, color:T.gray900 }}>{order.customer}</div>
                    <div style={{ fontSize:11, color:T.gray400 }}>{order.product} • {order.district}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:12.5, fontWeight:800, color:'#7C3AED' }}>{fmtCurrency(order.amount)}</div>
                    <div style={{ fontSize:10.5, color:T.gray400 }}>{order.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live couriers */}
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.gray100}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>Canlı Kuryeler</div>
            <button onClick={()=>navigate('couriers')} style={{ fontSize:11.5, color:'#16A34A', background:'#F0FDF4', border:'none', borderRadius:7, padding:'4px 10px', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>Merkeze Git <ChevronRight style={{ width:11, height:11 }}/></button>
          </div>
          <div style={{ maxHeight:280, overflowY:'auto' }}>
            {COURIERS.map(c => {
              const statusColor = c.status==='active'?'#16A34A':c.status==='resting'?'#D97706':'#94A3B8';
              return (
                <div key={c.id} onClick={()=>navigate('couriers',{courierId:c.id})} style={{ padding:'11px 20px', borderBottom:`1px solid ${T.gray50}`, display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}
                  onMouseEnter={e=>e.currentTarget.style.background=T.gray50}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                >
                  <div style={{ width:34, height:34, borderRadius:'50%', background:`${statusColor}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:statusColor, flexShrink:0 }}>{c.name.charAt(0)}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12.5, fontWeight:700, color:T.gray900 }}>{c.name}</div>
                    <div style={{ fontSize:11, color:T.gray400 }}>{c.vehicle} • {c.zone}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:13, fontWeight:900, color:statusColor }}>{c.todayDeliveries}</div>
                    <div style={{ fontSize:10, color:T.gray400 }}>teslimat</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top customers */}
      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.gray100}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>Top Müşteriler</div>
          <button onClick={()=>navigate('crm')} style={{ fontSize:11.5, color:'#7C3AED', background:'#EDE9FE', border:'none', borderRadius:7, padding:'4px 10px', cursor:'pointer' }}>CRM Merkezi</button>
        </div>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['Müşteri','Segment','LTV','Sipariş','Son Sipariş','NPS'].map(h=>(
                <th key={h} style={{ padding:'9px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.slice(0,6).map(c=>(
              <tr key={c.id} style={{ borderBottom:`1px solid ${T.gray50}`, cursor:'pointer' }}
                onClick={()=>navigate('customer360',{customerId:c.id})}
                onMouseEnter={e=>e.currentTarget.style.background=T.gray50}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}
              >
                <td style={{ padding:'11px 14px' }}>
                  <div style={{ display:'flex', gap:9, alignItems:'center' }}>
                    <div style={{ width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,#7C3AED,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#fff', flexShrink:0 }}>{c.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontSize:12.5, fontWeight:700, color:T.gray900 }}>{c.name}</div>
                      <div style={{ fontSize:11, color:T.gray400 }}>{c.city}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding:'11px 14px' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:'#7C3AED', background:'#EDE9FE', padding:'2px 8px', borderRadius:99 }}>{c.segment}</span>
                </td>
                <td style={{ padding:'11px 14px', fontSize:13, fontWeight:800, color:'#7C3AED' }}>{fmtCurrency(c.ltv)}</td>
                <td style={{ padding:'11px 14px', fontSize:12.5, color:T.gray700 }}>{c.orderCount}</td>
                <td style={{ padding:'11px 14px', fontSize:12, color:T.gray400 }}>{c.lastOrder}</td>
                <td style={{ padding:'11px 14px' }}>
                  <span style={{ fontSize:12.5, fontWeight:800, color:c.nps>=9?'#16A34A':c.nps>=7?'#D97706':'#DC2626' }}>{c.nps}/10</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
