import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const result = await query('SELECT * FROM products ORDER BY sort_order, created_at');
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, description, price, currency, image_url, is_featured, sort_order } = await req.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const result = await query(
      `INSERT INTO products (name, description, price, currency, image_url, is_featured, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [name, description || '', price || null, currency || 'KES', image_url || null, is_featured ?? true, sort_order || 0]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
