import { useState } from 'react'
import { Phone, MapPin } from 'lucide-react'
import CavesMap from './CavesMap.jsx'

export default function PlanningContactSection({
  caves,
  selectedCave,
  onSelectCave,
  selectedCaveInfo,
  selectedSchedule,
  events,
  todayName,
}) {
  // Mobile active tab: 'schedule' | 'map' | 'events'
  const [mobileTab, setMobileTab] = useState('schedule')

  const daysOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  const scheduleRows = Array.isArray(selectedSchedule)
    ? selectedSchedule
    : daysOrder.map((day) => {
      const val = selectedSchedule[day]
      if (!val || val.length === 0) return { day, hours: null }
      const periods = Array.isArray(val[0]) ? val : [val]
      const hoursStr = periods.map(([opens, closes]) => `${opens} - ${closes}`).join(' et ')
      return { day, hours: hoursStr }
    })

  return (
    <section className="py-20 sm:py-28 bg-[#f3ede1]" id="planning">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#b8902f] block mb-2">
              HORAIRES, CARTE & PLANNING
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221a16] font-normal">
              Nos caves, <i className="italic text-[#104451] font-normal">horaires & ateliers</i>
            </h2>
          </div>
          <p className="text-sm text-[#5a4d43] max-w-xl sm:max-w-sm sm:pb-1">
            Consultez les horaires de votre cave, localisez-la sur la carte et réservez vos prochaines dégustations.
          </p>
        </div>

        {/* CAVE SELECTOR PILLS */}
        <div className="flex justify-start gap-2 flex-wrap mb-6" role="tablist">
          {caves.map((cave) => {
            const isActive = selectedCave === cave.city
            return (
              <button
                key={cave.city}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${isActive
                  ? 'bg-[#104451] text-white border-[#104451] shadow-md scale-105'
                  : 'bg-[#f3ede1] text-[#5a4d43] border-[#ddd0ba] hover:bg-white hover:text-[#104451]'
                  }`}
                onClick={() => onSelectCave(cave.city)}
              >
                {cave.city}
              </button>
            )
          })}
        </div>

        {/* MOBILE VIEW SELECTOR TABS (Visible only on < lg) */}
        <div className="flex lg:hidden justify-center gap-1.5 mb-6 p-1 bg-[#ede4d4] rounded-xl">
          <button
            type="button"
            onClick={() => setMobileTab('schedule')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer border-0 ${mobileTab === 'schedule' ? 'bg-[#104451] text-white shadow-xs' : 'text-[#5a4d43]'
              }`}
          >
            Horaires
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer border-0 ${mobileTab === 'map' ? 'bg-[#104451] text-white shadow-xs' : 'text-[#5a4d43]'
              }`}
          >
            Carte
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('events')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer border-0 ${mobileTab === 'events' ? 'bg-[#104451] text-white shadow-xs' : 'text-[#5a4d43]'
              }`}
          >
            Ateliers
          </button>
        </div>

        {/* ============================================================== */}
        {/* UNIFIED 1-ROW COMPACT BLOCK (Horaires + Carte + Planning) */}
        {/* ============================================================== */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.1fr_0.95fr] gap-4 sm:gap-5 items-stretch">

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 1: HORAIRES & INFOS PRATIQUES */}
            {/* ------------------------------------------------------------ */}
            <div className={`flex flex-col justify-between rounded-2xl bg-[#fcf9f2] border border-[#ddd0ba] p-5 sm:p-6 ${mobileTab !== 'schedule' ? 'hidden lg:flex' : 'flex'}`}>
              <div>
                <div className="pb-4 mb-4 border-b border-[#f0e9db]">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#b8902f] block mb-1">
                    Horaires d'ouverture
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#104451]">
                    {selectedCaveInfo.name}
                  </h3>
                  <p className="text-xs text-[#5a4d43] mt-0.5 line-clamp-1">
                    {selectedCaveInfo.address}
                  </p>
                </div>

                {/* Compact Schedule Table */}
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    {scheduleRows.map((row) => {
                      const isToday = row.day.toLowerCase() === todayName.toLowerCase()
                      return (
                        <tr
                          key={row.day}
                          className={`border-b border-[#f5efe4] last:border-none ${isToday ? 'bg-amber-500/15 font-semibold rounded' : ''
                            }`}
                        >
                          <td className="py-2 px-1.5 text-[#221a16]">
                            <div className="flex items-center gap-1.5">
                              <span>{row.day}</span>
                              {isToday && (
                                <span className="text-[9px] font-bold bg-[#104451] text-white px-1.5 py-0.2 rounded-full uppercase">
                                  Auj.
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-2 px-1.5 text-right font-medium text-[#104451]">
                            {row.hours || <span className="text-red-700 italic">Fermé</span>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Action buttons at bottom of col 1 */}
              <div className="flex items-center gap-2 pt-4 mt-3 border-t border-[#f0e9db]">
                <a
                  href={`tel:${selectedCaveInfo.phoneHref}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#f3ede1] hover:bg-[#eae1cf] text-[#104451] text-xs font-bold transition-colors"
                >
                  <Phone size={12} />
                  <span>{selectedCaveInfo.phone}</span>
                </a>
                <a
                  href={selectedCaveInfo.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#f3ede1] hover:bg-white text-[#104451] text-xs font-bold transition-colors shadow-xs"
                >
                  <MapPin size={12} />
                  <span>Itinéraire ↗</span>
                </a>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 2: CARTE INTERACTIVE LEAFLET */}
            {/* ------------------------------------------------------------ */}
            <div className={`relative min-h-[380px] lg:min-h-[460px] h-full ${mobileTab !== 'map' ? 'hidden lg:block' : 'block'}`}>
              <CavesMap
                caves={caves}
                selectedCave={selectedCave}
                onSelectCave={onSelectCave}
                className="h-full min-h-[380px] lg:min-h-[460px]"
              />
            </div>

            {/* ------------------------------------------------------------ */}
            {/* COLUMN 3: PLANNING ATELIERS OU CONTACT */}
            {/* ------------------------------------------------------------ */}
            <div className={`flex flex-col justify-between rounded-2xl bg-[#fcf9f2] border border-[#ddd0ba] p-5 sm:p-6 ${mobileTab !== 'events' ? 'hidden lg:flex' : 'flex'
              }`}>

              {/* Header with toggle tab */}
              <div>
                <div className="pb-3 mb-3 border-b border-[#f0e9db]">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#b8902f]">
                    Prochains ateliers
                  </span>
                </div>

                <div className="space-y-3">
                  {events.map((ev) => {
                    const parts = ev.date.split(' ')
                    const dayNum = parts[1] || ''
                    const monthName = (parts[2] || '').slice(0, 4)

                    return (
                      <div
                        key={ev.title}
                        className="p-3 rounded-xl bg-[#fcf9f2] border border-[#e7ded0] hover:border-[#b8902f] transition-all flex gap-3 items-center"
                      >
                        <div className="w-11 h-11 rounded-lg bg-[#104451] text-[#f3ede1] flex flex-col items-center justify-center shrink-0 shadow-xs">
                          <span className="font-serif text-sm font-bold leading-none">{dayNum}</span>
                          <span className="text-[9px] font-bold uppercase text-amber-300 mt-0.5">{monthName}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-xs font-semibold text-[#221a16] truncate">
                            {ev.title}
                          </h4>
                          <p className="text-[11px] text-[#5a4d43] line-clamp-1">
                            {ev.cave}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-[#104451] font-semibold">
                              {ev.places}
                            </span>
                            <a
                              href={`tel:${caves.find((cave) => cave.name === ev.cave)?.phoneHref || selectedCaveInfo.phoneHref}`}
                              className="text-[11px] font-bold text-[#104451] hover:underline cursor-pointer border-0 bg-transparent p-0"
                            >
                              Appeler ↗
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom footer text */}
              <div className="pt-3 mt-3 border-t border-[#f0e9db] text-center text-[11px] text-[#8a7e72]">
                <span>Dégustations animées par nos cavistes passionnés.</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
