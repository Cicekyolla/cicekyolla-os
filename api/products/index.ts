export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({
        ok: false,
        error: 'Method not allowed',
      });
    }

    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      return res.status(500).json({
        ok: false,
        error: 'DATABASE_URL bulunamadi',
      });
    }

    const { Pool } = await import('pg');

    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });

    const result = await pool.query(`
      SELECT *
      FROM products
      LIMIT 50
    `);

    await pool.end();

    return res.status(200).json({
      ok: true,
      products: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      ok: false,
      error: error?.message || 'Bilinmeyen hata',
    });
  }
}
