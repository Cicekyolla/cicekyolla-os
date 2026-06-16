// CICEKYOLLA OS — Delivery Engine
// Full 25KB source: github.com/Cicekyolla/cicekyolla-os
import { useState } from 'react';
import { MapPin, Truck, Clock, Plus, Edit, ToggleLeft, ToggleRight, Check } from 'lucide-react';
import { T } from './ui-kit';

const ZONES = [
  { id:'z1', name:'Merkez İstanbul', districts:['Kadıköy','Beşiktaş','Şişli','Beyoğlu','Sarıyer'], deliveryTime:60, fee:29, freeAt:400, active:true, express:true, night:true },
  { id:'z2', name:'Asya Yakası', districts:['Ataşehir','Úsküdar','Maltepe','Kartal','Pendik','Umraniye'], deliveryTime:90, fee:35, freeAt:500, active:true, express:true, night:false },
  { id:'z3', name:'Avrupa Yakası Uzak', districts:['Bakırköy','Bahcelievler','Güngören','Bağcılar','Avar'], deliveryTime:90, fee:35, freeAt:500, active:true, express:false, night:false },
  { id:'z4', name:'Anadolu Uzak', districts:['Tuzla','Sultanbeyli','Sancaktepe','Sultanbeyli'], deliveryTime:120, fee:45, freeAt:600, active:true, express:false, night:false },
];

const TIME_SLOTS = [
  { id:'ts1', label:'10:00 – 12:00', capacity:20, booked:12, active:true },
  { id:'ts2', label:'12:00 – 14:00', capacity:25, booked:18, active:true },
  { id:'ts3', label:'14:00 – 16:00', capacity:30, booked:24, active:true },
  { id:'ts4', label:'16:00 – 18:00', capacity:25, booked:8, active:true },
  { id:'ts5', label:'18:00 – 20:00', capacity:20, booked:4, active:true },
  { id:'ts6', label:'20:00 – 22:00', capacity:15, booked:2, active:true },
];

const TODAY_STATS = {
  totalDeliveries: 87,
  completed: 54,
  inProgress: 18,
  pending: 15,
  onTime: 51,
  delayed: 3,
  avgTime: 68,
};

