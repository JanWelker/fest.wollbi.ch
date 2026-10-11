import { Chewy, Nunito } from 'next/font/google'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { Garland } from '@/components/Garland'
import { NavLinks } from '@/components/NavLinks'
import config from '@/payload.config'
import { Analytics } from './Analytics'
import './styles.css'

// The flyer's lettering is hand-drawn; Chewy is the web font closest to it.
// next/font downloads both at build time and serves them from this site, so
// a visitor's browser never asks Google for anything.
const display = Chewy({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' })
const body = Nunito({ weight: ['400', '600', '700', '800'], subsets: ['latin'], variable: '--font-body', display: 'swap' })

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
  const links = pages.docs.map((page) => ({
    href: page.slug === 'home' ? '/' : `/${page.slug}`,
    label: page.navLabel || page.title,
  }))

  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#inhalt">
          Zum Inhalt
        </a>
        <header className="site-header">
          <nav className="nav wrap" aria-label="Hauptnavigation">
            <Link className="brand" href="/">
              {site?.name ?? 'Wollbi-Fescht'}
            </Link>
            <NavLinks links={links} />
          </nav>
          <Garland />
        </header>
        <main id="inhalt">{children}</main>
        <footer className="site-footer">
          <Garland offset={2} className="garland-footer" />
          <div className="footer-inner wrap">
            <span className="brand">{site?.name ?? 'Wollbi-Fescht'}</span>
            <span>
              {site?.footer ?? '© wollbi.ch'}
              {site?.email ? (
                <>
                  {' · '}
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </>
              ) : null}
            </span>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
