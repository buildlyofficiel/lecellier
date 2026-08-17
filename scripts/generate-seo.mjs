import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { caves, getSiteUrl } from '../seo.config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')
const siteUrl = getSiteUrl()
const today = new Date().toISOString().slice(0, 10)

const dayFr = { Monday:'Lundi', Tuesday:'Mardi', Wednesday:'Mercredi', Thursday:'Jeudi', Friday:'Vendredi', Saturday:'Samedi', Sunday:'Dimanche' }
const daySchema = { Monday:'https://schema.org/Monday', Tuesday:'https://schema.org/Tuesday', Wednesday:'https://schema.org/Wednesday', Thursday:'https://schema.org/Thursday', Friday:'https://schema.org/Friday', Saturday:'https://schema.org/Saturday', Sunday:'https://schema.org/Sunday' }

function esc(s='') { return s.replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) }
function hoursText(value) {
  if (!value) return 'Fermé'
  if (Array.isArray(value[0])) return value.map(([o,c]) => `${o.replace(':','h')} – ${c.replace(':','h')}`).join(' / ')
  return `${value[0].replace(':','h')} – ${value[1].replace(':','h')}`
}
function openingSpecs(cave) {
  const out=[]
  for (const [day,value] of Object.entries(cave.hours)) {
    const periods = Array.isArray(value[0]) ? value : [value]
    for (const [opens, closes] of periods) out.push({ '@type':'OpeningHoursSpecification', dayOfWeek: daySchema[day], opens, closes })
  }
  return out
}

