import { useEffect, useMemo, useState } from 'react';
import { Archive, CheckCircle2, Eye, FileText, FolderTree, Layers, Plus, RefreshCw, Save, Search, Trash2 } from 'lucide-react';
import { T } from './ui-kit';

type FoundationModule = 'categories' | 'collections' | 'pages';
type PublishStatus = 'draft' | 'scheduled' | 'published' | 'archived';

type FoundationItem = {
  id: string;
  name?: string;
  title?: string;
  slug: string;
  url_path: string;
  status: PublishStatus;
  sort_order: number;
  description?: string;
  excerpt?: string;
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  updated_at?: string;
};

const STATUS_LABEL: Record<PublishStatus, { label: string; color: string; bg: string }> = {
  draft: { label: 'Taslak', color: T.amber, bg: T.amberLight },
  scheduled: { label: 'Planli', color: T.blue, bg: T.blueLight },
  published: { label: 'Yayinda', color: T.green, bg: T.greenLight },
  archived: { label: 'Arsiv', color: T.gray500, bg: T.gray100 },
};

const CONFIG = {
  categories: {
    title: 'Kategori Yonetimi',
    subtitle: 'Urun kategori agaci, URL, SEO ve yayin durumu',
    endpoint: '/api/categories',
    listKey: 'categories',
    icon: FolderTree,
    createLabel: 'Yeni Kategori',
    pathPrefix: '/kategori/',
  },
  collections: {
    title: 'Koleksiyon Yonetimi',
    subtitle: 'Cok satanlar, ayni gun teslimat ve kampanya koleksiyonlari',
    endpoint: '/api/collections',
    listKey: 'collections',
    icon: Layers,
    createLabel: 'Yeni Koleksiyon',
    pathPrefix: '/koleksiyon/',
  },
  pages: {
    title: 'Sayfa Yonetimi',
    subtitle: 'Kurumsal, destek, yasal ve SEO icerik sayfalari',
    endpoint: '/api/pages',
    listKey: 'pages',
    icon: FileText,
    createLabel: 'Yeni Sayfa',
    pathPrefix: '/',
  },
} as const;

const FALLBACK: Record<FoundationModule, FoundationItem[]> = {
  categories: [
    { id: 'cat-1', name: 'Guller', slug: 'guller', url_path: '/kategori/guller', status: 'published', sort_order: 10, seo_title: 'Guller', seo_description: 'Taze gul buketleri ve aranjmanlar.' },
    { id: 'cat-2', name: 'Orkide', slug: 'orkide', url_path: '/kategori/orkide', status: 'published', sort_order: 20, seo_title: 'Orkide', seo_description: 'Saksida orkide ve premium orkide cesitleri.' },
    { id: 'cat-3', name: 'Yapay Cicek', slug: 'yapay-cicek', url_path: '/kategori/yapay-cicek', status: 'draft', sort_order: 50, seo_title: 'Yapay Cicek', seo_description: 'Yapay cicek ve dekorasyon urunleri.' },
  ],
  collections: [
    { id: 'col-1', name: 'Ayni Gun Teslimat', slug: 'ayni-gun-teslimat', url_path: '/koleksiyon/ayni-gun-teslimat', status: 'published', sort_order: 10, seo_title: 'Ayni Gun Teslimat Cicekleri', seo_description: 'Ayni gun teslim edilebilen cicekler.' },
    { id: 'col-2', name: 'Cok Satanlar', slug: 'cok-satanlar', url_path: '/koleksiyon/cok-satanlar', status: 'published', sort_order: 20, seo_title: 'Cok Satan Cicekler', seo_description: 'En cok tercih edilen cicek ve hediyeler.' },
  ],
  pages: [
    { id: 'page-1', title: 'Hakkimizda', slug: 'hakkimizda', url_path: '/hakkimizda', status: 'published', sort_order: 10, seo_title: 'Hakkimizda - Cicekyolla', seo_description: 'Cicekyolla operasyonu ve hizmetleri.' },
    { id: 'page-2', title: 'Teslimat Bolgeleri', slug: 'teslimat-bolgeleri', url_path: '/teslimat-bolgeleri', status: 'published', sort_order: 20, seo_title: 'Teslimat Bolgeleri', seo_description: 'Cicekyolla teslimat bolgeleri ve sureleri.' },
    { id: 'page-3', title: 'KVKK', slug: 'kvkk', url_path: '/kvkk', status: 'published', sort_order: 90, seo_title: 'KVKK - Cicekyolla', seo_description: 'Kisisel verilerin korunmasi aydinlatma metni.' },
  ],
};

