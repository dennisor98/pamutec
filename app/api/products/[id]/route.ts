import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, description, price, currency, image_url, is_featured, sort_order } = await req.json();
    const result = await query(
      `UPDATE products SET name=$1, description=$2, price=$3, currency=$4, image_url=$5,
       is_featured=$6, sort_order=$7, updated_at=NOW() WHERE id=$8 RETURNING *`,
      [name, description || '', price || null, currency || 'KES', image_url || null, is_featured ?? true, sort_order || 0, params.id]
    );
    if (result.rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await query('DELETE FROM products WHERE id=$1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
