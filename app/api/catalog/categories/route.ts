import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const cats = await query('SELECT * FROM catalog_categories ORDER BY sort_order, id');
    const items = await query('SELECT * FROM catalog_items ORDER BY sort_order, created_at');
    const categories = cats.rows.map(cat => ({
      ...cat,
      items: items.rows.filter(i => i.category_id === cat.id),
    }));
    return NextResponse.json(categories);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name, slug, sort_order } = await req.json();
    if (!name || !slug) return NextResponse.json({ error: 'Name and slug required' }, { status: 400 });
    const result = await query(
      'INSERT INTO catalog_categories (name, slug, sort_order) VALUES ($1,$2,$3) RETURNING *',
      [name, slug, sort_order || 0]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
