// The Pelican pages and the 2026 flyer, as the seed writes them. After the
// first seed the database is the source of truth and editing happens in
// /admin; this file only matters to an empty database.

export const site = {
  name: 'Wollbi-Fescht',
  subtitle: 'syt 1987 an der Wollbacherstrasse',
  date: 'Samstag, 8. August 2026',
  intro:
    'Alle Bewohnerinnen und Bewohner der Wollbi sind ganz herzlich eingeladen. Die Strasse gehört uns von 10:00 bis 24:00.',
  email: 'fest@wollbi.ch',
  team: [
    { house: 'W6', names: 'Céline' },
    { house: 'W7', names: 'Andrea' },
    { house: 'W8', names: 'Simon' },
    { house: 'W9', names: 'Sina' },
    { house: 'W42', names: 'Benj & Melanie' },
  ],
  footer: '© wollbi.ch',
}

export const sponsor = {
  title: 'Sponsor gefunden!',
  text: 'Wir freuen uns sehr, dass Susan & Markus (Wollbi 2) den Apéro sponsern werden.',
}

// The 2026 flyer, as text.
export const programme = {
  items: [
    { time: '10:00', title: 'Strasse gesperrt', text: 'Bitte alle Autos wegfahren.' },
    {
      time: '11:00',
      title: 'Brunch',
      text: 'Frischer Zopf aus den Wollbi-Backöfen ist organisiert. Alles Weitere bitte selbst mitbringen.',
    },
    { time: '17:00', title: 'Apéro', text: 'Offeriert von W2.' },
    { time: '18:30', title: 'Grill & Buffet', text: 'Für das Buffet bitte eine Beilage oder ein Dessert mitbringen.' },
    { time: '24:00', title: 'Ende', text: '' },
  ],
  asideTitle: 'Bitte mitbringen',
  asideText: 'Zum Brunch: alles ausser dem Zopf, der ist organisiert. Zum Buffet: eine Beilage oder ein Dessert.',
  flyer: 'prog_26.png',
}

export const archiveTeaser = {
  heading: 'Einladungen seit 1987',
  text: 'Der Späher mit dem Fernrohr war schon auf der allerersten.',
}

// year -> the invitation scans for it, in the order the archive page had them
export const archive: [string, string[]][] = [
  ['1987', ['1987.png', '1987_2.png', '1987_3.png']],
  ['1988', ['1988.png']],
  ['1989', ['1989.png']],
  ['1990', ['1990.png']],
  ['1992', ['1992.png']],
  ['1994', ['1994.png']],
  ['1995', ['1995.png']],
  ['1996', ['1996.png']],
  ['1997', ['1997.png']],
  ['1998', ['1998.png', '1998_2.png']],
  ['2002', ['2002.png']],
  ['2006', ['2006.png']],
  ['2007', ['2007.png']],
  ['2008', ['2008.png']],
  ['2015', ['2015.png']],
  ['2016', ['2016.png']],
  ['2017', ['2017.png']],
  ['2018', ['2018.png']],
  ['2019', ['2019.png']],
  ['2020', ['2020.png']],
  ['2021', ['2021.png']],
  ['2022', ['2022.png']],
  ['2023', ['2023.png']],
  ['2024', ['prog_24.png']],
]

export const info = `Das Wollbi Fest findet seit 1987 an der Wollbacherstrasse statt.`

export const archiveIntro = `Das Wollbi Fest gibt es bereits seit 1987. Auf dieser Seite findet ihr historische Einladungen zum Fest.`
