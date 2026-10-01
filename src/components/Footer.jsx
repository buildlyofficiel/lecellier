export default function Footer({ scrollToId, setShowGdpr, caves }) {
  return (
    <footer className="relative overflow-hidden rounded-t-[14px] bg-[#104451] text-[#f3ede1] py-16 border-t border-[#145261]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand info */}
          <div>
            <button
              type="button"
              onClick={() => scrollToId('top')}
              className="mb-4 focus:outline-none cursor-pointer border-0 bg-transparent p-0 text-left block"
              aria-label="Accueil Le Cellier"
            >
              <img
                src="/logo-le-cellier.png"
                alt="Le Cellier"
                className="h-11 w-auto object-contain"
              />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Réseau indépendant de six caves de proximité au Mans, Connerré, La Ferté-Bernard, Mamers, Bonnétable et Nogent-le-Rotrou.
            </p>
            <span className="text-xs text-slate-300 block">
              Contact :{' '}
              <a href="mailto:contact@lecellier.fr" className="underline hover:text-[#d8a84e] transition-colors">
                contact@lecellier.fr
              </a>
            </span>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#d8a84e] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button type="button" onClick={() => scrollToId('top')} className="hover:text-white transition-colors cursor-pointer border-0 bg-transparent p-0">
                  Accueil
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId('histoire')} className="hover:text-white transition-colors cursor-pointer border-0 bg-transparent p-0">
                  Notre histoire
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId('caves')} className="hover:text-white transition-colors cursor-pointer border-0 bg-transparent p-0">
                  Nos 6 caves
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId('selection')} className="hover:text-white transition-colors cursor-pointer border-0 bg-transparent p-0">
                  Notre sélection
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId('planning')} className="hover:text-white transition-colors cursor-pointer border-0 bg-transparent p-0">
                  Horaires & ateliers
                </button>
              </li>
            </ul>
          </div>

          {/* Caves list */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#d8a84e] mb-4">
              Nos adresses
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {caves.map((c) => (
                <li key={c.city}>
                  <a
                    href={`/caves/${c.slug}/`}
                    className="hover:text-white hover:underline text-left transition-colors"
                  >
                    <strong className="text-[#f3ede1] font-semibold">{c.city}</strong> — {c.address.split(',')[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal and Info */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#d8a84e] mb-4">
              Informations
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => setShowGdpr(true)}
                  className="hover:text-white underline cursor-pointer border-0 bg-transparent p-0 transition-colors"
                >
                  Gestion des cookies (RGPD)
                </button>
              </li>
              <li className="italic text-slate-400 text-[11px] leading-relaxed pt-2 border-t border-[#2a231f]">
                L’abus d’alcool est dangereux pour la santé, à consommer avec modération.
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="pt-8 border-t border-[#2a231f] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <span>{new Date().getFullYear()} © Le Cellier — Tous droits réservés</span>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/lecellierlemans/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d8a84e] transition-colors"
            >
              Instagram
            </a>
            <span className="text-slate-600">·</span>
            <a
              href="mailto:contact@lecellier.fr"
              className="hover:text-[#d8a84e] transition-colors"
            >
              contact@lecellier.fr
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