export function ScreenDelivery({ navigate, params }: { navigate?: (s:any,p?:any)=>void; params?: any }) {
  const [tab, setTab] = useState<'overview'|'zones'|'timeslots'|'tracking'>('overview');
  const [zones, setZones] = useState(ZONES);
  const [slots, setSlots] = useState(TIME_SLOTS);

  function toggleZone(id: string) { setZones(z => z.map(x => x.id===id ? {...x, active:!x.active} : x)); }
  function toggleSlot(id: string) { setSlots(s => s.map(x => x.id===id ? {...x, active:!x.active} : x)); }

  const fmt = (n: number) => '₺' + n.toLocaleString('tr-TR');

  return (
    <div style={{ padding:'24px 28px', maxWidth:1200, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Teslimat Motoru</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>Teslimat bölgeleri, saatler ve canlı takip</p>
        </div>
        <button style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#16A34A', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Plus style={{ width:13, height:13 }}/> Yeni Bölge
        </button>
      </div>

      {/* KPI row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Toplam Teslimat', value:TODAY_STATS.totalDeliveries, color:'#7C3AED', emoji:'🚚' },
          { label:'Tamamlanan', value:TODAY_STATS.completed, color:'#16A34A', emoji:'✅' },
          { label:'Devam Eden', value:TODAY_STATS.inProgress, color:'#2563EB', emoji:'🔄' },
          { label:'Bekleyen', value:TODAY_STATS.pending, color:'#D97706', emoji:'⏳' },
          { label:'Ort. Süre (dk)', value:TODAY_STATS.avgTime, color:'#0891B2', emoji:'⏱️' },
        ].map((s,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 18px' }}>
            <div style={{ fontSize:10.5, fontWeight:700, color:T.gray400, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>{s.label}</div>
            <div style={{ fontSize:24, fontWeight:900, color:s.color }}>{s.emoji} {s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, marginBottom:20, background:T.gray100, borderRadius:10, padding:4, width:'fit-content' }}>
        {(['overview','zones','timeslots','tracking'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ padding:'7px 16px', border:'none', borderRadius:8, background:tab===t?'#fff':'transparent', fontSize:12.5, fontWeight:tab===t?700:400, color:tab===t?T.gray900:T.gray500, cursor:'pointer', transition:'all 0.15s', boxShadow:tab===t?'0 1px 4px rgba(0,0,0,0.08)':'none' }}>
            {t==='overview'?'Genel Bakış':t==='zones'?'Teslimat Bölgeleri':t==='timeslots'?'Saat Dilimleri':'Canlı Takip'}
          </button>
        ))}
      </div>

      {tab==='overview' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
            <div style={{ fontSize:14, fontWeight:700, color:T.gray800, marginBottom:16 }}>Bugunkü Teslimat Durumu</div>
            {[
              { label:'Zamanında Teslim', v:TODAY_STATS.onTime, total:TODAY_STATS.completed, color:'#16A34A' },
              { label:'Gecikmeli', v:TODAY_STATS.delayed, total:TODAY_STATS.completed, color:'#DC2626' },
            ].map((s,i)=>(
              <div key={i} style={{ marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:12.5, color:T.gray600 }}>{s.label}</span>
                  <span style={{ fontSize:12.5, fontWeight:700, color:s.color }}>{s.v} / {s.total}</span>
                </div>
                <div style={{ height:8, borderRadius:99, background:T.gray100, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${(s.v/s.total)*100}%`, background:s.color, borderRadius:99 }}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
            <div style={{ fontSize:14, fontWeight:700, color:T.gray800, marginBottom:16 }}>Aktif Bölgeler</div>
            {zones.filter(z=>z.active).map(z=>(
              <div key={z.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${T.gray50}` }}>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <MapPin style={{ width:13, height:13, color:'#16A34A' }}/>
                  <span style={{ fontSize:12.5, color:T.gray700 }}>{z.name}</span>
                </div>
                <div style={{ fontSize:12, color:T.gray400 }}>{z.deliveryTime} dk • {fmt(z.fee)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='zones' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {zones.map(zone=>(
            <div key={zone.id} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'18px 20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                    <div style={{ fontSize:15, fontWeight:800, color:T.gray900 }}>{zone.name}</div>
                    {zone.express && <span style={{ fontSize:10, fontWeight:700, color:'#7C3AED', background:'#EDE9FE', padding:'2px 8px', borderRadius:99 }}>Ekspres</span>}
                    {zone.night && <span style={{ fontSize:10, fontWeight:700, color:'#0891B2', background:'#ECFEFF', padding:'2px 8px', borderRadius:99 }}>Gece</span>}
                  </div>
                  <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:10 }}>
                    {zone.districts.map(d=>(
                      <span key={d} style={{ fontSize:11, color:T.gray500, background:T.gray100, padding:'2px 8px', borderRadius:99 }}>{d}</span>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:20 }}>
                    <span style={{ fontSize:12, color:T.gray500 }}><Clock style={{ width:11, height:11, display:'inline', marginRight:4 }}/>{zone.deliveryTime} dk</span>
                    <span style={{ fontSize:12, color:T.gray500 }}><Truck style={{ width:11, height:11, display:'inline', marginRight:4 }}/>{fmt(zone.fee)}</span>
                    <span style={{ fontSize:12, color:'#16A34A' }}>Ücretsiz: {fmt(zone.freeAt)}+</span>
                  </div>
                </div>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <button style={{ width:30, height:30, borderRadius:7, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Edit style={{ width:13, height:13 }}/></button>
                  <button onClick={()=>toggleZone(zone.id)} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
                    {zone.active
                      ? <ToggleRight style={{ width:30, height:30, color:'#16A34A' }}/>
                      : <ToggleLeft  style={{ width:30, height:30, color:T.gray300 }}/>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==='timeslots' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
          {slots.map(slot=>{
            const pct = Math.round((slot.booked/slot.capacity)*100);
            const isFull = slot.booked >= slot.capacity;
            return (
              <div key={slot.id} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:18 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:T.gray900 }}>{slot.label}</div>
                  <button onClick={()=>toggleSlot(slot.id)} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
                    {slot.active ? <ToggleRight style={{ width:26, height:26, color:'#16A34A' }}/> : <ToggleLeft style={{ width:26, height:26, color:T.gray300 }}/>}
                  </button>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <span style={{ fontSize:12, color:T.gray500 }}>{slot.booked}/{slot.capacity} sipariş</span>
                  <span style={{ fontSize:12, fontWeight:700, color:isFull?'#DC2626':pct>70?'#D97706':'#16A34A' }}>{isFull?'Dolu':`%${pct}`}</span>
                </div>
                <div style={{ height:6, borderRadius:99, background:T.gray100, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:isFull?'#DC2626':pct>70?'#D97706':'#16A34A', borderRadius:99 }}/>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab==='tracking' && (
        <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:24, textAlign:'center' }}>
          <Truck style={{ width:48, height:48, color:T.gray300, margin:'0 auto 12px' }}/>
          <div style={{ fontSize:15, fontWeight:600, color:T.gray500 }}>Canlı harita entegrasyonu</div>
          <div style={{ fontSize:13, color:T.gray400, marginTop:6 }}>Google Maps API bağlantısı aktif edildiğinde gösterilecek</div>
        </div>
      )}
    </div>
  );
}
