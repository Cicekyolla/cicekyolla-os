import { useState } from "react";
import { AdminTopBar } from "../../components/AdminTopBar";
import { motion } from "motion/react";
import { Package, Gift, Heart, Sparkles, Coffee, Star, ToggleLeft, ToggleRight } from "lucide-react";

const attachments = [
  { id: "g1", name: "Premium Çikolata Kutusu", category: "Hediye", price: 149, sold: 1893, cr: "41%", icon: Gift, active: true, color: "#EC4899" },
  { id: "g2", name: "Makaron Kutusu", category: "Hediye", price: 129, sold: 734, cr: "29%", icon: Star, active: true, color: "#8B5CF6" },
  { id: "g3", name: "Sevimli Teddy Bear", category: "Hediye", price: 199, sold: 612, cr: "26%", icon: Heart, active: true, color: "#F59E0B" },
  { id: "g4", name: "Premium Kahve Seti", category: "Hediye", price: 159, sold: 398, cr: "19%", icon: Coffee, active: true, color: "#A855F7" },
  { id: "e1", name: "Video Mesaj QR", category: "Deneyim", price: 49, sold: 892, cr: "31%", icon: Sparkles, active: true, color: "#10B981" },
  { id: "f3", name: "Premium Siyah Kutu", category: "Ambalaj", price: 89, sold: 2341, cr: "44%", icon: Package, active: true, color: "#6B7280" },
];

export function ProductAttachments() {
  const [items, setItems] = useState(attachments);
  const toggle = (id: string) => setItems(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));

  const totalRevenue = items.reduce((s, a) => s + a.price * a.sold, 0);

  return (
    <div className="p-6 lg:p-8 min-h-screen overflow-x-hidden" style={{ background: "#0A0118", overflowX: "hidden" }}>
      <AdminTopBar title="Ürün Eklemeleri" subtitle="Hediye, deneyim ve ambalaj eklentileri yönetimi" />
      <div className="mt-7 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Toplam Eklenti", value: items.length, color: "#8B5CF6" },
            { label: "En Yüksek CVR", value: `%${Math.max(...items.map(a => parseFloat(a.cr)))}`, color: "#10B981" },
            { label: "Toplam Gelir", value: `₺${(totalRevenue/1000).toFixed(0)}K`, color: "#F59E0B" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-[20px] p-5" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-bold mb-3">{label}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color }} className="font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[22px] overflow-hidden" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}><p className="font-bold text-white">Ürün Eklentileri</p></div>
          <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <div style={{ minWidth: "600px" }}>
              <div className="grid px-6 py-3 text-[10px] tracking-widest text-[#4B5563] uppercase font-bold border-b" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto", borderColor: "rgba(255,255,255,0.05)" }}>
                <span>Eklenti</span><span>Kategori</span><span className="text-right">Fiyat</span><span className="text-right">Satış</span><span className="text-right">CVR</span><span />
              </div>
              {items.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="grid px-6 py-4 items-center border-b" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto", borderColor: "rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${a.color}15` }}><Icon className="w-4 h-4" style={{ color: a.color }} /></div>
                      <p className="text-sm font-bold text-white">{a.name}</p>
                    </div>
                    <span className="text-xs text-[#9CA3AF]">{a.category}</span>
                    <span className="text-sm font-bold text-white text-right">₺{a.price}</span>
                    <span className="text-sm font-bold text-[#10B981] text-right">{a.sold.toLocaleString("tr-TR")}</span>
                    <span className="text-sm font-bold text-right" style={{ color: a.color }}>{a.cr}</span>
                    <button onClick={() => toggle(a.id)} className="ml-2">{a.active ? <ToggleRight className="w-6 h-6 text-[#8B5CF6]" /> : <ToggleLeft className="w-6 h-6 text-[#4B5563]" />}</button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
