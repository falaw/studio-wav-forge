export interface Project {
  id: string;
  title: string;
  director: string;
  youtubeUrl: string;
  thumbnail?: string;
}

export interface MixProject {
  id: string;
  title: string;
  type: 'single' | 'playlist' | 'album';
  youtubeUrl: string;
  thumbnail?: string;
}

export interface Pack {
  id: string;
  title: string;
  price: string;
  isFree: boolean;
  badge: string;
  icon: string;
  description: string;
  sampleCount: string;
  audioPreviewUrl?: string;
}

export const soundDesignProjects: Project[] = [
  {
    id: 'project-01',
    title: 'Projet #01',
    director: 'REC709VISUEL',
    youtubeUrl: 'https://youtu.be/Ov70T2sRrFw',
    thumbnail: 'https://img.youtube.com/vi/Ov70T2sRrFw/maxresdefault.jpg',
  },
  {
    id: 'project-02',
    title: 'Projet #02',
    director: 'MassimoVisual',
    youtubeUrl: 'https://youtu.be/fKvJDVlzuOE',
    thumbnail: 'https://img.youtube.com/vi/fKvJDVlzuOE/maxresdefault.jpg',
  },
  {
    id: 'project-03',
    title: 'Projet #03',
    director: 'Harris Kaci',
    youtubeUrl: 'https://youtu.be/_xuNmoJEoIM',
    thumbnail: 'https://img.youtube.com/vi/_xuNmoJEoIM/maxresdefault.jpg',
  },
  {
    id: 'project-04',
    title: 'Projet #04',
    director: 'REC709VISUEL',
    youtubeUrl: 'https://youtu.be/Ch1qGpWWZ5Q',
    thumbnail: 'https://img.youtube.com/vi/Ch1qGpWWZ5Q/maxresdefault.jpg',
  },
  {
    id: 'project-05',
    title: 'Projet #05',
    director: 'REC709VISUEL',
    youtubeUrl: 'https://youtu.be/Uhmg30gpTiQ',
    thumbnail: 'https://img.youtube.com/vi/Uhmg30gpTiQ/maxresdefault.jpg',
  },
  {
    id: 'project-06',
    title: 'Projet #06',
    director: 'MassimoVisual',
    youtubeUrl: 'https://youtu.be/yua5F80KcPw',
    thumbnail: 'https://img.youtube.com/vi/yua5F80KcPw/maxresdefault.jpg',
  },
];

export const mixProjects: MixProject[] = [
  {
    id: 'mix-01',
    title: 'Projet Mix #01',
    type: 'single',
    youtubeUrl: 'https://youtu.be/VzU5r5hJ_cY',
  },
  {
    id: 'mix-02',
    title: 'Album / EP Mix',
    type: 'playlist',
    youtubeUrl: 'https://youtube.com/playlist?list=OLAK5uy_lxmFJ_7JBZfh7glNerZcmEzpcA8mnqCcU',
  },
  {
    id: 'mix-03',
    title: 'Projet Mix #03',
    type: 'single',
    youtubeUrl: 'https://youtu.be/rzwMJ3JBP3M',
  },
  {
    id: 'mix-04',
    title: 'Projet Mix #04',
    type: 'single',
    youtubeUrl: 'https://youtu.be/YVGms99zbZM',
  },
];

export const sfxPacks: Pack[] = [
  {
    id: 'cinematic-textures',
    title: 'Cinematic Textures',
    price: '25.00€',
    isFree: false,
    badge: 'Premium',
    icon: '📦',
    description: 'Un pack complet de textures atmosphériques pour vos productions visuelles. Haute qualité, 24-bit WAV, prêt pour l\'industrie.',
    sampleCount: '50+ Samples',
  },
  {
    id: 'analog-hits',
    title: 'Analog Hits',
    price: 'Gratuit',
    isFree: true,
    badge: 'Gratuit',
    icon: '📼',
    description: 'Une sélection de percussions analogiques enregistrées sur bandes. Sons authentiques et chaleureux.',
    sampleCount: '20+ One-shots',
  },
  {
    id: 'falaw-signature',
    title: 'Falaw Signature',
    price: '15.00€',
    isFree: false,
    badge: 'Exclusif',
    icon: '⚡',
    description: 'Le pack signature de Falaw. Drums & FX exclusifs. Créé avec passion pour des productions uniques.',
    sampleCount: 'Vol. 1',
  },
];

export const navigationLinks = [
  { href: '#work', label: 'Sound Design' },
  { href: '#mix', label: 'Mix' },
  { href: '#packs', label: 'Packs' },
  { href: '#contact', label: 'Contact' },
];
