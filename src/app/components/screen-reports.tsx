// CICEKYOLLA OS — Reports Center
import { useState } from 'react';
import { BarChart2, Download, Calendar, TrendingUp, ShoppingBag, Users, Truck } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { T } from './ui-kit';

const MONTHLY_DATA = [
  { month:'Oca', revenue:284000, orders:1840, customers:420, avgOrder:1543 },
  { month:'Şub', revenue:312000, orders:2020, customers:480, avgOrder:1544 },
  { month:'Mar', revenue:298000, orders:1930, customers:445, avgOrder:1544 },
  { month:'Nis', revenue:341000, orders:2210, customers:510, avgOrder:1543 },
  { month:'May', revenue:378000, orders:2450, customers:570, avgOrder:1543 },
  { month:'Haz', revenue:405000, orders:2620, customers:615, avgOrder:1546 },
];

const REPORT_TYPES = [
  { id:'revenue', label:'Gelir Raporu', icon:TrendingUp, color:'#16A34A' },
  { id:'orders', label:'Sipariş Raporu', icon:ShoppingBag, color:'#7C3AED' },
  { id:'customers', label:'Müşteri Raporu', icon:Users, color:'#2563EB' },
  { id:'delivery', label:'Teslimat Raporu', icon:Truck, color:'#D97706' },
];

export function ScreenReports() {
  const [activeReport, setActiveReport] = useState('revenue');
  const [period, setPeriod] = useState<'week'|'month'|'quarter'>('month');

  const TOTALS = {
    revenue: { value:'₺2.018.000', change:'+18.4%', label:'Son 6 Ay Toplam' },
    orders: { value:'13.070', change:'+12.8%', label:'Son 6 Ay Toplam' },
    customers: { value:'3.040', change:'+22.1%', label:'Yeni Müşteri' },
    delivery: { value:'%94.2', change:'+2.1pp', label:'Zamanında Teslimat' },
  };

  return (
    <div style={{ padding:'24px 28px', maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Raporlar Merkezi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>Gelir, sipariş, müşteri ve teslimat raporları</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <div style={{ display:'flex', gap:4, background:T.gray100, borderRadius:9, padding:4 }}>
            {(['week','month','quarter'] as const).map(p=>(
              <button key={p} onClick={()=>setPeriod(p)} style={{ padding:'6px 14px', border:'none', borderRadius:7, background:period===p?'#fff':'transparent', fontSize:12, fontWeight:period===p?700:400, color:period===p?T.gray900:T.gray500, cursor:'pointer' }}>
                {p==='week'?'Haftalık':p==='month'?'Aylık':'Çeyreklik'}
              </button>
            ))}
          </div>
          <button style={{ padding:'9px 14px', border:`1px solid ${T.gray200}`, borderRadius:9, background:'#fff', fontSize:12.5, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <Download style={{ width:13, height:13 }}/> PDF
          </button>
          <button style={{ padding:'9px 14px', border:`1px solid ${T.gray200}`, borderRadius:9, background:'#fff', fontSize:12.5, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            <Download style={{ width:13, height:13 }}/> Excel
          </button>
        </div>
      </div>

      {/* Report type selector */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {REPORT_TYPES.map(r=>(
          <button key={r.id} onClick={()=>setActiveReport(r.id)} style={{ background:'#fff', borderRadius:12, border:`2px solid ${activeReport===r.id?r.color:T.gray200}`, padding:'16px 18px', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
              <r.icon style={{ width:20, height:20, color:r.color }}/>
              {activeReport===r.id && <div style={{ width:8, height:8, borderRadius:'50%', background:r.color }}/>}
            </div>
            <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>{TOTALS[r.id as keyof typeof TOTALS].value}</div>
            <div style={{ fontSize:11, color:T.gray400, marginTop:2 }}>{r.label}</div>
            <div style={{ fontSize:11, fontWeight:700, color:r.color, marginTop:4 }}>{TOTALS[r.id as keyof typeof TOTALS].change}</div>
          </button>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:18 }}>
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.gray800, marginBottom:16 }}>Aylık Trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="rptGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
              <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
              <Tooltip formatter={(v:number)=>[`₺${v.toLocaleString('tr-TR')}`, 'Gelir']}/>
              <Area type="monotone" dataKey="revenue" stroke="#16A34A" fill="url(#rptGrad)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.gray800, marginBottom:16 }}>Sipariş Dağılımı</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
              <YAxis tick={{ fontSize:10, fill:T.gray400 }}/>
              <Tooltip formatter={(v:number)=>[`${v} sipariş`, 'Sipariş']}/>
              <Bar dataKey="orders" fill="#7C3AED" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
