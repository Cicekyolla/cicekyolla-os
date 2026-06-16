// CICEKYOLLA OS — Dashboard Header
// Full source: github.com/Cicekyolla/cicekyolla-os
import { useState } from 'react';
import { Bell, Search, ChevronDown, Settings, LogOut, User, HelpCircle } from 'lucide-react';
import { T } from './ui-kit';
import type { NavScreen } from './dashboard-sidebar';

const SCREEN_LABELS: Partial<Record<NavScreen, string>> = {
  dashboard: 'Executive Dashboard',
  storefront: 'Mağaza Ön Yüzü',
  'sf-product': 'Ürün Detay Sayfası',
  'sf-category': 'Kategori Sayfası',
  'sf-cart': 'Sepet & Checkout Flow',
  'sf-checkout': 'Ödeme Sayfası',
  'sf-account': 'Hesabım',
  'sf-login': 'Giriş / Kayıt',
  'sf-corporate': 'Kurumsal Sayfası',
  'sf-artificial': 'Yapay Çiçek Sayfası',
  'sf-about': 'Hakkımızda',
  'sf-contact': 'İletişim',
  'sf-faq': 'SSS',
  'sf-delivery': 'Teslimat Bölgeleri',
  'sf-blog-detail': 'Blog Yazısı',
  'sf-kvkk': 'KVKK',
  'sf-contract': 'Satış Sözleşmesi',
  orders: 'Sipariş Merkezi',
  crm: 'CRM Merkezi',
  customer360: 'Müşteri 360°',
  products: 'Ürün Yönetimi',
  categories: 'Kategori Yönetimi',
  campaigns: 'Kampanya Yönetimi',
  seasonal: 'Sezonluk Yönetimi',
  delivery: 'Teslimat Motoru',
  zones: 'Teslimat Bölgeleri',
  couriers: 'Kurye Merkezi',
  routes: 'Rota Planlayıcı',
  wreath: 'Çelenk Baskı Merkezi',
  cards: 'Kart Mesaj Merkezi',
  seo: 'SEO Merkezi',
  schema: 'Schema Merkezi',
  redirects: 'Yönlendirme Merkezi',
  blog: 'Blog Merkezi',
  ai: 'AI Merkezi',
  ads: 'Google Ads Merkezi',
  meta: 'Meta Ads Merkezi',
  finance: 'Finans Merkezi',
  reports: 'Raporlar Merkezi',
  branches: 'Şube Merkezi',
  users: 'Kullanıcı Yönetimi',
  integrations: 'Entegrasyonlar',
  settings: 'Ayarlar',
  revenue: 'Revenue Optimizer',
  'checkout-analytics': 'Checkout Analytics',
  'homepage-admin': 'Homepage Admin',
  'city-istanbul': 'İstanbul Şehir Sayfası',
  'city-ankara': 'Ankara Şehir Sayfası',
  'city-izmir': 'İzmir Şehir Sayfası',
  kargo: 'Türkiye Geneli Kargo',
  'kargo-admin': 'Türkiye Kargo Merkezi',
  yapay: 'Yapay Çiçek & Dekorasyon Yönetimi',
  'yapay-store': 'Yapay Çiçek Mağazası',
  experiences: 'Deneyim Merkezi',
  projects: 'Tamamlanan Projeler',
  audit: 'Tamamlanma Raporu',
};

const NOTIFICATIONS = [
  { id:1, type:'order',   msg:'Yeni sipariş #8841 — Kadıköy', time:'2 dk önce', read:false, color:'#16A34A' },
  { id:2, type:'courier', msg:'Kurye Mehmet teslim etti #8839', time:'8 dk önce', read:false, color:'#2563EB' },
  { id:3, type:'crm',     msg:'Doğum günü hatırlatması: Ayşe K.', time:'15 dk önce', read:false, color:'#7C3AED' },
  { id:4, type:'stock',   msg:'Kırmızı gül stok kritik seviye', time:'32 dk önce', read:true, color:'#DC2626' },
  { id:5, type:'payment', msg:'Ödeme onaylandı — ₺2.840', time:'1 saat önce', read:true, color:'#D97706' },
];

