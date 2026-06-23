import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const result = await query('SELECT * FROM about_content ORDER BY id DESC LIMIT 1');
    return NextResponse.json(result.rows[0] || {});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  console.log('[About API] PUT request received');
  const admin = requireAdmin(req);
  console.log('[About API] Admin check:', !!admin);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { heading, description, mission, image_url } = await req.json();
    console.log('[About API] Updating about content');

    const existing = await query('SELECT id FROM about_content ORDER BY id DESC LIMIT 1');

    if (existing.rows.length > 0) {
      const result = await query(
        `UPDATE about_content SET heading=$1, description=$2, mission=$3, image_url=$4, updated_at=NOW()
         WHERE id=$5 RETURNING *`,
        [heading, description, mission, image_url, existing.rows[0].id]
      );
      return NextResponse.json(result.rows[0]);
    } else {
      const result = await query(
        `INSERT INTO about_content (heading, description, mission, image_url) VALUES ($1,$2,$3,$4) RETURNING *`,
        [heading, description, mission, image_url]
      );
      return NextResponse.json(result.rows[0]);
    }
  } catch (err) {
    console.error('[About API] Error:', err);
    return NextResponse.json({ error: 'Failed to update about content' }, { status: 500 });
  }
}
