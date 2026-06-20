import { useState } from "react";
import { AdminTopBar } from "../../components/AdminTopBar";
import { motion } from "motion/react";
import { Package, Zap, Star, Shield, Clock, ToggleLeft, ToggleRight, TrendingUp } from "lucide-react";

const addons = [
  { id: "d1", name: "90 Dakika Ekspres", desc: "Garantili 90 dk teslimat", price: 89, sold: 1247, revenue: 110983, cr: "34%", icon: Zap, active: true, color: "#F59E0B" },
  { id: "d2", name: "Öncelikli Florist", desc: "Florist önce hazırlar", price: 49, sold: 891, revenue: 43659, cr: "28%", icon: Star, active: true, color: "#8B5CF6" },
  { id: "d3", name: "VIP Kurye", desc: "Beyaz eldivenli özel teslim", price: 149, sold: 423, revenue: 63027, cr: "18%", icon: Shield, active: true, color: "#A855F7" },
  { id: "d4", name: "Belirli Saatte Teslimat", desc: "Dakika hassasiyetiyle", price: 69, sold: 567, revenue: 39123, cr: "22%", icon: Clock, active: true, color: "#10B981" },
  { id: "d5", name: "Gece Teslimatı", desc: "20:00 – 23:00 arası", price: 99, sold: 289, revenue: 28611, cr: "15%", icon: Package, active: false, color: "#6B7280" },
];

export function DeliveryAddons() {
  const [items, setItems] = useState(addons);
  const toggle = (id: string) => setItems(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));

  return (
    <div className="p-6 lg:p-8 min-h-screen overflow-x-hidden" style={{ background: "#0A0118", overflowX: "hidden" }}>
      <AdminTopBar title="Teslimat Addons" subtitle="Teslimat hız ve özellik eklentileri" />
      <div className="mt-7 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Toplam Addon", value: items.length, color: "#8B5CF6", icon: Package },
            { label: "Aktif", value: items.filter(a=>a.active).length, color: "#10B981", icon: TrendingUp },
            { label: "Bu Ay Satış", value: items.reduce((s,a)=>s+a.sold,0).toLocaleString("tr-TR"), color: "#F59E0B", icon: Star },
            { label: "Toplam Gelir", value: `₺${(items.reduce((s,a)=>s+a.revenue,0)/1000).toFixed(0)}K`, color: "#A855F7", icon: Zap },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="rounded-[20px] p-5" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center justify-between mb-3"><p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-bold">{label}</p><Icon className="w-4 h-4" style={{ color }} /></div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color }} className="font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[22px] overflow-hidden" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}><p className="font-bold text-white">Teslimat Eklentileri</p></div>
          <div className="divide-y" style={{ divideColor: "rgba(255,255,255,0.04)" }}>
            {items.map(a => {
              const Icon = a.icon;
              return (
                <div key={a.id} className="flex items-center gap-5 px-6 py-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${a.color}15` }}><Icon className="w-5 h-5" style={{ color: a.color }} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">{a.name}</p>
                    <p className="text-xs text-[#6B7280]">{a.desc} • CVR: {a.cr}</p>
                  </div>
                  <div className="text-right flex-shrink-0 hidden md:block">
                    <p className="text-sm font-bold" style={{ color: a.color }}>₺{a.price}</p>
                    <p className="text-xs text-[#6B7280]">{a.sold} satış</p>
                  </div>
                  <button onClick={() => toggle(a.id)} className="flex-shrink-0 ml-2">
                    {a.active ? <ToggleRight className="w-7 h-7 text-[#8B5CF6]" /> : <ToggleLeft className="w-7 h-7 text-[#4B5563]" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
