import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import NotreHistoireSection from './components/NotreHistoireSection.jsx'
import CavesGrid from './components/CavesGrid.jsx'
import SelectionSection from './components/SelectionSection.jsx'
import PartnersSection from './components/PartnersSection.jsx'
import ReviewsSection from './components/ReviewsSection.jsx'
import PlanningContactSection from './components/PlanningContactSection.jsx'
import Footer from './components/Footer.jsx'
import GdprBanner from './components/GdprBanner.jsx'
import { WINES, SPIRITS } from './catalogue.js'

export const CAVES = [
  {
    name: 'Le Cellier du Mans',
    slug: 'le-mans',
    city: 'Le Mans',
    address: '44 Av. François Mitterrand, 72000 Le Mans',
    phone: '09 88 52 80 34',
    phoneHref: '+33988528034',
    rating: '4,9',
    reviewCount: '39 avis',
    image: '/images/caves/cave-le-mans.jpg',
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+Le+Mans+44+Avenue+Francois+Mitterrand+72000+Le+Mans',
    lat: 48.0062,
    lng: 0.1992,
    tagline: 'Cave historique du réseau · Grands crus & spiritueux',
  },
  {
    name: 'Le Cellier de Connerré',
    slug: 'connerre',
    city: 'Connerré',
    address: '11 Rue de Paris, 72160 Connerré',
    phone: '09 88 09 31 47',
    phoneHref: '+33988093147',
    rating: '4,9',
    reviewCount: '53 avis',
    image: '/images/caves/cave-connerre.jpg',
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+de+Connerre+11+Rue+de+Paris+72160+Connerre',
    lat: 48.0610,
    lng: 0.4970,
    tagline: 'Vins de Loire & bières artisanales · Espace ateliers',
  },
  {
    name: 'Le Cellier de La Ferté-Bernard',
    slug: 'la-ferte-bernard',
    city: 'La Ferté-Bernard',
    address: '17 Rue Carnot, 72400 La Ferté-Bernard',
    phone: '02 43 93 36 79',
    phoneHref: '+33243933679',
    rating: '4,5',
    reviewCount: '33 avis',
    image: '/images/caves/cave-la-ferte-bernard.jpg',
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+17+Rue+Carnot+72400+La+Ferte-Bernard',
    lat: 48.1866,
    lng: 0.6530,
    tagline: 'En plein cœur de ville · Coffrets cadeaux & conseils',
  },
  {
    name: 'Le Cellier de Mamers',
    slug: 'mamers',
    city: 'Mamers',
    address: '52 Place Carnot, 72600 Mamers',
    phone: '09 81 30 12 20',
    phoneHref: '+33981301220',
    rating: '4,8',
    reviewCount: '24 avis',
    image: '/images/caves/cave-mamers.jpg',
    maps: 'https://www.google.com/maps/search/?api=1&query=Cave+Le+Cellier+Mamers+52+Place+Carnot+72600+Mamers',
    lat: 48.3490,
    lng: 0.3690,
    tagline: 'Place Carnot · Champagnes de vignerons & rhums vieux',
  },
  {
    name: 'Le Cellier de Bonnétable',
    slug: 'bonnetable',
    city: 'Bonnétable',
    address: '19 Rue du Maréchal Joffre, 72110 Bonnétable',
    phone: '09 84 03 87 24',
    phoneHref: '+33984038724',
    rating: '5,0',
    reviewCount: '7 avis',
    image: '/images/caves/cave-bonnetable.jpg',
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+Bonnetable+19+Rue+du+Marechal+Joffre+72110+Bonnetable',
    lat: 48.1817,
    lng: 0.4319,
    tagline: 'Ambiance chaleureuse · Épicerie fine & sélections locales',
  },
  {
    name: 'Le Cellier de Nogent-le-Rotrou',
    slug: 'nogent-le-rotrou',
    city: 'Nogent-le-Rotrou',
    address: '5 Rue Villette Gâte, 28400 Nogent-le-Rotrou',
    phone: '09 82 25 24 99',
    phoneHref: '+33982252499',
    rating: '5,0',
    reviewCount: '6 avis',
    image: '/images/caves/cave-nogent-le-rotrou.jpg',
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+Nogent+5+Rue+Villette+Gate+28400+Nogent-le-Rotrou',
    lat: 48.3180,
    lng: 0.7250,
    tagline: 'Perche vendômois · Rhums d’exception & vins bio',
  },
]

