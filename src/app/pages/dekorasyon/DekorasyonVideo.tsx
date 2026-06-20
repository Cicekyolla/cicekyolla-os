import { useState } from "react";
import { Link } from "react-router";
import { DekorasyonNav } from "../../components/dekorasyon/DekorasyonNav";
import { motion } from "motion/react";
import { Play, Eye, Clock, ArrowRight } from "lucide-react";
import { videoGallery } from "../../lib/dekorasyonData";

const GOLD = "#C9A84C";

const videoCategories = [
  { id: "all", label: "Tümü" },
  { id: "otel", label: "Otel" },
  { id: "kafe", label: "Kafe" },
  { id: "ofis", label: "Ofis" },
  { id: "dugun", label: "Düğün" },
  { id: "uygulama", label: "Uygulama" },
  { id: "yorum", label: "Müşteri Yorumları" },
];

export function DekorasyonVideo() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = activeFilter === "all" ? videoGallery : videoGallery.filter(v => v.category === activeFilter);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", overflowX: "hidden", color: "#fff" }}>
      <DekorasyonNav />
      <div className="pt-20" />
      <section className="py-20" style={{ background: "linear-gradient(180deg, #111 0%, #0A0A0A 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: GOLD }} />
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: GOLD }}>Video Galerisi</p>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", lineHeight: 1.08 }} className="text-4xl lg:text-6xl font-semibold text-white mb-5">Proje Videoları</h1>
          <p className="text-white/50 text-lg max-w-2xl">Projelerimizi ve uygulama süreçlerini videolarla keşfedin.</p>
        </div>
      </section>
      <section className="pb-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <div className="relative overflow-hidden rounded-[24px] group cursor-pointer" style={{ aspectRatio: "21/9" }} onClick={() => setPlaying("featured")}>
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2400&h=1200&fit=crop&auto=format&q=92" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%)" }} />
            <div className="absolute inset-0 flex items-center">
              <div className="px-14 py-10 max-w-2xl">
                <span className="text-[10px] tracking-widest uppercase font-bold mb-3 block" style={{ color: GOLD }}>Öne Çıkan Video</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", lineHeight: 1.1 }} className="text-white font-semibold mb-4">2024–2025 Proje Derleme Filmi</h2>
                <p className="text-white/60 text-sm mb-6">Türkiye'nin dört bir yanındaki projelerimizden en etkileyici dönüşümler.</p>
                <button className="flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-sm text-black" style={{ background: `linear-gradient(135deg, ${GOLD}, #E8C97A)` }}>
                  <Play className="w-4 h-4" /> Videoyu İzle (8:45)
                </button>
              </div>
            </div>
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 hidden lg:flex w-24 h-24 rounded-full items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}CC, #E8C97ACC)`, boxShadow: `0 0 60px ${GOLD}50` }}>
              <Play className="w-10 h-10 text-black fill-black" />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-10" style={{ scrollbarWidth: "none" }}>
            {videoCategories.map(cat => (
              <button key={cat.id} onClick={() => setActiveFilter(cat.id)}
                className="flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all"
                style={activeFilter === cat.id ? { background: `linear-gradient(135deg, ${GOLD}, #E8C97A)`, color: "#000" } : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }}>{cat.label}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((video, idx) => (
              <motion.div key={video.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
                <div className="group relative overflow-hidden rounded-[18px] cursor-pointer" style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)" }} onClick={() => setPlaying(video.id)}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                    <img src={video.thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, #E8C97A)`, boxShadow: `0 8px 32px rgba(201,168,76,0.5)` }}>
                        <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded text-[11px] font-bold text-white" style={{ background: "rgba(0,0,0,0.75)" }}>{video.duration}</div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-black" style={{ background: GOLD }}>{video.category}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-sm mb-2 leading-snug">{video.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-white/35">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{video.views} izlenme</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{video.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14">
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-semibold text-white mb-4">Projeniz Nasıl Görünür?</h2>
          <p className="text-white/40 text-sm mb-8">Ücr etsiz görsel simülasyon ve proje teklifi alın.</p>
          <Link to="/dekorasyon/proje-talebi">
            <motion.button whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-sm text-black" style={{ background: `linear-gradient(135deg, ${GOLD}, #E8C97A)` }}>
              Proje Talebi <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </section>
      <div className="lg:hidden h-20" />
    </div>
  );
}
