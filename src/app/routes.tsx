import { createBrowserRouter } from "react-router";

/* ── Enterprise new pages ── */
import { Hesap } from "./pages/Hesap";
import { LuxuryExperiencePage } from "./pages/LuxuryExperience";
import { Arama } from "./pages/Arama";
import { CRMCenter } from "./pages/admin/CRMCenter";
import { OrderCenter } from "./pages/admin/OrderCenter";
import { SEOCenter } from "./pages/admin/SEOCenter";
import { HomepageAdmin } from "./pages/admin/HomepageAdmin";
import { DekorasyonAdmin } from "./pages/admin/DekorasyonAdmin";
import { DeliveryCenter } from "./pages/admin/DeliveryCenter";
import { ResponsiveCenter } from "./pages/admin/ResponsiveCenter";
import { CategoryCenter } from "./pages/admin/CategoryCenter";
import { CargoCenter } from "./pages/admin/CargoCenter";
import { ProductExperienceCenter } from "./pages/admin/ProductExperienceCenter";

/* ── Dekorasyon sub-brand ── */
import { DekorasyonLanding } from "./pages/dekorasyon/DekorasyonLanding";
import { DekorasyonProjeler } from "./pages/dekorasyon/DekorasyonProjeler";
import { DekorasyonProjeDetay } from "./pages/dekorasyon/DekorasyonProjeDetay";
import { OncesiSonrasi } from "./pages/dekorasyon/OncesiSonrasi";
import { DekorasyonKategori } from "./pages/dekorasyon/DekorasyonKategori";
import { DekorasyonUrunler } from "./pages/dekorasyon/DekorasyonUrunler";
import { Tur360 } from "./pages/dekorasyon/Tur360";
import { DekorasyonReferanslar } from "./pages/dekorasyon/DekorasyonReferanslar";
import { DekorasyonVideo } from "./pages/dekorasyon/DekorasyonVideo";
import { ProjeTalebi } from "./pages/dekorasyon/ProjeTalebi";

/* ── Storefront ── */
import { Homepage } from "./pages/Homepage";
import { ProductDetail } from "./pages/ProductDetail";
import { Category } from "./pages/Category";
import { Cart } from "./pages/Cart";
import { OrderSuccess } from "./pages/OrderSuccess";
import { Upsell } from "./pages/Upsell";
import { Checkout } from "./pages/Checkout";
import { DistrictLanding } from "./pages/DistrictLanding";
import { TurkiyeKargo } from "./pages/TurkiyeKargo";

/* ── Info pages ── */
import { Hakkimizda } from "./pages/Hakkimizda";
import { Iletisim } from "./pages/Iletisim";
import { KVKK } from "./pages/KVKK";
import { MesafeliSatis } from "./pages/MesafeliSatis";
import { TeslimatBolgeleri } from "./pages/TeslimatBolgeleri";
import { SSS } from "./pages/SSS";
import { Blog } from "./pages/Blog";
import { Kurumsal } from "./pages/Kurumsal";

/* ── Admin layout + modules ── */
import { AdminLayout } from "./pages/admin/AdminLayout";
import { RevenueDashboard } from "./pages/admin/RevenueDashboard";
import { CheckoutAnalytics } from "./pages/admin/CheckoutAnalytics";
import { CartAbandonment } from "./pages/admin/CartAbandonment";
import { AOVTracking } from "./pages/admin/AOVTracking";
import { ConversionAnalytics } from "./pages/admin/ConversionAnalytics";
import { PromotionEngine } from "./pages/admin/PromotionEngine";
import { BundleManagement } from "./pages/admin/BundleManagement";
import { ProductAttachments } from "./pages/admin/ProductAttachments";
import { DeliveryAddons } from "./pages/admin/DeliveryAddons";
import { UpsellProducts } from "./pages/admin/UpsellProducts";

export const router = createBrowserRouter([
  /* ── Storefront ── */
  { path: "/",             Component: Homepage },
  { path: "/urun/:slug",   Component: ProductDetail },
  { path: "/kategori/:slug", Component: Category },
  { path: "/sepet",        Component: Cart },
  { path: "/sepet/hediyeler", Component: Upsell },
  { path: "/odeme",        Component: Checkout },
  { path: "/siparis-basarili", Component: OrderSuccess },
  { path: "/hesap",        Component: Hesap },
  { path: "/arama",        Component: Arama },
  { path: "/cicek-gonder/:district", Component: DistrictLanding },
  { path: "/kategori/turkiye-geneli-kargo", Component: TurkiyeKargo },
  { path: "/deneyim/:type", Component: LuxuryExperiencePage },

  /* ── Info pages ── */
  { path: "/hakkimizda",         Component: Hakkimizda },
  { path: "/iletisim",           Component: Iletisim },
  { path: "/kvkk",               Component: KVKK },
  { path: "/mesafeli-satis",     Component: MesafeliSatis },
  { path: "/teslimat-bolgeleri", Component: TeslimatBolgeleri },
  { path: "/sss",                Component: SSS },
  { path: "/blog",               Component: Blog },
  { path: "/kurumsal",           Component: Kurumsal },

  /* ── Dekorasyon ── */
  { path: "/dekorasyon",                    Component: DekorasyonLanding },
  { path: "/dekorasyon/projeler",           Component: DekorasyonProjeler },
  { path: "/dekorasyon/proje/:slug",        Component: DekorasyonProjeDetay },
  { path: "/dekorasyon/oncesi-sonrasi",     Component: OncesiSonrasi },
  { path: "/dekorasyon/video-galeri",       Component: DekorasyonVideo },
  { path: "/dekorasyon/proje-talebi",       Component: ProjeTalebi },
  { path: "/dekorasyon/kategori/:type",     Component: DekorasyonKategori },
  { path: "/dekorasyon/urunler",            Component: DekorasyonUrunler },
  { path: "/dekorasyon/360-tur",            Component: Tur360 },
  { path: "/dekorasyon/referanslar",        Component: DekorasyonReferanslar },

  /* ── Admin ── */
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true,                           Component: RevenueDashboard },
      { path: "crm",                           Component: CRMCenter },
      { path: "siparisler",                    Component: OrderCenter },
      { path: "seo",                           Component: SEOCenter },
      { path: "teslimat",                      Component: DeliveryCenter },
      { path: "upsell-urunler",               Component: UpsellProducts },
      { path: "analitik",                      Component: CheckoutAnalytics },
      { path: "terk",                          Component: CartAbandonment },
      { path: "aov",                           Component: AOVTracking },
      { path: "donusum",                       Component: ConversionAnalytics },
      { path: "promosyonlar",                  Component: PromotionEngine },
      { path: "paketler",                      Component: BundleManagement },
      { path: "urun-ekler",                    Component: ProductAttachments },
      { path: "teslimat-ekler",               Component: DeliveryAddons },
      { path: "responsive",                    Component: ResponsiveCenter },
      { path: "kategoriler",                   Component: CategoryCenter },
      { path: "kargo",                         Component: CargoCenter },
      { path: "urun-deneyim",                 Component: ProductExperienceCenter },
      { path: "homepage",                      Component: HomepageAdmin },
      { path: "dekorasyon-admin",             Component: DekorasyonAdmin },
    ],
  },
]);