export const CAVE_SCHEDULES = {
  'Le Mans': {
    Lundi: [['14:30', '19:30']],
    Mardi: [['09:30', '12:30'], ['14:30', '19:30']],
    Mercredi: [['09:30', '12:30'], ['14:30', '19:30']],
    Jeudi: [['09:30', '12:30'], ['14:30', '19:30']],
    Vendredi: [['09:30', '19:30']],
    Samedi: [['09:30', '19:30']],
    Dimanche: [['09:30', '12:30']],
  },
  'Connerré': {
    Lundi: [['15:00', '19:15']],
    Mardi: [['09:30', '12:30'], ['15:00', '19:15']],
    Mercredi: [['09:30', '12:30'], ['15:00', '19:15']],
    Jeudi: [['09:30', '12:30'], ['15:00', '19:15']],
    Vendredi: [['09:30', '19:30']],
    Samedi: [['09:30', '19:30']],
    Dimanche: [['09:30', '12:30']],
  },
  'La Ferté-Bernard': {
    Lundi: [['14:30', '19:00']],
    Mardi: [['09:30', '12:30'], ['14:30', '19:00']],
    Mercredi: [['09:30', '12:30'], ['14:30', '19:00']],
    Jeudi: [['09:30', '12:30'], ['14:30', '19:00']],
    Vendredi: [['09:30', '19:15']],
    Samedi: [['09:30', '19:15']],
    Dimanche: [['09:30', '12:30']],
  },
  'Mamers': {
    Lundi: [['14:30', '19:00']],
    Mardi: [['09:30', '12:30'], ['14:30', '19:00']],
    Mercredi: [['09:30', '12:30'], ['14:30', '19:00']],
    Jeudi: [['09:30', '12:30'], ['14:30', '19:00']],
    Vendredi: [['09:30', '19:15']],
    Samedi: [['09:30', '19:15']],
    Dimanche: [['09:30', '12:30']],
  },
  'Bonnétable': {
    Lundi: [['14:30', '19:00']],
    Mardi: [['09:30', '12:30'], ['14:30', '19:00']],
    Mercredi: [['09:30', '12:30'], ['14:30', '19:00']],
    Jeudi: [['09:30', '12:30'], ['14:30', '19:00']],
    Vendredi: [['09:30', '19:15']],
    Samedi: [['09:30', '19:15']],
    Dimanche: [['09:30', '12:30']],
  },
  'Nogent-le-Rotrou': {
    Lundi: [['14:30', '19:00']],
    Mardi: [['09:30', '12:30'], ['14:30', '19:00']],
    Mercredi: [['09:30', '12:30'], ['14:30', '19:00']],
    Jeudi: [['09:30', '12:30'], ['14:30', '19:00']],
    Vendredi: [['09:30', '19:15']],
    Samedi: [['09:30', '19:15']],
    Dimanche: [['09:30', '12:30']],
  },
}

export const EVENTS = [
  {
    title: 'Dégustation Vins de Loire & Fromages',
    date: 'Vendredi 24 Octobre à 18h30',
    cave: 'Le Cellier du Mans',
    places: '8 places restantes',
    desc: 'Découvrez 5 accords parfaits entre vins ligériens et fromages affinés de nos régions.',
  },
  {
    title: 'Initiation à la Dégustation des Whiskys',
    date: 'Samedi 15 Novembre à 16h00',
    cave: 'Le Cellier de Connerré',
    places: '5 places restantes',
    desc: 'Voyage sensoriel à travers 4 whiskys d’exception (Écosse, Japon, France).',
  },
  {
    title: 'Soirée Bulles de Fêtes & Champagnes',
    date: 'Vendredi 5 Décembre à 18h30',
    cave: 'Le Cellier de La Ferté-Bernard',
    places: '12 places restantes',
    desc: 'Sélection exclusive de champagnes de vignerons pour préparer vos repas de fin d’année.',
  },
]

