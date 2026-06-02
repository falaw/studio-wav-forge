## Objectif
Faire pointer les miniatures FAFREDDO et FLEUR DE LYS vers les fichiers locaux `public/FAFR COVER.jpeg` et `public/F2L.jpg`.

## Étapes
1. Vérifier la présence des fichiers dans `public/`.
2. Modifier `src/data/projects.ts` :
   - Supprimer les imports `fafreddoCover` et `fleurDeLysCover` (.asset.json).
   - `mix-13` (FAFREDDO) : `thumbnail: '/FAFR%20COVER.jpeg'`.
   - `mix-14` (FLEUR DE LYS) : `thumbnail: '/F2L.jpg'`.
3. Supprimer les pointeurs CDN devenus inutiles (`fafreddo-cover.jpeg.asset.json`, `fleur-de-lys-cover.jpeg.asset.json`).

## Détails techniques
Vite sert `public/` à la racine. L'espace dans le nom de fichier `FAFR COVER.jpeg` est encodé en `%20`.
