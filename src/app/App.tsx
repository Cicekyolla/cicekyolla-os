import { useState, createContext, useContext } from 'react';
import { DashboardSidebar, type NavScreen } from './components/dashboard-sidebar';
import { DashboardHeader } from './components/dashboard-header';

import { ScreenDashboard }   from './components/screen-dashboard';
import { ScreenStorefront }  from './components/screen-storefront';
import { ScreenOrders }      from './components/screen-orders';
import { ScreenCRM }         from './components/screen-crm';
import { ScreenCustomer360 } from './components/screen-customer360';
import { ScreenProducts }    from './components/screen-products';
import { ScreenDelivery }    from './components/screen-delivery';
import { ScreenCouriers }    from './components/screen-couriers';
import { ScreenRoutes }      from './components/screen-routes';
import { ScreenWreath }      from './components/screen-wreath';
import { ScreenCards }       from './components/screen-cards';
import { ScreenSEO }         from './components/screen-seo';
import { ScreenSchema }      from './components/screen-schema';
import { ScreenBlog }        from './components/screen-blog';
import { ScreenAI }          from './components/screen-ai';
import { ScreenAds }         from './components/screen-ads';
import { ScreenMeta }        from './components/screen-meta';
import { ScreenFinance }     from './components/screen-finance';
import { ScreenReports }     from './components/screen-reports';
import { ScreenBranches }    from './components/screen-branches';
import { ScreenUsers }       from './components/screen-users';
import { ScreenSettings }    from './components/screen-settings';
import { ScreenStorefrontPages } from './components/screen-storefront-pages';
import { ScreenCheckoutFlow }   from './components/screen-checkout-flow';
import { ScreenRevenue }        from './components/screen-revenue';
import { ScreenCheckoutAnalytics } from './components/screen-checkout-analytics';
import { ScreenHomepageAdmin }     from './components/screen-homepage-admin';
import { ScreenCityPage }          from './components/screen-city-pages';
import { ScreenAudit }      from './components/screen-audit';
import { ScreenKargo }        from './components/screen-kargo';
import { ScreenKargoAdmin }   from './components/screen-kargo-admin';
import { ScreenYapayAdmin }   from './components/screen-yapay-admin';
import { ScreenYapay }        from './components/screen-yapay';
import { ScreenProjects }     from './components/screen-projects';
import {
  ScreenExperienceHub,
  ScreenExpFlowers, ScreenExpOrchids, ScreenExpGifts, ScreenExpCorporate,
  ScreenExpWedding, ScreenExpArtificial, ScreenExpHotel, ScreenExpCafe,
  ScreenExpRestaurant, ScreenExpOffice, ScreenExpProjects,
} from './components/screen-experiences';

export interface NavParams {
  orderId?:    string;
  customerId?: number;
  courierId?:  number;
  printOrder?: string;
  printType?:  'ribbon' | 'card' | 'both';
  tab?:        string;
}

interface NavContextType {
  navigate: (screen: NavScreen, params?: NavParams) => void;
  params: NavParams;
}

export const NavContext = createContext<NavContextType>({
  navigate: () => {},
  params: {},
});

export const useNav = () => useContext(NavContext);

