import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../lib/db';
import { asNumber, asString, badRequest, methodNotAllowed, parseKeywords, sendJson, serverError, slugify } from '../lib/http';

const VALID_STATUS = new Set(['draft', 'scheduled', 'published', 'archived']);

function normalizePage(body: any) {
  const title = asString(body.title);
  const slug = asString(body.slug, slugify(title));
  const status = asString(body.status, 'draft');

  return {
    page_type: asString(body.page_type, 'content'),
    title,
    slug,
    url_path: asString(body.url_path, `/${slug}`),
    canonical_url: asString(body.canonical_url) || null,
    status: VALID_STATUS.has(status) ? status : 'draft',
    sort_order: asNumber(body.sort_order, 0),
    parent_id: asString(body.parent_id) || null,
    template_key: asString(body.template_key, 'default'),
    excerpt: asString(body.excerpt) || null,
    content: asString(body.content) || null,
    blocks: body.blocks || [],
    seo_title: asString(body.seo_title) || title,
    seo_description: asString(body.seo_description) || null,
    seo_keywords: parseKeywords(body.seo_keywords),
    og_image_url: asString(body.og_image_url) || null,
    structured_data: body.structured_data || {},
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const status = asString(req.query.status, 'all');
      const pageType = asString(req.query.page_type, 'all');
      const params: unknown[] = [];
      const where: string[] = [];

      if (status !== 'all') {
        if (!VALID_STATUS.has(status)) return badRequest(res, 'Invalid status');
        params.push(status);
        where.push(`p.status = $${params.length}`);
      }

      if (pageType !== 'all') {
        params.push(pageType);
        where.push(`p.page_type = $${params.length}`);
      }

      const result = await query(
        `
        SELECT
          p.*,
          parent.title AS parent_title
        FROM cms_pages p
        LEFT JOIN cms_pages parent ON parent.id = p.parent_id
        ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
        ORDER BY p.sort_order ASC, p.title ASC
        `,
        params
      );

      return sendJson(res, 200, { pages: result.rows });
    }

    if (req.method === 'POST') {
      const data = normalizePage(req.body || {});
      if (!data.title) return badRequest(res, 'Page title is required');
      if (!data.slug) return badRequest(res, 'Page slug is required');

      const result = await query(
        `
        INSERT INTO cms_pages (
          page_type, title, slug, url_path, canonical_url, status,
          sort_order, parent_id, template_key, excerpt, content, blocks,
          seo_title, seo_description, seo_keywords, og_image_url,
          structured_data, published_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11, $12,
          $13, $14, $15, $16,
          $17, CASE WHEN $6 = 'published' THEN now() ELSE NULL END
        )
        RETURNING *
        `,
        [
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

      return sendJson(res, 201, { page });
    }

    return methodNotAllowed(res, ['GET', 'POST']);
  } catch (error) {
    return serverError(res, error);
  }
}
