// CICEKYOLLA OS — Generic placeholder screen
import { Construction } from 'lucide-react';
import type { NavScreen } from './dashboard-sidebar';

export function ScreenGeneric({ screen }: { screen: NavScreen }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:16, color:'#9CA3AF' }}>
      <Construction style={{ width:48, height:48 }}/>
      <div style={{ fontSize:16, fontWeight:700, color:'#6B7280' }}>{screen} — Yapım Aşamasında</div>
      <div style={{ fontSize:13, color:'#9CA3AF' }}>Bu modül çok yakında aktif olacak.</div>
    </div>
  );
}
