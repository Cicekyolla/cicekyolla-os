import { useState } from "react";
import { AdminTopBar } from "../../components/AdminTopBar";
import { motion } from "motion/react";
import { TrendingUp, ToggleLeft, ToggleRight, Star, Package } from "lucide-react";
import { allUpsellProducts } from "../../lib/revenueStore";

export function UpsellProducts() {
  const [products, setProducts] = useState(
    allUpsellProducts.map(p => ({ ...p }))
  );
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const toggle = (id: string) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));

  const categories = [
    { id: "all", label: "Tümü" },
    { id: "delivery", label: "Teslimat" },
    { id: "gifts", label: "Hediyeler" },
    { id: "flowers", label: "Çiçek" },
    { id: "vase", label: "Vazo" },
    { id: "experience", label: "Deneyim" },
    { id: "corporate", label: "Kurumsal" },
  ];

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const activeCount = products.filter(p => p.active).length;
  const totalRevenue = products.reduce((s, p) => s + p.revenue, 0);
  const avgCr = (products.reduce((s, p) => s + p.conversionRate, 0) / products.length).toFixed(1);

  return (
    <div className="p-6 lg:p-8 min-h-screen overflow-x-hidden" style={{ background: "#0A0118", overflowX: "hidden" }}>
      <AdminTopBar title="Upsell Ürünleri" subtitle="Checkout upsell ürünleri ve dönüşüm yönetimi" />

      <div className="mt-7 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Toplam Ürün", value: products.length, color: "#8B5CF6", icon: Package },
            { label: "Aktif", value: activeCount, color: "#10B981", icon: ToggleRight },
            { label: "Ort. CVR", value: `%${avgCr}`, color: "#F59E0B", icon: Star },
            { label: "Toplam Gelir", value: `₺${(totalRevenue/1000).toFixed(0)}K`, color: "#A855F7", icon: TrendingUp },
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

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ürün ara..." className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder:text-[#4B5563] focus:outline-none" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.07)" }} />
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)} className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all" style={activeCategory === c.id ? { background: "linear-gradient(135deg, #8B5CF6, #A855F7)", color: "#fff" } : { background: "rgba(255,255,255,0.04)", color: "#9CA3AF", border: "1px solid rgba(255,255,255,0.07)" }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-[22px] overflow-hidden" style={{ background: "#13072A", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <div style={{ minWidth: "700px" }}>
              <div className="grid px-5 py-3 text-[10px] tracking-widests text-[#4B5563] uppercase font-bold border-b" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto", borderColor: "rgba(255,255,255,0.05)" }}>
                <span>Ürün</span><span>Kategori</span><span className="text-right">Fiyat</span><span className="text-right">Satış</span><span className="text-right">CVR</span><span />
              </div>
              {filtered.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="grid px-5 py-4 items-center border-b" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto", borderColor: "rgba(255,255,255,0.04)", opacity: product.active ? 1 : 0.5 }}>
                  <div>
                    <p className="text-sm font-bold text-white">{product.name}</p>
                    <p className="text-xs text-[#6B7280]">{product.sub}</p>
                  </div>
                  <span className="text-xs text-[#9CA3AF] capitalize">{product.category}</span>
                  <span className="text-sm font-bold text-white text-right">{product.price === 0 ? "Ücr." : `₺${product.price}`}</span>
                  <span className="text-sm font-bold text-[#10B981] text-right">{product.totalSold.toLocaleString("tr-TR")}</span>
                  <span className="text-sm font-bold text-[#8B5CF6] text-right">%{product.conversionRate}</span>
                  <button onClick={() => toggle(product.id)} className="ml-3">
                    {product.active ? <ToggleRight className="w-6 h-6 text-[#8B5CF6]" /> : <ToggleLeft className="w-6 h-6 text-[#4B5563]" />}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
