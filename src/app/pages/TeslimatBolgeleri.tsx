import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { MapPin, Clock, Truck } from "lucide-react";

const regions = [
  { city: "İstanbul", districts: ["Kadıköy", "Beşiktaş", "Şişli", "Üsküdar", "Ataşehir", "Maltepe", "Bakırköy", "Beyoğlu", "Sarıyer", "Beykoz", "Güngören", "Bahçelievler", "Esenler", "Güngören", "Bağcılar", "Avcılar", "Bahçeşehir", "Esenyurt", "Başakşehir", "Arnaütköy"], time: "2–4 Saat", badge: "Aynı Gün", color: "#8B5CF6" },
  { city: "Ankara", districts: ["Çankaya", "Kızılay", "Mamak", "Etimesgut", "Sincan", "Keçiören", "Yenimahalle", "Altındağ", "Göl başı", "Pursaklar"], time: "3–6 Saat", badge: "Aynı Gün", color: "#10B981" },
  { city: "İzmir", districts: ["Konak", "Karsiyaka", "Bornova", "Buca", "Bayraklı", "Narlid ere", "Cigli", "Balcova", "Gaziemir", "Güzelbahçe"], time: "3–6 Saat", badge: "Aynı Gün", color: "#3B82F6" },
  { city: "Diğer Şehirler", districts: ["Bursa", "Antalya", "Adana", "Konya", "Gaziantep", "Trabzon", "Kayseri", "Eskişehir", "Mersin", "Diyarbakır", "ve 71 il daha"], time: "1–3 İş Günü", badge: "Kargo", color: "#F59E0B" },
];

export function TeslimatBolgeleri() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Header />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-16">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.28em] text-[#8B5CF6] uppercase font-bold mb-4">Teslimat Ağı</p>
          <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl lg:text-5xl font-semibold text-[#111827] mb-4">Teslimat Bölgeleri</h1>
          <p className="text-[#9CA3AF] text-base max-w-lg mx-auto">Türkiye'nin 81 iline gönderim yapıyoruz. Büyük şehirlere aynı gün teslimat!</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {regions.map(({ city, districts, time, badge, color }) => (
            <div key={city} className="bg-white rounded-[24px] p-7" style={{ border: "1px solid rgba(139,92,246,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between mb-5">
                <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-semibold text-[#111827]">{city}</h2>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: color }}>{badge}</span>
              </div>
              <div className="flex items-center gap-2 mb-4 text-sm text-[#6B7280]">
                <Clock className="w-4 h-4" style={{ color }} />
                <span>Ortalama Teslimat: <strong style={{ color }}>{time}</strong></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {districts.map(d => (
                  <span key={d} className="text-xs px-2.5 py-1 rounded-full font-medium text-[#374151]" style={{ background: "#F5F3FF" }}>{d}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center p-8 rounded-[24px]" style={{ background: "linear-gradient(135deg, #F5F3FF, #EDE9FE)" }}>
          <Truck className="w-8 h-8 text-[#8B5CF6] mx-auto mb-3" />
          <p className="font-bold text-[#111827] mb-2">Şehrinizi bulamadınız mı?</p>
          <p className="text-[#6B7280] text-sm mb-4">Tüm Türkiye'ye kargo ile gönderim yapıyoruz.</p>
          <Link to="/kategori/turkiye-geneli-kargo" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}>Kargo Ürünleri</Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
