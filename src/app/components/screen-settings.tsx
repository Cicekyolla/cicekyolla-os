// CICEKYOLLA OS — Settings Center
import { useState } from 'react';
import { Settings, Bell, Globe, Shield, CreditCard, Truck, Zap, Save, Check, ToggleLeft, ToggleRight } from 'lucide-react';
import { T } from './ui-kit';

type SettingsTab = 'general'|'notifications'|'integrations'|'billing'|'delivery'|'security';

const TABS: { id:SettingsTab; icon:any; label:string }[] = [
  { id:'general',       icon:Settings,  label:'Genel Ayarlar'      },
  { id:'notifications', icon:Bell,       label:'Bildirimler'        },
  { id:'integrations',  icon:Zap,        label:'Entegrasyonlar'     },
  { id:'billing',       icon:CreditCard, label:'Fatura & Ödeme'     },
  { id:'delivery',      icon:Truck,      label:'Teslimat Ayarları'  },
  { id:'security',      icon:Shield,     label:'Güvenlik'           },
];

interface ToggleRowProps { label:string; desc:string; enabled:boolean; onToggle:()=>void; }

function ToggleRow({ label, desc, enabled, onToggle }: ToggleRowProps) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderBottom:`1px solid ${T.gray50}` }}>
      <div>
        <div style={{ fontSize:13, fontWeight:600, color:T.gray800 }}>{label}</div>
        <div style={{ fontSize:11.5, color:T.gray400, marginTop:2 }}>{desc}</div>
      </div>
      <button onClick={onToggle} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
        {enabled
          ? <ToggleRight style={{ width:32, height:32, color:'#16A34A' }}/>
          : <ToggleLeft  style={{ width:32, height:32, color:T.gray300 }}/>}
      </button>
    </div>
  );
}

