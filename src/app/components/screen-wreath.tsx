// CICEKYOLLA OS — Wreath Print Center
import { useState } from 'react';
import { Printer, Plus, Edit, Check, X, Search, Clock } from 'lucide-react';
import { T } from './ui-kit';

type WreathStatus = 'pending'|'designing'|'ready'|'printed'|'delivered';

const WREATHS = [
  { id:'W001', type:'Cenaze Çelengi', customer:'Ahmet Ailesi', ribbon1:'Sevgili Babamızı Kaybettik', ribbon2:'Tüm Aile Adına', size:'120cm', color:'Beyaz & Yeşil', status:'pending' as WreathStatus, date:'14 Haz', urgent:true },
  { id:'W002', type:'Açılış Çelengi', customer:'Mavi Teknoloji A.Ş.', ribbon1:'Hayırlı Olsun!', ribbon2:'Yönetim Kurulu', size:'100cm', color:'Kırmızı & Altın', status:'designing' as WreathStatus, date:'14 Haz', urgent:false },
  { id:'W003', type:'Mezuniyet Çelengi', customer:'Ayşe Kaya', ribbon1:'Tebrikler Doktor Ayşe!', ribbon2:'Ailesi Adına', size:'80cm', color:'Kırmızı & Beyaz', status:'ready' as WreathStatus, date:'15 Haz', urgent:false },
  { id:'W004', type:'Cenaze Çelengi', customer:'Demir Ailesi', ribbon1:'Başsığlığımızı Sunarız', ribbon2:'İş Arkadaşları Adına', size:'120cm', color:'Beyaz & Mor', status:'printed' as WreathStatus, date:'13 Haz', urgent:false },
  { id:'W005', type:'Açılış Çelengi', customer:'Park Rezidans', ribbon1:'Hayırlı Olsun', ribbon2:'Yönetim', size:'100cm', color:'Kırmızı & Altın', status:'delivered' as WreathStatus, date:'12 Haz', urgent:false },
];

const WREATH_TYPES = [
  { type:'Cenaze Çelengi', sizes:['80cm','100cm','120cm','150cm'], colors:['Beyaz & Yeşil','Beyaz & Mor','Beyaz & Kırmızı'] },
  { type:'Açılış Çelengi', sizes:['80cm','100cm','120cm'], colors:['Kırmızı & Altın','Kırmızı & Beyaz','Yeşil & Altın'] },
  { type:'Mezuniyet Çelengi', sizes:['60cm','80cm','100cm'], colors:['Kırmızı & Beyaz','Mor & Beyaz','Lacivert & Altın'] },
];

const STATUS_CFG: Record<WreathStatus, {l:string;c:string;bg:string}> = {
  pending:   { l:'Bekliyor',    c:'#D97706', bg:'#FFFBEB' },
  designing: { l:'Tasarım',    c:'#7C3AED', bg:'#EDE9FE' },
  ready:     { l:'Hazır',      c:'#0891B2', bg:'#ECFEFF' },
  printed:   { l:'Basıldı',    c:'#16A34A', bg:'#F0FDF4' },
  delivered: { l:'Teslim',     c:'#94A3B8', bg:'#F8FAFC' },
};

