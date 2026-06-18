import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../lib/db';
import { asNumber, asString, badRequest, methodNotAllowed, parseKeywords, sendJson, serverError, slugify } from '../lib/http';

const VALID_STATUS = new Set(['draft', 'scheduled', 'published', 'archived']);

function normalizeCollection(body: any) {
  const name = asString(body.name);
  const slug = asString(body.slug, slugify(name));
  const status = asString(body.status, 'draft');

  return {
    name,
    slug,
    description: asString(body.description) || null,
    collection_type: asString(body.collection_type, 'manual'),
    status: VALID_STATUS.has(status) ? status : 'draft',
    url_path: asString(body.url_path, `/koleksiyon/${slug}`),
    canonical_url: asString(body.canonical_url) || null,
    image_url: asString(body.image_url) || null,
    sort_order: asNumber(body.sort_order, 0),
    rules: body.rules || {},
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
        where = 'WHERE c.status = $1';
      }

      const result = await query(
        `
        SELECT
          c.*,
          COUNT(cp.product_id)::int AS product_count
        FROM collections c
        LEFT JOIN collection_products cp ON cp.collection_id = c.id
        ${where}
        GROUP BY c.id
        ORDER BY c.sort_order ASC, c.name ASC
        `,
        params
      );

      return sendJson(res, 200, { collections: result.rows });
    }

    if (req.method === 'POST') {
      const data = normalizeCollection(req.body || {});
      if (!data.name) return badRequest(res, 'Collection name is required');
      if (!data.slug) return badRequest(res, 'Collection slug is required');

      const result = await query(
        `
        INSERT INTO collections (
          name, slug, description, collection_type, status, url_path,
          canonical_url, image_url, sort_order, rules, seo_title,
          seo_description, seo_keywords, published_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11,
          $12, $13, CASE WHEN $5 = 'published' THEN now() ELSE NULL END
        )
        RETURNING *
        `,
        [
          data.name,
          data.slug,
          data.description,
          data.collection_type,
          data.status,
          data.url_path,
          data.canonical_url,
          data.image_url,
          data.sort_order,
          data.rules,
          data.seo_title,
          data.seo_description,
          data.seo_keywords,
        ]
      );

      const collection = result.rows[0];

      await query(
        `
        INSERT INTO url_routes (entity_type, entity_id, url_path, canonical_url, status, is_primary)
        VALUES ('collection', $1, $2, $3, $4, true)
        ON CONFLICT (url_path) DO UPDATE
        SET entity_id = EXCLUDED.entity_id,
            canonical_url = EXCLUDED.canonical_url,
            status = EXCLUDED.status,
            updated_at = now()
        `,
        [collection.id, collection.url_path, collection.canonical_url, collection.status]
      );

      return sendJson(res, 201, { collection });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  } catch (error) {
    return serverError(res, error);
  }
}