export const PARTNERS = [
  'Domaine de la Guilloterie',
  'Champagne Paul Le Brun',
  'Château de Chantegrive',
  'Distillerie des Menhirs',
  'Brasserie Artisanale du Perche',
  'Vignobles Mourat',
  'Domaine des Hautes Cimes',
  'Maison Guigal',
]

export const REVIEWS = [
  {
    name: 'Christophe L.',
    text: "Excellent magasin de vin et spiritueux. Accueil agréable et grand choix de références. Je recommande !",
  },
  {
    name: 'Boitiere Lydie',
    text: "Personnel à l'écoute, très bon conseil et souriant. Très beau magasin, il y en a pour tous les goûts et tous les budgets.",
  },
  {
    name: 'Marina B',
    text: "Très jolie cave, large choix, accueil souriant mais surtout de très bons conseils. Je recommande fortement.",
  },
  {
    name: 'Alexandre Hatton',
    text: "D’une extrême gentillesse et bienveillance au téléphone. Les bouteilles ont été mises au frais avant que je les récupère. Franchement génial !",
  },
  {
    name: 'hugo berceron',
    text: "Super accueil, toujours bienveillant avec de super conseils. Je recommande la bonne humeur et le professionnalisme de cette cave !",
  },
  {
    name: 'Lise Evrard',
    text: "Très bonne expérience dans cette cave. Nous avons été parfaitement conseillés et le cadeau était idéal.",
  },
]

const DAYS_ORDER = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const CURRENT_DAY_INDEX = (new Date().getDay() + 6) % 7
const TODAY_NAME = DAYS_ORDER[CURRENT_DAY_INDEX]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function getBottleSrc(file = '') {
  if (!file) return '/wine-display.png'
  if (file.startsWith('http://') || file.startsWith('https://')) return file
  if (file.startsWith('/')) return file
  return `/${file}`
}

export default function App() {
  const [geoText, setGeoText] = useState('')
  const [showGdpr, setShowGdpr] = useState(false)
  const [selectedCave, setSelectedCave] = useState('Le Mans')

  const selectedCaveInfo = CAVES.find((c) => c.city === selectedCave) || CAVES[0]
  const selectedSchedule = CAVE_SCHEDULES[selectedCave] || CAVE_SCHEDULES['Le Mans']

  useEffect(() => {
    const consent = localStorage.getItem('lecellier-gdpr-consent')
    if (!consent) {
      const t = setTimeout(() => setShowGdpr(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (!('geolocation' in navigator)) return
    setGeoText('Localisation…')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`)
          .then((r) => r.json())
          .then((data) => {
            const ville = data.city || data.locality || data.principalSubdivision || 'Sarthe & Perche'
            setGeoText(ville)
          })
          .catch(() => setGeoText('Sarthe & Perche'))
      },
      () => setGeoText('Sarthe & Perche'),
      { timeout: 7000 }
    )
  }, [])

  return (
    <>
      <Navbar onSelectCave={(city) => setSelectedCave(city)} geoText={geoText} />

      <main id="contenu-principal">
        <Hero />
        <NotreHistoireSection />
        <CavesGrid caves={CAVES} />
        <SelectionSection wines={WINES} spirits={SPIRITS} getBottleSrc={getBottleSrc} />
        <PartnersSection partners={PARTNERS} />
        <ReviewsSection reviews={REVIEWS} />
        <PlanningContactSection
          caves={CAVES}
          selectedCave={selectedCave}
          onSelectCave={setSelectedCave}
          selectedCaveInfo={selectedCaveInfo}
          selectedSchedule={selectedSchedule}
          events={EVENTS}
          todayName={TODAY_NAME}
        />
      </main>

      <Footer
        scrollToId={scrollToId}
        setShowGdpr={setShowGdpr}
        caves={CAVES}
      />

      <GdprBanner isOpen={showGdpr} onClose={() => setShowGdpr(false)} />
    </>
  )
}
