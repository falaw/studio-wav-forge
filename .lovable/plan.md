## Objectif
Mettre à jour le projet **FAFREDDO** de Calmé Zuu dans la section MIX/MASTER (catégorie 2026) avec un nouveau lien d'écoute YouTube et une nouvelle image de couverture.

## Étapes

1. **Créer le pointeur CDN de la nouvelle cover**
   - Uploader l'image `user-uploads://ab67616d00001e02cbc0c8f943eafbae8e5d23f3.jpg` via `lovable-assets`.
   - Générer le pointeur `src/assets/fafreddo-cover.png.asset.json` (ou `.jpg` selon le format d'origine).

2. **Modifier `src/data/projects.ts`**
   - Pour le projet `id: 'mix-13'` (`FAFREDDO` de Calmé Zuu) :
     - Remplacer `youtubeUrl` par : `https://www.youtube.com/watch?v=egWC1lk_fpw&list=OLAK5uy_mOCiYjFpqGdz6p8ZG8LcTpDz6G8IgeXRY&pp=0gcJCfMCOCosWNin`
     - Remplacer `thumbnail` par l'URL du pointeur CDN créé à l'étape 1.

3. **Vérifier le rendu**
   - S'assurer que le build passe (`bun run build`).
   - Confirmer visuellement dans la preview que la carte FAFREDDO affiche la nouvelle cover et pointe vers le bon lien.

## Détails techniques
- La catégorie 2026 et le tri existent déjà ; aucune modification structurelle nécessaire.
- L'image d'origine `public/FAFR COVER.jpeg` et son éventuel pointeur CDN précédent peuvent être laissés en place ou nettoyés si non référencés ailleurs.
