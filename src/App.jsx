import { useEffect, useRef, useState, useMemo } from 'react'
import { Menu } from 'lucide-react'

const WINES = [
  { file: 'vin-cotes-du-rhone.jpg', name: "Côtes du Rhône '19", price: '42 €' },
  { file: 'vin-chablis.jpg', name: 'Chablis Grand Cru', price: '58 €' },
  { file: 'vin-bourgogne.jpg', name: 'Bourgogne Pinot Noir', price: '36 €' },
  { file: 'vin-champagne.jpg', name: 'Champagne Brut', price: '65 €' },
]

const SCHEDULE = [
  { day: 'Lundi', hours: '14h00 – 19h00' },
  { day: 'Mardi', hours: '10h00 – 19h00' },
  { day: 'Mercredi', hours: '10h00 – 19h00' },
  { day: 'Jeudi', hours: '10h00 – 19h00' },
  { day: 'Vendredi', hours: '10h00 – 19h00' },
  { day: 'Samedi', hours: '10h00 – 19h00' },
  { day: 'Dimanche', hours: null },
]

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
  { name: 'Coffret Découverte 3 Vins', price: '52 €', desc: 'Trois vins sélectionnés pour débuter' },
  { name: 'Pairing Vin & Fromage', price: '68 €', desc: 'Vin + sélection de fromages partenaires' },
  { name: 'Atelier Dégustation Privé', price: '120 € / pers', desc: 'Pour 2 à 4 personnes avec caviste' },
  { name: 'Accessoires Premium', price: '35 €', desc: 'Verre à vin + carafe + bouchon' },
]

