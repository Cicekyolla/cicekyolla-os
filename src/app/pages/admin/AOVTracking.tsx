import { useState } from "react";
import { AdminTopBar } from "../../components/AdminTopBar";
import { motion } from "motion/react";
import { TrendingUp, ShoppingCart, Award, Target, ArrowUp, ArrowDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const aovData = [
  { month: "Oca", aov: 580, orders: 312, revenue: 181056 },
  { month: "Şub", aov: 624, orders: 389, revenue: 242736 },
  { month: "Mar", aov: 598, orders: 401, revenue: 239798 },
  { month: "Nis", aov: 651, orders: 445, revenue: 289695 },
  { month: "May", aov: 689, orders: 512, revenue: 352768 },
  { month: "Haz", aov: 723, orders: 598, revenue: 432454 },
];

const segmentAov = [
  { segment: "VIP", aov: 1842, color: "#F59E0B" },
  { segment: "Kurumsal", aov: 2340, color: "#3B82F6" },
  { segment: "Aktif", aov: 640, color: "#10B981" },
  { segment: "Yeni", aov: 420, color: "#8B5CF6" },
  { segment: "Risk", aov: 280, color: "#EF4444" },
];

const strategies = [
  { title: "Bundle Teklifleri", impact: "+₺187 AOV", cr: "23%", status: "Aktif" },
  { title: "Premium Ambalaj Upsell", impact: "+₺89 AOV", cr: "44%", status: "Aktif" },
  { title: "Çikolata Eklentisi", impact: "+₺149 AOV", cr: "41%", status: "Aktif" },
  { title: "VIP Kurye Yükseltme", impact: "+₺149 AOV", cr: "18%", status: "Test" },
  { title: "El Yazısı Kart", impact: "+₺69 AOV", cr: "28%", status: "Aktif" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs" style={{ background: "#1A0A38", border: "1px solid rgba(139,92,246,0.3)" }}>
      <p className="text-[#9CA3AF] mb-1">{label}</p>
      {payload.map((p: any, i: number) => <p key={i} className="font-bold" style={{ color: p.color || "#C084FC" }}>{p.name}: {p.name === "AOV" ? `₺${p.value}` : p.value.toLocaleString("tr-TR")}</p>)}
    </div>
  );
}

export function AOVTracking() {
  const currentAov = aovData[aovData.length - 1].aov;
  const prevAov = aovData[aovData.length - 2].aov;
  const aovChange = ((currentAov - prevAov) / prevAov * 100).toFixed(1);

  return (
    <div className="p-6 lg:p-8 min-h-screen overflow-x-hidden" style={{ background: "#0A0118", overflowX: "hidden" }}>
      <AdminTopBar title="AOV Takibi" subtitle="Ortalama sipariş değeri analitikleri ve büyüme stratejileri" />

      <div className="mt-7 space-y-7">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Mevcut AOV", value: `₺${currentAov}`, change: `+${aovChange}%`, color: "#8B5CF6", icon: ShoppingCart, positive: true },
            { label: "Hedef AOV", value: "₺800", change: "-%9.3", color: "#F59E0B", icon: Target, positive: false },
            { label: "VIP AOV", value: "₺1.842", change: "+12%", color: "#10B981", icon: Award, positive: true },
            { label: "Upsell Katkısı", value: "₺247", change: "+8%", color: "#A855F7", icon: TrendingUp, positive: true },
          ].map(({ label, value, change, color, icon: Icon, positive }) => (
            <div key={label} className="rounded-[20px] p-5" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-bold">{label}</p>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color }} className="font-semibold leading-none">{value}</p>
              <div className="flex items-center gap-1 mt-2">
                {positive ? <ArrowUp className="w-3 h-3 text-[#10B981]" /> : <ArrowDown className="w-3 h-3 text-[#EF4444]" />}
                <p className="text-[11px] font-bold" style={{ color: positive ? "#10B981" : "#EF4444" }}>{change} ay/ay</p>
              </div>
            </div>
          ))}
        </div>

        {/* AOV Trend Chart */}
        <div className="rounded-[22px] p-6" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-lg font-bold text-white mb-5">AOV Trendi — 6 Ay</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={aovData} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#9CA3AF", fontSize: 11 }} />
              <Line type="monotone" dataKey="aov" name="AOV" stroke="#8B5CF6" strokeWidth={2.5} dot={{ fill: "#8B5CF6", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Segment AOV */}
          <div className="rounded-[22px] p-6" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-lg font-bold text-white mb-5">Segmente Göre AOV</p>
            <div className="space-y-4">
              {segmentAov.map(({ segment, aov, color }) => (
                <div key={segment}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-white">{segment}</span>
                    <span className="text-sm font-bold" style={{ color }}>₺{aov.toLocaleString("tr-TR")}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(aov / 2340) * 100}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full" style={{ background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategies */}
          <div className="rounded-[22px] overflow-hidden" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <p className="font-bold text-white">AOV Artış Stratejileri</p>
            </div>
            <div className="divide-y" style={{ divideColor: "rgba(255,255,255,0.04)" }}>
              {strategies.map((s, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-bold text-white">{s.title}</p>
                    <p className="text-xs text-[#10B981] font-bold">{s.impact}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#6B7280]">CVR: {s.cr}</span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={s.status === "Aktif" ? { background: "rgba(16,185,129,0.15)", color: "#10B981" } : { background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
