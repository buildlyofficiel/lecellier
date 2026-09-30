import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function SelectionSection({ wines, spirits }) {
  // --- STATE FOR VERSION 2 (Carrousel par 4) ---
  const [winePage, setWinePage] = useState(0)
  const [spiritPage, setSpiritPage] = useState(0)

  const itemsPerPage = 4

  // Wines pagination (7 wines -> 2 pages of 4)
  const totalWinePages = Math.ceil(wines.length / itemsPerPage)
  const handlePrevWine = () => {
    setWinePage((prev) => (prev - 1 + totalWinePages) % totalWinePages)
  }
  const handleNextWine = () => {
    setWinePage((prev) => (prev + 1) % totalWinePages)
  }

  // Spirits pagination (12 spirits -> 3 pages of 4)
  const totalSpiritPages = Math.ceil(spirits.length / itemsPerPage)
  const handlePrevSpirit = () => {
    setSpiritPage((prev) => (prev - 1 + totalSpiritPages) % totalSpiritPages)
  }
  const handleNextSpirit = () => {
    setSpiritPage((prev) => (prev + 1) % totalSpiritPages)
  }

  // Duplicated arrays for Version 1 marquee
  const doubledWines = [...wines, ...wines, ...wines, ...wines]
  const doubledSpirits = [...spirits, ...spirits, ...spirits]

  return (
    <div id="selection" className="space-y-0">

      {/* ==================================================================== */}
      {/* VERSION 1 : DÉFILEMENT CONTINU AUTOMATIQUE (MARQUEE) */}
      {/* ==================================================================== */}
      <section className="py-24 bg-[#f3ede1] overflow-hidden">

        {/* 1. VINS (Marquee) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#b8902f] block mb-2">
            Notre cave & nos rayons
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221a16] font-normal">
            Une <i className="italic text-[#104451] font-normal">sélection</i> de toute la France
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5a4d43] max-w-2xl leading-relaxed">
            Un voyage à travers les grands vignobles français et les vignerons indépendants. Plus de 1 500 références choisies pour leur typicité et leur émotion.
          </p>
        </div>

        {/* Marquee Vins */}
        <div className="w-full overflow-hidden mask-marquee mb-20 py-2">
          <div className="marquee-track-left gap-8 px-4">
            {doubledWines.map((wine, index) => {
              const imgSrc = wine.file.startsWith('/') ? wine.file : `/${wine.file}`
              return (
                <article
                  className="w-[240px] shrink-0 group select-none"
                  key={`v1-wine-${wine.region}-${wine.type}-${index}`}
                >
                  <div className="relative h-[320px] overflow-hidden bg-[#e8decb] shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                    <img
                      src={imgSrc}
                      alt={`${wine.name} — ${wine.region}`}
                      width="400"
                      height="400"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/wine-display.png'
                      }}
                    />
                  </div>
                  <div className="pt-3.5 px-0.5">
                    <span className="block text-[#b8902f] text-[11px] font-bold uppercase tracking-wider mb-1">
                      {wine.region}
                    </span>
                    <strong className="block font-serif text-sm font-semibold text-[#221a16] leading-snug group-hover:text-[#104451] transition-colors">
                      {wine.name}
                    </strong>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* 2. SPIRITUEUX (Marquee) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#b8902f] block mb-2">
            Whiskys, rhums & découvertes
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#221a16] font-normal mb-2">
            Notre sélection de <i className="italic text-[#104451] font-normal">spiritueux</i>
          </h3>
          <p className="text-sm sm:text-base text-[#5a4d43] max-w-2xl">
            Whiskys d’Écosse et du Japon, rhums agricoles de Martinique, gins botaniques et cognacs millésimés.
          </p>
        </div>

        {/* Marquee Spiritueux */}
        <div className="w-full overflow-hidden mask-marquee py-2">
          <div className="marquee-track-right gap-8 px-4">
            {doubledSpirits.map((spirit, index) => {
              const imgSrc = spirit.file.startsWith('/') ? spirit.file : `/${spirit.file}`
              return (
                <article
                  className="w-[240px] shrink-0 group select-none"
                  key={`v1-spirit-${spirit.category}-${index}`}
                >
                  <div className="relative h-[320px] overflow-hidden bg-[#e8decb] shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                    <img
                      src={imgSrc}
                      alt={`${spirit.name} — spiritueux sélectionné`}
                      width="400"
                      height="400"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/wine-display.png'
                      }}
                    />
                  </div>
                  <div className="pt-3.5 px-0.5">
                    <span className="block text-[#b8902f] text-[11px] font-bold uppercase tracking-wider mb-1">
                      {spirit.category} d’artisan
                    </span>
                    <strong className="block font-serif text-sm font-semibold text-[#221a16] leading-snug group-hover:text-[#104451] transition-colors">
                      {spirit.name}
                    </strong>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

      </section>


      {false && (
        <section className="py-24 bg-[#eee6d5] overflow-hidden border-b border-[#ddd0ba]">

          {/* Comparison Header Badge */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <span className="inline-block bg-[#b8902f]/15 text-[#221a16] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#b8902f]/30">
              Version 2 — Présentation par 4 avec flèches au-dessus
            </span>
          </div>

          {/* 1. VINS (PAR 4) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#b8902f] block mb-2">
                  Notre cave & nos rayons
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221a16] font-normal">
                  Une <i className="italic text-[#104451] font-normal">sélection</i> de toute la France
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#5a4d43] max-w-xl">
                  Cliquez sur les flèches pour faire défiler nos bouteilles par 4.
                </p>
              </div>

              {/* Arrows placed above */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold text-[#5a4d43] tracking-wider">
                  {winePage + 1} / {totalWinePages}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevWine}
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#104451] text-[#104451] hover:text-white border border-[#ddd0ba] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                    aria-label="4 vins précédents"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextWine}
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#104451] text-[#104451] hover:text-white border border-[#ddd0ba] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                    aria-label="4 vins suivants"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Wines Viewport Slider */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out -mx-3"
              style={{ transform: `translateX(-${winePage * 100}%)` }}
            >
              {Array.from({ length: totalWinePages }).map((_, pIndex) => {
                const pageWines = wines.slice(pIndex * itemsPerPage, pIndex * itemsPerPage + itemsPerPage)
                return (
                  <div key={pIndex} className="w-full shrink-0 flex flex-wrap">
                    {pageWines.map((wine, idx) => {
                      const imgSrc = wine.file.startsWith('/') ? wine.file : `/${wine.file}`
                      return (
                        <div key={idx} className="w-1/2 sm:w-1/4 px-3 mb-4 group">
                          <div className="relative h-[320px] overflow-hidden bg-[#e0d6c3] shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                            <img
                              src={imgSrc}
                              alt={`${wine.name} — ${wine.region}`}
                              width="400"
                              height="400"
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                e.target.src = '/wine-display.png'
                              }}
                            />
                          </div>
                          <div className="pt-3 px-0.5">
                            <span className="block text-[#b8902f] text-[11px] font-bold uppercase tracking-wider mb-1">
                              {wine.region}
                            </span>
                            <strong className="block font-serif text-sm font-semibold text-[#221a16] leading-snug group-hover:text-[#104451] transition-colors">
                              {wine.name}
                            </strong>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 2. SPIRITUEUX (PAR 4) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#b8902f] block mb-2">
                  Whiskys, rhums & découvertes
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#221a16] font-normal mb-2">
                  Notre sélection de <i className="italic text-[#104451] font-normal">spiritueux</i>
                </h3>
                <p className="text-sm sm:text-base text-[#5a4d43] max-w-xl">
                  Whiskys d’Écosse, rhums de Martinique et gins botaniques présentés par 4.
                </p>
              </div>

              {/* Arrows placed above */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold text-[#5a4d43] tracking-wider">
                  {spiritPage + 1} / {totalSpiritPages}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevSpirit}
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#104451] text-[#104451] hover:text-white border border-[#ddd0ba] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                    aria-label="4 spiritueux précédents"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSpirit}
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#104451] text-[#104451] hover:text-white border border-[#ddd0ba] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                    aria-label="4 spiritueux suivants"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Spirits Viewport Slider */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out -mx-3"
              style={{ transform: `translateX(-${spiritPage * 100}%)` }}
            >
              {Array.from({ length: totalSpiritPages }).map((_, pIndex) => {
                const pageSpirits = spirits.slice(pIndex * itemsPerPage, pIndex * itemsPerPage + itemsPerPage)
                return (
                  <div key={pIndex} className="w-full shrink-0 flex flex-wrap">
                    {pageSpirits.map((spirit, idx) => {
                      const imgSrc = spirit.file.startsWith('/') ? spirit.file : `/${spirit.file}`
                      return (
                        <div key={idx} className="w-1/2 sm:w-1/4 px-3 mb-4 group">
                          <div className="relative h-[320px] overflow-hidden bg-[#e0d6c3] shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                            <img
                              src={imgSrc}
                              alt={`${spirit.name} — spiritueux sélectionné`}
                              width="400"
                              height="400"
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                e.target.src = '/wine-display.png'
                              }}
                            />
                          </div>
                          <div className="pt-3 px-0.5">
                            <span className="block text-[#b8902f] text-[11px] font-bold uppercase tracking-wider mb-1">
                              {spirit.category} d’artisan
                            </span>
                            <strong className="block font-serif text-sm font-semibold text-[#221a16] leading-snug group-hover:text-[#104451] transition-colors">
                              {spirit.name}
                            </strong>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

        </section>
      )}

    </div>
  )
}
