import { useState, useCallback, createContext, useContext, Component } from 'react';
import type { ReactNode } from 'react';
import type { NavScreen } from './components/dashboard-sidebar';
import { DashboardSidebar } from './components/dashboard-sidebar';
import { DashboardHeader } from './components/dashboard-header';

import { ScreenDashboard } from './components/screen-dashboard';
import { ScreenStorefront } from './components/screen-storefront';
import { ScreenStorefrontPages } from './components/screen-storefront-pages';
import { ScreenHomepageAdmin } from './components/screen-homepage-admin';
import { ScreenOrders } from './components/screen-orders';
import { ScreenCRM } from './components/screen-crm';
import { ScreenCustomer360 } from './components/screen-customer360';
import { ScreenProducts } from './components/screen-products';
import { ScreenCatalogFoundation } from './components/screen-catalog-foundation';
import { ScreenDelivery } from './components/screen-delivery';
import { ScreenCouriers } from './components/screen-couriers';
import { ScreenRoutes } from './components/screen-routes';
import { ScreenWreath } from './components/screen-wreath';
import { ScreenCards } from './components/screen-cards';
import { ScreenKargoAdmin } from './components/screen-kargo-admin';
import { ScreenKargo } from './components/screen-kargo';
import { ScreenYapayAdmin } from './components/screen-yapay-admin';
import { ScreenYapay } from './components/screen-yapay';
import { ScreenProjects } from './components/screen-projects';
import { ScreenExperienceHub } from './components/screen-experiences';
import { ScreenSEO } from './components/screen-seo';
import { ScreenSchema } from './components/screen-schema';
import { ScreenBlog } from './components/screen-blog';
import { ScreenCityPage } from './components/screen-city-pages';
import { ScreenAI } from './components/screen-ai';
import { ScreenAds } from './components/screen-ads';
import { ScreenMeta } from './components/screen-meta';
import { ScreenRevenue } from './components/screen-revenue';
import { ScreenCheckoutAnalytics } from './components/screen-checkout-analytics';
import { ScreenCheckoutFlow } from './components/screen-checkout-flow';
import { ScreenFinance } from './components/screen-finance';
import { ScreenReports } from './components/screen-reports';
import { ScreenBranches } from './components/screen-branches';
import { ScreenUsers } from './components/screen-users';
import { ScreenSettings } from './components/screen-settings';
import { ScreenAudit } from './components/screen-audit';
import { ScreenGeneric } from './components/screen-generic';

type NavigateFn = (screen: NavScreen, params?: any) => void;

interface NavContextValue {
  navigate: NavigateFn;
  screen: NavScreen;
  params: any;
}

const NavContext = createContext<NavContextValue>({
  navigate: () => {},
  screen: 'dashboard',
  params: {},
});

export function useNav() {
  return useContext(NavContext);
}

