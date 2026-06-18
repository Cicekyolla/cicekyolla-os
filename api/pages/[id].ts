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
    page_type: asString(body.page_type, 'content'),
    title: asString(body.title),
    slug: asString(body.slug),
    url_path: asString(body.url_path),
    canonical_url: asString(body.canonical_url) || null,
    status: VALID_STATUS.has(status) ? status : 'draft',
    sort_order: asNumber(body.sort_order, 0),
    parent_id: asString(body.parent_id) || null,
    template_key: asString(body.template_key, 'default'),
    excerpt: asString(body.excerpt) || null,
    content: asString(body.content) || null,
    blocks: body.blocks || [],
    seo_title: asString(body.seo_title) || null,
    seo_description: asString(body.seo_description) || null,
    seo_keywords: parseKeywords(body.seo_keywords),
    og_image_url: asString(body.og_image_url) || null,
    structured_data: body.structured_data || {},
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = getId(req);
  if (!id) return badRequest(res, 'Page id is required');

  try {
    if (req.method === 'GET') {
      const result = await query(
        `
        SELECT
          p.*,
          parent.title AS parent_title
        FROM cms_pages p
        LEFT JOIN cms_pages parent ON parent.id = p.parent_id
        WHERE p.id = $1
        `,
        [id]
      );

      if (!result.rowCount) return notFound(res, 'Page not found');
      return sendJson(res, 200, { page: result.rows[0] });
    }

    if (req.method === 'PATCH') {
      const data = normalizePatch(req.body || {});
      if (!data.title) return badRequest(res, 'Page title is required');
      if (!data.slug) return badRequest(res, 'Page slug is required');
      if (!data.url_path) return badRequest(res, 'Page URL is required');

      const result = await query(
        `
        UPDATE cms_pages
        SET page_type = $2,
            title = $3,
            slug = $4,
            url_path = $5,
            canonical_url = $6,
            status = $7,
            sort_order = $8,
            parent_id = $9,
            template_key = $10,
            excerpt = $11,
            content = $12,
            blocks = $13,
            seo_title = $14,
            seo_description = $15,
            seo_keywords = $16,
            og_image_url = $17,
            structured_data = $18,
            published_at = CASE
              WHEN $7 = 'published' AND published_at IS NULL THEN now()
              ELSE published_at
            END,
            archived_at = CASE
              WHEN $7 = 'archived' THEN now()
              ELSE NULL
            END,
            updated_at = now()
        WHERE id = $1
        RETURNING *
        `,
        [
          id,
          data.page_type,
          data.title,
          data.slug,
          data.url_path,
          data.canonical_url,
          data.status,
          data.sort_order,
          data.parent_id,
          data.template_key,
          data.excerpt,
          data.content,
          data.blocks,
          data.seo_title,
          data.seo_description,
          data.seo_keywords,
          data.og_image_url,
          data.structured_data,
        ]
      );

      if (!result.rowCount) return notFound(res, 'Page not found');
      const page = result.rows[0];

      await query(
        `
        INSERT INTO url_routes (entity_type, entity_id, url_path, canonical_url, status, is_primary)
        VALUES ('page', $1, $2, $3, $4, true)
        ON CONFLICT (url_path) DO UPDATE
        SET entity_id = EXCLUDED.entity_id,
            canonical_url = EXCLUDED.canonical_url,
            status = EXCLUDED.status,
            updated_at = now()
        `,
        [page.id, page.url_path, page.canonical_url, page.status]
      );

      return sendJson(res, 200, { page });
    }

    if (req.method === 'DELETE') {
      const result = await query(
        `
        UPDATE cms_pages
        SET status = 'archived',
            archived_at = now(),
            updated_at = now()
        WHERE id = $1
        RETURNING *
        `,
        [id]
      );

      if (!result.rowCount) return notFound(res, 'Page not found');

      await query(
        `
        UPDATE url_routes
        SET status = 'archived',
            updated_at = now()
        WHERE entity_type = 'page' AND entity_id = $1
        `,
        [id]
      );

      return sendJson(res, 200, { page: result.rows[0] });
    }

    return methodNotAllowed(res, ['GET', 'PATCH', 'DELETE']);
  } catch (error) {
    return serverError(res, error);
  }
}
