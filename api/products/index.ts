import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }

  return pool;
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const result = await getPool().query(`
      SELECT
        id,
        name,
        slug,
        sku,
        price,
        compare_at_price,
        status,
        is_featured,
        seo_title,
        seo_description,
        created_at,
        updated_at
      FROM products
      ORDER BY created_at DESC
      LIMIT 100
    `);

    return res.status(200).json({
      ok: true,
      products: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      ok: false,
      error: error.message || 'Products API error',
    });
  }
}
