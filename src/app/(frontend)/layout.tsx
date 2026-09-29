import React from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { Analytics } from './Analytics'
import './styles.css'

export const metadata = {
  title: 'Wollbi-Fescht',
  description: 'Das Quartierfest an der Wollbacherstrasse, seit 1987.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: await config })
  const site = await payload.findGlobal({ slug: 'site' })
  const pages = await payload.find({
    collection: 'pages',
    where: { showInNav: { equals: true } },
    sort: 'order',
    limit: 50,
  })

  return (
    <html lang="de">
      <body>
        <header className="banner">
          <a className="brand" href="/">
            <span className="name">{site?.name ?? 'Wollbi-Fescht'}</span>
            {site?.subtitle ? <span className="subtitle">{site.subtitle}</span> : null}
          </a>
          <nav>
            {pages.docs.map((page) => (
              <a key={page.id} href={page.slug === 'home' ? '/' : `/${page.slug}`}>
                {page.navLabel || page.title}
              </a>
            ))}
          </nav>
        </header>
        <main>{children}</main>
        <footer>{site?.footer ?? 'wollbi.ch'}</footer>
        <Analytics />
      </body>
    </html>
  )
}
