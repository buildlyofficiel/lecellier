/**
 * ==============================================================================
 * 🍷 CATALOGUE DES BOUTEILLES & SÉLECTIONS DU CELLIER 🥃
 * ==============================================================================
 * 
 * C'est ICI que vous pouvez ajouter, modifier ou supprimer toutes les bouteilles,
 * leurs photos, leurs noms, leurs régions et leurs catégories !
 * 
 * ------------------------------------------------------------------------------
 * 📸 COMMENT AJOUTER UNE NOUVELLE PHOTO :
 * ------------------------------------------------------------------------------
 * 1. Placez votre photo dans le dossier "public/images/bottles/" de votre projet.
 *    (Exemple : public/images/bottles/ma-bouteille.jpg)
 * 
 * 2. Dans la liste ci-dessous, renseignez simplement le chemin :
 *    file: 'images/bottles/ma-bouteille.jpg'
 * 
 * ------------------------------------------------------------------------------
 * 🍇 EXEMPLE POUR AJOUTER UN NOUVEAU VIN :
 * ------------------------------------------------------------------------------
 * {
 *   file: 'images/bottles/mon-vin.jpg',
 *   name: 'Château Nom Du Vin — Millésime',
 *   region: 'Bordeaux / Bourgogne / etc.',
 *   type: 'Rouge',   // 'Rouge', 'Blanc', 'Rosé' ou 'Effervescent'
 * },
 * 
 * ------------------------------------------------------------------------------
 * 🥃 EXEMPLE POUR AJOUTER UN NOUVEAU SPIRITUEUX :
 * ------------------------------------------------------------------------------
 * {
 *   file: 'images/bottles/mon-spiritueux.jpg',
 *   name: 'Distillerie / Marque — Nom',
 *   category: 'Whisky',   // 'Whisky', 'Rhum', 'Gin', 'Cognac', etc.
 * },
 * 
 * ==============================================================================
 */

// ==============================================================================
// 1. SÉLECTION DES VINS & CHAMPAGNES
// ==============================================================================
export const WINES = [
  {
    file: 'images/bottles/san-ghjuva-terra.jpg',
    region: 'Corse',
    type: 'Rosé',
    name: 'San Ghjuvà — Terra',
  },
  {
    file: 'images/bottles/chateau-sainte-marguerite-symphonie.jpg',
    region: 'Côtes de Provence',
    type: 'Rosé',
    name: 'Château Sainte Marguerite — Symphonie (Cru Classé)',
  },
  {
    file: 'images/bottles/joseph-drouhin-clos-de-vougeot-2018.jpg',
    region: 'Bourgogne',
    type: 'Rouge',
    name: 'Joseph Drouhin — Clos de Vougeot Grand Cru 2018',
  },
  {
    file: 'images/bottles/cos-destournel-2015.jpg',
    region: 'Bordeaux — Saint-Estèphe',
    type: 'Rouge',
    name: 'Cos d’Estournel 2015 (Grand Cru Classé en 1855)',
  },
  {
    file: 'images/bottles/chateau-talbot-2020.jpg',
    region: 'Bordeaux — Saint-Julien (Médoc)',
    type: 'Rouge',
    name: 'Château Talbot 2020 (4ᵉ Grand Cru Classé 1855)',
  },
  {
    file: 'images/bottles/domaine-vincenti.jpg',
    region: 'Corse',
    type: 'Blanc',
    name: 'Domaine Vincenti',
  },
  {
    file: 'images/bottles/mandria-di-signadore-patrimonio.jpg',
    region: 'Corse — Patrimonio',
    type: 'Rouge',
    name: 'A Mandria di Signadore — Patrimonio (AOP)',
  },
]

// ==============================================================================
// 2. SÉLECTION DES SPIRITUEUX
// ==============================================================================
export const SPIRITS = [
  {
    file: 'images/bottles/la-favorite-flibuste.jpg',
    category: 'Rhum',
    name: 'La Favorite — Cuvée Spéciale de la Flibuste (Martinique)',
  },
  {
    file: 'images/bottles/arlett-original.jpg',
    category: 'Whisky',
    name: 'Arlett — Original (Whisky français, Distillerie Tessendier)',
  },
  {
    file: 'images/bottles/ardbeg-spectacular.jpg',
    category: 'Whisky',
    name: 'Ardbeg — Spectacular (Islay Single Malt Scotch Whisky)',
  },
  {
    file: 'images/bottles/the-kyoto-whisky.jpg',
    category: 'Whisky',
    name: 'The Kyoto Whisky (Kyoto Miyako Distillery)',
  },
  {
    file: 'images/bottles/lonewolf-juniper-gin.jpg',
    category: 'Gin',
    name: 'LoneWolf — Original Juniper Gin (BrewDog Distilling Co.)',
  },
  {
    file: 'images/bottles/birdie-gin-timut.jpg',
    category: 'Gin',
    name: 'Birdie — Gin Timut',
  },
  {
    file: 'images/bottles/daniel-bouju-xo-empereur.jpg',
    category: 'Cognac',
    name: 'Daniel Bouju XO — Empereur (Grande Champagne, Premier Cru)',
  },
  {
    file: 'images/bottles/chateau-du-breuil-15ans.jpg',
    category: 'Calvados',
    name: 'Château du Breuil — 15 Ans d’Âge (Pays d’Auge)',
  },
  {
    file: 'images/bottles/noble-coyote-espadin-tobala.jpg',
    category: 'Mezcal',
    name: 'Noble Coyote — Espadín-Tobalá (Oaxaca, Mexique)',
  },
  {
    file: 'images/bottles/veuve-goudoulin-hors-dage.jpg',
    category: 'Armagnac',
    name: 'Veuve Goudoulin — Hors d’Âge (Bas-Armagnac)',
  },
  {
    file: 'images/bottles/daiquito.jpg',
    category: 'Rhum',
    name: 'Daiquito — Rhum arrangé artisanal',
  },
  {
    file: 'images/bottles/a1710-la-perle.jpg',
    category: 'Rhum',
    name: 'A1710 — La Perle (Rhum blanc extraordinaire, Martinique)',
  },
]