export function ScreenWreath({ navigate, params }: { navigate?:(s:any,p?:any)=>void; params?:any }) {
  const [wreaths, setWreaths] = useState(WREATHS);
  const [selected, setSelected] = useState<typeof WREATHS[0]|null>(null);
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);

  const filtered = wreaths.filter(w => !search || w.customer.toLowerCase().includes(search.toLowerCase()) || w.id.includes(search));
  const pending = wreaths.filter(w => w.status==='pending').length;
  const ready = wreaths.filter(w => w.status==='ready').length;

  function updateStatus(id: string, status: WreathStatus) {
    setWreaths(w => w.map(x => x.id===id ? {...x, status} : x));
    if (selected?.id === id) setSelected(s => s ? {...s, status} : null);
  }

  return (
    <div style={{ padding:'24px 28px', maxWidth:1200, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Çelenk Baskı Merkezi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>{pending} bekliyor • {ready} baskıya hazır</p>
        </div>
        <button onClick={()=>setShowNew(true)} style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#16A34A', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Plus style={{ width:13, height:13 }}/> Yeni Çelenk
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:24 }}>
        {Object.entries(STATUS_CFG).map(([key, cfg])=>{
          const count = wreaths.filter(w => w.status===key).length;
          return (
            <div key={key} style={{ background:'#fff', borderRadius:10, border:`1px solid ${T.gray200}`, padding:'12px 14px', textAlign:'center' }}>
              <div style={{ fontSize:18, fontWeight:900, color:cfg.c }}>{count}</div>
              <div style={{ fontSize:11, color:T.gray400 }}>{cfg.l}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:selected?'1fr 340px':'1fr', gap:20 }}>
        {/* List */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fff', border:`1px solid ${T.gray200}`, borderRadius:9, padding:'7px 12px', marginBottom:14 }}>
            <Search style={{ width:13, height:13, color:T.gray400 }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Sipariş no veya müşteri ara..." style={{ border:'none', outline:'none', fontSize:13, color:T.gray700, width:'100%' }}/>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {filtered.map(w=>{
              const cfg = STATUS_CFG[w.status];
              return (
                <div key={w.id} onClick={()=>setSelected(selected?.id===w.id?null:w)} style={{ background:'#fff', borderRadius:13, border:`2px solid ${selected?.id===w.id?'#16A34A':T.gray200}`, padding:'16px 18px', cursor:'pointer', transition:'all 0.15s', display:'flex', gap:16, alignItems:'center' }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                      <span style={{ fontSize:12, fontFamily:'monospace', fontWeight:700, color:'#7C3AED' }}>{w.id}</span>
                      {w.urgent && <span style={{ fontSize:9.5, fontWeight:800, color:'#DC2626', background:'#FEF2F2', padding:'2px 7px', borderRadius:99 }}>⚡ ACİL</span>}
                      <span style={{ fontSize:11, fontWeight:700, color:cfg.c, background:cfg.bg, padding:'2px 8px', borderRadius:99 }}>{cfg.l}</span>
                    </div>
                    <div style={{ fontSize:14, fontWeight:700, color:T.gray900, marginBottom:3 }}>{w.type}</div>
                    <div style={{ fontSize:12.5, color:T.gray600, marginBottom:6 }}>{w.customer}</div>
                    <div style={{ display:'flex', gap:10 }}>
                      <div style={{ background:T.gray50, borderRadius:7, padding:'4px 10px' }}>
                        <div style={{ fontSize:10, color:T.gray400 }}>Kurdele 1</div>
                        <div style={{ fontSize:11.5, fontWeight:600, color:T.gray700 }}>{w.ribbon1}</div>
                      </div>
                      <div style={{ background:T.gray50, borderRadius:7, padding:'4px 10px' }}>
                        <div style={{ fontSize:10, color:T.gray400 }}>Kurdele 2</div>
                        <div style={{ fontSize:11.5, fontWeight:600, color:T.gray700 }}>{w.ribbon2}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:T.gray800 }}>{w.size}</div>
                    <div style={{ fontSize:11.5, color:T.gray400 }}>{w.color}</div>
                    <div style={{ fontSize:11, color:T.gray400, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><Clock style={{ width:10, height:10 }}/>{w.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail */}
        {selected && (
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:20, height:'fit-content', position:'sticky', top:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>{selected.id}</div>
              <button onClick={()=>setSelected(null)} style={{ width:24, height:24, borderRadius:'50%', border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X style={{ width:11, height:11 }}/></button>
            </div>

            {/* Preview */}
            <div style={{ background:'linear-gradient(135deg,#F0FDF4,#DCFCE7)', borderRadius:12, padding:'20px', textAlign:'center', marginBottom:16 }}>
              <div style={{ fontSize:48, marginBottom:8 }}>💐</div>
              <div style={{ fontSize:13, fontWeight:700, color:'#166534' }}>{selected.type}</div>
              <div style={{ fontSize:11.5, color:'#16A34A', marginTop:4 }}>{selected.size} • {selected.color}</div>
              <div style={{ marginTop:12, background:'rgba(255,255,255,0.8)', borderRadius:8, padding:'8px 12px' }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#166534' }}>{selected.ribbon1}</div>
                <div style={{ fontSize:11.5, color:'#16A34A' }}>{selected.ribbon2}</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <div style={{ fontSize:11.5, fontWeight:700, color:T.gray500, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>Durum Güncelle</div>
              {(['pending','designing','ready','printed','delivered'] as WreathStatus[]).map(s=>{
                const cfg = STATUS_CFG[s];
                const isActive = selected.status===s;
                return (
                  <button key={s} onClick={()=>updateStatus(selected.id, s)} style={{ padding:'9px 14px', border:`1px solid ${isActive?cfg.c:T.gray200}`, borderRadius:8, background:isActive?cfg.bg:'#fff', fontSize:12.5, fontWeight:isActive?700:400, color:isActive?cfg.c:T.gray600, cursor:'pointer', display:'flex', alignItems:'center', gap:6, transition:'all 0.12s' }}>
                    {isActive && <Check style={{ width:12, height:12 }}/>}
                    {cfg.l}
                  </button>
                );
              })}
              {selected.status==='ready' && (
                <button style={{ padding:'10px', border:'none', borderRadius:9, background:'#7C3AED', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:4 }}>
                  <Printer style={{ width:13, height:13 }}/> Kurdeleyi Yazdır
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
