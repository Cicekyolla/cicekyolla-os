import { query } from '../lib/db';
import { methodNotAllowed, serverError } from '../lib/http';

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const rows = await query(
        `
        SELECT *
        FROM products
        LIMIT 50
        `,
        [],
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