const REVIEWS = [
  {
    name: "Laure LEMEE",
    text: "Un grand merci à Léo pour ses précieux conseils ! Toujours à l'écoute et très professionnel, il sait parfaitement orienter ses clients pour trouver la bouteille idéale pour offrir (même pour les personnes qui ne s'y connaissent pas en vin). Je recommande et je reviendrais ! A bientôt"
  },
  {
    name: "Jade LEROY",
    text: "Je recommande vivement cette cave à vin ! De nombreux choix s’offrent à nous et les conseillers de ventes sont très agréables.\nNous avons été conseillés pas Léo, qui a su répondre parfaitement à nos besoins et qui nous a très bien accueilli. Je reviendrais sans hésiter !"
  },
  {
    name: "Mathilde JM",
    text: "Merci à Léo pour l’accueil et ses conseilles !\nUne très bonne sélections de vin ( vin blanc, rouge et un champagne). Je reviendrais et je recommande vivement"
  },
  {
    name: "Isabelle Robert",
    text: "Un caviste avec beaucoup de choix , vins rhums, wisky...\nTrès élégant au centre du Mans avec de temps en temps des dégustations thématiques. Très sympa"
  },
  {
    name: "Chloé B",
    text: "Première visite réussie juste avant les fêtes ! Je cherchais une bouteille de whisky, et n'y connaissant pas grand-chose, j'ai demandé conseil à l'un des employés qui m'a aidé avec enthousiasme. Même avec un budget un peu serré et peu d'informations de ma part il a tout a fait cerné ce qu'il me fallait et ne m'a pas du tout poussé vers un choix hors budget. Mon grand-père, pour qui était la bouteille, l'a adorée ! Je reviendrai :)"
  },
  {
    name: "A2F AGENCE",
    text: "Réservation pour une dégustation de vins avec les membres de l'entreprise. Nous avons été très bien accueillit et ce fut très enrichissant. Le gérant a su nous transmettre sa passion à travers ses nombreuses explications. Encore merci pour ce superbe moment nous en sommes ravis."
  },
  {
    name: "Guillaume Michaud",
    text: "Super accueil avec Alban et toute son équipe.\nUne cave magnifique et des flacons incroyable.\nUn passionné qui répond parfaitement à sa clientèle.\nLe petit plus : les dégustations."
  },
  {
    name: "Scan",
    text: "Excellent magasin de vin et spiritueux. Accueil agréable et on peut sentir et tester avant d'acheter. Grand choix de spiritueux. Je recommande !"
  },
  {
    name: "Denis Lemesle",
    text: "Merci au Cellier pour son accueil, son accompagnement, ses conseils et sa confiance pour fournir les vins de notre mariage!! Alban et son équipe ont été au top!!"
  },
  {
    name: "Boitiere Lydie",
    text: "Personnel à l'écoute, très bon conseil.\nSouriant. Très beau magasin. Il y a pour tout les goûts et à tous les prix"
  },
  {
    name: "Marina B",
    text: "Très jolie cave, large choix, accueil souriant mais surtout de très bon conseils. Je recommande fortement"
  },
  {
    name: "Alexandre Hatton",
    text: "D’une extrême gentillesse et bienveillance au téléphone, les bouteilles ont été mises au frais avant que je les récupère. Franchement génial, j’y retournerais ! Merci à vous !"
  },
  {
    name: "Sominia Nia",
    text: "Vendeur très agréable qui a su orienté mon choix alors que je suis novice. Hâte d'ouvrir la bouteille."
  },
  {
    name: "hugo berceron",
    text: "Super accueil, toujours bienveillant avec des supers conseils.\nJe recommande la bonne humeur et le professionnalisme de cette cave !!"
  },
  {
    name: "Guillaume Coudreuse",
    text: "Très bons conseils, personnels souriants et bonnes bouteilles en tout genre."
  },
  {
    name: "Sandrine Zugetta",
    text: "Magasin très agréable tout comme le personnel. Je recommande !"
  },
  {
    name: "Dominique Dubois",
    text: "Très bonne cave ont y trouve de quoi se régaler."
  },
  {
    name: "Jessica Goncalves",
    text: "Acceuil très sympa et très belle boutique avec de bons conseils !"
  },
  {
    name: "David Boffelli",
    text: "De très bons conseils. Personnel hyper agréable et très à l'écoute."
  },
  {
    name: "Marie Sourisseau",
    text: "Je recommande +++ personnel chaleureux et à l’écoute"
  },
  {
    name: "Rémi Marchand",
    text: "Des conseils personnalisés , idéal pour faire un cadeau."
  },
  {
    name: "Longuemard Aurelien",
    text: "Très bon accueil et très bon produit."
  },
  {
    name: "Valdo PolarOil",
    text: "Excellents services et conseils."
  },
  {
    name: "Touffait Valentin",
    text: "De très bons conseils ! Je reviendrais."
  },
  {
    name: "Lise Evrard",
    text: "Très bonne expérience dans cette cave. Leo nous a mieux conseillé que Chat GPT !\nCadeau parfait pour mon papa !"
  }
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
        Alban et son équipe sélectionnent avec rigueur nos flacons comme vos données. 
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

export default function App() {
  const menuTrackRef = useRef(null)
  const [geoText, setGeoText] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showGdpr, setShowGdpr] = useState(false)

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

  function scrollMenu(offset) {
    menuTrackRef.current?.scrollBy({ left: offset, behavior: 'smooth' })
  }

  function handleContactSubmit(e) {
    e.preventDefault()
    alert('Message envoyé — nous revenons vers vous rapidement.')
    e.target.reset()
  }

  function handleReserveGift(giftName) {
    alert(`Vous avez cliqué sur "${giftName}". Veuillez nous contacter pour réserver.`)
  }

  function handleMenuClick() {
    setMenuOpen(!menuOpen)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      {/* HERO */}
      <section className="hero" id="top">
        <img src="/wine-cellar.png" alt="Le Cellier Wine Cellar" />
        <nav className="nav">
          <div className="logo" onClick={() => scrollToId('top')}>
            <span className="brand-le">Le</span>
            <span>Cellier</span>
            <span className="brand-dot">.</span>
          </div>
          
          <div className="nav-links">
            <button onClick={() => scrollToId('top')}>Accueil</button>
            <button onClick={() => scrollToId('about')}>À propos</button>
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
            Une cave à vins de caractère, nichée sous voûte de pierre.
            <br />
            Dégustations, conseils et flacons rares.
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
              Le Cellier est une cave à vins familiale où se croisent vignerons passionnés et amateurs curieux. Nos
              étagères rassemblent des appellations françaises et des découvertes plus confidentielles, sélectionnées
              à la source pour leur authenticité et leur régularité.
            </p>
            <p>
              Chaque semaine, nous ouvrons quelques flacons pour vous les faire goûter avant l'achat. Nos conseillers
              vous accompagnent selon vos goûts, votre budget et l'occasion, qu'il s'agisse d'un accord mets-vins ou
              d'un cadeau à offrir.
            </p>
          </div>
        </div>
      </section>

      {/* SELECTION */}
      <section className="section" id="selection" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="menu-header">
            <div>
              <span className="eyebrow">Notre cave</span>
              <h2 className="head" style={{ margin: 0 }}>
                Une <i>sélection</i> du moment
              </h2>
            </div>
            <div className="menu-nav">
              <div className="arrow-btn" onClick={() => scrollMenu(-280)}>←</div>
              <div className="arrow-btn" onClick={() => scrollMenu(280)}>→</div>
            </div>
          </div>
          <div className="menu-track" ref={menuTrackRef}>
            {WINES.map((wine) => (
              <div className="menu-card" key={wine.file}>
                <div className="photo">
                  <img src={`/${wine.file.replace('.jpg', '.png')}`} alt={wine.name} />
                </div>
                <div className="menu-meta">
                  <span className="name">{wine.name}</span>
                  <span className="tag price">{wine.price}</span>
                </div>
              </div>
            ))}
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
            {GIFT_IDEAS.map((gift) => (
              <div className="gift-card" key={gift.name}>
                <div className="gift-header">
                  <span className="gift-name">{gift.name}</span>
                  <span className="gift-price">{gift.price}</span>
                </div>
                <p className="gift-desc">{gift.desc}</p>
                <button className="gift-btn" onClick={() => handleReserveGift(gift.name)}>
                  Réserver
                </button>
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
          <div className="planning-grid">
            <div>
              <table className="schedule-table">
                <tbody>
                  {SCHEDULE.map((row) => (
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
            <div className="map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2718.8941265812936!2d0.18847!3d48.00629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e1c5c5c5c5c5c5%3A0x1c5c5c5c5c5c5c5c!2s44%20Avenue%20Fran%C3%A7ois%20Mitterrand%2C%2072000%20Le%20Mans!5e0!3m2!1sfr!2sfr!4v1640000000000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Le Cellier Le Mans"
                allowFullScreen=""
                aria-hidden="false"
              />
            </div>
            <div className="contact-copy">
              <div className="brand">Le Cellier</div>
              <h2>
                Où nous <span>trouver</span>
              </h2>

              <div className="info-row">
                <span className="label">Adresse</span>
                <span className="val">44 Avenue François Mitterrand, 72000 Le Mans</span>
              </div>
              <div className="info-row">
                <span className="label">Téléphone</span>
                <span className="val">+33 9 88 52 80 34</span>
              </div>
              <div className="info-row">
                <span className="label">Email</span>
                <span className="val">contact@lecellier.fr</span>
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

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="logo dark" style={{ fontSize: 20 }}>Le Cellier</div>
            <div className="footer-col">
              <a href="#top">Accueil</a>
              <a href="#">À propos</a>
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
              <a href="https://www.instagram.com/lecellierdumans/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
