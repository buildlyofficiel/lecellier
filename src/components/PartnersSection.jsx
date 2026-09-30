export default function PartnersSection({ partners }) {
  const doubledPartners = [...partners, ...partners, ...partners, ...partners]

  return (
    <section className="py-20 bg-[#f3ede1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#b8902f] block mb-2">
          NOS COLLABORATEURS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#221a16] font-normal">
          Partenaires de <i className="italic text-[#104451] font-normal">confiance</i>
        </h2>
      </div>

      {/* Marquee with vertical divider lines and brown/black text matching Image 3 */}
      <div className="w-full overflow-hidden mask-marquee py-2">
        <div className="marquee-track-left gap-0">
          {doubledPartners.map((partner, i) => {
            const partnerName = typeof partner === 'string' ? partner : (partner?.name || 'Partenaire')
            return (
              <div
                key={i}
                className="px-8 sm:px-10 py-2 border-r border-[#cfc5b3] last:border-r-0 flex items-center justify-center shrink-0 select-none"
              >
                <span className="text-sm sm:text-base font-medium text-[#221a16] hover:text-[#104451] transition-colors whitespace-nowrap">
                  {partnerName}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
