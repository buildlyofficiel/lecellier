import { useEffect, useRef, useState } from 'react'

const WINES = [
  { file: 'vin-cotes-du-rhone.jpg', name: "Côtes du Rhône '19", price: '42 €' },
  { file: 'vin-chablis.jpg', name: 'Chablis Grand Cru', price: '58 €' },
  { file: 'vin-bourgogne.jpg', name: 'Bourgogne Pinot Noir', price: '36 €' },
  { file: 'vin-champagne.jpg', name: 'Champagne Brut', price: '65 €' },
]

const SCHEDULE = [
  { day: 'Lundi', hours: null },
  { day: 'Mardi — Vendredi', hours: '10h00 – 19h30' },
  { day: 'Samedi', hours: '9h30 – 20h00' },
  { day: 'Dimanche', hours: '10h00 – 13h00' },
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
  { name: 'Château Margaux' },
  { name: 'Veuve Clicquot' },
  { name: 'Domaines Ott' },
  { name: 'Laurent-Perrier' },
  { name: 'Bordeaux Premium' },
  { name: 'Champagne Pol Roger' },
  { name: 'Bourgogne Select' },
  { name: 'Alsace Riesling' },
]

const GIFT_IDEAS = [
  { name: 'Coffret Découverte 3 Vins', price: '52 €', desc: 'Trois vins sélectionnés pour débuter' },
  { name: 'Pairing Vin & Fromage', price: '68 €', desc: 'Vin + sélection de fromages partenaires' },
  { name: 'Atelier Dégustation Privé', price: '120 € / pers', desc: 'Pour 2 à 4 personnes avec caviste' },
  { name: 'Accessoires Premium', price: '35 €', desc: 'Verre à vin + carafe + bouchon' },
]

const REVIEWS = [
  {
    name: 'Sophie M.',
    text: 'Une vraie découverte ! Le caviste prend le temps d\'expliquer ses sélections. Excellent service.',
  },
  {
    name: 'Marc L.',
    text: 'Endroit authentique avec une belle cave. Les ateliers de dégustation sont très instructifs.',
  },
  {
    name: 'Isabelle D.',
    text: 'Très beau choix de vins français et découvertes intéressantes. À recommander !',
  },
  {
    name: 'Pierre B.',
    text: 'Conseil personnalisé et ambiance conviviale. Un incontournable du Mans !',
  },
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function ReviewCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="review-carousel">
      <div className="carousel-track">
        {REVIEWS.map((review, i) => (
          <div key={i} className={`review-slide ${i === current ? 'active' : ''}`}>
            <p className="review-quote">&ldquo;{review.text}&rdquo;</p>
            <span className="review-author">{review.name}</span>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const menuTrackRef = useRef(null)
  const [geoText, setGeoText] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

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
          <div className="logo">Le Cellier</div>
          <div className="nav-right">
            {geoText && (
              <span className="geo-text">
                <span className="dot" />
                {geoText}
              </span>
            )}
            <button className="pill-btn solid" onClick={() => scrollToId('contact')}>
              Nous contacter
            </button>
            <button className="icon-btn" title="Menu" onClick={handleMenuClick}>☰</button>
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
              <div className="info-row">
                <span className="label">Horaires</span>
                <span className="val">Mar-Ven: 10h-19h30 | Sam: 9h30-20h | Dim: 10h-13h</span>
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
              <a href="#">f</a>
              <a href="#">◎</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
