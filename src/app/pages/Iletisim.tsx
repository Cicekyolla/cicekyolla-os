import { useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";

export function Iletisim() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-[#374151] placeholder:text-[#9CA3AF] focus:outline-none transition-all bg-[#FAFAFA]";
  const inputStyle = { border: "1.5px solid rgba(139,92,246,0.15)" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { (e.target as HTMLElement).style.borderColor = "#8B5CF6"; };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { (e.target as HTMLElement).style.borderColor = "rgba(139,92,246,0.15)"; };

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-black/[0.06] py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-14 text-center">
          <p className="text-[11px] tracking-[0.28em] text-[#8B5CF6] uppercase font-bold mb-4">Bize Ulaşın</p>
          <h1 style={{ fontFamily: "var(--font-display)", lineHeight: 1.08 }} className="text-4xl lg:text-5xl font-semibold text-[#111827] mb-4">İletişim</h1>
          <p className="text-[#9CA3AF] text-base max-w-lg mx-auto">Size yardımcı olmaktan mutluluk duyarız. WhatsApp, telefon veya form ile bize ulaşın.</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-14 py-16">
        <div className="grid lg:grid-cols-[380px_1fr] gap-12">
          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: Phone, label: "Telefon", value: "0555 123 45 67", href: "tel:+905551234567", color: "#8B5CF6" },
              { icon: MessageCircle, label: "WhatsApp", value: "0555 123 45 67", href: "https://wa.me/905551234567", color: "#25D366" },
              { icon: Mail, label: "E-posta", value: "info@cicekyolla.com.tr", href: "mailto:info@cicekyolla.com.tr", color: "#8B5CF6" },
              { icon: MapPin, label: "Adres", value: "Kadıköy, İstanbul", href: "#", color: "#8B5CF6" },
              { icon: Clock, label: "Çalışma Saatleri", value: "Hergün 08:00 – 22:00", href: "#", color: "#8B5CF6" },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <a key={label} href={href} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-black/[0.05] hover:border-[#DDD6FE] transition-all group" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-[11px] text-[#9CA3AF] font-semibold tracking-wide uppercase mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-[#111827] group-hover:text-[#8B5CF6] transition-colors">{value}</p>
                </div>
              </a>
            ))}

            <a href="https://wa.me/905551234567" className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 8px 24px rgba(37,211,102,0.3)" }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp'tan Yazın
            </a>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-[28px] p-8 lg:p-10" style={{ border: "1.5px solid rgba(139,92,246,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.05)" }}>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}>
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-semibold text-[#111827] mb-3">Mesajınız Alındı!</h3>
                <p className="text-[#6B7280] text-sm">En kısa sürede size geri döneceğiz.</p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.28em] text-[#8B5CF6] uppercase font-bold mb-5">Bize Yazın</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-[11px] tracking-[0.15em] text-[#6B7280] uppercase font-bold mb-1.5">Ad Soyad</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Adınız Soyadınız" className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></div>
                    <div><label className="block text-[11px] tracking-[0.15em] text-[#6B7280] uppercase font-bold mb-1.5">E-posta</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="ornek@email.com" className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></div>
                  </div>
                </div>
                <div><label className="block text-[11px] tracking-[0.15em] text-[#6B7280] uppercase font-bold mb-1.5">Konu</label><select value={form.subject} onChange={e => set('subject', e.target.value)} className={inputCls} style={inputStyle} onFocus={onFocus} onBlur={onBlur}><option value="">Konu seçin</option><option>Sipariş</option><option>Kurumsal</option><option>Şikayet</option><option>Diğer</option></select></div>
                <div><label className="block text-[11px] tracking-[0.15em] text-[#6B7280] uppercase font-bold mb-1.5">Mesaj</label><textarea rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Mesajınızı yazın..." className="w-full px-4 py-3 rounded-xl text-sm text-[#374151] placeholder:text-[#9CA3AF] focus:outline-none transition-all resize-none bg-[#FAFAFA]" style={inputStyle} onFocus={onFocus} onBlur={onBlur} /></div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setSent(true)} className="w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)", boxShadow: "0 8px 24px rgba(139,92,246,0.35)" }}>
                  <Send className="w-4 h-4" /> Mesajı Gönder
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
