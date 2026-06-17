// CICEKYOLLA OS — Dashboard Sidebar
// Full source: github.com/Cicekyolla/cicekyolla-os
import {
  LayoutDashboard, Store, ShoppingCart, Users, UserCircle, Package,
  Truck, Bike, Route, Flower2, MessageSquare, Search, Code2, FileText,
  Sparkles, Megaphone, Facebook, Wallet, BarChart3, Building2, UserCog,
  Plug, Settings, TrendingUp, LineChart, Home, MapPin, Boxes, Palette,
  ClipboardCheck, ChevronLeft, Layers,
} from 'lucide-react';
import { T } from './ui-kit';

// ───────────────────────────────────────────────────────────────
// NavScreen — the single source of truth for every routable screen.
// Must stay in sync with the switch() in App.tsx and SCREEN_LABELS
// in dashboard-header.tsx.
// ───────────────────────────────────────────────────────────────
export type NavScreen =
  // Core
  | 'dashboard'
  // Storefront preview screens
  | 'storefront' | 'sf-category' | 'sf-product' | 'sf-cart' | 'sf-checkout'
  | 'sf-login' | 'sf-account' | 'sf-blog-detail' | 'sf-delivery' | 'sf-faq'
  | 'sf-about' | 'sf-contact' | 'sf-kvkk' | 'sf-contract' | 'sf-corporate'
  | 'sf-artificial'
  // Commerce ops
  | 'orders' | 'crm' | 'customer360' | 'products' | 'categories'
  | 'campaigns' | 'seasonal'
  // Delivery
  | 'delivery' | 'zones' | 'couriers' | 'routes' | 'wreath' | 'cards'
  // SEO
  | 'seo' | 'schema' | 'redirects' | 'blog'
  // Growth / marketing
  | 'ai' | 'ads' | 'meta' | 'revenue' | 'checkout-analytics' | 'homepage-admin'
  // Finance / admin
  | 'finance' | 'reports' | 'branches' | 'users' | 'integrations' | 'settings'
  // City SEO pages
  | 'city' | 'city-istanbul' | 'city-ankara' | 'city-izmir' | 'city-bursa'
  // Cargo
  | 'kargo' | 'kargo-admin'
  // Artificial flower & decoration
  | 'yapay' | 'yapay-store' | 'projects' | 'experiences'
  | 'exp-flowers' | 'exp-orchids' | 'exp-gifts' | 'exp-corporate'
  | 'exp-wedding' | 'exp-artificial' | 'exp-hotel' | 'exp-cafe'
  | 'exp-restaurant' | 'exp-office' | 'exp-projects'
  // Misc
  | 'audit';

