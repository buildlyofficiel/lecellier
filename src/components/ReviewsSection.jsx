import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ReviewsSection({ reviews }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!reviews || reviews.length === 0) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [reviews?.length])

  if (!reviews || reviews.length === 0) return null

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % reviews.length)
  }

  return (
    <section className="py-24 sm:py-32 bg-[#f3ede1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching image 2 */}
        <div className="mb-14 sm:mb-16">
          <span className="text-[#b8902f] text-xs font-bold tracking-[2.5px] uppercase block mb-3">
            VOS AVIS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221a16] font-normal leading-tight">
            Ce qu'en disent nos <i className="italic text-[#104451] font-normal">clients</i>
          </h2>
        </div>

        {/* Minimalist carousel matching image 2 */}
        <div className="relative flex items-center justify-between gap-4 sm:gap-10">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#e5dcce] hover:bg-[#dcd1c1] text-[#104451] flex items-center justify-center shrink-0 transition-colors cursor-pointer border-0"
            aria-label="Avis précédent"
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
          </button>

          {/* Quote & Author */}
          <div className="flex-1 text-center max-w-2xl px-2 min-h-[140px] flex flex-col items-center justify-center">
            <p className="font-serif italic text-lg sm:text-2xl text-[#104451] leading-relaxed mb-6">
              &ldquo;{reviews[current].text}&rdquo;
            </p>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#221a16]">
              {reviews[current].name}
            </span>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#e5dcce] hover:bg-[#dcd1c1] text-[#104451] flex items-center justify-center shrink-0 transition-colors cursor-pointer border-0"
            aria-label="Avis suivant"
          >
            <ArrowRight size={16} strokeWidth={1.8} />
          </button>

        </div>

        {/* Pagination Dots matching image 2 */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 cursor-pointer border-0 p-0 ${
                i === current
                  ? 'w-7 h-2 rounded-full bg-[#104451]'
                  : 'w-2 h-2 rounded-full bg-[#ddd0ba] hover:bg-[#b8902f]'
              }`}
              aria-label={`Aller à l'avis ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
