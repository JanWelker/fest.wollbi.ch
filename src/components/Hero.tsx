import Image from 'next/image'

import type { Site } from '@/payload-types'

// The home page's opening: the date, the name, the invitation, and the
// telescope man from the very first invitation in 1987.
export const Hero = ({ site }: { site: Site | null }) => (
  <section className="hero wrap">
    <div className="hero-text">
      {site?.date ? <p className="hero-date">{site.date}</p> : null}
      <h1 className="hero-title">{site?.name ?? 'Wollbi-Fescht'}</h1>
      {site?.subtitle ? <p className="hero-subtitle">{site.subtitle}</p> : null}
      {site?.intro ? <p className="hero-intro">{site.intro}</p> : null}
      <div className="hero-actions">
        <a className="button button-primary" href="#programm">
          Zum Programm
        </a>
        {site?.email ? (
          <a className="button button-secondary" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        ) : null}
      </div>
    </div>
    <div className="hero-mascot">
      <Image
        src="/mascot.png"
        alt="Der Wollbi-Späher mit Fernrohr, seit der ersten Einladung 1987 dabei"
        width={1040}
        height={726}
        priority
        sizes="(max-width: 720px) 90vw, 520px"
      />
    </div>
  </section>
)
