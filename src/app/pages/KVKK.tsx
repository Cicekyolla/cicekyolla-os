import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";

export function KVKK() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Header />
      <div className="max-w-[860px] mx-auto px-6 lg:px-14 py-16">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.28em] text-[#8B5CF6] uppercase font-bold mb-3">Hukuki Bilgilendirme</p>
          <h1 style={{ fontFamily: "var(--font-display)", lineHeight: 1.08 }} className="text-4xl font-semibold text-[#111827] mb-4">KVKK Aydınlatma Metni</h1>
          <p className="text-[#9CA3AF] text-sm">Son güncelleme: Ocak 2025</p>
        </div>
        <div className="prose prose-gray max-w-none space-y-8">
          {[
            { title: "1. Veri Sorumlusu", content: "Çiçekyolla olarak kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatıyla işlenmektedir." },
            { title: "2. İşlenen Kişisel Veriler", content: "Ad-soyad, e-posta adresi, telefon numarası, teslimat adresi, sipariş bilgileri ve ödeme bilgileri işlenmektedir." },
            { title: "3. Kişisel Verilerin İşlenme Amacı", content: "Sipariş işlemleri, teslimat yönetimi, müşteri hizmetleri, kampanya bildirimleri ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir." },
            { title: "4. Veri Aktarımı", content: "Kişisel verileriniz; kargo firmaları, ödeme hizmet sağlayıcılar ve yasal zorunluluk halinde kamu kurumları ile paylaşılabilir." },
            { title: "5. Haklarınız", content: "KVKK'nın 11. maddesi kapsamında kişisel verilerinize ilişkin bilgi talep etme, düzeltme, silme ve işlemeye itiraz hakkınız bulunmaktadır. Talepleriniz için: kvkk@cicekyolla.com.tr" },
          ].map(({ title, content }) => (
            <div key={title} className="rounded-2xl p-6 bg-white border border-black/[0.05]">
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-semibold text-[#111827] mb-3">{title}</h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
