import { useEffect, useState, useMemo, useRef } from 'react'
import { Menu } from 'lucide-react'

const WINES = [
  { file: 'red-wine.png', region: 'Bordeaux', type: 'Rouge', name: 'Sélection Bordeaux rouge' },
  { file: 'white-wine.png', region: 'Bordeaux', type: 'Blanc', name: 'Sélection Bordeaux blanc' },
  { file: 'vin-bourgogne.png', region: 'Bourgogne', type: 'Rouge', name: 'Sélection Bourgogne rouge' },
  { file: 'vin-chablis.png', region: 'Bourgogne', type: 'Blanc', name: 'Sélection Bourgogne blanc' },
  { file: 'vin-cotes-du-rhone.png', region: 'Vallée du Rhône', type: 'Rouge', name: 'Sélection Rhône rouge' },
  { file: 'white-wine.png', region: 'Vallée du Rhône', type: 'Blanc', name: 'Sélection Rhône blanc' },
  { file: 'red-wine.png', region: 'Vallée de la Loire', type: 'Rouge', name: 'Sélection Loire rouge' },
  { file: 'white-wine.png', region: 'Vallée de la Loire', type: 'Blanc', name: 'Sélection Loire blanc' },
  { file: 'red-wine.png', region: 'Alsace', type: 'Rouge', name: 'Sélection Alsace rouge' },
  { file: 'white-wine.png', region: 'Alsace', type: 'Blanc', name: 'Sélection Alsace blanc' },
  { file: 'red-wine.png', region: 'Languedoc-Roussillon', type: 'Rouge', name: 'Sélection Languedoc rouge' },
  { file: 'white-wine.png', region: 'Languedoc-Roussillon', type: 'Blanc', name: 'Sélection Languedoc blanc' },
]

const SPIRITS = [
  { file: 'wine-tasting.png', category: 'Whisky', name: 'Sélection Whisky' },
  { file: 'wine-display.png', category: 'Rhum', name: 'Sélection Rhum' },
  { file: 'wine-glasses.png', category: 'Gin', name: 'Sélection Gin' },
  { file: 'wine-tasting.png', category: 'Cognac', name: 'Sélection Cognac' },
  { file: 'wine-display.png', category: 'Armagnac', name: 'Sélection Armagnac' },
  { file: 'wine-glasses.png', category: 'Calvados', name: 'Sélection Calvados' },
  { file: 'wine-tasting.png', category: 'Tequila', name: 'Sélection Tequila' },
  { file: 'wine-display.png', category: 'Mezcal', name: 'Sélection Mezcal' },
  { file: 'wine-glasses.png', category: 'Vodka', name: 'Sélection Vodka' },
  { file: 'wine-tasting.png', category: 'Liqueurs', name: 'Sélection Liqueurs' },
]

const CAVES = [
  {
    name: 'Le Cellier du Mans',
    slug: 'le-mans',
    city: 'Le Mans',
    address: '44 Av. François Mitterrand, 72000 Le Mans',
    phone: '09 88 52 80 34',
    phoneHref: '+33988528034',
    rating: '4,9',
    reviewCount: '39 avis',
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+Le+Mans+44+Avenue+Francois+Mitterrand+72000+Le+Mans',
    lat: 48.0062,
    lng: 0.1992,
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
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+de+Connerre+11+Rue+de+Paris+72160+Connerre',
    lat: 48.0610,
    lng: 0.4970,
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
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+17+Rue+Carnot+72400+La+Ferte-Bernard',
    lat: 48.1866,
    lng: 0.6530,
  },
  {
    name: 'Le Cellier de Mamers',
    slug: 'mamers',
    city: 'Mamers',
    address: '52 Place Carnot, 72600 Mamers',
    phone: '09 81 30 12 20',
    phoneHref: '+33981301220',
    rating: null,
    reviewCount: null,
    maps: 'https://www.google.com/maps/search/?api=1&query=Cave+Le+Cellier+Mamers+52+Place+Carnot+72600+Mamers',
    lat: 48.3490,
    lng: 0.3690,
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
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+Bonnetable+19+Rue+du+Marechal+Joffre+72110+Bonnetable',
    lat: 48.1817,
    lng: 0.4319,
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
    maps: 'https://www.google.com/maps/search/?api=1&query=Le+Cellier+Nogent+5+Rue+Villette+Gate+28400+Nogent-le-Rotrou',
    lat: 48.3214,
    lng: 0.8217,
  },
]

