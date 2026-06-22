#!/usr/bin/env tsx
/**
 * Run once to create the default admin user:
 *   npx tsx scripts/setup-admin.ts
 */
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const hash = bcrypt.hashSync(password, 10);

  await pool.query(
    `INSERT INTO admin_users (username, password_hash, role)
     VALUES ($1, $2, 'admin')
     ON CONFLICT (username) DO UPDATE SET password_hash = $2`,
    [username, hash]
  );
  console.log(`✅  Admin user '${username}' created/updated.`);
  await pool.end();
}

main().catch(console.error);
