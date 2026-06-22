import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export interface AdminPayload {
  username: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export function signToken(payload: Omit<AdminPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function checkPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  const cookie = req.headers.get('cookie');
  if (cookie) {
    const match = cookie.match(/admin_token=([^;]+)/);
    if (match) return match[1];
  }
  return null;
}

export function requireAdmin(req: Request): AdminPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}