const sitemapPath = path.join(publicDir, 'sitemap.xml')
if (siteUrl) {
  const urls = [
    { loc: `${siteUrl}/`, priority: '1.0', changefreq: 'weekly' },
    ...caves.map(c => ({ loc: `${siteUrl}/caves/${c.slug}/`, priority: '0.9', changefreq: 'weekly' }))
  ]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`
  fs.writeFileSync(sitemapPath, sitemap)
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
} else {
  if (fs.existsSync(sitemapPath)) fs.unlinkSync(sitemapPath)
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), 'User-agent: *\nAllow: /\n')
}

for (const cave of caves) {
  const dir = path.join(publicDir, 'caves', cave.slug)
  fs.mkdirSync(dir, { recursive: true })
  const pageUrl = siteUrl ? `${siteUrl}/caves/${cave.slug}/` : `/caves/${cave.slug}/`
  const desc = `${cave.name}, votre caviste ${cave.seoLocation}. Découvrez vins, champagnes, bières et spiritueux, nos horaires, l’adresse et l’itinéraire.`
  const schema = {
    '@context':'https://schema.org', '@type':'LiquorStore', '@id':`${pageUrl}#business`,
    name:cave.name, url:pageUrl, telephone:cave.phoneHref, image: siteUrl ? `${siteUrl}/wine-cellar.png` : '/wine-cellar.png',
    description:desc,
    address:{ '@type':'PostalAddress', streetAddress:cave.street, postalCode:cave.postalCode, addressLocality:cave.city, addressRegion:cave.region, addressCountry:'FR' },
    geo:{ '@type':'GeoCoordinates', latitude:cave.lat, longitude:cave.lng },
    openingHoursSpecification:openingSpecs(cave),
    parentOrganization:{ '@type':'Organization', name:'Le Cellier', ...(siteUrl ? { url:`${siteUrl}/` } : {}) }
  }
  const rows = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => `<tr><th>${dayFr[day]}</th><td>${hoursText(cave.hours[day])}</td></tr>`).join('')
  const html = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Caviste ${esc(cave.seoLocation)} | ${esc(cave.name)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="canonical" href="${pageUrl}">
  <link rel="alternate" hreflang="fr-FR" href="${pageUrl}">
  <meta property="og:type" content="website"><meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Le Cellier"><meta property="og:title" content="Caviste ${esc(cave.seoLocation)} | ${esc(cave.name)}">
  <meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${siteUrl ? `${siteUrl}/wine-cellar.png` : '/wine-cellar.png'}"><meta property="og:image:alt" content="Cave à vins Le Cellier">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(cave.name)}">
  <meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${siteUrl ? `${siteUrl}/wine-cellar.png` : '/wine-cellar.png'}">
  <link rel="icon" href="/logo-le-cellier-bleu.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>
    :root{--cream:#f3ede1;--ink:#221a16;--soft:#5a4d43;--blue:#145261;--gold:#b8902f;--line:#ddd0ba}*{box-sizing:border-box}body{margin:0;background:var(--cream);color:var(--ink);font-family:Inter,sans-serif;line-height:1.6}.wrap{width:min(1080px,calc(100% - 40px));margin:auto}.top{padding:24px 0;display:flex;align-items:center;justify-content:space-between;gap:20px}.logo{width:64px;height:68px;object-fit:contain}.back{font-size:13px;font-weight:600;color:var(--blue);text-decoration:none}.hero{display:grid;grid-template-columns:1.15fr .85fr;gap:26px;align-items:stretch;padding:38px 0 58px}.photo{min-height:510px;border-radius:22px;background:url('/wine-cellar.png') center/cover;position:relative;overflow:hidden}.photo:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.38))}.card{background:#fff9;border:1px solid var(--line);border-radius:22px;padding:42px}.eyebrow{color:var(--gold);font-size:12px;letter-spacing:1.8px;text-transform:uppercase;font-weight:600}.card h1{font:500 48px/1.06 'Playfair Display',serif;margin:12px 0 18px}.card h1 em{color:var(--blue)}.lead{color:var(--soft)}.details{margin:30px 0;display:grid;gap:12px}.details a{color:var(--blue);font-weight:600;text-decoration:none}.buttons{display:flex;gap:10px;flex-wrap:wrap}.btn{padding:11px 17px;border-radius:999px;text-decoration:none;font-weight:600;font-size:13px;border:1px solid var(--blue);color:var(--blue)}.btn.primary{background:var(--blue);color:white}.hours{padding:70px 0;border-top:1px solid var(--line)}.hours h2{font:500 38px 'Playfair Display',serif;margin:0 0 24px}table{width:100%;border-collapse:collapse;background:#fff7;border:1px solid var(--line);border-radius:16px;overflow:hidden}th,td{padding:15px 18px;border-bottom:1px solid var(--line);text-align:left}th{width:35%;font-weight:600}tr:last-child th,tr:last-child td{border-bottom:0}footer{margin-top:40px;padding:28px 0;border-top:1px solid var(--line);color:var(--soft);font-size:12px}@media(max-width:760px){.hero{grid-template-columns:1fr}.photo{min-height:320px}.card{padding:28px}.card h1{font-size:39px}.top{padding-top:14px}.hours{padding-top:45px}}
  </style>
</head>
<body>
  <header class="wrap top"><a href="/" aria-label="Accueil Le Cellier"><img class="logo" src="/logo-le-cellier-bleu.png" alt="Logo Le Cellier" width="484" height="516"></a><a class="back" href="/#caves">← Voir les 6 caves</a></header>
  <main class="wrap">
    <section class="hero">
      <div class="photo" role="img" aria-label="Intérieur d’une cave Le Cellier"></div>
      <article class="card"><span class="eyebrow">Caviste ${esc(cave.seoLocation)}</span><h1>${esc(cave.name)}</h1><p class="lead">Retrouvez notre sélection de vins, champagnes, bières et spiritueux, accompagnée des conseils de l’équipe Le Cellier.</p><div class="details"><address>${esc(cave.address)}</address><a href="tel:${cave.phoneHref}">${esc(cave.phone)}</a></div><div class="buttons"><a class="btn primary" href="${cave.maps}" target="_blank" rel="noopener noreferrer">Itinéraire</a><a class="btn" href="/#contact">Nous contacter</a></div></article>
    </section>
    <section class="hours"><span class="eyebrow">Informations pratiques</span><h2>Horaires de la cave</h2><table><tbody>${rows}</tbody></table></section>
  </main>
  <footer><div class="wrap">© ${new Date().getFullYear()} Le Cellier · ${esc(cave.city)} · <a href="/">Site principal</a></div></footer>
</body>
</html>`
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

console.log(`[SEO] Generated ${caves.length} local landing pages${siteUrl ? ` + sitemap for ${siteUrl}` : ' (SITE_URL not set: sitemap omitted)'}`)
