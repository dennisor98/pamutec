import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, hashPassword, requireAdmin } from '@/lib/auth';

async function getDbQuery() {
  try {
    const { query } = await import('@/lib/db');
    return query;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const query = await getDbQuery();

    // ── DB path ──────────────────────────────────────────────────────────────
    if (query) {
      // Get current user
      const result = await query(
        'SELECT id, username, password_hash FROM admin_users WHERE username = $1',
        [admin.username]
      );

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const user = result.rows[0];

      // Verify current password
      if (!checkPassword(currentPassword, user.password_hash)) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
      }

      // Hash new password
      const newHash = hashPassword(newPassword);

      // Update password
      await query(
        'UPDATE admin_users SET password_hash = $1 WHERE id = $2',
        [newHash, user.id]
      );

      return NextResponse.json({ success: true });
    }

    // ── Env fallback (only works if using env vars) ─────────────────────────────
    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (admin.username !== envUsername) {
      return NextResponse.json({ error: 'Cannot change password for environment-based admin' }, { status: 400 });
    }

    if (currentPassword !== envPassword) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
    }

    // For env-based admin, we can't actually change the password since it's in env vars
    return NextResponse.json({ error: 'Password change not supported for environment-based admin. Please update ADMIN_PASSWORD in your environment variables.' }, { status: 400 });

  } catch (err) {
    console.error('Password change error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
