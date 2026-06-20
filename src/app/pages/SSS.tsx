import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  { q: "Aynı gün teslimat mümkün mü?", a: "İstanbul, Ankara ve İzmir için saat 14:00'a kadar verilen siparislerde aynı gün teslimat yapılır." },
  { q: "Minimum siparis tutari nedir?", a: "Minimum sipariş tutarı yoktur. Her bütçeye uygun ürünlerimiz mevcuttur." },
  { q: "Kargo ücreti ne kadar?", a: "₺499 ve üzeri siparislerde kargo ücetsizdir. Altında ₺29,90 kargo ücreti uygulanır." },
  { q: "Siparişimi takip edebilir miyim?", a: "Evet! Sipariş onayından sonra SMS ve WhatsApp ile takip numarası iletilir." },
  { q: "Çiçekler kaç gün dayanır?", a: "Taze çiçekler doğru bakımla 7-10 gün dayanır. Bakım talimatları teslimatla birlikte gelir." },
  { q: "El yazısı kart eklenebilir mi?", a: "Evet, siparis sırasında kart mesajı bölümüne yazdığınız mesaj el yazısıyla karta aktarılır." },
  { q: "Tüm Türkiye'ye gönderim yapılır mı?", a: "Evet! Kuru çiçek, yapay çiçek ve hediye setleri ile 81 ile gönderim yapılır." },
  { q: "Kurumsal sipariş verebilir miyim?", a: "Evet, 10 adetten başlayan kurumsal siparislerde özel fiyatlandırma ve fatura seçeneği sunulur." },
];

export function SSS() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Header />
      <div className="max-w-[860px] mx-auto px-6 lg:px-14 py-16">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.28em] text-[#8B5CF6] uppercase font-bold mb-4">Yardım Merkezi</p>
          <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-semibold text-[#111827] mb-4">Sık Sorulan Sorular</h1>
          <p className="text-[#9CA3AF] text-sm">Aradığınız cevabı bulamazsanız WhatsApp'tan bize ulaşın.</p>
        </div>
        <div className="space-y-3 mb-12">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(139,92,246,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="text-[#111827] font-semibold text-sm pr-4">{q}</span>
                <ChevronDown className={`w-5 h-5 text-[#8B5CF6] flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-[#6B7280] text-sm leading-relaxed">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="text-center p-8 rounded-[24px]" style={{ background: "linear-gradient(135deg, #F5F3FF, #EDE9FE)", border: "1px solid rgba(139,92,246,0.15)" }}>
          <p className="font-semibold text-[#111827] mb-2">Sorunuz burada yok mu?</p>
          <p className="text-[#6B7280] text-sm mb-5">WhatsApp üzerinden anında destek alın.</p>
          <a href="https://wa.me/905551234567" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
            <MessageCircle className="w-4 h-4" /> WhatsApp Destek
          </a>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
