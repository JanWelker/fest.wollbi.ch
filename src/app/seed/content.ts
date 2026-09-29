// The three Pelican pages, as they were in content/pages/*.md before the
// migration. This file is the migration: after the first seed the database
// is the source of truth and editing happens in /admin.

export const site = {
  name: 'Wollbi-Fescht',
  subtitle: 'Das Quartierfest an der Wollbacherstrasse',
  footer: '© wollbi.ch',
}

export const admin = {
  email: process.env.SEED_ADMIN_EMAIL || 'fest@wollbi.ch',
  name: 'Wollbi Fest OK',
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

export const welcome = {
  intro: `Dieses Jahr findet das **Wollbi-Fescht am 8. August** statt. Alle Bewohnerinnen und Bewohner der Wollbi sind ganz herzlich eingeladen.

# Sponsor gefunden!

Wir freuen uns sehr, dass Susan & Markus (Wollbi 2) den Apéro sponsern werden.

# Programm 2026`,
  programme: 'prog_26.png',
}

export const info = `Das Wollbi Fest findet seit 1987 an der Wollbacherstrasse statt.

Im OK der diesjährigen Ausgabe sind:

* W6: Céline
* W7: Andrea
* W8: Simon
* W9: Sina
* W42: Benj & Melanie

Anregungen und Fragen können gerne an [fest@wollbi.ch](mailto:fest@wollbi.ch) gesendet werden.`

export const archiveIntro = `Das Wollbi Fest gibt es bereits seit 1987. Auf dieser Seite findet ihr historische Einladungen zum Fest.`
