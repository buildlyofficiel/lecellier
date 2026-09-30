import { Gift, Sparkles } from 'lucide-react'

export default function GiftsSection({ giftIdeas }) {
  return (
    <section className="py-24 bg-[#f3ede1]" id="gifts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center sm:text-left mb-12">
          <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#b8902f] block mb-3">
            Faire plaisir à coup sûr
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221a16] font-medium">
            Idées <i className="italic text-[#104451]">cadeaux</i> & coffrets
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5a4d43] max-w-2xl leading-relaxed">
            Pour les particuliers comme pour les entreprises, nos cavistes composent vos coffrets gourmands sur mesure.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {giftIdeas.map((gift, index) => (
            <div
              key={gift.name}
              className="bg-[#fcf9f2] rounded-2xl p-8 border border-[#ddd0ba] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold font-serif text-[#b8902f] tracking-widest bg-[#fcf9f2] border border-[#ddd0ba] px-3 py-1 rounded-full">
                    0{index + 1}
                  </span>
                  <Gift size={20} className="text-[#104451] group-hover:scale-110 group-hover:text-[#b8902f] transition-all" />
                </div>

                <h3 className="font-serif text-xl font-medium text-[#221a16] mb-3 group-hover:text-[#104451] transition-colors">
                  {gift.name}
                </h3>

                <p className="text-sm text-[#5a4d43] leading-relaxed">
                  {gift.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#f3ede1] flex items-center justify-between text-xs font-bold text-[#104451]">
                <span>Disponible en boutique</span>
                <span className="text-[#b8902f]">★ Conseils inclus</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
