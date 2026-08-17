# SEO — Le Cellier

Le projet inclut maintenant un socle SEO technique et local complet :

- balises title et meta description optimisées ;
- canonical + hreflang fr-FR ;
- Open Graph et Twitter Card ;
- robots meta ;
- JSON-LD Organization, WebSite et LiquorStore ;
- 6 pages locales crawlables dans `/caves/.../` ;
- sitemap XML et robots.txt générés automatiquement ;
- liens HTML depuis la page principale vers chaque page locale ;
- textes alternatifs d’images et dimensions explicites ;
- manifest + favicon ;
- données NAP (nom, adresse, téléphone) cohérentes entre les pages.

## Domaine de production

Le domaine est résolu automatiquement dans cet ordre :

1. `SITE_URL`
2. `VITE_SITE_URL`
3. `VERCEL_PROJECT_PRODUCTION_URL`
4. `VERCEL_URL`
5. sans domaine explicite : URLs relatives et sitemap volontairement omis

Pour un domaine personnalisé, la meilleure option est de définir :

```bash
SITE_URL=https://votre-domaine.fr
```

Le script `npm run seo` régénère les pages locales, `robots.txt` et `sitemap.xml`. Il est exécuté automatiquement avant `npm run dev` et `npm run build`.

## Après mise en ligne

- ajouter le domaine à Google Search Console ;
- envoyer `/sitemap.xml` dans Search Console ;
- tester la page d’accueil et les 6 pages locales dans le Rich Results Test ;
- garder les fiches Google Business Profile cohérentes avec les noms, adresses, téléphones et horaires du site.
