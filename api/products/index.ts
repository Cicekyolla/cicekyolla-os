let pool: any = null;

async function getPool() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL bulunamadi');
  }

  if (!pool) {
    const pg = await import('pg');
    const Pool = pg.Pool || pg.default.Pool;

    pool = new Pool({
      connectionString,
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

    const db = await getPool();

    const result = await db.query(`
      SELECT *
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
