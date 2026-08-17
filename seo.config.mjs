export function getSiteUrl() {
  const raw = process.env.SITE_URL
    || process.env.VITE_SITE_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')

  return raw ? raw.replace(/\/$/, '') : ''
}

export const caves = [
  {
    name: 'Le Cellier du Mans', slug: 'le-mans', city: 'Le Mans', seoLocation: 'au Mans', postalCode: '72000', region: 'Pays de la Loire',
    street: '44 Avenue François Mitterrand', address: '44 Av. François Mitterrand, 72000 Le Mans',
    phone: '09 88 52 80 34', phoneHref: '+33988528034', lat: 48.0062, lng: 0.1992,
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+Le+Mans+44+Avenue+Francois+Mitterrand+72000+Le+Mans',
    hours: { Monday: ['14:00','19:00'], Tuesday: ['10:00','19:00'], Wednesday: ['10:00','19:00'], Thursday: ['10:00','19:00'], Friday: ['10:00','19:00'], Saturday: ['10:00','19:00'] }
  },
  {
    name: 'Le Cellier de Connerré', slug: 'connerre', city: 'Connerré', seoLocation: 'à Connerré', postalCode: '72160', region: 'Pays de la Loire',
    street: '11 Rue de Paris', address: '11 Rue de Paris, 72160 Connerré',
    phone: '09 88 09 31 47', phoneHref: '+33988093147', lat: 48.0610, lng: 0.4970,
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+de+Connerre+11+Rue+de+Paris+72160+Connerre',
    hours: { Tuesday: [['09:30','12:00'],['14:30','19:00']], Wednesday: [['09:30','12:00'],['14:30','19:00']], Thursday: [['09:30','12:00'],['14:30','19:00']], Friday: [['09:30','12:00'],['14:30','19:00']], Saturday: [['09:30','12:30'],['14:30','19:00']], Sunday: ['09:30','12:30'] }
  },
  {
    name: 'Le Cellier de La Ferté-Bernard', slug: 'la-ferte-bernard', city: 'La Ferté-Bernard', seoLocation: 'à La Ferté-Bernard', postalCode: '72400', region: 'Pays de la Loire',
    street: '17 Rue Carnot', address: '17 Rue Carnot, 72400 La Ferté-Bernard',
    phone: '02 43 93 36 79', phoneHref: '+33243933679', lat: 48.1866, lng: 0.6530,
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+17+Rue+Carnot+72400+La+Ferte-Bernard',
    hours: { Monday: [['10:00','12:00'],['14:30','19:00']], Tuesday: [['09:30','12:00'],['14:30','19:00']], Wednesday: [['09:30','12:00'],['14:30','19:00']], Thursday: [['09:30','12:00'],['14:30','19:00']], Friday: [['09:30','12:30'],['14:30','19:00']], Saturday: [['09:30','13:00'],['14:00','19:00']] }
  },
  {
    name: 'Le Cellier de Mamers', slug: 'mamers', city: 'Mamers', seoLocation: 'à Mamers', postalCode: '72600', region: 'Pays de la Loire',
    street: '52 Place Carnot', address: '52 Place Carnot, 72600 Mamers',
    phone: '09 81 30 12 20', phoneHref: '+33981301220', lat: 48.3490, lng: 0.3690,
    maps: 'https://www.google.com/maps/search/?api=1&query=Cave+Le+Cellier+Mamers+52+Place+Carnot+72600+Mamers',
    hours: { Tuesday: [['09:30','12:30'],['14:00','19:00']], Wednesday: [['09:30','12:30'],['14:00','19:00']], Thursday: [['09:30','12:30'],['14:00','19:00']], Friday: [['09:30','12:30'],['14:00','19:00']], Saturday: [['09:30','12:30'],['14:00','19:00']] }
  },
  {
    name: 'Le Cellier de Bonnétable', slug: 'bonnetable', city: 'Bonnétable', seoLocation: 'à Bonnétable', postalCode: '72110', region: 'Pays de la Loire',
    street: '19 Rue du Maréchal Joffre', address: '19 Rue du Maréchal Joffre, 72110 Bonnétable',
    phone: '09 84 03 87 24', phoneHref: '+33984038724', lat: 48.1817, lng: 0.4319,
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+Bonnetable+19+Rue+du+Marechal+Joffre+72110+Bonnetable',
    hours: { Tuesday: [['10:00','12:30'],['14:00','19:00']], Wednesday: [['10:00','12:30'],['14:00','19:00']], Thursday: [['10:00','12:30'],['14:00','19:00']], Friday: [['10:00','12:30'],['14:00','19:00']], Saturday: [['10:00','13:00'],['14:00','19:00']], Sunday: ['09:30','12:30'] }
  },
  {
    name: 'Le Cellier de Nogent-le-Rotrou', slug: 'nogent-le-rotrou', city: 'Nogent-le-Rotrou', seoLocation: 'à Nogent-le-Rotrou', postalCode: '28400', region: 'Centre-Val de Loire',
    street: '5 Rue Villette Gâte', address: '5 Rue Villette Gâte, 28400 Nogent-le-Rotrou',
    phone: '09 82 25 24 99', phoneHref: '+33982252499', lat: 48.3214, lng: 0.8217,
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+Nogent+5+Rue+Villette+Gate+28400+Nogent-le-Rotrou',
    hours: { Tuesday: [['09:30','12:00'],['14:30','19:00']], Wednesday: [['09:30','12:00'],['14:30','19:00']], Thursday: [['09:30','12:00'],['14:30','19:00']], Friday: [['09:30','12:30'],['14:30','19:00']], Saturday: ['09:30','19:00'] }
  }
]
