import { useEffect, useRef, useState } from 'react'

export default function CavesMap({ selectedCave, onSelectCave, caves, className = "h-[360px] sm:h-[460px]" }) {
  const mapNode = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef({})
  const [mapReady, setMapReady] = useState(true)

  useEffect(() => {
    if (!mapNode.current || typeof window === 'undefined') return
    const L = window.L
    if (!L) {
      setMapReady(false)
      return
    }

    if (mapInstance.current) {
      try {
        mapInstance.current.remove()
      } catch (e) {
        // ignore
      }
      mapInstance.current = null
    }

    let map = null
    try {
      map = L.map(mapNode.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([48.15, 0.45], 9)
    } catch (e) {
      return
    }

    mapInstance.current = map

    try {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap',
      }).addTo(map)
    } catch (e) {
      // ignore
    }

    const markerList = []
    markersRef.current = {}

    caves.forEach((cave) => {
      try {
        const isSelected = cave.city === selectedCave
        const marker = L.circleMarker([cave.lat, cave.lng], {
          radius: isSelected ? 12 : 8,
          color: '#f3ede1',
          weight: 3,
          fillColor: isSelected ? '#d8a84e' : '#104451',
          fillOpacity: 1,
        }).addTo(map)

        marker.bindPopup(`
          <div style="font-family: Inter, sans-serif; padding: 4px;">
            <strong style="color: #104451; font-size: 14px; display: block; margin-bottom: 2px;">${cave.name}</strong>
            <span style="font-size: 12px; color: #5a4d43; display: block; margin-bottom: 6px;">${cave.address}</span>
            <a href="${cave.maps}" target="_blank" rel="noopener noreferrer" style="color: #104451; font-weight: bold; font-size: 12px; text-decoration: underline;">Itinéraire ↗</a>
          </div>
        `)

        marker.on('click', () => {
          if (onSelectCave) onSelectCave(cave.city)
        })

        markersRef.current[cave.city] = marker
        markerList.push(marker)
      } catch (err) {
        // ignore marker error
      }
    })

    try {
      if (markerList.length > 0) {
        const group = L.featureGroup(markerList)
        map.fitBounds(group.getBounds().pad(0.2), { maxZoom: 11 })
      }
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      try {
        if (mapInstance.current) {
          mapInstance.current.invalidateSize()
        }
      } catch (e) {}
    }, 250)

    return () => {
      if (mapInstance.current) {
        try {
          mapInstance.current.remove()
        } catch (e) {}
        mapInstance.current = null
      }
    }
  }, [caves])

  useEffect(() => {
    if (!mapInstance.current || !markersRef.current) return
    caves.forEach((cave) => {
      const marker = markersRef.current[cave.city]
      if (marker) {
        try {
          const isSelected = cave.city === selectedCave
          marker.setStyle({
            radius: isSelected ? 13 : 8,
            fillColor: isSelected ? '#d8a84e' : '#104451',
          })
          if (isSelected && typeof marker.bringToFront === 'function') {
            marker.bringToFront()
          }
        } catch (e) {
          // ignore leaflet pos errors
        }
      }
    })
  }, [selectedCave, caves])

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-[#ddd0ba] shadow-md bg-[#e7dfd1] ${className}`}>
      <div ref={mapNode} className="w-full h-full" aria-label="Carte des six caves Le Cellier" />
      <div className="absolute top-3 right-3 z-[1000] bg-[#104451]/95 backdrop-blur-md text-[#f3ede1] px-3 py-1 rounded-full text-[11px] font-bold border border-[#d8a84e]/40 shadow-sm">
        6 caves · Sarthe & Perche
      </div>
    </div>
  )
}
