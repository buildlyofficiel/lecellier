import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { caves, getSiteUrl } from './seo.config.mjs'

const siteUrl = getSiteUrl()
const rootUrl = siteUrl ? `${siteUrl}/` : '/'
const daySchema = {
  Monday: 'https://schema.org/Monday', Tuesday: 'https://schema.org/Tuesday',
  Wednesday: 'https://schema.org/Wednesday', Thursday: 'https://schema.org/Thursday',
  Friday: 'https://schema.org/Friday', Saturday: 'https://schema.org/Saturday', Sunday: 'https://schema.org/Sunday',
}

function openingSpecs(cave) {
  const specs = []
  for (const [day, value] of Object.entries(cave.hours)) {
    const periods = Array.isArray(value[0]) ? value : [value]
    for (const [opens, closes] of periods) {
      specs.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: daySchema[day], opens, closes })
    }
  }
  return specs
}

const organizationId = `${rootUrl}#organization`
const rootJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': organizationId, name: 'Le Cellier', url: rootUrl,
      logo: siteUrl ? `${siteUrl}/logo-le-cellier-bleu.png` : '/logo-le-cellier-bleu.png',
      description: 'Réseau de six caves proposant vins, champagnes, spiritueux, bières artisanales et épicerie fine.',
      sameAs: ['https://www.instagram.com/lecellierlemans/'],
    },
    {
      '@type': 'WebSite', '@id': `${rootUrl}#website`, url: rootUrl, name: 'Le Cellier', inLanguage: 'fr-FR',
      publisher: { '@id': organizationId },
    },
    ...caves.map(cave => {
      const url = siteUrl ? `${siteUrl}/caves/${cave.slug}/` : `/caves/${cave.slug}/`
      return {
        '@type': 'LiquorStore', '@id': `${url}#business`, name: cave.name, url, telephone: cave.phoneHref,
        image: siteUrl ? `${siteUrl}/wine-cellar.png` : '/wine-cellar.png',
        address: { '@type': 'PostalAddress', streetAddress: cave.street, postalCode: cave.postalCode, addressLocality: cave.city, addressRegion: cave.region, addressCountry: 'FR' },
        geo: { '@type': 'GeoCoordinates', latitude: cave.lat, longitude: cave.lng },
        openingHoursSpecification: openingSpecs(cave),
        parentOrganization: { '@id': organizationId },
      }
    }),
  ],
})

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'le-cellier-seo',
      transformIndexHtml(html) {
        return html
          .replaceAll('__SITE_URL__', siteUrl)
          .replace('__ROOT_JSON_LD__', rootJsonLd)
      },
    },
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['.vercel.run', 'localhost', '127.0.0.1', 'all'],
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
})
