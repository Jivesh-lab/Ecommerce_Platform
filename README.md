# Bacoola

E-commerce platform for the **Bacoola** clothing brand, built as a reusable
template so it can be relaunched for other clothing brands. All brand-specific
values (credentials, URLs, store/catalog data) live in **env files** and a
single **seed-data module** — nothing brand-specific is hardcoded in logic.

**Stack:** [Medusa v2](https://medusajs.com) backend + admin · Next.js +
Tailwind storefront · PostgreSQL on [Neon](https://neon.tech) · Cloudinary for
media · [Turborepo](https://turbo.build) monorepo.

```
apps/
  backend/     Medusa v2 server + admin dashboard  (http://localhost:9000/app)
  storefront/  Next.js + Tailwind storefront        (http://localhost:8000)
```

## Prerequisites

- **Node.js 20 or 22 LTS** (both are supported; the storefront needs Node ≤ 24)
- **npm 10+**
- A **PostgreSQL database** — this project targets [Neon](https://neon.tech)
- A **Cloudinary account** (for product image uploads) — optional to boot, but
  required before uploading media in the admin

## Getting started

### 1. Install dependencies (from the repo root)

```bash
npm install
```

This installs both workspaces (`apps/backend`, `apps/storefront`).

### 2. Configure the backend

```bash
cp apps/backend/.env.template apps/backend/.env
```

Edit `apps/backend/.env` and set:

- `DATABASE_URL` — your Neon connection string
  (`postgresql://<user>:<password>@<host>/<db>?sslmode=require`)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from
  your Cloudinary dashboard (can be left blank to boot; uploads will fail until set)

### 3. Run migrations + seed sample data

```bash
cd apps/backend
npx medusa db:migrate
```

`db:migrate` also runs the migration script at
`src/migration-scripts/initial-data-seed.ts`, which seeds the store, a US
region, the categories **Men / Women / T-Shirts / Polos**, and 5 sample
products. It runs **once** (tracked in the DB); to re-seed, reset the database.

### 4. Create an admin user

```bash
cd apps/backend
npx medusa user -e admin@bacoola.com -p somepassword
```

### 5. Start the backend

```bash
# from apps/backend
npm run dev
```

Open **http://localhost:9000/app** and log in. Under
**Settings → Publishable API keys**, copy the key created by the seed
("Storefront Publishable API Key").

### 6. Configure and start the storefront

```bash
cp apps/storefront/.env.local.template apps/storefront/.env.local
```

Set `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` in `apps/storefront/.env.local` to the
key from the previous step, then:

```bash
# from apps/storefront
npm run dev
```

Open **http://localhost:8000** — it fetches products from the backend via
`NEXT_PUBLIC_MEDUSA_BACKEND_URL`.

> Tip: from the repo root, `npm run dev` starts **both** apps together (Turborepo).

## Environment variables

### Backend (`apps/backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `STORE_CORS` / `ADMIN_CORS` / `AUTH_CORS` | Allowed origins for store/admin/auth APIs |
| `JWT_SECRET` / `COOKIE_SECRET` | Auth secrets (use strong values in production) |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary credentials |
| `CLOUDINARY_FOLDER` | Folder assets upload into (default `bacoola`) |

### Storefront (`apps/storefront/.env.local`)

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Publishable key from the backend | — |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Backend API URL | `http://localhost:9000` |
| `NEXT_PUBLIC_DEFAULT_REGION` | Default region country code (must match a seeded region) | `us` |
| `NEXT_PUBLIC_BASE_URL` | Storefront base URL | `http://localhost:8000` |

`.env` and `.env.local` are gitignored — only the `*.template` files are committed.

## File storage (Cloudinary)

Media uploads use a small custom Medusa **File Module provider** at
`apps/backend/src/modules/cloudinary`, registered in
`apps/backend/medusa-config.ts` under `@medusajs/medusa/file`. It reads
credentials from the `CLOUDINARY_*` env vars — no keys are hardcoded.

## Rebranding for a new clothing brand

This repo is a template. To spin it up for a different brand:

1. **Catalog & store** — edit `apps/backend/src/data/bacoola-seed.ts` (store
   name, currencies, region, categories, products). The seed runner is generic;
   you don't touch code.
2. **Credentials & URLs** — set values in the `.env` files (new Neon DB, new
   Cloudinary account, `CLOUDINARY_FOLDER`, CORS origins).
3. **Storefront branding** — theme/components live under `apps/storefront`.

## Resources

- [Medusa Documentation](https://docs.medusajs.com)
- [Neon](https://neon.tech) · [Cloudinary](https://cloudinary.com) · [Turborepo](https://turbo.build)
