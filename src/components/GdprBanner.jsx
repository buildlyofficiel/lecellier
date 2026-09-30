export default function GdprBanner({ isOpen, onClose }) {
  if (!isOpen) return null

  const handleAcceptAll = () => {
    localStorage.setItem(
      'lecellier-gdpr-consent',
      JSON.stringify({ essential: true, analytics: true, marketing: true, date: new Date().toISOString() })
    )
    onClose()
  }

  const handleDeclineAll = () => {
    localStorage.setItem(
      'lecellier-gdpr-consent',
      JSON.stringify({ essential: true, analytics: false, marketing: false, date: new Date().toISOString() })
    )
    onClose()
  }

  return (
    <div
      className="fixed inset-x-4 bottom-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-[#12100e]/95 backdrop-blur-md text-[#f3ede1] rounded-2xl p-6 border border-[#2a231f] shadow-2xl animate-fadeIn"
      role="dialog"
      aria-labelledby="gdpr-title"
    >
      <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#d8a84e] block mb-1">
        Confidentialité & Cookies
      </span>
      <h3 id="gdpr-title" className="font-serif text-lg font-medium text-white mb-2">
        Gestion des cookies
      </h3>
      <p className="text-xs text-slate-300 leading-relaxed mb-6">
        Nous utilisons des cookies pour analyser notre audience et optimiser votre expérience de navigation avec nos vignerons partenaires.
      </p>
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={handleDeclineAll}
          className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer border-0 active:scale-95"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={handleAcceptAll}
          className="flex-1 py-2.5 rounded-xl bg-[#104451] hover:bg-[#155768] text-white text-xs font-bold transition-colors cursor-pointer border-0 shadow-sm active:scale-95"
        >
          Tout accepter
        </button>
      </div>
    </div>
  )
}
