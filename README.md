# fest.wollbi.ch

The Wollbi-Fescht site, [Payload CMS](https://payloadcms.com/) on Next.js.
It replaces the Pelican site that used to live here: the pages are now rows in
Postgres and are edited at `/admin` rather than in Markdown in this repository.

## What is where

| Path | What |
| --- | --- |
| `src/collections/` | `pages`, `media`, `users` |
| `src/globals/Site.ts` | Title, subtitle and footer — what `SITENAME` and `SITESUBTITLE` were |
| `src/blocks/` | The three shapes the old pages had: prose, a run of images, a download |
| `src/app/(frontend)/` | The public site |
| `src/app/seed/` | The one-shot import of the Pelican content, and the content itself |
| `src/migrations/` | The schema. Applied on connect in production |
| `public/seed/images/` | The images the Pelican site shipped, imported once by the seed |

## Running it

```bash
cp .env.example .env          # and edit DATABASE_URL, PAYLOAD_SECRET and SEED_TOKEN
npm install
npm run dev
```

A Postgres to point it at, with Apple's `container` CLI:

```bash
container run -d --name festpg -p 5432:5432 \
  -e POSTGRES_USER=payload -e POSTGRES_PASSWORD=payload -e POSTGRES_DB=fest \
  docker.io/library/postgres:18-alpine
```

## Seeding

The seed runs once, against an empty database, and does two things: imports
every file in `public/seed/images/` as media, and creates the three pages. It
creates no editor; see [Logging in](#logging-in).

```bash
curl -X POST -H "x-seed-token: $SEED_TOKEN" http://localhost:3000/seed
```

It refuses without the token and does nothing if any page already exists, so
the cluster can run it as a post-sync hook on every deploy.

## Logging in

Editors sign in at `/admin` through Authentik, with OpenID Connect; there are
no passwords in Payload. The first login of a member of the `wollbi-editors`
group creates their user, matched on the email Authentik reports, and an
account outside the group is turned away. The client is `OIDC_CLIENT_ID` and
`OIDC_CLIENT_SECRET` against `AUTHENTIK_URL`, with
`<NEXT_PUBLIC_SERVER_URL>/api/users/oauth/callback` as its redirect URI;
without the two, the admin has no login. The provider, the group and the
secret are in JanWelker/homelab-apps, directory `fest-wollbi/`.

## Changing the schema

The adapter runs the committed migrations on connect in production; `push` is
off, so a field added to a collection needs one:

```bash
npm run generate:types
npx payload migrate:create <name>
```

## Deployment

The image is built by `.github/workflows/push-image.yml` and published to
`ghcr.io/janwelker/fest-wollbi-ch`. What runs it is
[JanWelker/homelab-apps](https://github.com/JanWelker/homelab-apps), directory
`fest-wollbi/`; Renovate moves the tag there.

Every merge to `main` that changes more than docs or CI releases the next
patch version: the workflow pushes the image tags and the `v<version>` git
tag. For a minor or major release, push the `v*` tag by hand.

A pull request builds the image as its check and pushes nothing.
`.dockerignore` keeps `.git` and local `.env`
files out of the build context.
