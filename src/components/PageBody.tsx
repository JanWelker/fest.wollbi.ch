import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import type { Site } from '@/payload-types'

type Media = {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}
type Block = Record<string, any>

const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' ? (value as Media) : null

// Payload returns an absolute URL once serverURL is set, and next/image
// treats an absolute one as remote -- which needs a remotePatterns entry per
// hostname. The path is the same file either way.
const localPath = (url: string) => (url.startsWith('http') ? new URL(url).pathname : url)

// The flyer's three pennant colours, in turn down a list.
const PENNANTS = ['sun', 'meadow', 'berry'] as const

// A slight, repeatable tilt for pinned invitations; never random, so a
// reload does not reshuffle the wall.
const TILTS = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5]

const Invitation = ({ media, label, index }: { media: Media; label?: string | null; index: number }) => (
  <figure className="invitation" style={{ transform: `rotate(${TILTS[index % TILTS.length]}deg)` }}>
    <a href={localPath(media.url!)}>
      <Image
        alt={media.alt ?? ''}
        src={localPath(media.url!)}
        width={media.width ?? 900}
        height={media.height ?? 1270}
        sizes="(max-width: 720px) 45vw, 200px"
      />
    </a>
    {label ? <figcaption>{label}</figcaption> : null}
  </figure>
)

// Evenly spread picks from the archive, first and last included, so the
// teaser always spans from 1987 to the latest year.
const spread = <T,>(items: T[], count: number) => {
  if (items.length <= count) return items
  return Array.from({ length: count }, (_, i) => items[Math.round((i * (items.length - 1)) / (count - 1))])
}

const ArchiveTeaser = async ({ block }: { block: Block }) => {
  const payload = await getPayload({ config: await config })
  const found = await payload.find({
    collection: 'pages',
    where: { slug: { equals: block.archiveSlug || 'archiv' } },
    depth: 2,
    limit: 1,
  })
  const archive = found.docs[0]
  if (!archive) return null

  const invitations = (archive.layout ?? [])
    .filter((b: Block) => b.blockType === 'gallery')
    .map((b: Block) => ({ year: b.heading as string | null, media: asMedia(b.images?.[0]?.image) }))
    .filter((entry: { media: Media | null }) => entry.media?.url)
  const picks = spread(invitations, block.count || 5)

  return (
    <section className="archive-teaser">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>{block.heading || 'Einladungen seit 1987'}</h2>
            {block.text ? <p className="lead">{block.text}</p> : null}
          </div>
          <a className="more" href={`/${archive.slug}`}>
            Ganzes Archiv ansehen
          </a>
        </div>
        <div className="invitations">
          {picks.map((entry: { year: string | null; media: Media | null }, i: number) => (
            <Invitation key={i} media={entry.media!} label={entry.year} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Consecutive gallery blocks -- the archive is one per year -- become one
// wall of pinned invitations with the year under each, rather than a
// section per year: 24 years of one invitation each is otherwise a very
// long scroll.
const groupGalleries = (layout: Block[]) => {
  const out: Block[] = []
  for (const block of layout) {
    if (block.blockType !== 'gallery') {
      out.push(block)
      continue
    }
    const entries = (block.images ?? [])
      .map((row: Block) => ({ media: asMedia(row.image), label: block.heading as string | null }))
      .filter((entry: { media: Media | null }) => entry.media?.url)
    const last = out[out.length - 1]
    if (last?.blockType === 'wall') last.entries.push(...entries)
    else out.push({ blockType: 'wall', entries })
  }
  return out
}

// One renderer for every page: the home page is the page whose slug is
// `home`, and nothing else about it is special.
export const PageBody = ({ layout, site }: { layout?: Block[] | null; site: Site | null }) => (
  <>
    {groupGalleries(layout ?? []).map((block, index) => {
      switch (block.blockType) {
        case 'prose':
          return (
            <section key={index} className="prose wrap">
              <RichText data={block.content} />
            </section>
          )

        case 'callout':
          return (
            <section key={index} className="wrap">
              <div className={`callout callout-${block.tone || 'sonne'}`}>
                <h2 className="callout-title">{block.title}</h2>
                {block.text ? <p className="callout-text">{block.text}</p> : null}
              </div>
            </section>
          )

        case 'schedule':
          return (
            <section key={index} id="programm" className="schedule wrap">
              <div className="schedule-main">
                <h2>{block.heading || 'Programm'}</h2>
                <ol className="timeline">
                  {(block.items ?? []).map((item: Block, i: number) => (
                    <li key={i} className="timeline-item">
                      <span className={`pennant pennant-${PENNANTS[i % PENNANTS.length]}`} aria-hidden="true" />
                      <span className="timeline-time">{item.time}</span>
                      <div className="timeline-body">
                        <h3>{item.title}</h3>
                        {item.text ? <p>{item.text}</p> : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              {block.asideTitle ? (
                <aside className="schedule-aside">
                  <h3>{block.asideTitle}</h3>
                  {block.asideText ? <p>{block.asideText}</p> : null}
                </aside>
              ) : null}
            </section>
          )

        case 'team':
          return (
            <section key={index} className="team wrap">
              <h2>{block.heading || 'Euer OK'}</h2>
              <ul className="team-grid">
                {(site?.team ?? []).map((member, i) => (
                  <li key={i} className="team-card">
                    <span className={`house house-${PENNANTS[i % PENNANTS.length]}`}>{member.house}</span>
                    <span className="team-names">{member.names}</span>
                  </li>
                ))}
              </ul>
              {block.note || site?.email ? (
                <p className="lead">
                  {block.note || 'Anregungen und Fragen an'}{' '}
                  {site?.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : null}
                </p>
              ) : null}
            </section>
          )

        case 'wall':
          return (
            <section key={index} className="gallery wrap">
              <div className="invitations">
                {block.entries.map((entry: { media: Media; label: string | null }, i: number) => (
                  <Invitation key={i} media={entry.media} label={entry.label} index={i} />
                ))}
              </div>
            </section>
          )

        case 'archiveTeaser':
          return <ArchiveTeaser key={index} block={block} />

        case 'download': {
          const media = asMedia(block.file)
          if (!media?.url) return null
          return (
            <section key={index} className="wrap">
              <a className="button button-secondary" href={localPath(media.url)}>
                {block.label}
              </a>
            </section>
          )
        }

        default:
          return null
      }
    })}
  </>
)
