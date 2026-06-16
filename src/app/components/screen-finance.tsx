// CICEKYOLLA OS — Finance Center
import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Download, BarChart2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { T } from './ui-kit';

const FINANCE_DATA = [
  { month:'Oca', revenue:284000, cost:142000, profit:142000, tax:28400 },
  { month:'Şub', revenue:312000, cost:156000, profit:156000, tax:31200 },
  { month:'Mar', revenue:298000, cost:149000, profit:149000, tax:29800 },
  { month:'Nis', revenue:341000, cost:170500, profit:170500, tax:34100 },
  { month:'May', revenue:378000, cost:189000, profit:189000, tax:37800 },
  { month:'Haz', revenue:405000, cost:202500, profit:202500, tax:40500 },
];

const TRANSACTIONS = [
  { id:'T001', desc:'Sipariş Ödemeleri — Haz', amount:405000, type:'income', date:'30 Haz', status:'confirmed' },
  { id:'T002', desc:'Gül Tedarikçi Ode. — Haz', amount:-87000, type:'expense', date:'28 Haz', status:'confirmed' },
  { id:'T003', desc:'Kurye Maliyetleri — Haz', amount:-45000, type:'expense', date:'27 Haz', status:'confirmed' },
  { id:'T004', desc:'Google Ads — Haz', amount:-15200, type:'expense', date:'26 Haz', status:'confirmed' },
  { id:'T005', desc:'Meta Ads — Haz', amount:-8900, type:'expense', date:'25 Haz', status:'confirmed' },
  { id:'T006', desc:'Kira — Haz', amount:-18000, type:'expense', date:'1 Haz', status:'confirmed' },
];

export function ScreenFinance({ navigate }: { navigate?: (s: any) => void }) {
  const [tab, setTab] = useState<'overview'|'transactions'|'tax'>('overview');
  const fmt = (n: number) => '₺' + Math.abs(n).toLocaleString('tr-TR');

  return (
    <div style={{ padding:'24px 28px', maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Finans Merkezi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>Gelir, gider ve kar analizi</p>
        </div>
        <button style={{ padding:'9px 14px', border:`1px solid ${T.gray200}`, borderRadius:9, background:'#fff', fontSize:12.5, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Download style={{ width:13, height:13 }}/> Mali Rapor
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Aylık Gelir', value:'₺405.000', change:'+7.1%', up:true, color:'#16A34A', icon:TrendingUp },
          { label:'Aylık Gider', value:'₺202.500', change:'+5.2%', up:false, color:'#DC2626', icon:TrendingDown },
          { label:'Net Kar', value:'₺202.500', change:'+9.3%', up:true, color:'#7C3AED', icon:DollarSign },
          { label:'KDV (Tahm.)', value:'₺40.500', change:'', up:true, color:'#D97706', icon:CreditCard },
        ].map((m,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <span style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.07em' }}>{m.label}</span>
              <div style={{ width:28, height:28, borderRadius:7, background:`${m.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <m.icon style={{ width:13, height:13, color:m.color }}/>
              </div>
            </div>
            <div style={{ fontSize:20, fontWeight:900, color:T.gray900 }}>{m.value}</div>
            {m.change && <div style={{ fontSize:11, fontWeight:700, color:m.up?'#16A34A':'#DC2626', marginTop:4 }}>{m.change}</div>}
          </div>
        ))}
      </div>

      <div style={{ display:'flex', gap:4, marginBottom:20, background:T.gray100, borderRadius:10, padding:4, width:'fit-content' }}>
        {(['overview','transactions','tax'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ padding:'7px 16px', border:'none', borderRadius:8, background:tab===t?'#fff':'transparent', fontSize:12.5, fontWeight:tab===t?700:400, color:tab===t?T.gray900:T.gray500, cursor:'pointer' }}>
            {t==='overview'?'Genel Bakış':t==='transactions'?'İşlemler':'Vergi'}
          </button>
        ))}
      </div>

      {tab==='overview' && (
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:18 }}>
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Gelir & Gider Trendi</div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={FINANCE_DATA}>
                <defs>
                  <linearGradient id="finRevG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
                <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
                <Tooltip formatter={(v:number, name:string)=>[`₺${v.toLocaleString('tr-TR')}`, name==='revenue'?'Gelir':name==='cost'?'Gider':'Kar']}/>
                <Area type="monotone" dataKey="revenue" stroke="#16A34A" fill="url(#finRevG)" strokeWidth={2}/>
                <Area type="monotone" dataKey="cost" stroke="#DC2626" fill="none" strokeWidth={2} strokeDasharray="4 2"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.gray800, marginBottom:16 }}>Aylık Kar</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={FINANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                <XAxis dataKey="month" tick={{ fontSize:10, fill:T.gray400 }}/>
                <YAxis tick={{ fontSize:10, fill:T.gray400 }} tickFormatter={v=>`₺${Math.round(v/1000)}K`}/>
                <Tooltip formatter={(v:number)=>[`₺${v.toLocaleString('tr-TR')}`, 'Kar']}/>
                <Bar dataKey="profit" fill="#7C3AED" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab==='transactions' && (
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:T.gray50 }}>
                {['ID','Açıklama','Tutar','Tarih','Durum'].map(h=>(
                  <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map(t=>(
                <tr key={t.id} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                  <td style={{ padding:'11px 14px', fontSize:11.5, color:T.gray400, fontFamily:'monospace' }}>{t.id}</td>
                  <td style={{ padding:'11px 14px', fontSize:13, color:T.gray800 }}>{t.desc}</td>
                  <td style={{ padding:'11px 14px', fontSize:13, fontWeight:800, color:t.type==='income'?'#16A34A':'#DC2626' }}>
                    {t.type==='income'?'+':'-'}{fmt(t.amount)}
                  </td>
                  <td style={{ padding:'11px 14px', fontSize:12, color:T.gray400 }}>{t.date}</td>
                  <td style={{ padding:'11px 14px' }}>
                    <span style={{ fontSize:11, fontWeight:700, color:'#16A34A', background:'#F0FDF4', padding:'3px 8px', borderRadius:99 }}>Onayldı</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab==='tax' && (
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:24 }}>
          <div style={{ fontSize:15, fontWeight:700, color:T.gray900, marginBottom:16 }}>Vergi Özeti — 2026</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
            {[
              { l:'KDV Toplamı (YTD)', v:'₺201.800', c:'#D97706' },
              { l:'Kurumlar Vergisi (Tahm.)', v:'₺289.440', c:'#DC2626' },
              { l:'Damga Vergisi', v:'₺18.400', c:'#2563EB' },
            ].map((s,i)=>(
              <div key={i} style={{ background:T.gray50, borderRadius:12, padding:'18px 20px' }}>
                <div style={{ fontSize:11, color:T.gray400, marginBottom:8 }}>{s.l}</div>
                <div style={{ fontSize:22, fontWeight:900, color:s.c }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
