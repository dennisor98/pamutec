import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, slug, sort_order } = await req.json();
    const result = await query(
      'UPDATE catalog_categories SET name=$1, slug=$2, sort_order=$3 WHERE id=$4 RETURNING *',
      [name, slug, sort_order || 0, params.id]
    );
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await query('DELETE FROM catalog_categories WHERE id=$1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
