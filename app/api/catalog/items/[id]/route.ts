import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, description, price, currency, image_url, sort_order, category_id } = await req.json();
    const result = await query(
      `UPDATE catalog_items SET name=$1, description=$2, price=$3, currency=$4,
       image_url=$5, sort_order=$6, category_id=$7, updated_at=NOW() WHERE id=$8 RETURNING *`,
      [name, description || '', price || null, currency || 'KES', image_url || null, sort_order || 0, category_id, params.id]
    );
    if (result.rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await query('DELETE FROM catalog_items WHERE id=$1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
