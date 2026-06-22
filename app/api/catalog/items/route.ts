import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { category_id, name, description, price, currency, image_url, sort_order } = await req.json();
    if (!name || !category_id) return NextResponse.json({ error: 'Name and category required' }, { status: 400 });

    const result = await query(
      `INSERT INTO catalog_items (category_id, name, description, price, currency, image_url, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [category_id, name, description || '', price || null, currency || 'KES', image_url || null, sort_order || 0]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