const CAVE_SCHEDULES = {
  'Le Mans': [
    { day: 'Lundi', hours: '14h00 – 19h00' },
    { day: 'Mardi', hours: '10h00 – 19h00' },
    { day: 'Mercredi', hours: '10h00 – 19h00' },
    { day: 'Jeudi', hours: '10h00 – 19h00' },
    { day: 'Vendredi', hours: '10h00 – 19h00' },
    { day: 'Samedi', hours: '10h00 – 19h00' },
    { day: 'Dimanche', hours: null },
  ],
  'Connerré': [
    { day: 'Lundi', hours: null },
    { day: 'Mardi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Mercredi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Jeudi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Vendredi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Samedi', hours: '09h30 – 12h30 / 14h30 – 19h00' },
    { day: 'Dimanche', hours: '09h30 – 12h30' },
  ],
  'La Ferté-Bernard': [
    { day: 'Lundi', hours: '10h00 – 12h00 / 14h30 – 19h00' },
    { day: 'Mardi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Mercredi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Jeudi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Vendredi', hours: '09h30 – 12h30 / 14h30 – 19h00' },
    { day: 'Samedi', hours: '09h30 – 13h00 / 14h00 – 19h00' },
    { day: 'Dimanche', hours: null },
  ],
  'Mamers': [
    { day: 'Lundi', hours: null },
    { day: 'Mardi', hours: '09h30 – 12h30 / 14h00 – 19h00' },
    { day: 'Mercredi', hours: '09h30 – 12h30 / 14h00 – 19h00' },
    { day: 'Jeudi', hours: '09h30 – 12h30 / 14h00 – 19h00' },
    { day: 'Vendredi', hours: '09h30 – 12h30 / 14h00 – 19h00' },
    { day: 'Samedi', hours: '09h30 – 12h30 / 14h00 – 19h00' },
    { day: 'Dimanche', hours: null },
  ],
  'Bonnétable': [
    { day: 'Lundi', hours: null },
    { day: 'Mardi', hours: '10h00 – 12h30 / 14h00 – 19h00' },
    { day: 'Mercredi', hours: '10h00 – 12h30 / 14h00 – 19h00' },
    { day: 'Jeudi', hours: '10h00 – 12h30 / 14h00 – 19h00' },
    { day: 'Vendredi', hours: '10h00 – 12h30 / 14h00 – 19h00' },
    { day: 'Samedi', hours: '10h00 – 13h00 / 14h00 – 19h00' },
    { day: 'Dimanche', hours: '09h30 – 12h30' },
  ],
  'Nogent-le-Rotrou': [
    { day: 'Lundi', hours: null },
    { day: 'Mardi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Mercredi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Jeudi', hours: '09h30 – 12h00 / 14h30 – 19h00' },
    { day: 'Vendredi', hours: '09h30 – 12h30 / 14h30 – 19h00' },
    { day: 'Samedi', hours: '09h30 – 19h00' },
    { day: 'Dimanche', hours: null },
  ],
}

const EVENTS = [
  {
    date: '15 FÉV',
    title: 'Dégustation vins & fromages / 35 €',
    desc: "Une découverte guidée de cinq flacons accordés à une sélection de fromages affinés.",
  },
  {
    date: '22 FÉV',
    title: 'Atelier initiation au vin / 45 €',
    desc: "Apprenez à reconnaître les arômes, les cépages et les régions en compagnie de notre caviste.",
  },
  {
    date: '01 MAR',
    title: 'Soirée vignerons / 55 €',
    desc: 'Rencontre avec trois vignerons partenaires autour de leurs dernières cuvées.',
  },
]

