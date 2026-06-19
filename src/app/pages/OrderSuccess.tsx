import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { CheckCircle, Package, Truck, MapPin, Clock, ArrowRight, Phone, Star, Heart } from "lucide-react";
import { getCart, saveCart } from "../lib/cartStore";

function generateOrderNumber() {
  const ts = Date.now().toString().slice(-6);
  return `CY-${new Date().getFullYear()}-${ts}`;
}

export function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const [orderNumber] = useState(generateOrderNumber);
  const [cart] = useState(() => getCart());

  const recipientName = searchParams.get("recipient") || "Sevdikleriniz";
  const deliveryDate  = searchParams.get("date")      || "Yarın";
  const deliveryTime  = searchParams.get("time")      || "14:00 – 18:00";
  const deliveryCity  = searchParams.get("city")      || "İstanbul";

  const itemTotal   = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const upsellTotal = cart.upsells.reduce((s, u) => s + u.price * u.quantity, 0);
  const grandTotal  = itemTotal + upsellTotal;

  useEffect(() => {
    const t = setTimeout(() => saveCart({ items: [], upsells: [] }), 1500);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    { icon: CheckCircle, label: "Sipariş Alındı",   done: true  },
    { icon: Package,     label: "Hazırlanıyor",      done: false },
    { icon: Truck,       label: "Kargoya Verildi",   done: false },
    { icon: MapPin,      label: "Teslim Edildi",     done: false },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Header />
      <div className="max-w-[680px] mx-auto px-5 py-12 lg:py-20">
        <div className="text-center mb-10">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }} className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)", boxShadow: "0 16px 48px rgba(139,92,246,0.4)" }}>
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={1.8} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 style={{ fontFamily: "var(--font-display)", lineHeight: 1.08 }} className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-3">Siparişiniz Alındı! 🎉</h1>
            <p className="text-[#6B7280] text-base leading-relaxed max-w-md mx-auto">Siparişiniz başarıyla oluşturuldu. Floristlerimiz en kısa sürede hazırlamaya başlayacak.</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-[24px] p-6 mb-5" style={{ background: "linear-gradient(135deg, #F5F3FF, #EDE9FE)", border: "1.5px solid rgba(139,92,246,0.2)" }}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-[#8B5CF6] uppercase font-bold mb-1">Sipariş Numarası</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }} className="font-semibold text-[#111827]">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.25em] text-[#8B5CF6] uppercase font-bold mb-1">Sipariş Tarihi</p>
              <p className="text-sm font-semibold text-[#374151]">{new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-[24px] p-6 mb-5" style={{ border: "1px solid rgba(139,92,246,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <p className="text-[10px] tracking-[0.25em] text-[#8B5CF6] uppercase font-bold mb-5">Teslimat Bilgileri</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: MapPin,  label: "Teslimat Şehri", value: deliveryCity },
              { icon: Heart,   label: "Alıcı",          value: recipientName },
              { icon: Clock,   label: "Tahmini Tarih",  value: deliveryDate },
              { icon: Truck,   label: "Teslimat Saati", value: deliveryTime },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #EDE9FE, #DDD6FE)" }}><Icon className="w-4 h-4 text-[#8B5CF6]" /></div>
                <div>
                  <p className="text-[10px] text-[#9CA3AF] font-semibold uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-semibold text-[#111827] mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {grandTotal > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-[24px] p-6 mb-5" style={{ border: "1px solid rgba(139,92,246,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <p className="text-[10px] tracking-[0.25em] text-[#8B5CF6] uppercase font-bold mb-5">Sipariş Özeti</p>
            <div className="space-y-3">
              {cart.items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#F3F4F6]"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-[#111827] truncate">{item.name}</p><p className="text-xs text-[#9CA3AF]">×{item.quantity}</p></div>
                  <span className="text-sm font-bold text-[#111827] flex-shrink-0">₺{(item.price * item.quantity).toLocaleString("tr-TR")}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-[#EDE9FE] flex justify-between items-center">
              <span className="font-bold text-[#111827]">Toplam</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }} className="font-semibold text-[#8B5CF6]">₺{grandTotal.toLocaleString("tr-TR")}</span>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-3">
          <Link to="/kategori/buketler" className="flex-1">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)", boxShadow: "0 8px 24px rgba(139,92,246,0.4)" }}>
              Alışverişe Devam Et <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <a href="https://wa.me/905551234567" className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[#374151] font-bold text-sm border border-[#E5E7EB] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all">
            <Phone className="w-4 h-4" />
            Siparişimi Takip Et
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {[
            { icon: Star,        text: "4.9★ Müşteri Puanı" },
            { icon: Truck,       text: "Takipli Kargo" },
            { icon: CheckCircle, text: "Taze Garanti" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-[#9CA3AF]"><Icon className="w-3.5 h-3.5 text-[#8B5CF6]" />{text}</div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}