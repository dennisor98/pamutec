# Seven SS Stars Solar — Next.js CMS

Full-stack solar company website with admin CMS, PostgreSQL, and MinIO image storage.

## Stack
- **Next.js 14** (App Router) + TypeScript
- **PostgreSQL** — stores about, products, catalog content
- **MinIO** — S3-compatible image storage
- **JWT** — admin authentication (httpOnly cookies)
- **MUI v5** — UI components

## Quick Start

### 1. Start services
```bash
docker-compose up -d
```
This starts:
- PostgreSQL on `localhost:5432` (auto-runs migrations)
- MinIO on `localhost:9000` (console at `localhost:9001`)

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Copy `.env.local` and update values if needed:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/sevenss
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=sevenss-media
JWT_SECRET=change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Create admin user
```bash
npx tsx scripts/setup-admin.ts
```

### 5. Run dev server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)
Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

## Admin CMS

Login at `/admin` with your configured credentials.

### Sections
| Tab | What you manage |
|-----|----------------|
| **About** | Heading, description, mission statement, image |
| **Products** | Featured products with name, description, price, image |
| **Catalog** | Categories + items, each with name, description, price, image |

All images are uploaded to **MinIO** and served via its public URL.  
Text data is stored in **PostgreSQL**.

## API Routes
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth` | — | Login, sets httpOnly cookie |
| `DELETE` | `/api/auth` | — | Logout |
| `GET/PUT` | `/api/about` | PUT needs admin | About content |
| `GET/POST` | `/api/products` | POST needs admin | Products list |
| `PUT/DELETE` | `/api/products/[id]` | admin | Edit/delete product |
| `GET/POST` | `/api/catalog/categories` | POST needs admin | Categories |
| `PUT/DELETE` | `/api/catalog/categories/[id]` | admin | Edit/delete category |
| `POST` | `/api/catalog/items` | admin | Add catalog item |
| `PUT/DELETE` | `/api/catalog/items/[id]` | admin | Edit/delete item |
| `POST` | `/api/upload` | admin | Upload image → MinIO |

## Production Deployment

1. Set strong `JWT_SECRET` and `ADMIN_PASSWORD` in env
2. Use `MINIO_USE_SSL=true` with your MinIO domain
3. Point `DATABASE_URL` to your production Postgres
4. Add MinIO hostname to `next.config.js` `remotePatterns`
