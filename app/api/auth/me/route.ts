import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ username: admin.username, role: admin.role });
}