export function DashboardHeader({ activeScreen }: { activeScreen: NavScreen }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  const label = SCREEN_LABELS[activeScreen] || activeScreen;

  return (
    <header style={{
      height: 52, background: '#fff', borderBottom: '1px solid #F1F5F9',
      display: 'flex', alignItems: 'center', padding: '0 20px',
      gap: 12, flexShrink: 0, position: 'relative', zIndex: 10,
    }}>
      {/* Breadcrumb */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 500 }}>CICEKYOLLA OS</span>
          <span style={{ fontSize: 10.5, color: '#CBD5E1' }}>›</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em' }}>{label}</span>
        </div>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        background: searchFocused ? '#fff' : '#F8FAFC',
        border: `1px solid ${searchFocused ? '#16A34A' : '#E2E8F0'}`,
        borderRadius: 8, padding: '5px 10px', transition: 'all 0.15s', width: 200,
      }}>
        <Search style={{ width: 13, height: 13, color: '#94A3B8', flexShrink: 0 }} />
        <input
          placeholder="Hızlı arama…"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 12, color: '#374151', width: '100%' }}
        />
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }} style={{
          width: 34, height: 34, borderRadius: 8, border: '1px solid #E2E8F0',
          background: notifOpen ? '#F0FDF4' : '#fff', display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer', position: 'relative',
        }}>
          <Bell style={{ width: 15, height: 15, color: notifOpen ? '#16A34A' : '#64748B' }} />
          {unread > 0 && (
            <span style={{
              position: 'absolute', top: -4, right: -4, width: 16, height: 16,
              borderRadius: '50%', background: '#DC2626', fontSize: 9, fontWeight: 800,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #fff',
            }}>{unread}</span>
          )}
        </button>

        {notifOpen && (
          <div style={{
            position: 'absolute', top: 40, right: 0, width: 320, background: '#fff',
            border: '1px solid #E2E8F0', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            zIndex: 100, overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Bildirimler</span>
              <span style={{ fontSize: 10.5, color: '#16A34A', fontWeight: 600, cursor: 'pointer' }}>Tümünü okundu işaretle</span>
            </div>
            {NOTIFICATIONS.map(n => (
              <div key={n.id} style={{
                padding: '11px 16px', borderBottom: '1px solid #F8FAFC',
                display: 'flex', gap: 10, alignItems: 'flex-start',
                background: n.read ? '#fff' : '#FAFFF9',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, flexShrink: 0, marginTop: 4 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.4 }}>{n.msg}</div>
                  <div style={{ fontSize: 10.5, color: '#94A3B8', marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Help */}
      <button style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <HelpCircle style={{ width: 15, height: 15, color: '#64748B' }} />
      </button>

      {/* Settings */}
      <button style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <Settings style={{ width: 15, height: 15, color: '#64748B' }} />
      </button>

      {/* Profile */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 6px',
          border: '1px solid #E2E8F0', borderRadius: 8, background: profileOpen ? '#F8FAFC' : '#fff',
          cursor: 'pointer', transition: 'all 0.15s',
        }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#16A34A,#D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#fff', flexShrink: 0 }}>A</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: '#0F172A', lineHeight: 1.2 }}>Admin</div>
            <div style={{ fontSize: 9.5, color: '#94A3B8' }}>Super Admin</div>
          </div>
          <ChevronDown style={{ width: 12, height: 12, color: '#94A3B8', transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>

        {profileOpen && (
          <div style={{ position: 'absolute', top: 44, right: 0, width: 200, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.10)', zIndex: 100, overflow: 'hidden' }}>
            {[{ icon: User, label: 'Profilim' }, { icon: Settings, label: 'Ayarlar' }, { icon: HelpCircle, label: 'Yardım' }].map(item => (
              <button key={item.label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#374151', textAlign: 'left' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <item.icon style={{ width: 14, height: 14, color: '#64748B' }} /> {item.label}
              </button>
            ))}
            <div style={{ height: 1, background: '#F1F5F9', margin: '4px 0' }} />
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#DC2626', textAlign: 'left' }}
              onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut style={{ width: 14, height: 14 }} /> Çıkış Yap
            </button>
          </div>
        )}
      </div>

      {/* Click outside */}
      {(notifOpen || profileOpen) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => { setNotifOpen(false); setProfileOpen(false); }} />
      )}
    </header>
  );
}
