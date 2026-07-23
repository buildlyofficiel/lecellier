# Le Cellier — Projet React (Vite)

Conversion du site HTML statique en projet React.

## Démarrage

```bash
npm install
npm run dev
```

Puis ouvre l'URL affichée (en général http://localhost:5173).

## Build de production

```bash
npm run build
npm run preview
```

## Structure

- `index.html` — page racine, charge les polices Google Fonts (Playfair Display + Inter)
- `src/main.jsx` — point d'entrée React
- `src/App.jsx` — tout le contenu de la page (hero, à propos, sélection de vins, planning, contact, footer)
- `src/App.css` — les styles, repris tels quels du site original

## Ce qui a changé par rapport au HTML original

- Les `onclick="..."` sont devenus des gestionnaires React (`onClick`, `onSubmit`)
- Le script de géolocalisation (`geoText`) est maintenant un `useEffect` + `useState`
- Le défilement du carrousel de vins utilise un `useRef` au lieu de `document.getElementById`
- La liste des vins, les horaires et les événements sont extraits en tableaux de données en haut du fichier (`WINES`, `SCHEDULE`, `EVENTS`) — pratique si tu veux les brancher plus tard sur une API ou un CMS
- Les images sont toujours des placeholders visuels (comme dans l'original) — remplace `<ImgPlaceholder .../>` par de vraies balises `<img src="..." />` quand tu auras les photos