const PARTNERS = [
  { name: 'exemple' },
  { name: 'exemple' },
  { name: 'exemple' },
  { name: 'exemple' },
  { name: 'exemple' },
  { name: 'exemple' },
  { name: 'exemple' },
  { name: 'exemple' },
]

const GIFT_IDEAS = [
  { name: 'Coffret bière sur mesure', desc: 'Une composition personnalisée selon les goûts et les envies.' },
  { name: 'Champagne festif', desc: 'Une belle bouteille pour célébrer les moments qui comptent.' },
  { name: 'Coffret de bouteilles de vin', desc: 'Une sélection de plusieurs bouteilles choisies avec votre caviste.' },
  { name: 'Grand cru bordelais', desc: 'Une bouteille d’exception pour un cadeau marquant.' },
  { name: 'Accessoires', desc: 'Verres, carafes, tire-bouchons et accessoires autour du vin.' },
  { name: 'Dégustation privée', desc: 'Un moment privilégié de découverte et de partage autour de nos sélections.' },
]

const REVIEWS = [
  {
    name: 'Laure LEMEE',
    text: "Un grand merci à Léo pour ses précieux conseils ! Toujours à l'écoute et très professionnel, il sait parfaitement orienter ses clients pour trouver la bouteille idéale pour offrir. Je recommande et je reviendrai !",
  },
  {
    name: 'Jade LEROY',
    text: "Je recommande vivement cette cave à vin ! De nombreux choix s’offrent à nous et les conseillers sont très agréables. Nous avons été très bien accueillis et conseillés.",
  },
  {
    name: 'Mathilde JM',
    text: "Une très bonne sélection de vins, du blanc au rouge en passant par le champagne. Très bon accueil et de précieux conseils. Je recommande vivement.",
  },
  {
    name: 'Isabelle Robert',
    text: "Un caviste avec beaucoup de choix : vins, rhums, whiskys… Une très belle cave et des dégustations thématiques très sympathiques.",
  },
  {
    name: 'Chloé B',
    text: "Première visite réussie juste avant les fêtes ! J’ai demandé conseil pour un whisky et le vendeur a parfaitement cerné ce qu’il me fallait, sans me pousser hors budget.",
  },
  {
    name: 'A2F AGENCE',
    text: "Réservation pour une dégustation de vins avec les membres de l'entreprise. Nous avons été très bien accueillis et ce fut très enrichissant. Un superbe moment.",
  },
  {
    name: 'Scan',
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

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function ReviewCarousel() {
  const [isMobile, setIsMobile] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filteredReviews = useMemo(() => {
    return isMobile 
      ? REVIEWS.filter(review => review.text.length <= 130) 
      : REVIEWS
  }, [isMobile])

  // Adjust current index if it goes out of bounds after resize / filter
  useEffect(() => {
    if (current >= filteredReviews.length) {
      setCurrent(0)
    }
  }, [filteredReviews, current])

  useEffect(() => {
    if (filteredReviews.length === 0) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % filteredReviews.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [current, filteredReviews])

  const handlePrev = () => {
    if (filteredReviews.length === 0) return
    setCurrent((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length)
  }

  const handleNext = () => {
    if (filteredReviews.length === 0) return
    setCurrent((prev) => (prev + 1) % filteredReviews.length)
  }

  if (filteredReviews.length === 0) return null

  return (
    <div className="review-carousel">
      <div className="carousel-container-outer">
        <button 
          className="carousel-arrow prev" 
          onClick={handlePrev} 
          aria-label="Avis précédent"
        >
          ←
        </button>

        <div className="carousel-track">
          {filteredReviews.map((review, i) => (
            <div key={i} className={`review-slide ${i === current ? 'active' : ''}`}>
              <p className="review-quote">&ldquo;{review.text}&rdquo;</p>
              <span className="review-author">{review.name}</span>
            </div>
          ))}
        </div>

        <button 
          className="carousel-arrow next" 
          onClick={handleNext} 
          aria-label="Avis suivant"
        >
          →
        </button>
      </div>
      <div className="carousel-dots">
        {filteredReviews.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            title={`Avis ${i + 1}`}
            aria-label={`Afficher l’avis ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function GdprBanner({ isOpen, onClose }) {
  const [showCustomize, setShowCustomize] = useState(false)
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: true,
    marketing: true
  })

  useEffect(() => {
    const saved = localStorage.getItem('lecellier-gdpr-consent')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPrefs(prev => ({ ...prev, ...parsed }))
      } catch (e) {
        // use defaults
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleAcceptAll = () => {
    const allPrefs = { essential: true, analytics: true, marketing: true, date: new Date().toISOString() }
    localStorage.setItem('lecellier-gdpr-consent', JSON.stringify(allPrefs))
    onClose()
  }

  const handleDeclineAll = () => {
    const noPrefs = { essential: true, analytics: false, marketing: false, date: new Date().toISOString() }
    localStorage.setItem('lecellier-gdpr-consent', JSON.stringify(noPrefs))
    onClose()
  }

  const handleSaveCustom = () => {
    const savedPrefs = { ...prefs, date: new Date().toISOString() }
    localStorage.setItem('lecellier-gdpr-consent', JSON.stringify(savedPrefs))
    onClose()
  }

  return (
    <div className="gdpr-banner" role="dialog" aria-labelledby="gdpr-title">
      <div className="gdpr-header">
        <span className="gdpr-eyebrow">Sélection & Confidentialité</span>
        <h3 className="gdpr-title" id="gdpr-title">Votre <i>confidentialité</i></h3>
      </div>

      <p className="gdpr-text">
        Nos équipes sélectionnent avec rigueur nos flacons comme vos données. 
        Nous utilisons des cookies afin d'analyser l'audience, optimiser l'expérience et vous proposer des contenus personnalisés de nos vignerons partenaires.
      </p>

      {showCustomize && (
        <div className="gdpr-custom-panel">
          <div className="gdpr-option">
            <div className="gdpr-option-info">
              <span className="gdpr-option-title">Fonctionnement Essentiel</span>
              <span className="gdpr-option-desc">Obligatoire pour naviguer en toute sécurité et mémoriser vos préférences de cave.</span>
            </div>
            <label className="gdpr-switch">
              <input type="checkbox" checked disabled />
              <span className="gdpr-slider"></span>
            </label>
          </div>

          <div className="gdpr-option">
            <div className="gdpr-option-info">
              <span className="gdpr-option-title">Analyse & Statistiques d'Audience</span>
              <span className="gdpr-option-desc">Permet de comprendre comment nos visiteurs parcourent les rayons de notre cave en ligne.</span>
            </div>
            <label className="gdpr-switch">
              <input 
                type="checkbox" 
                checked={prefs.analytics} 
                onChange={(e) => setPrefs(p => ({ ...p, analytics: e.target.checked }))} 
              />
              <span className="gdpr-slider"></span>
            </label>
          </div>

          <div className="gdpr-option">
            <div className="gdpr-option-info">
              <span className="gdpr-option-title">Partenariats & Personnalisation</span>
              <span className="gdpr-option-desc">Affiche des cartes interactives et les offres exclusives de nos domaines de confiance.</span>
            </div>
            <label className="gdpr-switch">
              <input 
                type="checkbox" 
                checked={prefs.marketing} 
                onChange={(e) => setPrefs(p => ({ ...p, marketing: e.target.checked }))} 
              />
              <span className="gdpr-slider"></span>
            </label>
          </div>
        </div>
      )}

      <div className="gdpr-buttons">
        <button 
          className={`gdpr-btn gdpr-btn-secondary ${showCustomize ? 'active' : ''}`}
          onClick={() => setShowCustomize(!showCustomize)}
          aria-expanded={showCustomize}
        >
          {showCustomize ? "Fermer les options" : "Personnaliser"}
        </button>
        
        {showCustomize ? (
          <button className="gdpr-btn gdpr-btn-primary" onClick={handleSaveCustom}>
            Enregistrer mes choix
          </button>
        ) : (
          <>
            <button className="gdpr-btn gdpr-btn-secondary" onClick={handleDeclineAll}>
              Refuser tout
            </button>
            <button className="gdpr-btn gdpr-btn-primary gdpr-btn-accent" onClick={handleAcceptAll}>
              Tout accepter
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function CavesMap() {
  const mapNode = useRef(null)
  const mapInstance = useRef(null)
  const [mapReady, setMapReady] = useState(true)

  useEffect(() => {
    if (!mapNode.current) return

    if (!window.L) {
      setMapReady(false)
      return
    }

    const L = window.L
    const map = L.map(mapNode.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    })

    mapInstance.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    const markers = CAVES.map((cave) => {
      const marker = L.circleMarker([cave.lat, cave.lng], {
        radius: 8,
        color: '#f3ede1',
        weight: 3,
        fillColor: '#145261',
        fillOpacity: 1,
      }).addTo(map)

      marker.bindPopup(`
        <div class="map-popup">
          <strong>${cave.name}</strong>
          <span>${cave.address}</span>
          <a href="${cave.maps}" target="_blank" rel="noopener noreferrer">Itinéraire ↗</a>
        </div>
      `)
      return marker
    })

    const group = L.featureGroup(markers)
    map.fitBounds(group.getBounds().pad(0.16), { maxZoom: 11 })

    setTimeout(() => map.invalidateSize(), 100)

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [])

  return (
    <div className="map-wrap network-map">
      <div className="leaflet-map" ref={mapNode} aria-label="Carte des six caves Le Cellier" />
      {!mapReady && (
        <div className="map-fallback">
          <strong>Carte temporairement indisponible</strong>
          <span>Les six adresses restent accessibles dans la liste.</span>
        </div>
      )}
      <div className="map-badge">6 caves · Sarthe & Perche</div>
    </div>
  )
}

export default function App() {
  const [geoText, setGeoText] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showGdpr, setShowGdpr] = useState(false)
  const [selectedCave, setSelectedCave] = useState('Le Mans')

  const selectedCaveInfo = CAVES.find((cave) => cave.city === selectedCave) || CAVES[0]
  const selectedSchedule = CAVE_SCHEDULES[selectedCave] || CAVE_SCHEDULES['Le Mans']

  useEffect(() => {
    const consent = localStorage.getItem('lecellier-gdpr-consent')
    if (!consent) {
      const t = setTimeout(() => setShowGdpr(true), 1000)
      return () => clearTimeout(t)
    }
  }, [])


  useEffect(() => {
    if (!('geolocation' in navigator)) return

    setGeoText('Localisation…')

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`
        )
          .then((r) => r.json())
          .then((data) => {
            const ville = data.city || data.locality || data.principalSubdivision || 'votre région'
            setGeoText(ville)
          })
          .catch(() => setGeoText(''))
      },
      () => setGeoText(''),
      { timeout: 8000 }
    )
  }, [])

  function handleContactSubmit(e) {
    e.preventDefault()
    alert('Message envoyé — nous revenons vers vous rapidement.')
    e.target.reset()
  }


  function handleMenuClick() {
    setMenuOpen(!menuOpen)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <main id="contenu-principal">
      {/* HERO */}
      <section className="hero" id="top">
        <img className="hero-bg" src="/wine-cellar.png" alt="Intérieur d’une cave Le Cellier avec sélection de vins et spiritueux" width="1024" height="1024" loading="eager" fetchPriority="high" />
        <nav className="nav">
          <button className="nav-logo" onClick={() => scrollToId('top')} aria-label="Retour en haut de la page">
            <img src="/logo-le-cellier-bleu.png" alt="Le Cellier — réseau de cavistes" width="484" height="516" />
          </button>
          
          <div className="nav-links">
            <button onClick={() => scrollToId('top')}>Accueil</button>
            <button onClick={() => scrollToId('about')}>À propos</button>
            <button onClick={() => scrollToId('caves')}>Nos caves</button>
            <button onClick={() => scrollToId('selection')}>Sélection</button>
            <button onClick={() => scrollToId('gifts')}>Cadeaux</button>
            <button onClick={() => scrollToId('planning')}>Planning</button>
          </div>

          <div className="nav-right">
            {geoText && (
              <span className="geo-text">
                <span className="geo-dot" />
                {geoText}
              </span>
            )}
            <button className="pill-btn branded" onClick={() => scrollToId('contact')}>
              Nous contacter
            </button>
            <button className="icon-btn" title="Menu" onClick={handleMenuClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Menu size={18} />
            </button>
            {menuOpen && (
              <div className="mobile-menu">
                <button onClick={() => { scrollToId('top'); closeMenu(); }}>Accueil</button>
                <button onClick={() => { scrollToId('about'); closeMenu(); }}>À propos</button>
                <button onClick={() => { scrollToId('caves'); closeMenu(); }}>Nos caves</button>
                <button onClick={() => { scrollToId('selection'); closeMenu(); }}>Sélection</button>
                <button onClick={() => { scrollToId('gifts'); closeMenu(); }}>Cadeaux</button>
                <button onClick={() => { scrollToId('planning'); closeMenu(); }}>Planning</button>
                <button onClick={() => { scrollToId('contact'); closeMenu(); }}>Contact</button>
              </div>
            )}
          </div>
        </nav>
        <div className="hero-content">
          <h1 className="hero-title">Le Cellier</h1>
          <p className="hero-sub">
            Depuis plus de 20 ans, nous mettons notre passion du vin, des spiritueux et de la bière au service des amateurs de la Sarthe. Six caves à votre écoute, plus de 1 500 références soigneusement sélectionnées, et une seule promesse : vous guider vers la bouteille parfaite.
          </p>
          <div className="hero-cta">
            <button className="pill-btn solid" onClick={() => scrollToId('planning')}>
              Voir le planning
            </button>
            <button className="pill-btn" onClick={() => scrollToId('contact')}>
              Nous trouver
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="wrap">
          <span className="eyebrow">Notre maison</span>
          <h2 className="head">
            À propos de <i>notre cave</i>
          </h2>
          <div className="about-grid">
            <p>
              Fondé il y a plus de 20 ans, Le Cellier est né d'une passion simple et sincère : mettre les meilleures bouteilles entre toutes les mains. Au fil des années, nous avons tissé des liens forts avec nos clients, nos vignerons et nos producteurs, bâtissant ainsi un réseau de 6 caves de proximité implanté au cœur de la Sarthe.
            </p>
            <p>
              Notre force ? Une équipe de passionnés qui connaît ses références sur le bout des doigts et prend le temps de vous écouter, que vous cherchiez un vin du quotidien, une bouteille d'exception ou le cadeau idéal. Avec plus de 1 500 références : vins, champagnes, spiritueux, bières artisanales et épicerie fine, nous avons de quoi satisfaire tous les palais et toutes les occasions.
            </p>
          </div>
        </div>
      </section>

      {/* NOS CAVES */}
      <section className="section caves-section" id="caves">
        <div className="wrap">
          <span className="eyebrow">Le réseau Le Cellier</span>
          <div className="caves-heading-row">
            <h2 className="head">
              Nos <i>6 caves</i>
            </h2>
            <p className="caves-intro">Retrouvez la cave la plus proche de chez vous, consultez ses horaires et préparez votre visite.</p>
          </div>
          <div className="caves-grid">
            {CAVES.map((cave) => (
              <article className="cave-card" key={cave.city}>
                <div className="cave-card-top">
                  <div>
                    <span className="cave-city">{cave.city}</span>
                    <h3>{cave.name}</h3>
                  </div>
                  {cave.rating && (
                    <div className="google-rating" aria-label={`${cave.rating} sur 5, ${cave.reviewCount}`}>
                      <span className="star">★</span>
                      <strong>{cave.rating}</strong>
                      <small>{cave.reviewCount}</small>
                    </div>
                  )}
                </div>
                <p className="cave-address">{cave.address}</p>
                <div className="cave-actions">
                  <a className="cave-phone" href={`tel:${cave.phoneHref}`}>{cave.phone}</a>
                  <div className="cave-links">
                    <a className="cave-page-link" href={`/caves/${cave.slug}/`}>
                      Découvrir la cave
                    </a>
                    <a className="google-link" href={cave.maps} target="_blank" rel="noopener noreferrer">
                      Fiche Google <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTION */}
      <section className="section selection-section" id="selection">
        <div className="wrap">
          <span className="eyebrow">Notre cave</span>
          <h2 className="head">
            Une <i>sélection</i> de toute la France
          </h2>
          <p className="selection-intro">
            Un tour de France en douze bouteilles : un rouge et un blanc choisis dans six grandes régions viticoles, sélectionnés avec le même soin que nos références en cave.
          </p>
        </div>

        <div className="marquee-shell" aria-label="Sélection de vins">
          <div className="selection-marquee wine-marquee">
            <div className="selection-track">
              {[...WINES, ...WINES].map((wine, index) => (
                <article className="selection-card" key={`${wine.region}-${wine.type}-${index}`}>
                  <div className="selection-photo">
                    <img src={`/${wine.file}`} alt={`${wine.name} — ${wine.region}`} width="1024" height="1024" loading="lazy" decoding="async" />
                    <span className={`wine-type ${wine.type === 'Rouge' ? 'red' : 'white'}`}>{wine.type}</span>
                  </div>
                  <div className="selection-meta">
                    <span>{wine.region}</span>
                    <strong>{wine.name}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="wrap spirits-heading">
          <span className="eyebrow">Whiskys, rhums & autres découvertes</span>
          <h3 className="spirits-title">Notre sélection de <i>spiritueux</i></h3>
          <p className="selection-intro">Whiskys, rhums, gins, cognacs et autres découvertes : dix sélections pour explorer les grandes familles de spiritueux.</p>
        </div>

        <div className="marquee-shell" aria-label="Sélection de spiritueux">
          <div className="selection-marquee reverse">
            <div className="selection-track">
              {[...SPIRITS, ...SPIRITS].map((spirit, index) => (
                <article className="selection-card spirit-card" key={`${spirit.category}-${index}`}>
                  <div className="selection-photo">
                    <img src={`/${spirit.file}`} alt={`${spirit.name} — spiritueux sélectionné par Le Cellier`} width="1024" height="1024" loading="lazy" decoding="async" />
                    <span className="spirit-type">{spirit.category}</span>
                  </div>
                  <div className="selection-meta">
                    <span>Spiritueux</span>
                    <strong>{spirit.name}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section partners-section">
        <div className="wrap">
          <span className="eyebrow">Nos collaborateurs</span>
          <h2 className="head">
            Partenaires de <i>confiance</i>
          </h2>
          <div className="partners-carousel">
            <div className="carousel-band">
              {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                <div className="partner-logo" key={i}>
                  <span className="logo-name">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GIFT IDEAS */}
      <section className="section" id="gifts">
        <div className="wrap">
          <span className="eyebrow">Offrir du plaisir</span>
          <h2 className="head">
            Idées <i>cadeaux</i>
          </h2>
          <div className="gift-grid">
            {GIFT_IDEAS.map((gift, index) => (
              <div className="gift-card" key={gift.name}>
                <span className="gift-number">0{index + 1}</span>
                <div className="gift-header">
                  <span className="gift-name">{gift.name}</span>
                </div>
                <p className="gift-desc">{gift.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section reviews-section">
        <div className="wrap">
          <span className="eyebrow">Vos avis</span>
          <h2 className="head">
            Ce qu&apos;en disent nos <i>clients</i>
          </h2>
          <ReviewCarousel />
        </div>
      </section>

      {/* PLANNING */}
      <section className="section" id="planning">
        <div className="planning-section">
          <span className="eyebrow">Planning</span>
          <h2 className="head">
            Horaires & <i>ateliers dégustation</i>
          </h2>
          <div className="cave-tabs" role="tablist" aria-label="Choisir une cave">
            {CAVES.map((cave) => (
              <button
                key={cave.city}
                type="button"
                role="tab"
                aria-selected={selectedCave === cave.city}
                className={selectedCave === cave.city ? 'active' : ''}
                onClick={() => setSelectedCave(cave.city)}
              >
                {cave.city}
              </button>
            ))}
          </div>

          <div className="planning-grid">
            <div className="schedule-panel">
              <div className="schedule-heading">
                <div>
                  <span className="schedule-label">Horaires de la cave</span>
                  <h3>{selectedCaveInfo.name}</h3>
                  <p>{selectedCaveInfo.address}</p>
                </div>
                <a href={selectedCaveInfo.maps} target="_blank" rel="noopener noreferrer">Itinéraire ↗</a>
              </div>
              <table className="schedule-table">
                <tbody>
                  {selectedSchedule.map((row) => (
                    <tr key={row.day}>
                      <td className="day">{row.day}</td>
                      {row.hours ? (
                        <td className="hours">{row.hours}</td>
                      ) : (
                        <td className="closed">Fermé</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="events-col">
              <span className="schedule-label">Ateliers & dégustations</span>
              {EVENTS.map((ev) => (
                <div className="event-item" key={ev.date}>
                  <div className="event-title">
                    <span className="date">{ev.date}</span> / {ev.title}
                  </div>
                  <div className="event-desc">{ev.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / LOCATION */}
      <section className="section" id="contact">
        <div className="wrap">
          <div className="contact-inner">
            <CavesMap />
            <div className="contact-copy">
              <div className="brand">Le Cellier</div>
              <h2>
                Où nous <span>trouver</span>
              </h2>

              <p className="locations-intro">Retrouvez nos six caves sur la carte et ouvrez directement l’itinéraire vers celle qui vous convient.</p>
              <div className="locations-list">
                {CAVES.map((cave) => (
                  <a className="location-row" href={cave.maps} target="_blank" rel="noopener noreferrer" key={cave.city}>
                    <span>
                      <strong>{cave.name}</strong>
                      <small>{cave.address}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
              <div className="info-row contact-email">
                <span className="label">Email</span>
                <a className="val" href="mailto:contact@lecellier.fr">contact@lecellier.fr</a>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input type="text" placeholder="Votre nom" required />
                <input type="email" placeholder="Votre email" required />
                <textarea placeholder="Votre message" />
                <button className="send-btn" type="submit">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <button className="footer-logo" onClick={() => scrollToId('top')} aria-label="Retour en haut de la page"><img src="/logo-le-cellier.png" alt="Le Cellier — caviste vins, bières et spiritueux" width="484" height="516" loading="lazy" /></button>
            <div className="footer-col">
              <a href="#top">Accueil</a>
              <a href="#about">À propos</a>
              <a href="#caves">Nos caves</a>
              <a href="#planning">Planning</a>
              <a href="#contact">Nous trouver</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowGdpr(true); }}>Gestion des cookies (RGPD)</a>
            </div>
            <div className="footer-col">
              <a href="#">44 Avenue François Mitterrand, 72000 Le Mans</a>
              <a href="tel:+33988528034">+33 9 88 52 80 34</a>
              <a href="mailto:contact@lecellier.fr">contact@lecellier.fr</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>2026 © Le Cellier — Tous droits réservés</span>
            <div className="socials">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/lecellierlemans/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <GdprBanner isOpen={showGdpr} onClose={() => setShowGdpr(false)} />
    </>
  )
}
