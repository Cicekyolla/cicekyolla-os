-- CICEKYOLLA OS - Category, collection and page management foundation
-- Run after 001_initial_schema.sql, 002_seed_core.sql and 003_product_imports.sql

BEGIN;

DO $$ BEGIN
  CREATE TYPE publish_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE url_entity_type AS ENUM ('category', 'collection', 'page', 'product', 'blog');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE product_categories
  ADD COLUMN IF NOT EXISTS status publish_status NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS url_path text,
  ADD COLUMN IF NOT EXISTS canonical_url text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS icon_name text,
  ADD COLUMN IF NOT EXISTS visibility jsonb NOT NULL DEFAULT '{"storefront": true, "menu": true, "sitemap": true}'::jsonb,
  ADD COLUMN IF NOT EXISTS published_at timestamptz,
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS archived_at timestamptz,
  ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by uuid REFERENCES users(id) ON DELETE SET NULL;

UPDATE product_categories
SET status = CASE WHEN is_active THEN 'published'::publish_status ELSE 'draft'::publish_status END,
    url_path = COALESCE(url_path, '/kategori/' || slug),
    published_at = COALESCE(published_at, created_at)
WHERE status = 'draft';

CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  collection_type text NOT NULL DEFAULT 'manual',
  status publish_status NOT NULL DEFAULT 'draft',
  url_path text NOT NULL UNIQUE,
  canonical_url text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  rules jsonb NOT NULL DEFAULT '{}'::jsonb,
  visibility jsonb NOT NULL DEFAULT '{"storefront": true, "menu": false, "sitemap": true}'::jsonb,
  seo_title text,
  seo_description text,
  seo_keywords text[] NOT NULL DEFAULT '{}',
  published_at timestamptz,
  scheduled_at timestamptz,
  archived_at timestamptz,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS collection_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (collection_id, product_id)
);

CREATE TABLE IF NOT EXISTS cms_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type text NOT NULL DEFAULT 'content',
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  url_path text NOT NULL UNIQUE,
  canonical_url text,
  status publish_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  parent_id uuid REFERENCES cms_pages(id) ON DELETE SET NULL,
  template_key text NOT NULL DEFAULT 'default',
  excerpt text,
  content text,
  blocks jsonb NOT NULL DEFAULT '[]'::jsonb,
  visibility jsonb NOT NULL DEFAULT '{"storefront": true, "menu": false, "sitemap": true}'::jsonb,
  seo_title text,
  seo_description text,
  seo_keywords text[] NOT NULL DEFAULT '{}',
  og_image_url text,
  structured_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  published_at timestamptz,
  scheduled_at timestamptz,
  archived_at timestamptz,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS url_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type url_entity_type NOT NULL,
  entity_id uuid NOT NULL,
  url_path text NOT NULL UNIQUE,
  canonical_url text,
  status publish_status NOT NULL DEFAULT 'draft',
  is_primary boolean NOT NULL DEFAULT true,
  redirect_to text,
  http_status integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT url_routes_redirect_status CHECK (http_status IS NULL OR http_status IN (301, 302, 307, 308))
);

CREATE INDEX IF NOT EXISTS idx_product_categories_status_sort ON product_categories(status, sort_order);
CREATE INDEX IF NOT EXISTS idx_product_categories_url_path ON product_categories(url_path);
CREATE INDEX IF NOT EXISTS idx_collections_status_sort ON collections(status, sort_order);
CREATE INDEX IF NOT EXISTS idx_collections_type ON collections(collection_type);
CREATE INDEX IF NOT EXISTS idx_collection_products_collection_sort ON collection_products(collection_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_collection_products_product_id ON collection_products(product_id);
CREATE INDEX IF NOT EXISTS idx_cms_pages_status_sort ON cms_pages(status, sort_order);
CREATE INDEX IF NOT EXISTS idx_cms_pages_page_type ON cms_pages(page_type);
CREATE INDEX IF NOT EXISTS idx_cms_pages_parent_id ON cms_pages(parent_id);
CREATE INDEX IF NOT EXISTS idx_url_routes_entity ON url_routes(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_url_routes_status ON url_routes(status);

INSERT INTO collections (name, slug, description, collection_type, status, url_path, sort_order, seo_title, seo_description, published_at)
VALUES
  ('Ayni Gun Teslimat', 'ayni-gun-teslimat', 'Ayni gun teslim edilebilen urunler', 'manual', 'published', '/koleksiyon/ayni-gun-teslimat', 10, 'Ayni Gun Teslimat Cicekleri', 'Ayni gun teslim edilebilen cicek ve hediyeler.', now()),
  ('Cok Satanlar', 'cok-satanlar', 'En cok tercih edilen urunler', 'dynamic', 'published', '/koleksiyon/cok-satanlar', 20, 'Cok Satan Cicekler', 'Cicekyolla uzerinde en cok satilan cicekler.', now())
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    collection_type = EXCLUDED.collection_type,
    status = EXCLUDED.status,
    url_path = EXCLUDED.url_path,
    sort_order = EXCLUDED.sort_order,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description,
    updated_at = now();

INSERT INTO cms_pages (page_type, title, slug, url_path, status, sort_order, template_key, excerpt, seo_title, seo_description, published_at)
VALUES
  ('corporate', 'Hakkimizda', 'hakkimizda', '/hakkimizda', 'published', 10, 'corporate', 'Cicekyolla hakkinda kurumsal bilgi', 'Hakkimizda - Cicekyolla', 'Cicekyolla operasyonu, vizyonu ve hizmetleri.', now()),
  ('support', 'Teslimat Bolgeleri', 'teslimat-bolgeleri', '/teslimat-bolgeleri', 'published', 20, 'delivery-regions', 'Teslimat yapilan bolgeler', 'Teslimat Bolgeleri', 'Cicekyolla teslimat bolgeleri ve sureleri.', now()),
  ('legal', 'KVKK', 'kvkk', '/kvkk', 'published', 90, 'legal', 'Kisisel verilerin korunmasi metni', 'KVKK - Cicekyolla', 'Cicekyolla KVKK aydinlatma metni.', now())
ON CONFLICT (slug) DO UPDATE
SET title = EXCLUDED.title,
    url_path = EXCLUDED.url_path,
    status = EXCLUDED.status,
    sort_order = EXCLUDED.sort_order,
    template_key = EXCLUDED.template_key,
    excerpt = EXCLUDED.excerpt,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description,
    updated_at = now();

INSERT INTO url_routes (entity_type, entity_id, url_path, canonical_url, status, is_primary)
SELECT 'category', id, url_path, canonical_url, status, true
FROM product_categories
WHERE url_path IS NOT NULL
ON CONFLICT (url_path) DO NOTHING;

INSERT INTO url_routes (entity_type, entity_id, url_path, canonical_url, status, is_primary)
SELECT 'collection', id, url_path, canonical_url, status, true
FROM collections
ON CONFLICT (url_path) DO NOTHING;

INSERT INTO url_routes (entity_type, entity_id, url_path, canonical_url, status, is_primary)
SELECT 'page', id, url_path, canonical_url, status, true
FROM cms_pages
ON CONFLICT (url_path) DO NOTHING;

COMMIT;
