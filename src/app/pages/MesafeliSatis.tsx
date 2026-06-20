import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";

export function MesafeliSatis() {
  const sections = [
    { title: "1. Satıcı Bilgileri", content: "Çiçekyolla — İstanbul merkezli çiçek ve hediye e-ticaret platformu. İletişim: info@cicekyolla.com.tr" },
    { title: "2. Sözleşmenin Konusu", content: "Bu sözleşme, alıcının web sitesi üzerinden yaptığı siparişe ilişkin satış koşullarını kapsar." },
    { title: "3. Teslimat Koşulları", content: "Siparisler adrese teslim edilir. Teslimat süresi sipariş tarihinden itibaren 1-3 iş günüdür. Aynı gün teslimat saat 14:00'a kadar geçerlidir." },
    { title: "4. İptal ve İade", content: "Hazırlanmaya başlanmamış siparisler iptal edilebilir. Taze çiçekürünlerde iade, ürünün hasar görmesi veya yanlış teslim gibi durumlarda kabul edilir." },
    { title: "5. Garanti", content: "Taze çiçekler için 7 gün tazelik garantisi verilmektedir. Hata veya hasar durumunda ücretsiz değişim yapılır." },
    { title: "6. Uyumazlık", content: "Bu sözleşmeden doğan uyumazlıklarda İstanbul mahkemeleri yetkilidir." },
  ];
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Header />
      <div className="max-w-[860px] mx-auto px-6 lg:px-14 py-16">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.28em] text-[#8B5CF6] uppercase font-bold mb-3">Hukuki Bilgilendirme</p>
          <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-semibold text-[#111827] mb-2">Mesafeli Satış Sözleşmesi</h1>
          <p className="text-[#9CA3AF] text-sm">Son güncelleme: Ocak 2025</p>
        </div>
        <div className="space-y-4">
          {sections.map(({ title, content }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-black/[0.05]">
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
