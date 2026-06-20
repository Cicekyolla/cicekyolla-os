import { useState } from "react";
import { AdminTopBar } from "../../components/AdminTopBar";
import { motion } from "motion/react";
import { Package, Plus, Edit2, Trash2, ToggleLeft, ToggleRight, TrendingUp } from "lucide-react";

const bundles = [
  { id: "b1", name: "Romantik Sürpriz", products: ["Çikolata", "Teddy Bear", "Premium Ambalaj"], price: 329, normal: 437, saving: 108, sold: 234, revenue: 76986, active: true, emoji: "💝" },
  { id: "b2", name: "VIP Deneyim", products: ["El Yazısı Kart", "Teslimat Fotoğrafı", "Lüks Mum"], price: 169, normal: 217, saving: 48, sold: 156, revenue: 26364, active: true, emoji: "✨" },
  { id: "b3", name: "Doğum Günü Deluxe", products: ["Makaron", "Teddy Bear", "Hediye Kutusu", "El Yazısı Kart"], price: 349, normal: 466, saving: 117, sold: 189, revenue: 65961, active: true, emoji: "🎂" },
  { id: "b4", name: "Kurumsal Paket", products: ["Logo Baskılı Kart", "Kurumsal Fatura", "Şirket Mesajı"], price: 138, normal: 138, saving: 0, sold: 89, revenue: 12282, active: false, emoji: "🏢" },
];

export function BundleManagement() {
  const [items, setItems] = useState(bundles);
  const toggle = (id: string) => setItems(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));

  return (
    <div className="p-6 lg:p-8 min-h-screen overflow-x-hidden" style={{ background: "#0A0118", overflowX: "hidden" }}>
      <AdminTopBar title="Bundle Yönetimi" subtitle="Paket teklifleri oluşturma ve yönetimi" />
      <div className="mt-7 space-y-5">
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-3 gap-4">
            {[{l:"Toplam Bundle",v:items.length,c:"#8B5CF6"},{l:"Aktif Bundle",v:items.filter(b=>b.active).length,c:"#10B981"},{l:"Toplam Gelir",v:`₺${items.reduce((s,b)=>s+b.revenue,0).toLocaleString("tr-TR")}`,c:"#F59E0B"}].map(({l,v,c})=>(
              <div key={l} className="rounded-[18px] p-5" style={{background:"#13072A",border:"1px solid rgba(255,255,255,0.05)"}}>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-bold mb-2">{l}</p>
                <p style={{fontFamily:"var(--font-display)",fontSize:"1.6rem",color:c}} className="font-semibold">{v}</p>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold" style={{background:"linear-gradient(135deg,#8B5CF6,#A855F7)"}}>
            <Plus className="w-4 h-4" /> Yeni Bundle
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map(b=>(
            <motion.div key={b.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="rounded-[22px] p-6" style={{background:"#13072A",border:`1px solid ${b.active?"rgba(139,92,246,0.2)":"rgba(255,255,255,0.05)"}`}}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-2xl mb-2">{b.emoji}</div>
                  <h3 className="font-bold text-white text-lg">{b.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {b.products.map(p=><span key={p} className="text-[10px] px-2 py-0.5 rounded-full text-[#9CA3AF]" style={{background:"rgba(255,255,255,0.05)"}}>{p}</span>)}
                  </div>
                </div>
                <button onClick={()=>toggle(b.id)}>{b.active?<ToggleRight className="w-7 h-7 text-[#8B5CF6]"/>:<ToggleLeft className="w-7 h-7 text-[#4B5563]"/>}</button>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[{l:"Fiyat",v:`₺${b.price}`,c:"#8B5CF6"},{l:"Satış",v:b.sold,c:"#10B981"},{l:"Tasarruf",v:`₺${b.saving}`,c:"#F59E0B"}].map(({l,v,c})=>(
                  <div key={l} className="rounded-xl p-3" style={{background:"rgba(255,255,255,0.04)"}}>
                    <p style={{fontFamily:"var(--font-display)",color:c}} className="text-lg font-semibold">{v}</p>
                    <p className="text-[10px] text-[#6B7280]">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
