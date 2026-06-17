// CICEKYOLLA OS — Sales Charts Widget
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { T } from './ui-kit';

const SALES_DATA = [
  { date:'10 Haz', revenue:42000, orders:280 },
  { date:'11 Haz', revenue:38000, orders:251 },
  { date:'12 Haz', revenue:51000, orders:340 },
  { date:'13 Haz', revenue:44000, orders:293 },
  { date:'14 Haz', revenue:48000, orders:320 },
  { date:'15 Haz', revenue:55000, orders:367 },
  { date:'16 Haz', revenue:49000, orders:327 },
];

export function SalesCharts() {
  return (
    <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
      <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Haftalık Satış Trendi</div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={SALES_DATA}>
          <defs>
            <linearGradient id="salesG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
          <XAxis dataKey="date" tick={{ fontSize:10, fill:T.gray400 }}/>
          <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
          <Tooltip formatter={(v:number)=>[`₺${v.toLocaleString('tr-TR')}`, 'Gelir']}/>
          <Area type="monotone" dataKey="revenue" stroke="#16A34A" fill="url(#salesG)" strokeWidth={2.5}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
