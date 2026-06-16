// CICEKYOLLA OS — City Landing Pages Implementation
import { useState } from 'react';
import { MapPin, Truck, Clock, Star, Phone, Check, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { T } from './ui-kit';
import { useNav } from '../App';
import { useResponsive } from '../hooks/useResponsive';
import { STOREFRONT_PRODUCTS } from '../data/products-store';

export interface CityData {
  slug: string; name: string; nameTr: string; population: string;
  emoji: string; accent: string; bg: string; sameDay: boolean;
  deliveryHours: string; districts: string[];
  reviews: { author: string; text: string; rating: number; date: string }[];
  faq: { q: string; a: string }[];
  seoTitle: string; seoDescription: string; h1: string; monthlyTraffic: string;
}

export const CITIES: CityData[] = [
  {
    slug: 'istanbul', name: 'İstanbul', nameTr: "İstanbul'a",
    population: '15.8M', emoji: '🌉', accent: '#7C3AED', bg: '#EDE9FE',
    sameDay: true, deliveryHours: '60-90 dakika',
    districts: ['Kadıköy','Beşiktaş','Şişli','Úsküdar','Ataşehir','Bakırköy','Sarıyer','Maltepe','Kartal','Pendik','Beyoğlu','Fatih','Başakşehir','Esenyurt','Zeytinburnu'],
    reviews: [
      { author:'Selin K.', text:"Sabah 10'da sipariş verdim, öğleden önce teslim edildi. Mükemmeldi!", rating:5, date:'14 Haz 2026' },
      { author:'Ahmet Y.', text:"Yıllardır kullanıyorum. İstanbul içi teslimat için en güvenilir firma.", rating:5, date:'12 Haz 2026' },
    ],
    faq: [
      { q: "İstanbul'da aynı gün teslimat var mı?", a: "Evet! 14:00'e kadar verilen siparişler aynı gün 60-90 dakika içinde teslim edilir." },
      { q: 'Hangi ilçelere teslimat yapıyorsunuz?', a: "İstanbul'un tüm 39 ilçesine teslimat yapıyoruz." },
      { q: 'Teslimat fiyatı nedir?', a: "İstanbul içi standart teslimat 29 TL'dir. 500 TL ve üzeri siparişlerde ücretsizdir." },
    ],
    seoTitle: "İstanbul Çiçek Gönder — Aynı Gün Teslimat | Cicekyolla",
    seoDescription: "İstanbul'a aynı gün çiçek teslimatı. 60-90 dakika ekspres, 39 ilçeye hizmet.",
    h1: "İstanbul'a Çiçek Gönder — Aynı Gün Teslimat",
    monthlyTraffic: '4.200 organik',
  },
  {
    slug: 'ankara', name: 'Ankara', nameTr: "Ankara'ya",
    population: '5.6M', emoji: '🏙️', accent: '#2563EB', bg: '#EFF6FF',
    sameDay: true, deliveryHours: '2-4 saat',
    districts: ['Çankaya','Keçiören','Mamak','Etimesgut','Sincan','Yenimahalle','Altındağ'],
    reviews: [
      { author:'Burcu A.', text:"Ankara merkezine 3 saatte teslim. Çok tazeydi.", rating:5, date:'13 Haz 2026' },
    ],
    faq: [
      { q: "Ankara'ya aynı gün teslimat yapılıyor mu?", a: "Evet! Ankara merkez ilçelere 2-4 saat içinde teslimat yapılıyor." },
    ],
    seoTitle: "Ankara Çiçek Gönder — Aynı Gün Teslimat | Cicekyolla",
    seoDescription: "Ankara'ya aynı gün çiçek teslimatı. Çankaya, Keçiören ve tüm Ankara ilçelerine.",
    h1: "Ankara'ya Çiçek Gönder",
    monthlyTraffic: '1.840 organik',
  },
  {
    slug: 'izmir', name: 'İzmir', nameTr: "İzmir'e",
    population: '4.4M', emoji: '🌊', accent: '#0891B2', bg: '#ECFEFF',
    sameDay: true, deliveryHours: '2-5 saat',
    districts: ['Konak','Karşıyaka','Bornova','Buca','Gaziemir','Bayraklı'],
    reviews: [
      { author:'Deniz K.', text:"İzmir'de bu kalitede çiçekçi bulmak zordu. Cicekyolla harika!", rating:5, date:'12 Haz 2026' },
    ],
    faq: [
      { q: "İzmir'e aynı gün teslimat var mı?", a: "Evet, İzmir merkez ilçelere aynı gün 2-5 saat içinde teslimat yapıyoruz." },
    ],
    seoTitle: "İzmir Çiçek Gönder — Aynı Gün Teslimat | Cicekyolla",
    seoDescription: "İzmir'e aynı gün çiçek teslimatı. Konak, Karşıyaka ve tüm İzmir'e taze çiçek.",
    h1: "İzmir'e Çiçek Gönder",
    monthlyTraffic: '1.240 organik',
  },
  {
    slug: 'bursa', name: 'Bursa', nameTr: "Bursa'ya",
    population: '3.1M', emoji: '🏔️', accent: '#15803D', bg: '#F0FDF4',
    sameDay: false, deliveryHours: '1-2 iş günü',
    districts: ['Osmangazi','Yıldırım','Nilüfer','Gemlik','Mudanya'],
    reviews: [
      { author:'Hülya B.', text:"Bursa'ya çiçek göndermenin bu kadar kolay olacağını bilmiyordum!", rating:5, date:'11 Haz 2026' },
    ],
    faq: [
      { q: "Bursa'ya teslimat süresi nedir?", a: "Bursa ilçelerine 1-2 iş günü içinde teslimat yapılmaktadır." },
    ],
    seoTitle: "Bursa Çiçek Gönder — Hızlı Teslimat | Cicekyolla",
    seoDescription: "Bursa'ya çiçek gönder. Osmangazi, Nilüfer ve tüm Bursa'ya hızlı taze çiçek.",
    h1: "Bursa'ya Çiçek Gönder",
    monthlyTraffic: '680 organik',
  },
];

export function ScreenCityPage({ citySlug }: { citySlug?: string }) {
  const { navigate } = useNav();
  const { isMobile } = useResponsive();

  if (!citySlug) {
    return (
      <div style={{ minHeight:'100%', background:'#F5F7FA' }}>
        <div style={{ background:'linear-gradient(135deg,#0a2010,#0D9488)', padding:isMobile?'40px 16px':'64px 60px', textAlign:'center' }}>
          <div style={{ fontSize:isMobile?28:42, fontWeight:900, color:'#fff', letterSpacing:'-0.04em', marginBottom:12 }}>Türkiye Geneline Çiçek Gönder</div>
          <p style={{ fontSize:isMobile?14:17, color:'rgba(255,255,255,0.7)', maxWidth:520, margin:'0 auto' }}>81 ile çiçek teslimatı. Büyük şehirlerde aynı gün, Türkiye genelinde hızlı kargo.</p>
        </div>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:isMobile?'32px 16px':'48px 60px' }}>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)', gap:16 }}>
            {CITIES.map(city => (
              <button key={city.slug} onClick={() => navigate('city' as any, { tab: city.slug })} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, padding:'24px 20px', cursor:'pointer', textAlign:'center', transition:'all 0.18s' }}>
                <div style={{ fontSize:40, marginBottom:10 }}>{city.emoji}</div>
                <div style={{ fontSize:15, fontWeight:800, color:T.gray900, marginBottom:4 }}>{city.name}</div>
                <div style={{ fontSize:11, color:city.accent, fontWeight:700, background:`${city.accent}10`, borderRadius:99, padding:'3px 10px', display:'inline-block', marginBottom:8 }}>{city.sameDay ? 'Aynı Gün ⚡' : '1-2 Gün'}</div>
                <div style={{ fontSize:11, color:T.gray400 }}>Nüfus {city.population}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const city = CITIES.find(c => c.slug === citySlug);
  if (!city) return null;

  const [faqOpen, setFaqOpen] = useState<number|null>(0);
  const products = STOREFRONT_PRODUCTS.filter(p => p.status === 'active').slice(0, 4);

  return (
    <div style={{ minHeight:'100%' }}>
      {/* Hero */}
      <section style={{ background:`linear-gradient(135deg,${city.accent}15,#fff)`, borderBottom:`1px solid ${city.accent}20`, padding:isMobile?'40px 16px':'64px 60px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
            <MapPin style={{ width:16, height:16, color:city.accent }}/>
            <span style={{ fontSize:12, fontWeight:700, color:city.accent }}>TESLIMAT BÖLGESİ</span>
          </div>
          <h1 style={{ fontSize:isMobile?28:46, fontWeight:900, color:T.gray900, letterSpacing:'-0.04em', lineHeight:1.1, margin:'0 0 16px', maxWidth:700 }}>{city.h1}</h1>
          <p style={{ fontSize:isMobile?14:18, color:T.gray500, lineHeight:1.7, margin:'0 0 28px', maxWidth:560 }}>
            {city.name} ve çevresine taze çiçek teslimatı. {city.sameDay ? 'Aynı gün teslimat garantisi.' : '1-2 iş günü hızlı teslimat.'}
          </p>
          <div style={{ display:'flex', gap:isMobile?14:24, marginBottom:28, flexWrap:'wrap' }}>
            {[
              { icon:Clock, val:city.deliveryHours, label:city.sameDay?'Ekspres':'Standart' },
              { icon:Star,  val:'4.9/5',             label:'Google Puan' },
              { icon:Truck, val:'50.000+',            label:'Mutlu Müşteri' },
              { icon:Check, val:'Taze Garanti',       label:'Her Siparişte' },
            ].map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:city.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <s.icon style={{ width:15, height:15, color:city.accent }}/>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>{s.val}</div>
                  <div style={{ fontSize:10.5, color:T.gray400 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <button onClick={() => navigate('sf-cart')} style={{ padding:'14px 28px', border:'none', borderRadius:12, background:city.accent, color:'#fff', fontSize:14, fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
              {city.nameTr} Çiçek Sipariş Ver <ArrowRight style={{ width:14, height:14 }}/>
            </button>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section style={{ padding:isMobile?'40px 16px':'56px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <h2 style={{ fontSize:isMobile?22:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 8px' }}>{city.name} Teslimat Bölgeleri</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:16 }}>
            {city.districts.map(d => (
              <div key={d} style={{ padding:'8px 16px', background:`${city.accent}10`, border:`1px solid ${city.accent}25`, borderRadius:99, fontSize:12.5, fontWeight:600, color:city.accent, display:'flex', alignItems:'center', gap:5 }}>
                <MapPin style={{ width:11, height:11 }}/> {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding:isMobile?'40px 16px':'56px 60px', background:T.gray50 }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <h2 style={{ fontSize:isMobile?22:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 24px' }}>{city.name} için En Çok Tercih Edilenler</h2>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr 1fr':'repeat(4,1fr)', gap:isMobile?12:16 }}>
            {products.map(p => (
              <div key={p.id} onClick={() => navigate('sf-cart')} style={{ background:'#fff', borderRadius:16, border:`1px solid ${T.gray200}`, overflow:'hidden', cursor:'pointer' }}>
                <div style={{ height:isMobile?100:130, background:'#EDE9FE', display:'flex', alignItems:'center', justifyContent:'center', fontSize:isMobile?48:64 }}>{p.emoji}</div>
                <div style={{ padding:'12px 14px' }}>
                  <div style={{ fontSize:12.5, fontWeight:700, color:T.gray800, marginBottom:4, lineHeight:1.3 }}>{p.name}</div>
                  <div style={{ fontSize:15, fontWeight:900, color:'#7C3AED' }}>₺{p.basePrice.toLocaleString('tr-TR')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding:isMobile?'40px 16px':'56px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <h2 style={{ fontSize:isMobile?22:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 24px' }}>{city.name} Müşteri Yorumları</h2>
          <div style={{ display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(2,1fr)', gap:16 }}>
            {city.reviews.map((r,i) => (
              <div key={i} style={{ background:T.gray50, borderRadius:14, border:`1px solid ${T.gray200}`, padding:20 }}>
                <div style={{ display:'flex', gap:2, marginBottom:10 }}>
                  {'*****'.split('').map((_,j) => <span key={j} style={{ fontSize:14, color:j<r.rating?'#FBBF24':T.gray200 }}>*</span>)}
                </div>
                <p style={{ fontSize:13.5, color:T.gray700, lineHeight:1.6, margin:'0 0 12px', fontStyle:'italic' }}">&#34;{r.text}&#34;</p>
                <div style={{ fontSize:12, fontWeight:700, color:T.gray600 }}>{r.author} — {r.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding:isMobile?'40px 16px':'56px 60px', background:T.gray50 }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontSize:isMobile?22:28, fontWeight:900, color:T.gray900, letterSpacing:'-0.03em', margin:'0 0 24px', textAlign:'center' }}>{city.name} Çiçek Teslimatı — SSS</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {city.faq.map((f,i) => (
              <div key={i} style={{ background:'#fff', borderRadius:12, border:`1px solid ${T.gray200}`, overflow:'hidden' }}>
                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} style={{ width:'100%', padding:'16px 20px', border:'none', background:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', textAlign:'left', gap:12 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:T.gray800 }}>{f.q}</span>
                  {faqOpen===i ? <ChevronUp style={{ width:16, height:16, color:T.gray400, flexShrink:0 }}/> : <ChevronDown style={{ width:16, height:16, color:T.gray400, flexShrink:0 }}/>}
                </button>
                {faqOpen===i && <div style={{ padding:'0 20px 18px', fontSize:13.5, color:T.gray600, lineHeight:1.7 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:isMobile?'40px 16px':'56px 60px', background:`linear-gradient(135deg,${city.accent},${city.accent}CC)` }}>
        <div style={{ maxWidth:1100, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:isMobile?26:36, fontWeight:900, color:'#fff', letterSpacing:'-0.03em', marginBottom:12 }}>{city.nameTr} Hemen Çiçek Gönderin</div>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => navigate('sf-cart')} style={{ padding:'14px 32px', border:'none', borderRadius:12, background:'#fff', color:city.accent, fontSize:14, fontWeight:800, cursor:'pointer' }}>Sipariş Ver</button>
            <button style={{ padding:'14px 24px', border:'2px solid rgba(255,255,255,0.6)', borderRadius:12, background:'transparent', color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
              <Phone style={{ width:14, height:14 }}/> 0850 XXX XX XX
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
