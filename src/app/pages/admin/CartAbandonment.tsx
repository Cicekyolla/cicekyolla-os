import { useState } from "react";
import { AdminTopBar } from "../../components/AdminTopBar";
import { motion } from "motion/react";
import { ShoppingCart, Mail, MessageSquare, TrendingUp, Users, Clock, AlertTriangle } from "lucide-react";

const abandonedCarts = [
  { id: "c1", customer: "Ayşe K.", email: "ayse@email.com", phone: "0532111", value: 849, items: 2, time: "2 saat önce", step: "Teslimat", recovered: false },
  { id: "c2", customer: "Mehmet Y.", email: "m.yilmaz@email.com", phone: "0533222", value: 1249, items: 3, time: "4 saat önce", step: "Ödeme", recovered: false },
  { id: "c3", customer: "Zeynep A.", email: "zeynep@email.com", phone: "0535333", value: 599, items: 1, time: "Dün", step: "Sepet", recovered: true },
  { id: "c4", customer: "Emre D.", email: "emre@email.com", phone: "0536444", value: 2199, items: 4, time: "Dün", step: "Ödeme", recovered: false },
];

const automations = [
  { name: "1. Saat", trigger: "Sepet terk edildi", action: "WhatsApp hatırlatıcı", cr: "18.4%", active: true },
  { name: "24. Saat", trigger: "Satin alma yok", action: "E-posta + %5 indirim", cr: "12.1%", active: true },
  { name: "72. Saat", trigger: "Hala inaktif", action: "Son şans SMS", cr: "6.8%", active: false },
];

export function CartAbandonment() {
  return (
    <div className="p-6 lg:p-8 min-h-screen overflow-x-hidden" style={{ background: "#0A0118", overflowX: "hidden" }}>
      <AdminTopBar title="Sepet Terk Analizi" subtitle="Kurtarma otomasyon kuralları ve terk edilen sepet takıbi" />
      <div className="mt-7 space-y-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Bu Ay Terk", value: "127", color: "#EF4444", icon: ShoppingCart },
            { label: "Kaybedilen Gelir", value: "₺84.2K", color: "#F59E0B", icon: TrendingUp },
            { label: "Kurtarılan", value: "34", color: "#10B981", icon: Users },
            { label: "Kurtarma Oranı", value: "%26.7", color: "#8B5CF6", icon: AlertTriangle },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="rounded-[20px] p-5" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-bold">{label}</p>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color }} className="font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-[22px] overflow-hidden" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}><p className="font-bold text-white">Terk Edilen Sepetler</p></div>
            <div className="divide-y" style={{ divideColor: "rgba(255,255,255,0.04)" }}>
              {abandonedCarts.map(cart => (
                <div key={cart.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">{cart.customer}</p>
                    <p className="text-xs text-[#6B7280]">{cart.step} — {cart.time}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[#10B981]">₺{cart.value}</p>
                    <p className="text-xs text-[#6B7280]">{cart.items} ürün</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0" style={cart.recovered ? { background: "rgba(16,185,129,0.15)", color: "#10B981" } : { background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>
                    {cart.recovered ? "Kurtarıldı" : "Bekliyor"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[22px] overflow-hidden" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}><p className="font-bold text-white">Otomasyon Kuralları</p></div>
            <div className="divide-y" style={{ divideColor: "rgba(255,255,255,0.04)" }}>
              {automations.map((a, i) => (
                <div key={i} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-white">{a.name}: {a.name}</p>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={a.active ? { background: "rgba(16,185,129,0.15)", color: "#10B981" } : { background: "rgba(255,255,255,0.05)", color: "#6B7280" }}>{a.active ? "Aktif" : "Devre Dışı"}</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">{a.action} • CVR: {a.cr}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