function slugify(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function StatusBadge({ status }: { status: PublishStatus }) {
  const config = STATUS_LABEL[status];
  return (
    <span style={{ padding: '4px 9px', borderRadius: 99, background: config.bg, color: config.color, fontSize: 11, fontWeight: 800 }}>
      {config.label}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${T.gray200}`, borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ fontSize: 10.5, fontWeight: 800, color: T.gray400, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: T.gray900, marginTop: 5 }}>{value}</div>
    </div>
  );
}

export function ScreenCatalogFoundation({ module }: { module: FoundationModule }) {
  const config = CONFIG[module];
  const Icon = config.icon;
  const [items, setItems] = useState<FoundationItem[]>(FALLBACK[module]);
  const [selected, setSelected] = useState<FoundationItem | null>(FALLBACK[module][0] || null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | PublishStatus>('all');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('Demo veri gosteriliyor. DATABASE_URL eklendiginde API verisi kullanilir.');

  async function load() {
    try {
      const response = await fetch(`${config.endpoint}?status=${status}`);
      if (!response.ok) throw new Error('API hazir degil');
      const payload = await response.json();
      const nextItems = payload[config.listKey] || [];
      setItems(nextItems);
      setSelected(nextItems[0] || null);
      setMessage('Canli API verisi yuklendi.');
    } catch {
      setItems(FALLBACK[module]);
      setSelected(FALLBACK[module][0] || null);
      setMessage('API baglantisi yok. Ekran demo veriyle calisiyor.');
    }
  }

  useEffect(() => {
    load();
  }, [module, status]);

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return items.filter((item) => {
      const title = item.name || item.title || '';
      return title.toLowerCase().includes(term) || item.slug.toLowerCase().includes(term) || item.url_path.toLowerCase().includes(term);
    });
  }, [items, query]);

  function createDraft() {
    const label = module === 'pages' ? 'Yeni Sayfa' : module === 'collections' ? 'Yeni Koleksiyon' : 'Yeni Kategori';
    const slug = slugify(label);
    const draft: FoundationItem = {
      id: `draft-${Date.now()}`,
      name: module === 'pages' ? undefined : label,
      title: module === 'pages' ? label : undefined,
      slug,
      url_path: `${config.pathPrefix}${slug}`.replace('//', '/'),
      status: 'draft',
      sort_order: items.length * 10 + 10,
      seo_title: label,
      seo_description: '',
      canonical_url: '',
    };
    setItems((current) => [draft, ...current]);
    setSelected(draft);
  }

  function updateSelected(field: keyof FoundationItem, value: string | number) {
    if (!selected) return;
    const updated = { ...selected, [field]: value };

    if (field === 'name' || field === 'title') {
      const slug = slugify(String(value));
      updated.slug = slug;
      updated.url_path = `${config.pathPrefix}${slug}`.replace('//', '/');
      updated.seo_title = updated.seo_title || String(value);
    }

    setSelected(updated);
    setItems((current) => current.map((item) => (item.id === selected.id ? updated : item)));
  }

  async function saveSelected(nextStatus?: PublishStatus) {
    if (!selected) return;
    const payload = { ...selected, status: nextStatus || selected.status };
    const isDraft = selected.id.startsWith('draft-');
    const url = isDraft ? config.endpoint : `${config.endpoint}/${selected.id}`;
    const method = isDraft ? 'POST' : 'PATCH';

    setSaving(true);
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Kayit basarisiz');
      const result = await response.json();
      const saved = result.category || result.collection || result.page;
      setItems((current) => current.map((item) => (item.id === selected.id ? saved : item)));
      setSelected(saved);
      setMessage(nextStatus === 'published' ? 'Kayit yayinlandi.' : 'Kayit kaydedildi.');
    } catch {
      const localSaved = { ...payload, status: nextStatus || payload.status };
      setItems((current) => current.map((item) => (item.id === selected.id ? localSaved : item)));
      setSelected(localSaved);
      setMessage('API baglantisi olmadigi icin degisiklik ekranda saklandi. Database baglaninca kalici kayit yapilacak.');
    } finally {
      setSaving(false);
    }
  }

  async function archiveSelected() {
    if (!selected) return;
    if (selected.id.startsWith('draft-')) {
      setItems((current) => current.filter((item) => item.id !== selected.id));
      setSelected(items[0] || null);
      return;
    }

    setSaving(true);
    try {
      await fetch(`${config.endpoint}/${selected.id}`, { method: 'DELETE' });
    } catch {
    } finally {
      const archived = { ...selected, status: 'archived' as PublishStatus };
      setItems((current) => current.map((item) => (item.id === selected.id ? archived : item)));
      setSelected(archived);
      setSaving(false);
      setMessage('Kayit arsive alindi.');
    }
  }

  const publishedCount = items.filter((item) => item.status === 'published').length;
  const draftCount = items.filter((item) => item.status === 'draft').length;
  const scheduledCount = items.filter((item) => item.status === 'scheduled').length;

  return (
    <div style={{ height: '100%', background: T.gray50, overflowY: 'auto', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: T.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon style={{ width: 20, height: 20, color: T.green }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: T.gray900 }}>{config.title}</h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: T.gray500 }}>{config.subtitle}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={load} style={{ height: 36, padding: '0 13px', border: `1px solid ${T.gray200}`, borderRadius: 9, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: T.gray700 }}>
            <RefreshCw style={{ width: 14, height: 14 }} /> Yenile
          </button>
          <button onClick={createDraft} style={{ height: 36, padding: '0 14px', border: 'none', borderRadius: 9, background: T.green, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800 }}>
            <Plus style={{ width: 14, height: 14 }} /> {config.createLabel}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        <Metric label="Toplam" value={items.length} />
        <Metric label="Yayinda" value={publishedCount} />
        <Metric label="Taslak" value={draftCount} />
        <Metric label="Planli" value={scheduledCount} />
      </div>

      <div style={{ padding: '10px 14px', background: T.blueLight, color: T.blue, borderRadius: 10, fontSize: 12.5, fontWeight: 700, marginBottom: 16 }}>
        {message}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 0.9fr) minmax(460px, 1.1fr)', gap: 16, alignItems: 'start' }}>
        <section style={{ background: '#fff', border: `1px solid ${T.gray200}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: 14, borderBottom: `1px solid ${T.gray100}`, display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 7, background: T.gray50, border: `1px solid ${T.gray200}`, borderRadius: 9, padding: '0 10px', height: 36 }}>
              <Search style={{ width: 14, height: 14, color: T.gray400 }} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ara..." style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 12.5, color: T.gray700 }} />
            </div>
            <select value={status} onChange={(event) => setStatus(event.target.value as any)} style={{ height: 36, border: `1px solid ${T.gray200}`, borderRadius: 9, padding: '0 8px', background: '#fff', color: T.gray700, fontSize: 12 }}>
              <option value="all">Tum durumlar</option>
              <option value="published">Yayinda</option>
              <option value="draft">Taslak</option>
              <option value="scheduled">Planli</option>
              <option value="archived">Arsiv</option>
            </select>
          </div>

          <div style={{ maxHeight: 560, overflowY: 'auto' }}>
            {filtered.map((item) => {
              const active = selected?.id === item.id;
              const title = item.name || item.title || 'Adsiz kayit';
              return (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  style={{
                    width: '100%',
                    padding: '13px 14px',
                    border: 'none',
                    borderBottom: `1px solid ${T.gray100}`,
                    background: active ? T.greenLight : '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 800, color: active ? T.greenDark : T.gray900 }}>{title}</div>
                      <div style={{ fontSize: 11.5, color: T.gray400, marginTop: 3 }}>{item.url_path}</div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section style={{ background: '#fff', border: `1px solid ${T.gray200}`, borderRadius: 14, overflow: 'hidden' }}>
          {selected ? (
            <>
              <div style={{ padding: '16px 18px', borderBottom: `1px solid ${T.gray100}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: T.gray900 }}>{selected.name || selected.title}</div>
                  <div style={{ fontSize: 11.5, color: T.gray400, marginTop: 2 }}>CRUD, SEO, URL ve yayin ayarlari</div>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 1' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.gray500 }}>Ad / Baslik</span>
                  <input value={selected.name || selected.title || ''} onChange={(event) => updateSelected(module === 'pages' ? 'title' : 'name', event.target.value)} style={{ height: 38, border: `1px solid ${T.gray200}`, borderRadius: 9, padding: '0 10px', fontSize: 13, outline: 'none' }} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.gray500 }}>Siralama</span>
                  <input type="number" value={selected.sort_order} onChange={(event) => updateSelected('sort_order', Number(event.target.value))} style={{ height: 38, border: `1px solid ${T.gray200}`, borderRadius: 9, padding: '0 10px', fontSize: 13, outline: 'none' }} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.gray500 }}>Slug</span>
                  <input value={selected.slug} onChange={(event) => updateSelected('slug', event.target.value)} style={{ height: 38, border: `1px solid ${T.gray200}`, borderRadius: 9, padding: '0 10px', fontSize: 13, outline: 'none' }} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.gray500 }}>URL</span>
                  <input value={selected.url_path} onChange={(event) => updateSelected('url_path', event.target.value)} style={{ height: 38, border: `1px solid ${T.gray200}`, borderRadius: 9, padding: '0 10px', fontSize: 13, outline: 'none' }} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.gray500 }}>Yayin Durumu</span>
                  <select value={selected.status} onChange={(event) => updateSelected('status', event.target.value)} style={{ height: 38, border: `1px solid ${T.gray200}`, borderRadius: 9, padding: '0 10px', fontSize: 13, outline: 'none', background: '#fff' }}>
                    <option value="draft">Taslak</option>
                    <option value="scheduled">Planli</option>
                    <option value="published">Yayinda</option>
                    <option value="archived">Arsiv</option>
                  </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.gray500 }}>Canonical URL</span>
                  <input value={selected.canonical_url || ''} onChange={(event) => updateSelected('canonical_url', event.target.value)} placeholder="Bos kalirsa kendi URL'i kullanilir" style={{ height: 38, border: `1px solid ${T.gray200}`, borderRadius: 9, padding: '0 10px', fontSize: 13, outline: 'none' }} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.gray500 }}>Aciklama</span>
                  <textarea value={selected.description || selected.excerpt || ''} onChange={(event) => updateSelected(module === 'pages' ? 'excerpt' : 'description', event.target.value)} rows={3} style={{ border: `1px solid ${T.gray200}`, borderRadius: 9, padding: 10, fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.gray500 }}>SEO Baslik</span>
                  <input value={selected.seo_title || ''} onChange={(event) => updateSelected('seo_title', event.target.value)} style={{ height: 38, border: `1px solid ${T.gray200}`, borderRadius: 9, padding: '0 10px', fontSize: 13, outline: 'none' }} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.gray500 }}>SEO Aciklama</span>
                  <textarea value={selected.seo_description || ''} onChange={(event) => updateSelected('seo_description', event.target.value)} rows={3} style={{ border: `1px solid ${T.gray200}`, borderRadius: 9, padding: 10, fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                </label>
              </div>

              <div style={{ padding: '14px 18px', borderTop: `1px solid ${T.gray100}`, display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                <button onClick={archiveSelected} disabled={saving} style={{ height: 36, padding: '0 12px', border: `1px solid ${T.redLight}`, borderRadius: 9, background: T.redLight, color: T.red, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800 }}>
                  <Trash2 style={{ width: 14, height: 14 }} /> Arsivle
                </button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => saveSelected('draft')} disabled={saving} style={{ height: 36, padding: '0 12px', border: `1px solid ${T.gray200}`, borderRadius: 9, background: '#fff', color: T.gray700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800 }}>
                    <Archive style={{ width: 14, height: 14 }} /> Taslak
                  </button>
                  <button onClick={() => saveSelected()} disabled={saving} style={{ height: 36, padding: '0 12px', border: `1px solid ${T.gray200}`, borderRadius: 9, background: '#fff', color: T.gray700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800 }}>
                    <Save style={{ width: 14, height: 14 }} /> Kaydet
                  </button>
                  <button onClick={() => saveSelected('published')} disabled={saving} style={{ height: 36, padding: '0 14px', border: 'none', borderRadius: 9, background: T.green, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 900 }}>
                    <CheckCircle2 style={{ width: 14, height: 14 }} /> Yayina Al
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: 40, textAlign: 'center', color: T.gray400 }}>
              <Eye style={{ width: 34, height: 34, marginBottom: 10 }} />
              <div style={{ fontSize: 14, fontWeight: 700 }}>Kayit secilmedi</div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
