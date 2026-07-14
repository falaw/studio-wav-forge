## Objectif
Ajouter un nouveau projet **BABAR TAPE vol.1** de Calmé Zuu dans la catégorie 2026 du catalogue MIX/MASTER, avec l'image de couverture uploadée.

## Étapes

1. **Ajouter l'image de couverture**
   - Créer un pointeur CDN via `lovable-assets create` depuis `/mnt/user-uploads/image.png` → `src/assets/babar-tape-vol1-cover.png.asset.json`.

2. **Modifier `src/data/projects.ts`**
   - Importer le pointeur `babarTapeCover` depuis `@/assets/babar-tape-vol1-cover.png.asset.json`.
   - Ajouter dans `unsortedMixProjects` une nouvelle entrée `mix-15` :
     - `title: 'BABAR TAPE vol.1'`
     - `artist: 'Calmé Zuu'`
     - `type: 'playlist'` (car c'est une tape/playlist YouTube → badge EP affiché)
     - `youtubeUrl: 'https://www.youtube.com/watch?v=RVWpTAn6-mE&list=OLAK5uy_kxwIFv79BSLgJpSTDGbAqLLuUCU58v0S8'`
     - `thumbnail: babarTapeCover.url`
     - `date: '2026-04-01'` (postérieur aux autres 2026 pour apparaître en premier)

## Détails techniques
- La catégorie **2026** existe déjà dans `MixSection.tsx` via le groupement automatique par année (`groupByYear`) : aucun changement structurel nécessaire.
- Le tri décroissant par date placera BABAR TAPE en tête du bloc 2026.
- Le style, l'accordéon et les interactions (hover, badge EP, animations Framer Motion) restent identiques au reste du catalogue.
