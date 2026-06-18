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
    description: asString(body.description) || null,
    collection_type: asString(body.collection_type, 'manual'),
    status: VALID_STATUS.has(status) ? status : 'draft',
    url_path: asString(body.url_path),
    canonical_url: asString(body.canonical_url) || null,
    image_url: asString(body.image_url) || null,
    sort_order: asNumber(body.sort_order, 0),
    rules: body.rules || {},
    seo_title: asString(body.seo_title) || null,
    seo_description: asString(body.seo_description) || null,
    seo_keywords: parseKeywords(body.seo_keywords),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = getId(req);
  if (!id) return badRequest(res, 'Collection id is required');

  try {
    if (req.method === 'GET') {
      const collectionResult = await query(
        `
        SELECT
          c.*,
          COUNT(cp.product_id)::int AS product_count
        FROM collections c
        LEFT JOIN collection_products cp ON cp.collection_id = c.id
        WHERE c.id = $1
        GROUP BY c.id
        `,
        [id]
      );

      if (!collectionResult.rowCount) return notFound(res, 'Collection not found');

      const productsResult = await query(
        `
        SELECT
          p.id,
          p.name,
          p.slug,
          p.sku,
          p.price,
          p.status,
          cp.sort_order
        FROM collection_products cp
        INNER JOIN products p ON p.id = cp.product_id
        WHERE cp.collection_id = $1
        ORDER BY cp.sort_order ASC, p.name ASC
        `,
        [id]
      );

      return sendJson(res, 200, {
        collection: collectionResult.rows[0],
        products: productsResult.rows,
      });
    }

    if (req.method === 'PATCH') {
      const data = normalizePatch(req.body || {});
      if (!data.name) return badRequest(res, 'Collection name is required');
      if (!data.slug) return badRequest(res, 'Collection slug is required');
      if (!data.url_path) return badRequest(res, 'Collection URL is required');

      const result = await query(
        `
        UPDATE collections
        SET name = $2,
            slug = $3,
            description = $4,
            collection_type = $5,
            status = $6,
            url_path = $7,
            canonical_url = $8,
            image_url = $9,
            sort_order = $10,
            rules = $11,
            seo_title = $12,
            seo_description = $13,
            seo_keywords = $14,
            published_at = CASE
              WHEN $6 = 'published' AND published_at IS NULL THEN now()
              ELSE published_at
            END,
            archived_at = CASE
              WHEN $6 = 'archived' THEN now()
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

      if (!result.rowCount) return notFound(res, 'Collection not found');
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

      return sendJson(res, 200, { collection });
    }

    if (req.method === 'DELETE') {
      const result = await query(
        `
        UPDATE collections
        SET status = 'archived',
            archived_at = now(),
            updated_at = now()
        WHERE id = $1
        RETURNING *
        `,
        [id]
      );

      if (!result.rowCount) return notFound(res, 'Collection not found');

      await query(
        `
        UPDATE url_routes
        SET status = 'archived',
            updated_at = now()
        WHERE entity_type = 'collection' AND entity_id = $1
        `,
        [id]
      );

      return sendJson(res, 200, { collection: result.rows[0] });
    }

    return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
  } catch (error) {
    return serverError(res, error);
  }
}
