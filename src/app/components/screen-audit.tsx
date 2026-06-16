// CICEKYOLLA OS — Completion Audit Report
import { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { T } from './ui-kit';

type Status = 'done' | 'partial' | 'missing';

interface AuditItem { label: string; status: Status; note?: string; }
interface AuditModule { module: string; phase: string; items: AuditItem[]; }

const AUDIT_DATA: AuditModule[] = [
  {
    module: 'Anasayfa', phase: 'Phase 1 — LOCKED',
    items: [
      { label: '100vh Hero bölümü', status:'done' },
      { label: 'Yapışkan kategori carousel', status:'done' },
      { label: 'WhatsApp CTA butonu', status:'done' },
      { label: 'Aynı Gün Teslimat bölümü', status:'done' },
      { label: 'Google yorumlar bölümü', status:'done' },
      { label: 'Homepage Admin (öte yüz)', status:'done' },
      { label: 'SEO meta tags', status:'done' },
    ],
  },
  {
    module: 'Ürün Sayfası', phase: 'Phase 2 — LOCKED',
    items: [
      { label: '5 görsel galeri', status:'done' },
      { label: 'Zoom modal', status:'done' },
      { label: 'Swipe desteği', status:'done' },
      { label: 'Video & 360° mod', status:'done' },
      { label: '5 sekme (açıklama/bakım/teslimat)', status:'done' },
      { label: 'FBT & upsell bölümü', status:'done' },
      { label: 'SEO schema (Product JSON-LD)', status:'done' },
      { label: 'Products store bağlantısı', status:'done' },
    ],
  },
  {
    module: 'Yapay Çiçek Merkezi', phase: 'Phase 3 — LOCKED',
    items: [
      { label: '100vh hero (dönen sloganlar)', status:'done' },
      { label: 'Öncesi/Sonrası galeri', status:'done' },
      { label: '360° sanal turlar', status:'done' },
      { label: 'Referans firma duvarı', status:'done' },
      { label: 'Teklif formu', status:'done' },
      { label: 'Admin panel (16 modül)', status:'done' },
    ],
  },
  {
    module: 'Türkiye Kargo Merkezi', phase: 'Phase 4 — LOCKED',
    items: [
      { label: '81 il teslimat hesaplayıcı', status:'done' },
      { label: 'En çok satan ürünler', status:'done' },
      { label: 'Kurumsal hediye bölümü', status:'done' },
      { label: '8 katagori filtresi', status:'done' },
      { label: 'Kargo Admin (8 modül)', status:'done' },
    ],
  },
  {
    module: 'CRM Merkezi', phase: 'Phase 5 — LOCKED',
    items: [
      { label: 'Müşteri analitik görünümü', status:'done' },
      { label: 'Doğum günü/yıldönümü motoru', status:'done' },
      { label: 'Master görev listesi', status:'done' },
      { label: 'CRM frontend (hesabım sayfası)', status:'done' },
      { label: 'Sadakat puan sistemi (frontend)', status:'done' },
    ],
  },
  {
    module: 'SEO Merkezi', phase: 'Phase 6 — LOCKED',
    items: [
      { label: 'Meta yöneticisi', status:'done' },
      { label: 'Schema builder', status:'done' },
      { label: 'Yönlendirme yöneticisi', status:'done' },
      { label: 'Şehir sayfaları (4 şehir)', status:'done' },
      { label: 'Blog yöneticisi', status:'done' },
      { label: 'SEO raporları', status:'done' },
    ],
  },
  {
    module: 'Checkout Revenue Engine', phase: 'Phase 7 — LOCKED',
    items: [
      { label: '5 adımlı premium checkout', status:'done' },
      { label: 'Çikolata & peluş upsell', status:'done' },
      { label: 'Vazo yükseltme', status:'done' },
      { label: 'Paket teklifleri (5 bundle)', status:'done' },
      { label: 'Hediye notu şablonları', status:'done' },
      { label: 'Canlı sosyal kanıt sayıcı', status:'done' },
      { label: 'AOV ilerleme çubuğu', status:'done' },
      { label: 'Checkout Analytics (6 modül)', status:'done' },
    ],
  },
  {
    module: 'Mobil Optimizasyon', phase: 'Phase 8 — LOCKED',
    items: [
      { label: 'useResponsive hook', status:'done' },
      { label: 'Checkout mobil layout', status:'done' },
      { label: 'Kargo sayfası mobil grid', status:'done' },
      { label: 'Kategori sayfası mobil sidebar', status:'done' },
      { label: 'Global overflow-x engel', status:'done' },
      { label: 'Touch tap highlight kapalı', status:'done' },
    ],
  },
];

const STATUS_ICON = {
  done:    { icon: CheckCircle2, color:'#16A34A', bg:'#F0FDF4' },
  partial: { icon: AlertCircle, color:'#D97706', bg:'#FFFBEB' },
  missing: { icon: XCircle, color:'#DC2626', bg:'#FEF2F2' },
};

export function ScreenAudit() {
  const [open, setOpen] = useState<string[]>(AUDIT_DATA.map(a => a.module));

  const total = AUDIT_DATA.flatMap(a => a.items).length;
  const done = AUDIT_DATA.flatMap(a => a.items).filter(i => i.status==='done').length;
  const score = Math.round((done/total)*100);

  const toggle = (module: string) => setOpen(prev => prev.includes(module) ? prev.filter(m=>m!==module) : [...prev, module]);

  return (
    <div style={{ padding:'24px 28px', maxWidth:1000, margin:'0 auto' }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:24, fontWeight:900, color:T.gray900, margin:'0 0 4px', letterSpacing:'-0.03em' }}>Tamamlanma Raporu</h1>
        <p style={{ fontSize:13, color:T.gray400, margin:0 }}>CICEKYOLLA OS — 8 Phase Build Audit</p>
      </div>

      {/* Score card */}
      <div style={{ background:'linear-gradient(135deg,#F0FDF4,#fff)', border:'2px solid #86EFAC', borderRadius:16, padding:'24px 28px', marginBottom:24, display:'flex', alignItems:'center', gap:24 }}>
        <div style={{ width:80, height:80, borderRadius:'50%', background:`linear-gradient(135deg,#16A34A,#15803D)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 8px 24px rgba(22,163,74,0.35)' }}>
          <span style={{ fontSize:24, fontWeight:900, color:'#fff' }}>{score}%</span>
        </div>
        <div>
          <div style={{ fontSize:20, fontWeight:900, color:'#166534', letterSpacing:'-0.02em' }}>CICEKYOLLA OS Build Tamamlandı!</div>
          <div style={{ fontSize:13, color:'#16A34A', marginTop:4 }}>{done}/{total} özellik aktif • 8 phase kilitli • Türkiye\'nin en ileri çiçek platformu</div>
        </div>
      </div>

      {/* Module list */}
      {AUDIT_DATA.map(module => {
        const moduleDone = module.items.filter(i=>i.status==='done').length;
        const isOpen = open.includes(module.module);
        return (
          <div key={module.module} style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, marginBottom:12, overflow:'hidden' }}>
            <button onClick={()=>toggle(module.module)} style={{ width:'100%', padding:'14px 20px', border:'none', background:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:12, textAlign:'left' }}>
              <CheckCircle2 style={{ width:18, height:18, color:'#16A34A', flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800, color:T.gray900 }}>{module.module}</div>
                <div style={{ fontSize:11.5, color:T.gray400, marginTop:1 }}>{module.phase} • {moduleDone}/{module.items.length} tamamlandı</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ height:5, width:80, borderRadius:99, background:T.gray100, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${(moduleDone/module.items.length)*100}%`, background:'#16A34A', borderRadius:99 }}/>
                </div>
                {isOpen ? <ChevronUp style={{ width:15, height:15, color:T.gray400 }}/> : <ChevronDown style={{ width:15, height:15, color:T.gray400 }}/>}
              </div>
            </button>
            {isOpen && (
              <div style={{ padding:'4px 20px 16px 52px', borderTop:`1px solid ${T.gray100}` }}>
                {module.items.map(item => {
                  const cfg = STATUS_ICON[item.status];
                  return (
                    <div key={item.label} style={{ display:'flex', alignItems:'center', gap:10, padding:'6px 0', borderBottom:`1px solid ${T.gray50}` }}>
                      <cfg.icon style={{ width:14, height:14, color:cfg.color, flexShrink:0 }}/>
                      <span style={{ fontSize:13, color:T.gray700 }}>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