const FULL_BLEED: NavScreen[] = [
  'orders', 'crm', 'customer360', 'ai',
  'branches', 'users', 'settings', 'integrations', 'revenue', 'kargo-admin', 'yapay',
  'checkout-analytics', 'homepage-admin',
];

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [screen,    setScreen]    = useState<NavScreen>('dashboard');
  const [params,    setParams]    = useState<NavParams>({});

  function navigate(nextScreen: NavScreen, nextParams: NavParams = {}) {
    setScreen(nextScreen);
    setParams(nextParams);
    window.scrollTo?.(0, 0);
  }

  function renderScreen() {
    switch (screen) {
      case 'dashboard':         return <ScreenDashboard   navigate={navigate} />;
      case 'storefront':        return <ScreenStorefront />;
      case 'sf-category':       return <ScreenStorefrontPages page="category" />;
      case 'sf-product':        return <ScreenStorefrontPages page="product" />;
      case 'sf-cart':           return <ScreenCheckoutFlow />;
      case 'sf-checkout':       return <ScreenCheckoutFlow />;
      case 'sf-login':          return <ScreenStorefrontPages page="login" />;
      case 'sf-account':        return <ScreenStorefrontPages page="account" />;
      case 'sf-blog-detail':    return <ScreenStorefrontPages page="blog-detail" />;
      case 'sf-delivery':       return <ScreenStorefrontPages page="delivery-regions" />;
      case 'sf-faq':            return <ScreenStorefrontPages page="faq" />;
      case 'sf-about':          return <ScreenStorefrontPages page="about" />;
      case 'sf-contact':        return <ScreenStorefrontPages page="contact" />;
      case 'sf-kvkk':           return <ScreenStorefrontPages page="kvkk" />;
      case 'sf-contract':       return <ScreenStorefrontPages page="contract" />;
      case 'sf-corporate':      return <ScreenStorefrontPages page="corporate" />;
      case 'sf-artificial':     return <ScreenStorefrontPages page="artificial" />;
      case 'audit':             return <ScreenAudit />;
      case 'revenue':              return <ScreenRevenue />;
      case 'checkout-analytics':   return <ScreenCheckoutAnalytics />;
      case 'homepage-admin':       return <ScreenHomepageAdmin />;
      case 'city':                 return <ScreenCityPage citySlug={params.tab} />;
      case 'city-istanbul':        return <ScreenCityPage citySlug="istanbul" />;
      case 'city-ankara':          return <ScreenCityPage citySlug="ankara" />;
      case 'city-izmir':           return <ScreenCityPage citySlug="izmir" />;
      case 'city-bursa':           return <ScreenCityPage citySlug="bursa" />;
      case 'kargo':              return <ScreenKargo />;
      case 'kargo-admin':        return <ScreenKargoAdmin />;
      case 'yapay':              return <ScreenYapayAdmin />;
      case 'yapay-store':        return <ScreenYapay />;
      case 'projects':           return <ScreenProjects />;
      case 'experiences':        return <ScreenExperienceHub />;
      case 'exp-flowers':        return <ScreenExpFlowers />;
      case 'exp-orchids':        return <ScreenExpOrchids />;
      case 'exp-gifts':          return <ScreenExpGifts />;
      case 'exp-corporate':      return <ScreenExpCorporate />;
      case 'exp-wedding':        return <ScreenExpWedding />;
      case 'exp-artificial':     return <ScreenExpArtificial />;
      case 'exp-hotel':          return <ScreenExpHotel />;
      case 'exp-cafe':           return <ScreenExpCafe />;
      case 'exp-restaurant':     return <ScreenExpRestaurant />;
      case 'exp-office':         return <ScreenExpOffice />;
      case 'exp-projects':       return <ScreenExpProjects />;
      case 'orders':       return <ScreenOrders      navigate={navigate} params={params} />;
      case 'crm':          return <ScreenCRM         navigate={navigate} params={params} />;
      case 'customer360':  return <ScreenCustomer360 navigate={navigate} params={params} />;
      case 'products':
      case 'categories':
      case 'campaigns':
      case 'seasonal':     return <ScreenProducts />;
      case 'delivery':
      case 'zones':        return <ScreenDelivery    navigate={navigate} params={params} />;
      case 'couriers':     return <ScreenCouriers    navigate={navigate} params={params} />;
      case 'routes':       return <ScreenRoutes />;
      case 'wreath':       return <ScreenWreath      navigate={navigate} params={params} />;
      case 'cards':        return <ScreenCards       navigate={navigate} params={params} />;
      case 'seo':
      case 'redirects':    return <ScreenSEO />;
      case 'schema':       return <ScreenSchema />;
      case 'blog':         return <ScreenBlog />;
      case 'ai':           return <ScreenAI />;
      case 'ads':          return <ScreenAds />;
      case 'meta':         return <ScreenMeta />;
      case 'finance':      return <ScreenFinance     navigate={navigate} />;
      case 'reports':      return <ScreenReports />;
      case 'branches':     return <ScreenBranches />;
      case 'users':
      case 'integrations': return <ScreenUsers />;
      case 'settings':     return <ScreenSettings />;
      default:             return <ScreenDashboard   navigate={navigate} />;
    }
  }

  return (
    <NavContext.Provider value={{ navigate, params }}>
      <div style={{
        display: 'flex', height: '100vh', overflow: 'hidden',
        background: '#F5F7FA',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        WebkitFontSmoothing: 'antialiased',
      }}>
        <DashboardSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
          activeScreen={screen}
          onNavigate={(s) => navigate(s)}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          <DashboardHeader activeScreen={screen} />
          <main style={{
            flex: 1,
            overflowY: FULL_BLEED.includes(screen) ? 'hidden' : 'auto',
            overflowX: 'hidden',
          }}>
            {renderScreen()}
          </main>
          <footer style={{
            height: 26, background: '#fff', borderTop: '1px solid #F1F5F9',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', padding: '0 18px', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.10em', color: '#94A3B8' }}>
                CICEKYOLLA OS v4.0 ENTERPRISE
              </span>
            </div>
          </footer>
        </div>
      </div>
    </NavContext.Provider>
  );
}
