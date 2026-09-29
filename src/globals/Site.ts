import type { GlobalConfig } from 'payload'

// What the Pelican SITENAME, SITESUBTITLE and the footer used to be, plus
// what the home page's hero shows. The OK lives here rather than in a page
// so the home page and the Info page show one list, edited once a year.
export const Site: GlobalConfig = {
  slug: 'site',
  access: { read: () => true },
  label: 'Website',
  fields: [
    { name: 'name', type: 'text', label: 'Titel', required: true },
    { name: 'subtitle', type: 'text', label: 'Untertitel' },
    {
      name: 'date',
      type: 'text',
      label: 'Datum',
      admin: { description: 'So wie es oben auf der Startseite stehen soll, z. B. «Samstag, 8. August 2026».' },
    },
    { name: 'intro', type: 'textarea', label: 'Einladung', admin: { description: 'Der Satz unter dem Titel.' } },
    { name: 'email', type: 'text', label: 'Kontakt-E-Mail', defaultValue: 'fest@wollbi.ch' },
    {
      name: 'team',
      type: 'array',
      label: 'OK',
      labels: { singular: 'Person', plural: 'Personen' },
      fields: [
        { name: 'house', type: 'text', label: 'Hausnummer', required: true, admin: { description: 'z. B. W6' } },
        { name: 'names', type: 'text', label: 'Name(n)', required: true },
      ],
    },
    { name: 'footer', type: 'text', label: 'Fusszeile' },
  ],
}