interface NavItem {
  id: NavScreen;
  label: string;
  icon: typeof LayoutDashboard;
}
interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Genel',
    items: [
      { id: 'dashboard',   label: 'Dashboard',        icon: LayoutDashboard },
      { id: 'storefront',  label: 'Mağaza Ön Yüzü',   icon: Store },
      { id: 'homepage-admin', label: 'Homepage Admin', icon: Home },
    ],
  },
  {
    title: 'Sipariş & Müşteri',
    items: [
      { id: 'orders',      label: 'Sipariş Merkezi',  icon: ShoppingCart },
      { id: 'crm',         label: 'CRM Merkezi',      icon: Users },
      { id: 'customer360', label: 'Müşteri 360°',     icon: UserCircle },
    ],
  },
  {
    title: 'Katalog',
    items: [
      { id: 'products',    label: 'Ürün Yönetimi',    icon: Package },
      { id: 'categories',  label: 'Kategoriler',      icon: Boxes },
      { id: 'campaigns',   label: 'Kampanyalar',      icon: Megaphone },
    ],
  },
  {
    title: 'Teslimat',
    items: [
      { id: 'delivery',    label: 'Teslimat Motoru',  icon: Truck },
      { id: 'couriers',    label: 'Kurye Merkezi',    icon: Bike },
      { id: 'routes',      label: 'Rota Planlayıcı',  icon: Route },
      { id: 'wreath',      label: 'Çelenk Baskı',     icon: Flower2 },
      { id: 'cards',       label: 'Kart Mesajları',   icon: MessageSquare },
    ],
  },
  {
    title: 'Türkiye Kargo',
    items: [
      { id: 'kargo-admin', label: 'Kargo Merkezi',    icon: Truck },
      { id: 'kargo',       label: 'Kargo Mağaza',     icon: MapPin },
    ],
  },
  {
    title: 'Yapay Çiçek & Dekorasyon',
    items: [
      { id: 'yapay',       label: 'Dekorasyon Yönetimi', icon: Palette },
      { id: 'projects',    label: 'Tamamlanan Projeler', icon: Layers },
      { id: 'experiences', label: 'Deneyim Merkezi',     icon: Sparkles },
      { id: 'yapay-store', label: 'Yapay Çiçek Mağaza',  icon: Flower2 },
    ],
  },
  {
    title: 'SEO',
    items: [
      { id: 'seo',         label: 'SEO Merkezi',      icon: Search },
      { id: 'schema',      label: 'Schema Merkezi',   icon: Code2 },
      { id: 'blog',        label: 'Blog Merkezi',     icon: FileText },
      { id: 'city-istanbul', label: 'Şehir Sayfaları', icon: MapPin },
    ],
  },
  {
    title: 'Büyüme',
    items: [
      { id: 'ai',          label: 'AI Merkezi',       icon: Sparkles },
      { id: 'ads',         label: 'Google Ads',       icon: Megaphone },
      { id: 'meta',        label: 'Meta Ads',         icon: Facebook },
      { id: 'revenue',     label: 'Revenue Optimizer', icon: TrendingUp },
      { id: 'checkout-analytics', label: 'Checkout Analytics', icon: LineChart },
    ],
  },
  {
    title: 'Finans & Yönetim',
    items: [
      { id: 'finance',     label: 'Finans Merkezi',   icon: Wallet },
      { id: 'reports',     label: 'Raporlar',         icon: BarChart3 },
      { id: 'branches',    label: 'Şube Merkezi',     icon: Building2 },
      { id: 'users',       label: 'Kullanıcılar',     icon: UserCog },
      { id: 'integrations', label: 'Entegrasyonlar',  icon: Plug },
      { id: 'audit',       label: 'Tamamlanma Raporu', icon: ClipboardCheck },
      { id: 'settings',    label: 'Ayarlar',          icon: Settings },
    ],
  },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
}

export function DashboardSidebar({
  collapsed, onToggle, activeScreen, onNavigate,
}: DashboardSidebarProps) {
  const width = collapsed ? 64 : 232;

  return (
    <aside style={{
      width, flexShrink: 0, background: '#fff',
      borderRight: `1px solid ${T.gray100}`,
      display: 'flex', flexDirection: 'column',
      height: '100vh', transition: 'width 0.18s ease',
      overflow: 'hidden',
    }}>
      {/* Brand */}
      <div style={{
        height: 52, flexShrink: 0, display: 'flex', alignItems: 'center',
        gap: 10, padding: collapsed ? '0 16px' : '0 18px',
        borderBottom: `1px solid ${T.gray100}`,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: `linear-gradient(135deg, ${T.green}, ${T.amber})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Flower2 style={{ width: 17, height: 17, color: '#fff' }} />
        </div>
        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: T.gray900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              CICEKYOLLA
            </div>
            <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.14em', color: T.green }}>
              OS ENTERPRISE
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 0' }}>
        {NAV_GROUPS.map(group => (
          <div key={group.title} style={{ marginBottom: 6 }}>
            {!collapsed && (
              <div style={{
                fontSize: 9, fontWeight: 800, letterSpacing: '0.10em',
                color: T.gray400, textTransform: 'uppercase',
                padding: '8px 18px 4px',
              }}>
                {group.title}
              </div>
            )}
            {group.items.map(item => {
              const active = activeScreen === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  title={collapsed ? item.label : undefined}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: 10, padding: collapsed ? '9px 0' : '8px 18px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: active ? T.greenLight : 'transparent',
                    borderLeft: `3px solid ${active ? T.green : 'transparent'}`,
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = T.gray50; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <Icon style={{
                    width: 16, height: 16, flexShrink: 0,
                    color: active ? T.green : T.gray500,
                  }} />
                  {!collapsed && (
                    <span style={{
                      fontSize: 12.5, fontWeight: active ? 700 : 500,
                      color: active ? T.greenDark : T.gray700,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        style={{
          height: 40, flexShrink: 0, border: 'none',
          borderTop: `1px solid ${T.gray100}`, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, cursor: 'pointer', color: T.gray500,
        }}
        onMouseEnter={e => e.currentTarget.style.background = T.gray50}
        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
      >
        <ChevronLeft style={{
          width: 15, height: 15,
          transform: collapsed ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.18s',
        }} />
        {!collapsed && <span style={{ fontSize: 11.5, fontWeight: 600 }}>Daralt</span>}
      </button>
    </aside>
  );
}
