// CICEKYOLLA OS — Homepage Admin
// Manage storefront homepage sections, ordering and visibility.
// Full source: github.com/Cicekyolla/cicekyolla-os
import { useState } from 'react';
import {
  GripVertical, Eye, EyeOff, ChevronUp, ChevronDown, Save, Check,
  LayoutTemplate, Image, Flame, Star, Truck, Tag, Newspaper, Quote,
} from 'lucide-react';
import { T } from './ui-kit';

type SectionKind =
  | 'hero' | 'categories' | 'bestsellers' | 'sameday' | 'campaign'
  | 'occasions' | 'blog' | 'testimonials' | 'trust';

interface HomeSection {
  id: SectionKind;
  label: string;
  desc: string;
  icon: typeof LayoutTemplate;
  visible: boolean;
}

const ICONS: Record<SectionKind, typeof LayoutTemplate> = {
  hero: Image, categories: LayoutTemplate, bestsellers: Flame,
  sameday: Truck, campaign: Tag, occasions: Star, blog: Newspaper,
  testimonials: Quote, trust: Star,
};

// Default homepage composition (real storefront config, editable by admin).
const DEFAULT_SECTIONS: HomeSection[] = [
  { id: 'hero',         label: 'Hero Banner',            desc: 'Ana görsel + arama + aynı gün teslimat rozeti', icon: ICONS.hero,         visible: true },
  { id: 'categories',   label: 'Kategori Vitrini',       desc: 'Öne çıkan kategori kartları',                   icon: ICONS.categories,   visible: true },
  { id: 'bestsellers',  label: 'Çok Satanlar',           desc: 'En çok sipariş edilen ürünler',                 icon: ICONS.bestsellers,  visible: true },
  { id: 'sameday',      label: 'Aynı Gün Teslimat',      desc: 'Saat sınırı geri sayım + bölge seçimi',         icon: ICONS.sameday,      visible: true },
  { id: 'occasions',    label: 'Özel Günler',            desc: 'Doğum günü, yıldönümü, sevgililer günü',        icon: ICONS.occasions,    visible: true },
  { id: 'campaign',     label: 'Kampanya Şeridi',        desc: 'Aktif kampanya / indirim bandı',                icon: ICONS.campaign,     visible: true },
  { id: 'blog',         label: 'Blog & İçerik',          desc: 'SEO blog yazıları vitrini',                     icon: ICONS.blog,         visible: false },
  { id: 'testimonials', label: 'Müşteri Yorumları',      desc: 'Onaylı müşteri değerlendirmeleri',              icon: ICONS.testimonials, visible: true },
  { id: 'trust',        label: 'Güven Unsurları',        desc: 'Güvenli ödeme, iade, çağrı merkezi rozetleri',  icon: ICONS.trust,        visible: true },
];

export function ScreenHomepageAdmin() {
  const [sections, setSections] = useState<HomeSection[]>(DEFAULT_SECTIONS);
  const [saved, setSaved] = useState(false);

  function move(index: number, dir: -1 | 1) {
    const next = [...sections];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setSections(next);
    setSaved(false);
  }

  function toggle(index: number) {
    const next = [...sections];
    next[index] = { ...next[index], visible: !next[index].visible };
    setSections(next);
    setSaved(false);
  }

  function save() {
    // Persist homepage layout. Wire to PATCH /admin/homepage/layout.
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  const visibleCount = sections.filter(s => s.visible).length;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        flexShrink: 0, padding: '18px 24px', borderBottom: `1px solid ${T.gray100}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff',
      }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 900, color: T.gray900, letterSpacing: '-0.02em' }}>
            Homepage Admin
          </div>
          <div style={{ fontSize: 12.5, color: T.gray400, marginTop: 2 }}>
            Ana sayfa bölümlerini düzenle, sırala ve görünürlüğü yönet · {visibleCount}/{sections.length} aktif
          </div>
        </div>
        <button
          onClick={save}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px',
            borderRadius: 9, border: 'none', cursor: 'pointer',
            background: saved ? T.greenLight : T.green,
            color: saved ? T.greenDark : '#fff',
            fontSize: 13, fontWeight: 700, transition: 'all 0.15s',
          }}
        >
          {saved ? <Check style={{ width: 15, height: 15 }} /> : <Save style={{ width: 15, height: 15 }} />}
          {saved ? 'Kaydedildi' : 'Düzeni Kaydet'}
        </button>
      </div>

      {/* Section list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: T.gray50 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: '#fff', border: `1px solid ${T.gray100}`,
                  borderRadius: 12, padding: '14px 16px',
                  opacity: section.visible ? 1 : 0.55,
                  transition: 'opacity 0.15s',
                }}
              >
                <GripVertical style={{ width: 16, height: 16, color: T.gray300, flexShrink: 0, cursor: 'grab' }} />

                <div style={{
                  width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                  background: section.visible ? T.greenLight : T.gray100,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon style={{ width: 18, height: 18, color: section.visible ? T.green : T.gray400 }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: T.gray900 }}>
                    {i + 1}. {section.label}
                  </div>
                  <div style={{ fontSize: 11.5, color: T.gray400, marginTop: 1 }}>{section.desc}</div>
                </div>

                {/* Reorder */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <button onClick={() => move(i, -1)} disabled={i === 0}
                    style={{ border: 'none', background: 'transparent', cursor: i === 0 ? 'default' : 'pointer', padding: 2, opacity: i === 0 ? 0.3 : 1 }}>
                    <ChevronUp style={{ width: 16, height: 16, color: T.gray500 }} />
                  </button>
                  <button onClick={() => move(i, 1)} disabled={i === sections.length - 1}
                    style={{ border: 'none', background: 'transparent', cursor: i === sections.length - 1 ? 'default' : 'pointer', padding: 2, opacity: i === sections.length - 1 ? 0.3 : 1 }}>
                    <ChevronDown style={{ width: 16, height: 16, color: T.gray500 }} />
                  </button>
                </div>

                {/* Visibility */}
                <button
                  onClick={() => toggle(i)}
                  title={section.visible ? 'Gizle' : 'Göster'}
                  style={{
                    width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                    border: `1px solid ${section.visible ? T.green : T.gray200}`,
                    background: section.visible ? T.greenLight : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}
                >
                  {section.visible
                    ? <Eye style={{ width: 16, height: 16, color: T.green }} />
                    : <EyeOff style={{ width: 16, height: 16, color: T.gray400 }} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
