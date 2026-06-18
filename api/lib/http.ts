import type { VercelRequest, VercelResponse } from '@vercel/node';

export function sendJson(res: VercelResponse, status: number, payload: unknown) {
  res.status(status).json(payload);
}

export function methodNotAllowed(res: VercelResponse, allowed: string[]) {
  res.setHeader('Allow', allowed.join(', '));
  sendJson(res, 405, { error: 'Method not allowed' });
}

export function badRequest(res: VercelResponse, message: string, details?: unknown) {
  sendJson(res, 400, { error: message, details });
}

export function notFound(res: VercelResponse, message = 'Not found') {
  sendJson(res, 404, { error: message });
}

export function serverError(res: VercelResponse, error: unknown) {
  console.error(error);
  sendJson(res, 500, { error: 'Internal server error' });
}

export function asString(value: unknown, fallback = '') {
  if (typeof value === 'string') return value.trim();
  if (value === null || value === undefined) return fallback;
  return String(value).trim();
}

export function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function asBoolean(value: unknown, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    if (['true', '1', 'yes', 'evet'].includes(value.toLowerCase())) return true;
    if (['false', '0', 'no', 'hayir'].includes(value.toLowerCase())) return false;
  }
  return fallback;
}

export function slugify(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseKeywords(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => asString(item)).filter(Boolean);
  }

  return asString(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getQueryString(req: VercelRequest, key: string, fallback = '') {
  const value = req.query[key];
  if (Array.isArray(value)) return value[0] || fallback;
  return asString(value, fallback);
}
