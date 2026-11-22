# Deployment

## Local

```bash
bun install
cp .env.example .env
bunx prisma db push
bun run db:seed
bun run build
bun run start
```

## Production database

SQLite (`file:./dev.db`) is for local development only. On serverless hosts the filesystem is ephemeral.

1. Provision PostgreSQL.
2. Set `DATABASE_URL` to the Postgres connection string.
3. In `prisma/schema.prisma`, change:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. Run `bunx prisma migrate deploy` (or `db push` for demos).
5. Run `bun run db:seed` once.

## Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Prisma connection |
| `ADMIN_EMAIL` | Demo admin login |
| `ADMIN_PASSWORD` | Demo admin password |
| `NEXTAUTH_SECRET` | Session hardening secret |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO |

## Assets

Ensure `public/images`, `public/animation`, and `public/videos` are included in the deploy artifact. Construction frames are ~8MB of WebP files.

## Known demo limits

- Reservations are demonstrative (`CONFIRMED_DEMO`).
- No payment gateway.
- Contact and experience forms store rows in the DB; they do not send email unless you wire a provider.
- Some secondary photographic angles remain listed in `docs/IMAGE_MANIFEST.md` for future regeneration.
