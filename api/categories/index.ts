import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../lib/db';
import { asNumber, asString, badRequest, methodNotAllowed, parseKeywords, sendJson, serverError, slugify } from '../lib/http';

const VALID_STATUS = new Set(['draft', 'scheduled', 'published', 'archived']);

function normalizeCategory(body: any) {
  const name = asString(body.name);
  const slug = asString(body.slug, slugify(name));
  const status = asString(body.status, 'draft');

  return {
    name,
    slug,
    parent_id: asString(body.parent_id) || null,
    description: asString(body.description) || null,
    image_url: asString(body.image_url) || null,
    icon_name: asString(body.icon_name) || null,
    sort_order: asNumber(body.sort_order, 0),
    status: VALID_STATUS.has(status) ? status : 'draft',
    url_path: asString(body.url_path, `/kategori/${slug}`),
    canonical_url: asString(body.canonical_url) || null,
    seo_title: asString(body.seo_title) || name,
    seo_description: asString(body.seo_description) || null,
    seo_keywords: parseKeywords(body.seo_keywords),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const status = asString(req.query.status, 'all');
      const params: unknown[] = [];
      let where = '';

      if (status !== 'all') {
        if (!VALID_STATUS.has(status)) return badRequest(res, 'Invalid status');
        params.push(status);
        where = 'WHERE pc.status = $1';
      }

      const result = await query(
        `
        SELECT
          pc.id,
          pc.name,
          pc.slug,
          pc.parent_id,
          parent.name AS parent_name,
          pc.description,
          pc.image_url,
          pc.icon_name,
          pc.sort_order,
          pc.status,
          pc.url_path,
          pc.canonical_url,
          pc.seo_title,
          pc.seo_description,
          pc.seo_keywords,
          pc.published_at,
          pc.scheduled_at,
          pc.archived_at,
          pc.created_at,
          pc.updated_at,
          COUNT(p.id)::int AS product_count
        FROM product_categories pc
        LEFT JOIN product_categories parent ON parent.id = pc.parent_id
        LEFT JOIN products p ON p.category_id = pc.id
        ${where}
        GROUP BY pc.id, parent.name
        ORDER BY pc.sort_order ASC, pc.name ASC
        `,
        params
      );

      return sendJson(res, 200, { categories: result.rows });
    }

    if (req.method === 'POST') {
      const data = normalizeCategory(req.body || {});
      if (!data.name) return badRequest(res, 'Category name is required');
      if (!data.slug) return badRequest(res, 'Category slug is required');

      const result = await query(
        `
        INSERT INTO product_categories (
          name, slug, parent_id, description, image_url, icon_name, sort_order,
          status, url_path, canonical_url, seo_title, seo_description, seo_keywords,
          is_active, published_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11, $12, $13,
          $14, CASE WHEN $8 = 'published' THEN now() ELSE NULL END
        )
        RETURNING *
        `,
        [
          data.name,
          data.slug,
          data.parent_id,
          data.description,
          data.image_url,
          data.icon_name,
          data.sort_order,
          data.status,
          data.url_path,
          data.canonical_url,
          data.seo_title,
          data.seo_description,
          data.seo_keywords,
          data.status === 'published',
        ]
      );

      const category = result.rows[0];

      await query(
        `
        INSERT INTO url_routes (entity_type, entity_id, url_path, canonical_url, status, is_primary)
        VALUES ('category', $1, $2, $3, $4, true)
        ON CONFLICT (url_path) DO UPDATE
        SET entity_id = EXCLUDED.entity_id,
            canonical_url = EXCLUDED.canonical_url,
            status = EXCLUDED.status,
            updated_at = now()
        `,
        [category.id, category.url_path, category.canonical_url, category.status]
      );

      return sendJson(res, 201, { category });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  } catch (error) {
    return serverError(res, error);
  }
}