export function ScreenSettings() {
  const [tab, setTab] = useState<SettingsTab>('general');
  const [saved, setSaved] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'Cicekyolla',
    storeUrl: 'cicekyolla.com',
    phone: '0850 XXX XX XX',
    email: 'info@cicekyolla.com',
    address: 'Levent, İstanbul',
    currency: 'TRY',
    timezone: 'Europe/Istanbul',
    language: 'tr',
  });

  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderDelivered: true,
    lowStock: true,
    customerReview: true,
    dailySummary: true,
    whatsappAlerts: true,
    smsAlerts: false,
    emailDigest: true,
  });

  const [delivery, setDelivery] = useState({
    sameDayEnabled: true,
    expressEnabled: true,
    nightDelivery: true,
    freeShippingThreshold: 500,
    standardDeliveryCost: 29,
    expressDeliveryCost: 149,
  });

  const INTEGRATIONS = [
    { name:'iyzico Ödeme Sistemi', status:'connected', color:'#16A34A', desc:'SSL şifreli ödeme altyapısı' },
    { name:'WhatsApp Business API', status:'connected', color:'#25D366', desc:'Otomatik bildirim ve sipariş' },
    { name:'Google Search Console', status:'connected', color:'#4285F4', desc:'SEO performansı izleme' },
    { name:'Google Analytics 4', status:'connected', color:'#E37400', desc:'Ziyaretçi analitikleri' },
    { name:'Google Ads', status:'connected', color:'#4285F4', desc:'Reklam kampanya yönetimi' },
    { name:'Meta Business Suite', status:'connected', color:'#1877F2', desc:'Facebook & Instagram reklamları' },
    { name:'Kargo API (Yurtıçi Kargo)', status:'connected', color:'#16A34A', desc:'Otomatik kargo takip' },
    { name:'E-Arşiv Fatura (GIB)', status:'connected', color:'#DC2626', desc:'Resmi e-fatura entegrasyonu' },
    { name:'Mailchimp', status:'pending', color:'#D97706', desc:'E-posta kampanya yönetimi' },
    { name:'Hotjar', status:'disconnected', color:T.gray400, desc:'Kullanıcı davranışı analizi' },
  ];

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', height:'100%', overflow:'hidden' }}>
      {/* Sidebar */}
      <div style={{ background:'#fff', borderRight:`1px solid ${T.gray100}`, overflowY:'auto', padding:'16px 8px' }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ width:'100%', display:'flex', alignItems:'center', gap:9, padding:'10px 12px', borderRadius:9, border:'none', cursor:'pointer', marginBottom:3, background:tab===t.id?'#EDE9FE':'transparent', color:tab===t.id?'#7C3AED':T.gray600, fontWeight:tab===t.id?600:400, fontSize:13, textAlign:'left', transition:'all 0.12s' }}>
            <t.icon style={{ width:15, height:15, flexShrink:0 }}/>{t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ overflowY:'auto', padding:'28px 32px' }}>
        {/* General */}
        {tab==='general' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <div><h2 style={{ fontSize:18, fontWeight:900, color:T.gray900, margin:0 }}>Genel Ayarlar</h2><p style={{ fontSize:13, color:T.gray400, margin:'4px 0 0' }}>Mağaza bilgileri ve temel yapılandırma</p></div>
              <button onClick={handleSave} style={{ padding:'9px 20px', border:'none', borderRadius:9, background:saved?'#16A34A':'#7C3AED', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6, transition:'background 0.2s' }}>
                {saved?<Check style={{ width:14, height:14 }}/>:<Save style={{ width:14, height:14 }}/>}{saved?'Kaydedildi':'Kaydet'}
              </button>
            </div>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'24px 28px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
                {[
                  { key:'storeName', label:'Mağaza Adı', placeholder:'Cicekyolla' },
                  { key:'storeUrl', label:'Web Sitesi', placeholder:'cicekyolla.com' },
                  { key:'phone', label:'Telefon', placeholder:'0850 XXX XX XX' },
                  { key:'email', label:'E-posta', placeholder:'info@cicekyolla.com' },
                ].map(f=>(
                  <div key={f.key}>
                    <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>{f.label}</label>
                    <input value={generalSettings[f.key as keyof typeof generalSettings]} onChange={e=>setGeneralSettings(s=>({...s,[f.key]:e.target.value}))} placeholder={f.placeholder} style={{ width:'100%', height:40, padding:'0 12px', border:`1.5px solid ${T.gray200}`, borderRadius:9, fontSize:13, outline:'none', color:T.gray800, boxSizing:'border-box' }}
                      onFocus={e=>e.target.style.borderColor='#7C3AED'}
                      onBlur={e=>e.target.style.borderColor=T.gray200}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {tab==='notifications' && (
          <div>
            <h2 style={{ fontSize:18, fontWeight:900, color:T.gray900, margin:'0 0 20px' }}>Bildirim Ayarları</h2>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'4px 24px' }}>
              <ToggleRow label="Yeni Sipariş Bildirimi" desc="Her yeni siparişte anlık bildirim" enabled={notifications.newOrder} onToggle={()=>setNotifications(n=>({...n,newOrder:!n.newOrder}))}/>
              <ToggleRow label="Teslim Bildirimi" desc="Sipariş teslim edildiğinde bildirim" enabled={notifications.orderDelivered} onToggle={()=>setNotifications(n=>({...n,orderDelivered:!n.orderDelivered}))}/>
              <ToggleRow label="Düşük Stok Uyarısı" desc="Stok kritik seviyede bildirim" enabled={notifications.lowStock} onToggle={()=>setNotifications(n=>({...n,lowStock:!n.lowStock}))}/>
              <ToggleRow label="Müşteri Yorumu" desc="Yeni yorum geldiğinde bildirim" enabled={notifications.customerReview} onToggle={()=>setNotifications(n=>({...n,customerReview:!n.customerReview}))}/>
              <ToggleRow label="Günlük Özet" desc="Her sabah günlük rapor e-postası" enabled={notifications.dailySummary} onToggle={()=>setNotifications(n=>({...n,dailySummary:!n.dailySummary}))}/>
              <ToggleRow label="WhatsApp Bildirimleri" desc="Önemli olaylar için WA mesajı" enabled={notifications.whatsappAlerts} onToggle={()=>setNotifications(n=>({...n,whatsappAlerts:!n.whatsappAlerts}))}/>
              <ToggleRow label="SMS Bildirimleri" desc="Kurye olayları için SMS" enabled={notifications.smsAlerts} onToggle={()=>setNotifications(n=>({...n,smsAlerts:!n.smsAlerts}))}/>
            </div>
          </div>
        )}

        {/* Integrations */}
        {tab==='integrations' && (
          <div>
            <h2 style={{ fontSize:18, fontWeight:900, color:T.gray900, margin:'0 0 20px' }}>Entegrasyonlar</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {INTEGRATIONS.map(integration=>(
                <div key={integration.name} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:T.gray900 }}>{integration.name}</div>
                    <div style={{ fontSize:12, color:T.gray400, marginTop:2 }}>{integration.desc}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:11.5, fontWeight:700, color:integration.status==='connected'?integration.color:integration.status==='pending'?'#D97706':T.gray400, background:integration.status==='connected'?`${integration.color}15`:integration.status==='pending'?'#FFFBEB':T.gray100, padding:'4px 10px', borderRadius:99 }}>
                      {integration.status==='connected'?'✓ Bağlı':integration.status==='pending'?'Bekliyor':'İki'}                    ğl Yok
                    </span>
                    <button style={{ padding:'6px 14px', border:`1px solid ${T.gray200}`, borderRadius:8, background:'#fff', fontSize:12, cursor:'pointer' }}>
                      {integration.status==='connected'?'Yönet':'Bağla'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delivery */}
        {tab==='delivery' && (
          <div>
            <h2 style={{ fontSize:18, fontWeight:900, color:T.gray900, margin:'0 0 20px' }}>Teslimat Ayarları</h2>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'4px 24px', marginBottom:20 }}>
              <ToggleRow label="Aynı Gün Teslimat" desc="14:00'e kadar siparişlerde aktif" enabled={delivery.sameDayEnabled} onToggle={()=>setDelivery(d=>({...d,sameDayEnabled:!d.sameDayEnabled}))}/>
              <ToggleRow label="Ekspres Teslimat" desc="60-90 dakika ekspres hizmet" enabled={delivery.expressEnabled} onToggle={()=>setDelivery(d=>({...d,expressEnabled:!d.expressEnabled}))}/>
              <ToggleRow label="Gece Teslimatı" desc="19:00-23:00 arası teslimat" enabled={delivery.nightDelivery} onToggle={()=>setDelivery(d=>({...d,nightDelivery:!d.nightDelivery}))}/>
            </div>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'20px 24px' }}>
              <div style={{ fontSize:14, fontWeight:700, color:T.gray800, marginBottom:16 }}>Fiyatlandırma</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 }}>
                {[
                  { label:'Ücretsiz Kargo Eşiği (₺)', key:'freeShippingThreshold', value:delivery.freeShippingThreshold },
                  { label:'Standart Teslimat (₺)', key:'standardDeliveryCost', value:delivery.standardDeliveryCost },
                  { label:'Ekspres Teslimat (₺)', key:'expressDeliveryCost', value:delivery.expressDeliveryCost },
                ].map(f=>(
                  <div key={f.key}>
                    <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6 }}>{f.label}</label>
                    <input type="number" defaultValue={f.value} style={{ width:'100%', height:40, padding:'0 12px', border:`1.5px solid ${T.gray200}`, borderRadius:9, fontSize:13, outline:'none', boxSizing:'border-box' }}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security */}
        {tab==='security' && (
          <div>
            <h2 style={{ fontSize:18, fontWeight:900, color:T.gray900, margin:'0 0 20px' }}>Güvenlik</h2>
            <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:'24px 28px', marginBottom:16 }}>
              <div style={{ fontSize:14, fontWeight:700, color:T.gray800, marginBottom:16 }}>Parola Değiştir</div>
              {[{l:'Mevcut Parola',ph:'**********'},{l:'Yeni Parola',ph:'En az 8 karakter'},{l:'Parola Tekrar',ph:'Aynı parolayı girin'}].map(f=>(
                <div key={f.l} style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11.5, fontWeight:700, color:T.gray500, display:'block', marginBottom:6 }}>{f.l}</label>
                  <input type="password" placeholder={f.ph} style={{ width:'100%', height:40, padding:'0 12px', border:`1.5px solid ${T.gray200}`, borderRadius:9, fontSize:13, outline:'none', boxSizing:'border-box' }}/>
                </div>
              ))}
              <button style={{ padding:'10px 24px', border:'none', borderRadius:9, background:'#7C3AED', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' }}>Parolayı Güncelle</button>
            </div>
            <div style={{ background:'#EFF6FF', borderRadius:12, border:'1px solid #BFDBFE', padding:'16px 20px' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#1D4ED8', marginBottom:4 }}>🔒 Güvenlik Durumu: İyi</div>
              <div style={{ fontSize:12.5, color:'#2563EB' }}>SSL sertifikası aktif • 2FA etkin • Son oturum: Az önce</div>
            </div>
          </div>
        )}

        {tab==='billing' && (
          <div style={{ background:'#fff', borderRadius:14, border:`1px solid ${T.gray200}`, padding:24 }}>
            <h2 style={{ fontSize:18, fontWeight:900, color:T.gray900, margin:'0 0 16px' }}>Fatura & Ödeme</h2>
            <div style={{ background:'linear-gradient(135deg,#EDE9FE,#fff)', borderRadius:12, padding:'20px 24px', marginBottom:20 }}>
              <div style={{ fontSize:12, color:'#7C3AED', fontWeight:700, marginBottom:4 }}>ENTERPRISE PLAN</div>
              <div style={{ fontSize:22, fontWeight:900, color:'#4C1D95' }}>₺4.999 / ay</div>
              <div style={{ fontSize:12.5, color:'#6D28D9', marginTop:4 }}>Tüm modüller dahil • Sınırsız sipariş • 7/24 destek</div>
            </div>
            <div style={{ fontSize:13, color:T.gray500 }}>Bir sonraki fatura tarihi: 1 Temmuz 2026</div>
          </div>
        )}
      </div>
    </div>
  );
}
