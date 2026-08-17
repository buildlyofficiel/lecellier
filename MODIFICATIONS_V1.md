# Modifications V1 — Le Cellier

## Changements appliqués

- Logo principal ajouté en haut du site et dans le footer.
- Nouvelle description d'introduction intégrée dans le hero.
- Texte « À propos de notre cave » remplacé par la nouvelle version fournie.
- Ajout d'une section « Nos 6 caves » avec fiches de proximité :
  - Le Mans
  - Connerré
  - La Ferté-Bernard
  - Mamers
  - Bonnétable
  - Nogent-le-Rotrou
- Chaque fiche contient l'adresse, le téléphone, un accès vers la fiche Google et, lorsqu'elle était disponible, la note Google.
- Refonte de la sélection :
  - 12 emplacements vins (un rouge et un blanc pour 6 régions).
  - Défilement automatique horizontal en boucle.
  - 10 emplacements spiritueux sur une seconde ligne.
  - Défilement automatique dans le sens inverse.
  - Pause du défilement au survol.
- Section partenaires conservée avec les emplacements existants en attente des logos.
- Section idées cadeaux remplacée par 6 idées sans prix :
  - Coffret bière sur mesure
  - Champagne festif
  - Coffret de bouteilles de vin
  - Grand cru bordelais
  - Accessoires
  - Dégustation privée
- Avis contenant le prénom « Alban » supprimés.
- Planning conservé.
- Formulaire de contact conservé.
- Menu desktop/mobile mis à jour avec un lien « Nos caves ».
- Mise en page responsive ajoutée pour les nouvelles sections.

## À remplacer plus tard

Les visuels des 12 vins et des 10 spiritueux utilisent actuellement les images déjà présentes dans le projet comme visuels temporaires. Ils peuvent être remplacés directement dans `public/` puis associés dans `src/App.jsx` lorsque les bouteilles définitives seront connues.

Les logos partenaires peuvent être ajoutés dès réception et remplacer les entrées `exemple` dans `PARTNERS` (`src/App.jsx`).

## Retours complémentaires — V2 (14/08/2026)

- **Planning multi-caves** : ajout d'un sélecteur pour afficher les horaires de chacune des 6 caves sans surcharger la page.
- **Horaires** : intégration des horaires actuellement publiés pour Le Mans, Connerré, La Ferté-Bernard, Mamers, Bonnétable et Nogent-le-Rotrou.
- **Itinéraire** : chaque cave du planning possède un lien direct vers Google Maps.
- **Où nous trouver** : remplacement de la carte centrée uniquement sur Le Mans par une carte interactive du réseau avec **6 points**.
- **Liste sous/à côté de la carte** : les 6 adresses sont visibles et chaque ligne ouvre l'itinéraire correspondant.
- **Logo d'en-tête** : création d'une variante bleue, cohérente avec la couleur principale du site (`#145261`), sans altérer le blason ni les dorures.
- **Sélections** : conservation d'une bouteille par cadre pour garder un rendu premium et lisible ; textes internes sur les « emplacements » remplacés par des textes destinés aux visiteurs.
- **Photos cadeaux / sélections** : structure conservée afin de remplacer simplement les visuels lorsque les photos définitives seront reçues.

### Carte
La carte utilise Leaflet + OpenStreetMap pour éviter de dépendre d'une clé API Google Maps. Les liens d'itinéraire restent des liens Google Maps vers les adresses officielles.
