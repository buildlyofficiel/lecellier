import { useState, useRef } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'

export default function Navbar({ onSelectCave }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  const scrollTo = (id) => {
    setMobileOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        margin: 0,
        padding: '16px 0 0 0',
        pointerEvents: 'none',
        backdropFilter: 'blur(14px)',
        background: 'rgba(12, 51, 62, 0.28)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, background: 'transparent', zIndex: 2 }}>
          <button
            type="button"
            onClick={() => scrollTo('top')}
            style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label="Le Cellier - Accueil"
          >
            <img
              src="/logo-le-cellier.png"
              alt="Logo Le Cellier"
              style={{ height: '48px', width: 'auto', objectFit: 'contain', mixBlendMode: 'screen', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </button>
        </div>

        <div className="hidden lg:flex" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <nav
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              padding: '6px 16px'
            }}
            aria-label="Navigation principale"
          >
            <button
              type="button"
              onClick={() => scrollTo('top')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '12.5px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.18)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              Accueil
            </button>

            <button
              type="button"
              onClick={() => scrollTo('caves')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '12.5px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.18)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              Nos 6 caves
            </button>

            <button
              type="button"
              onClick={() => scrollTo('selection')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '12.5px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.18)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              Sélection
            </button>

            <button
              type="button"
              onClick={() => scrollTo('planning')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '12.5px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.18)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              Horaires & Ateliers
            </button>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, background: 'transparent', zIndex: 2 }}>
          <button
            type="button"
            onClick={() => scrollTo('planning')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: '#f3ede1',
              color: '#104451',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s, background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#ffffff'}
            onMouseLeave={(e) => e.target.style.background = '#f3ede1'}
          >
            <span className="hidden sm:inline">Où nous trouver</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden items-center justify-center p-2 rounded-lg cursor-pointer border border-white/20 bg-[#104451] text-white shadow-md"
            aria-label="Menu mobile"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden pointer-events-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-[#0c333e] border-l border-[#d8a84e]/30 shadow-2xl z-50 flex flex-col p-6 text-white">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <img
                src="/logo-le-cellier.png"
                alt="Logo Le Cellier"
                className="h-10 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer border-0"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto">
              {[
                { label: 'Accueil', id: 'top' },
                { label: 'Histoire', id: 'histoire' },
                { label: 'Nos 6 caves', id: 'caves' },
                { label: 'Sélection', id: 'selection' },
                { label: 'Horaires & Ateliers', id: 'planning' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold uppercase tracking-wider text-slate-100 hover:text-white hover:bg-white/[0.1] transition-colors border-0 bg-transparent"
                >
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="text-[#d8a84e]" />
                </button>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => scrollTo('planning')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f3ede1] text-[#104451] hover:bg-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <span>Trouver ma cave</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
