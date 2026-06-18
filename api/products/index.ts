import { query } from '../lib/db';
import { asString, methodNotAllowed, serverError } from '../lib/http';

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const status = asString(req.query.status, 'all');

      const rows = await query(
        `
        SELECT
          p.id,
          p.category_id,
          c.name AS category_name,
          c.slug AS category_slug,
          p.sku,
          p.name,
          p.slug,
          p.description,
          p.short_description,
          p.price,
          p.status,
          p.url_path,
          p.seo_title,
          p.seo_description,
          p.is_active,
          p.is_featured,
          p.image_url,
          p.created_at,
          p.updated_at
        FROM products p
        LEFT JOIN product_categories c ON c.id = p.category_id
        WHERE ($1 = 'all' OR p.status::text = $1)
        ORDER BY p.created_at DESC
        `,
        [status],
      );

      return res.status(200).json({
        ok: true,
        products: rows.rows,
      });
    }

    return methodNotAllowed(res);
  } catch (error) {
    return serverError(res, error);
  }
}
