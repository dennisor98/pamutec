import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, signToken, hashPassword } from '@/lib/auth';

async function getDbQuery() {
  try {
    const { query } = await import('@/lib/db');
    return query;
  } catch {
    return null;
  }
}

async function ensureAdminExists(query: Function) {
  try {
    // Create table if not exists (in case migrations haven't run)
    await query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Insert env-based admin if no users exist
    const existing = await query('SELECT id FROM admin_users WHERE username = $1', [envUsername]);
    if (existing.rows.length === 0) {
      const hash = hashPassword(envPassword);
      await query(
        'INSERT INTO admin_users (username, password_hash, role) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING',
        [envUsername, hash, 'admin']
      );
    }
  } catch (err) {
    console.error('ensureAdminExists error:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const query = await getDbQuery();

    // ── DB path ──────────────────────────────────────────────────────────────
    if (query) {
      await ensureAdminExists(query);

      const result = await query(
        'SELECT id, username, password_hash, role FROM admin_users WHERE username = $1',
        [username]
      );

      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (!checkPassword(password, user.password_hash)) {
          return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
        const token = signToken({ username: user.username, role: user.role });
        const response = NextResponse.json({ success: true, username: user.username, role: user.role });
        response.cookies.set('admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 8,
          path: '/',
        });
        return response;
      }
    }

    // ── Env fallback (works even without DB) ─────────────────────────────────
    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username !== envUsername || password !== envPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ username: envUsername, role: 'admin' });
    const response = NextResponse.json({ success: true, username: envUsername, role: 'admin' });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    });
    return response;

  } catch (err) {
    console.error('Auth error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}