function renderScreen(screen: NavScreen, params: any, navigate: NavigateFn) {
  switch (screen) {
    case 'dashboard':        return <ScreenDashboard navigate={navigate} />;
    case 'storefront':       return <ScreenStorefront />;
    case 'homepage-admin':   return <ScreenHomepageAdmin />;

    case 'orders':           return <ScreenOrders navigate={navigate} params={params} />;
    case 'crm':              return <ScreenCRM navigate={navigate} params={params} />;
    case 'customer360':      return <ScreenCustomer360 navigate={navigate} params={params} />;

    case 'products':         return <ScreenProducts />;
    case 'categories':       return <ScreenCatalogFoundation module="categories" />;
    case 'collections':      return <ScreenCatalogFoundation module="collections" />;
    case 'pages':            return <ScreenCatalogFoundation module="pages" />;

    case 'delivery':         return <ScreenDelivery navigate={navigate} params={params} />;
    case 'couriers':         return <ScreenCouriers navigate={navigate} params={params} />;
    case 'routes':           return <ScreenRoutes />;
    case 'wreath':           return <ScreenWreath navigate={navigate} params={params} />;
    case 'cards':            return <ScreenCards navigate={navigate} params={params} />;

    case 'kargo-admin':      return <ScreenKargoAdmin />;
    case 'kargo':            return <ScreenKargo />;

    case 'yapay':            return <ScreenYapayAdmin />;
    case 'yapay-store':      return <ScreenYapay />;
    case 'projects':         return <ScreenProjects />;
    case 'experiences':      return <ScreenExperienceHub />;

    case 'seo':              return <ScreenSEO />;
    case 'schema':           return <ScreenSchema />;
    case 'blog':             return <ScreenBlog />;

    case 'city-istanbul':    return <ScreenCityPage citySlug="istanbul" />;
    case 'city-ankara':      return <ScreenCityPage citySlug="ankara" />;
    case 'city-izmir':       return <ScreenCityPage citySlug="izmir" />;
    case 'city-bursa':       return <ScreenCityPage citySlug="bursa" />;
    case 'city':             return <ScreenCityPage />;

    case 'ai':               return <ScreenAI />;
    case 'ads':              return <ScreenAds />;
    case 'meta':             return <ScreenMeta />;
    case 'revenue':          return <ScreenRevenue />;
    case 'checkout-analytics': return <ScreenCheckoutAnalytics />;

    case 'finance':          return <ScreenFinance navigate={navigate} />;
    case 'reports':          return <ScreenReports />;
    case 'branches':         return <ScreenBranches />;
    case 'users':            return <ScreenUsers />;
    case 'settings':         return <ScreenSettings />;
    case 'audit':            return <ScreenAudit />;

    // Storefront preview sub-pages
    case 'sf-category':      return <ScreenStorefrontPages page="category" />;
    case 'sf-product':       return <ScreenStorefrontPages page="product" />;
    case 'sf-login':         return <ScreenStorefrontPages page="login" />;
    case 'sf-account':       return <ScreenStorefrontPages page="account" />;
    case 'sf-blog-detail':   return <ScreenStorefrontPages page="blog-detail" />;
    case 'sf-delivery':      return <ScreenStorefrontPages page="delivery-regions" />;
    case 'sf-faq':           return <ScreenStorefrontPages page="faq" />;
    case 'sf-about':         return <ScreenStorefrontPages page="about" />;
    case 'sf-contact':       return <ScreenStorefrontPages page="contact" />;
    case 'sf-kvkk':          return <ScreenStorefrontPages page="kvkk" />;
    case 'sf-contract':      return <ScreenStorefrontPages page="contract" />;
    case 'sf-corporate':     return <ScreenStorefrontPages page="corporate" />;
    case 'sf-artificial':    return <ScreenStorefrontPages page="artificial" />;
    case 'sf-checkout':      return <ScreenCheckoutFlow />;

    default:                 return <ScreenGeneric screen={screen} />;
  }
}

// ─── Hata kalkanı: bir ekran çökse bile tüm uygulama beyaza düşmez ───
class ScreenErrorBoundary extends Component<
  { children: ReactNode; onHome: () => void },
  { hasError: boolean; msg: string }
> {
  constructor(props: { children: ReactNode; onHome: () => void }) {
    super(props);
    this.state = { hasError: false, msg: '' };
  }
  static getDerivedStateFromError(err: any) {
    return { hasError: true, msg: String(err?.message ?? err) };
  }
  componentDidCatch(err: any) {
    // sessizce yut; konsola düşer
    console.error('Screen crashed:', err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 48, maxWidth: 640, margin: '40px auto', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>
            Bu bölüm yüklenirken bir sorun oluştu
          </h2>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 8px' }}>
            Sol menüden başka bir bölüme geçebilirsiniz. Bu sorun yalnızca bu ekranı etkiler.
          </p>
          <p style={{ color: '#9ca3af', fontSize: 12, fontFamily: 'monospace', margin: '0 0 20px', wordBreak: 'break-all' }}>
            {this.state.msg}
          </p>
          <button
            onClick={this.props.onHome}
            style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
          >
            Panele dön
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [screen, setScreen] = useState<NavScreen>('dashboard');
  const [params, setParams] = useState<any>({});
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useCallback<NavigateFn>((next, p) => {
    setScreen(next);
    setParams(p || {});
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, []);

  return (
    <NavContext.Provider value={{ navigate, screen, params }}>
    <div style={{ display: 'flex', minHeight: '100vh', maxWidth: '100vw', overflowX: 'hidden', position: 'relative' }}>
      <DashboardSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        activeScreen={screen}
        onNavigate={navigate}
      />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <DashboardHeader activeScreen={screen} />
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <ScreenErrorBoundary key={screen} onHome={() => navigate('dashboard')}>
            {renderScreen(screen, params, navigate)}
          </ScreenErrorBoundary>
        </main>
      </div>
    </div>
    </NavContext.Provider>
  );
}
