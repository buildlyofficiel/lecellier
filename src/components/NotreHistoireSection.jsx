export default function NotreHistoireSection() {
  return (
    <section id="histoire" className="py-24 sm:py-32 bg-[#f3ede1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching image 1 */}
        <div className="mb-10 sm:mb-12">
          <span className="text-[#b8902f] text-xs font-bold tracking-[2.5px] uppercase block mb-3">
            NOTRE MAISON
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221a16] font-normal leading-tight">
            À propos de <i className="italic text-[#104451] font-normal">notre cave</i>
          </h2>
        </div>

        {/* Two balanced text columns matching image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 lg:gap-18 text-[#5a4d43] text-sm sm:text-base leading-relaxed">
          <p>
            Fondé il y a plus de 20 ans, Le Cellier est né d'une passion simple et sincère : mettre les meilleures bouteilles entre toutes les mains. Au fil des années, nous avons tissé des liens forts avec nos clients, nos vignerons et nos producteurs, bâtissant ainsi un réseau de 6 caves de proximité implanté au cœur de la Sarthe.
          </p>

          <p>
            Notre force ? Une équipe de passionnés qui connaît ses références sur le bout des doigts et prend le temps de vous écouter, que vous cherchiez un vin du quotidien, une bouteille d'exception ou le cadeau idéal. Avec plus de 1 500 références : vins, champagnes, spiritueux, bières artisanales et épicerie fine, nous avons de quoi satisfaire tous les palais et toutes les occasions.
          </p>
        </div>

      </div>
    </section>
  )
}
