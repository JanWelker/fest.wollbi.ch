import configPromise from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

import { markdown } from '@/lib/lexical'
import { admin, archive, archiveIntro, archiveTeaser, info, programme, site, sponsor } from './content'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

const IMAGES = path.join(process.cwd(), 'public', 'seed', 'images')

// Alt text a human would have written, keyed by what the file is.
const altFor = (filename: string) => {
  if (filename.startsWith('prog_')) return `Programm ${filename.slice(5, 7)}`
  const year = /^(\d{4})/.exec(filename)
  return year ? `Einladung ${year[1]}` : filename.replace(/\.[^.]+$/, '')
}

// POST only, and only with the token the pod already holds. The route is part
// of the build, so there is no second image to keep in step -- the PostSync
// hook in homelab-apps is a curl. PAYLOAD_SECRET stands in only while
// SEED_TOKEN is unset, so this image still seeds under manifests that predate
// it; a SEED_TOKEN set but empty refuses everything.
export const POST = async (request: Request) => {
  const secret = process.env.SEED_TOKEN ?? process.env.PAYLOAD_SECRET
  if (!secret || request.headers.get('x-seed-token') !== secret) {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }

  const payload = await getPayload({ config: configPromise })

  const users = await payload.count({ collection: 'users' })
  if (users.totalDocs === 0) {
    const password = process.env.SEED_ADMIN_PASSWORD
    if (!password) {
      return Response.json({ error: 'SEED_ADMIN_PASSWORD is not set' }, { status: 500 })
    }
    await payload.create({ collection: 'users', data: { ...admin, password } })
  }

  const pages = await payload.count({ collection: 'pages' })
  if (pages.totalDocs > 0) {
    return Response.json({ seeded: false, reason: 'pages already exist' })
  }

  // Every file, not only the ones a page references: the archive is the
  // reason this site exists and nothing in it should be dropped in transit.
  const media: Record<string, number | string> = {}
  for (const filename of fs.readdirSync(IMAGES).sort()) {
    const created = await payload.create({
      collection: 'media',
      data: { alt: altFor(filename) },
      filePath: path.join(IMAGES, filename),
    })
    media[filename] = created.id
  }

  await payload.updateGlobal({ slug: 'site', data: site })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Willkommen',
      slug: 'home',
      navLabel: 'Willkommen',
      order: 1,
      showInNav: true,
      layout: [
        { blockType: 'callout', tone: 'sonne', ...sponsor },
        {
          blockType: 'schedule',
          heading: 'Programm',
          items: programme.items,
          asideTitle: programme.asideTitle,
          asideText: programme.asideText,
        },
        { blockType: 'download', label: 'Das Programm als Flyer', file: media[programme.flyer] },
        { blockType: 'team', heading: 'Euer OK' },
        { blockType: 'archiveTeaser', archiveSlug: 'archiv', count: 5, ...archiveTeaser },
      ],
    } as never,
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Info',
      slug: 'info',
      navLabel: 'Info',
      order: 2,
      showInNav: true,
      layout: [
        { blockType: 'prose', content: markdown(info) },
        { blockType: 'team', heading: 'Im OK der diesjährigen Ausgabe' },
      ],
    } as never,
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Einladungsarchiv',
      slug: 'archiv',
      navLabel: 'Archiv',
      order: 3,
      showInNav: true,
      layout: [
        { blockType: 'prose', content: markdown(archiveIntro) },
        ...archive.map(([year, files]) => ({
          blockType: 'gallery',
          heading: year,
          images: files.filter((f) => media[f]).map((f) => ({ image: media[f] })),
        })),
      ],
    } as never,
  })

  return Response.json({ seeded: true, media: Object.keys(media).length, pages: 3 })
}
