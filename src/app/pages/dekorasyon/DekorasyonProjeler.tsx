import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { DekorasyonNav } from "../../components/dekorasyon/DekorasyonNav";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, Package, Clock, Filter } from "lucide-react";
import { projects, projectCategories } from "../../lib/dekorasyonData";

const GOLD = "#C9A84C";

export function DekorasyonProjeler() {
  const [searchParams] = useSearchParams();
  const defaultCat = searchParams.get("tur") || "all";
  const [activeFilter, setActiveFilter] = useState(defaultCat);
  const [sortBy, setSortBy] = useState("featured");

  const filtered = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", overflowX: "hidden", color: "#fff" }}>
      <DekorasyonNav />
      <div className="pt-20" />
      <section className="py-20" style={{ background: "linear-gradient(180deg, #111 0%, #0A0A0A 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: GOLD }} />
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: GOLD }}>Proje Portföyü</p>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", lineHeight: 1.08, letterSpacing: "-0.015em" }} className="text-4xl lg:text-6xl font-semibold text-white mb-5">Tamamlanan Projeler</h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">Otellerden şirket lobilerine, kafelerde düğün salonlarına kadar Türkiye'nin dört bir yanındaki projelerimiz.</p>
        </div>
      </section>
      <div className="sticky top-20 z-30" style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {projectCategories.map(cat => (
                <button key={cat.id} onClick={() => setActiveFilter(cat.id)}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all"
                  style={activeFilter === cat.id ? { background: `linear-gradient(135deg, ${GOLD}, #E8C97A)`, color: "#000" } : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {cat.label}<span className="opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
              <option value="featured">Öne Çıkan</option>
              <option value="newest">En Yeni</option>
              <option value="area">Büyük Alan</option>
            </select>
          </div>
        </div>
      </div>
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <p className="text-white/30 text-sm mb-8">{filtered.length} proje gösteriliyor</p>
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, idx) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07, duration: 0.55 }}>
                  <Link to={`/dekorasyon/proje/${project.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-[20px]" style={{ aspectRatio: "4/3" }}>
                      <motion.img src={project.cover} alt={project.title} className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }} />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black" style={{ background: GOLD }}>{project.category}</div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 style={{ fontFamily: "var(--font-display)" }} className="text-white text-xl font-semibold mb-1">{project.title}</h3>
                        <p className="text-white/55 text-sm mb-3">{project.subtitle}</p>
                        <div className="flex items-center gap-3 text-xs text-white/40">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Package className="w-3 h-3" />{project.productCount}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{project.duration}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && <div className="text-center py-20 text-white/30 text-sm">Bu kategoride proje bulunamadı.</div>}
        </div>
      </section>
      <section className="py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14 text-center">
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-semibold text-white mb-4">Projenizi Birlikte Hayata Geçirelim</h2>
          <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">Ücr etsiz keşif ve fiyat teklifi için hemen başvurun.</p>
          <Link to="/dekorasyon/proje-talebi">
            <motion.button whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-sm text-black" style={{ background: `linear-gradient(135deg, ${GOLD}, #E8C97A)` }}>
              Ücr etsiz Proje Talebi <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </section>
      <div className="lg:hidden h-20" />
    </div>
  );
}
