// CICEKYOLLA OS — User Management
import { useState } from 'react';
import { Plus, Edit, Trash2, Check, Shield } from 'lucide-react';
import { T } from './ui-kit';

const USERS = [
  { id:1, name:'Ahmet Yılmaz', email:'ahmet@cicekyolla.com', role:'Super Admin', status:'active', lastLogin:'Az önce', modules:['Tüm Modüller'] },
  { id:2, name:'Fatma Şahin', email:'fatma@cicekyolla.com', role:'Sipariş Yöneticisi', status:'active', lastLogin:'2 saat önce', modules:['Siparişler','CRM','Teslimat'] },
  { id:3, name:'Mehmet Kılıç', email:'mehmet@cicekyolla.com', role:'Florist', status:'active', lastLogin:'Dün', modules:['Siparişler','Ürünler'] },
  { id:4, name:'Ayşe Demir', email:'ayse@cicekyolla.com', role:'SEO Uzmanı', status:'active', lastLogin:'3 saat önce', modules:['SEO','Blog','Raporlar'] },
  { id:5, name:'Can Arslan', email:'can@cicekyolla.com', role:'Kurye Koordinatörü', status:'inactive', lastLogin:'1 hafta önce', modules:['Teslimat','Kuryeler'] },
];

const ROLES = ['Super Admin','Sipariş Yöneticisi','Florist','SEO Uzmanı','Kurye Koordinatörü','Muhasebe'];

export function ScreenUsers() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div style={{ padding:'24px 28px', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:900, color:T.gray900, margin:0 }}>Kullanıcı Yönetimi</h1>
          <p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>{USERS.filter(u=>u.status==='active').length} aktif kullanıcı</p>
        </div>
        <button onClick={()=>setShowAdd(s=>!s)} style={{ padding:'9px 16px', border:'none', borderRadius:9, background:'#7C3AED', color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <Plus style={{ width:13, height:13 }}/> Kullanıcı Davet Et
        </button>
      </div>

      <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.gray50 }}>
              {['Kullanıcı','Rol','Durum','Son Giriş','Modüller',''].map(h=>(
                <th key={h} style={{ padding:'10px 14px', fontSize:10.5, fontWeight:700, color:T.gray400, textAlign:'left', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:`1px solid ${T.gray100}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USERS.map(u=>(
              <tr key={u.id} style={{ borderBottom:`1px solid ${T.gray50}` }}>
                <td style={{ padding:'12px 14px' }}>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#7C3AED,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'#fff', flexShrink:0 }}>{u.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{u.name}</div>
                      <div style={{ fontSize:11, color:T.gray400 }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <span style={{ fontSize:11.5, fontWeight:600, color:u.role==='Super Admin'?'#7C3AED':T.gray600, display:'flex', alignItems:'center', gap:4 }}>
                    {u.role==='Super Admin' && <Shield style={{ width:12, height:12 }}/>}{u.role}
                  </span>
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:u.status==='active'?'#16A34A':'#D97706', background:u.status==='active'?'#F0FDF4':'#FFFBEB', padding:'3px 9px', borderRadius:99 }}>
                    {u.status==='active'?'Aktif':'Pasif'}
                  </span>
                </td>
                <td style={{ padding:'12px 14px', fontSize:12, color:T.gray400 }}>{u.lastLogin}</td>
                <td style={{ padding:'12px 14px' }}>
                  <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                    {u.modules.slice(0,2).map(m=>(
                      <span key={m} style={{ fontSize:10, color:T.gray500, background:T.gray100, padding:'2px 7px', borderRadius:99 }}>{m}</span>
                    ))}
                    {u.modules.length>2 && <span style={{ fontSize:10, color:T.gray400 }}>+{u.modules.length-2}</span>}
                  </div>
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <div style={{ display:'flex', gap:6 }}>
                    <button style={{ width:28, height:28, borderRadius:7, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Edit style={{ width:12, height:12, color:T.gray400 }}/></button>
                    {u.role!=='Super Admin' && <button style={{ width:28, height:28, borderRadius:7, border:`1px solid ${T.gray200}`, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Trash2 style={{ width:12, height:12, color:'#DC2626' }}/></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
