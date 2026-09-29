import type { Block } from 'payload'

// The shapes the pages are made of. The first three are what the Pelican
// pages were; the rest are the Fähnli design's sections, as data so the OK
// can change them in /admin without a deploy.

export const Prose: Block = {
  slug: 'prose',
  labels: { singular: 'Text', plural: 'Texte' },
  fields: [{ name: 'content', type: 'richText', required: true }],
}

export const Gallery: Block = {
  slug: 'gallery',
  labels: { singular: 'Bilder', plural: 'Bilder' },
  fields: [
    { name: 'heading', type: 'text', label: 'Überschrift' },
    {
      name: 'images',
      type: 'array',
      label: 'Bilder',
      minRows: 1,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}

export const Download: Block = {
  slug: 'download',
  labels: { singular: 'Download', plural: 'Downloads' },
  fields: [
    { name: 'label', type: 'text', label: 'Beschriftung', required: true },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
  ],
}

export const Schedule: Block = {
  slug: 'schedule',
  labels: { singular: 'Programm', plural: 'Programme' },
  fields: [
    { name: 'heading', type: 'text', label: 'Überschrift', defaultValue: 'Programm' },
    {
      name: 'items',
      type: 'array',
      label: 'Programmpunkte',
      minRows: 1,
      fields: [
        { name: 'time', type: 'text', label: 'Zeit', required: true, admin: { description: 'z. B. 17:00' } },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'text', type: 'textarea', label: 'Text' },
      ],
    },
    { name: 'asideTitle', type: 'text', label: 'Kasten: Titel', admin: { description: 'z. B. «Bitte mitbringen». Leer lassen für keinen Kasten.' } },
    { name: 'asideText', type: 'textarea', label: 'Kasten: Text' },
  ],
}

export const Callout: Block = {
  slug: 'callout',
  labels: { singular: 'Hinweis', plural: 'Hinweise' },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    { name: 'text', type: 'textarea', label: 'Text' },
    {
      name: 'tone',
      type: 'select',
      label: 'Farbe',
      defaultValue: 'sonne',
      options: [
        { label: 'Sonnengelb', value: 'sonne' },
        { label: 'Gestrichelt', value: 'linie' },
      ],
    },
  ],
}

export const Team: Block = {
  slug: 'team',
  labels: { singular: 'OK', plural: 'OK' },
  fields: [
    { name: 'heading', type: 'text', label: 'Überschrift', defaultValue: 'Euer OK' },
    {
      name: 'note',
      type: 'text',
      label: 'Hinweis',
      admin: { description: 'Die Personen selbst stehen unter Website → OK.' },
    },
  ],
}

export const ArchiveTeaser: Block = {
  slug: 'archiveTeaser',
  labels: { singular: 'Archiv-Vorschau', plural: 'Archiv-Vorschauen' },
  fields: [
    { name: 'heading', type: 'text', label: 'Überschrift', defaultValue: 'Einladungen seit 1987' },
    { name: 'text', type: 'text', label: 'Text' },
    { name: 'archiveSlug', type: 'text', label: 'Archivseite (Slug)', defaultValue: 'archiv' },
    { name: 'count', type: 'number', label: 'Anzahl Bilder', defaultValue: 5, min: 1, max: 8 },
  ],
}
