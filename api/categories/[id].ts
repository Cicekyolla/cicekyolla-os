import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../lib/db';
import { asNumber, asString, badRequest, methodNotAllowed, notFound, parseKeywords, sendJson, serverError } from '../lib/http';

const VALID_STATUS = new Set(['draft', 'scheduled', 'published', 'archived']);

function getId(req: VercelRequest) {
  const id = req.query.id;
  return Array.isArray(id) ? id[0] : id;
}

function normalizePatch(body: any) {
  const status = asString(body.status);

  return {
    name: asString(body.name),
    slug: asString(body.slug),
    parent_id: asString(body.parent_id) || null,
    description: asString(body.description) || null,
    image_url: asString(body.image_url) || null,
    icon_name: asString(body.icon_name) || null,
    sort_order: asNumber(body.sort_order, 0),
    status: VALID_STATUS.has(status) ? status : 'draft',
    url_path: asString(body.url_path),
    canonical_url: asString(body.canonical_url) || null,
    seo_title: asString(body.seo_title) || null,
    seo_description: asString(body.seo_description) || null,
    seo_keywords: parseKeywords(body.seo_keywords),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = getId(req);
  if (!id) return badRequest(res, 'Category id is required');

  try {
    if (req.method === 'GET') {
      const result = await query(
        `
        SELECT
          pc.*,
          parent.name AS parent_name,
          COUNT(p.id)::int AS product_count
        FROM product_categories pc
        LEFT JOIN product_categories parent ON parent.id = pc.parent_id
        LEFT JOIN products p ON p.category_id = pc.id
        WHERE pc.id = $1
        GROUP BY pc.id, parent.name
        `,
        [id]
      );

      if (!result.rowCount) return notFound(res, 'Category not found');
      return sendJson(res, 200, { category: result.rows[0] });
    }

    if (req.method === 'PATCH') {
      const data = normalizePatch(req.body || {});
      if (!data.name) return badRequest(res, 'Category name is required');
      if (!data.slug) return badRequest(res, 'Category slug is required');
      if (!data.url_path) return badRequest(res, 'Category URL is required');

      const result = await query(
        `
        UPDATE product_categories
        SET name = $2,
            slug = $3,
            parent_id = $4,
            description = $5,
            image_url = $6,
            icon_name = $7,
            sort_order = $8,
            status = $9,
            url_path = $10,
            canonical_url = $11,
            seo_title = $12,
            seo_description = $13,
            seo_keywords = $14,
            is_active = $15,
            published_at = CASE
              WHEN $9 = 'published' AND published_at IS NULL THEN now()
              ELSE published_at
            END,
            archived_at = CASE
              WHEN $9 = 'archived' THEN now()
              ELSE NULL
            END,
            updated_at = now()
        WHERE id = $1
        RETURNING *
        `,
        [
          id,
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

      if (!result.rowCount) return notFound(res, 'Category not found');
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

      return sendJson(res, 200, { category });
    }

    if (req.method === 'DELETE') {
      const result = await query(
        `
        UPDATE product_categories
        SET status = 'archived',
            is_active = false,
            archived_at = now(),
            updated_at = now()
        WHERE id = $1
        RETURNING *
        `,
        [id]
      );

      if (!result.rowCount) return notFound(res, 'Category not found');

      await query(
        `
        UPDATE url_routes
        SET status = 'archived',
            updated_at = now()
        WHERE entity_type = 'category' AND entity_id = $1
        `,
        [id]
      );

      return sendJson(res, 200, { category: result.rows[0] });
    }

    return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
  } catch (error) {
    return serverError(res, error);
  }
}
