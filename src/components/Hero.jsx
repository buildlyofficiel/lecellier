export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full m-0 p-0 overflow-hidden flex items-center justify-center bg-black" id="top">
      <img
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65] contrast-[1.02]"
        src="/wmremove-transformed.jpeg"
        alt="Intérieur de la cave Le Cellier"
        width="1920"
        height="1080"
        loading="eager"
        fetchPriority="high"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-6 pt-24 pb-28 sm:pb-32 text-white">
        <span className="inline-block text-[#d8a84e] text-xs sm:text-sm font-bold tracking-[3px] uppercase mb-4 drop-shadow-md">
          Caviste Indépendant en Sarthe & Perche
        </span>

        <h1 className="font-serif italic font-normal text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          Le Cellier
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-100 max-w-2xl leading-relaxed drop-shadow-md font-light">
          Six caves de caractère, plus de 1 500 références choisies auprès de vignerons passionnés et de distillateurs d'exception. Venez pousser la porte de votre caviste pour un conseil sincère et une sélection sur mesure.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => document.getElementById('caves')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-full bg-[#f3ede1] text-[#104451] hover:bg-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-xl hover:scale-105 cursor-pointer border-0 active:scale-95"
          >
            Découvrir nos 6 caves
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('planning')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer active:scale-95"
          >
            Horaires & Contact
          </button>
        </div>
      </div>

      {/* Subtle rounded bottom corners for a cleaner transition into the next section */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-14 lg:h-20 block text-[#f3ede1]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,14 Q0,0 14,0 H1426 Q1440,0 1440,14 L1440,90 L0,90 Z"
            fill="#f3ede1"
          />
        </svg>
      </div>
    </section>
  )
}
