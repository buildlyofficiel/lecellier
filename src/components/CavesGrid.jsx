import { useState } from 'react'

export default function CavesGrid({ caves, onSelectCave, scrollToId }) {
  const [showAll, setShowAll] = useState(false)

  const displayedCaves = showAll ? caves : caves.slice(0, 3)

  return (
    <section className="py-24 bg-[#f3ede1]" id="caves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#b8902f] block mb-3">
            Réseau Le Cellier
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221a16] font-normal">
            Nos <i className="italic text-[#104451] font-normal">caves</i> en images
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5a4d43] max-w-2xl mx-auto leading-relaxed">
            Chacune de nos adresses possède son charme, ses étagères chargées d'histoire et ses cavistes prêts à vous orienter en Sarthe et dans le Perche.
          </p>
        </div>

        {/* 3 Caves (or 6 when expanded) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCaves.map((cave) => (
            <article
              key={cave.city}
              className="group relative h-[380px] overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl bg-[#221a16]"
              onClick={() => {
                onSelectCave(cave.city)
                scrollToId('planning')
              }}
            >
              {/* Pure image without any text initially */}
              <img
                src={cave.image}
                alt={cave.name}
                width="800"
                height="600"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/wine-cellar.png'
                }}
              />

              {/* Hover overlay: NO BLUE, neutral dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white pointer-events-none">
                <h3 className="font-serif text-2xl font-normal text-white mb-1.5 drop-shadow-md">
                  {cave.name}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed drop-shadow-sm">
                  {cave.address}
                </p>
              </div>

            </article>
          ))}
        </div>

        {/* "Voir plus" / "Voir moins" Button */}
        {caves.length > 3 && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full bg-[#104451] hover:bg-[#0c333e] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer border-0 active:scale-95"
            >
              {showAll ? 'Voir moins' : 'Voir plus de caves'}
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
