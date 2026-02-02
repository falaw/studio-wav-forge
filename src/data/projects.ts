import lplmCover from '@/assets/LPLM.webp';
import rockstarCover from '@/assets/rockstar.webp';
import jojoCover from '@/assets/JOJO.webp';
import packzieuCover from '@/assets/packzieu-cover.jpg';
import analogHitsCover from '@/assets/analog-hits-cover.jpg';
import falawSignatureCover from '@/assets/falaw-signature-cover.jpg';

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
  artist: string;
  type: 'single' | 'playlist' | 'album';
  youtubeUrl: string;
  thumbnail: string;
}

export interface Sample {
  id: string;
  name: string;
  url: string;
}

export interface Pack {
  id: string;
  title: string;
  price: string;
  isFree: boolean;
  badge: string;
  icon?: string;
  coverImage?: string;
  description: string;
  sampleCount: string;
  audioPreviewUrl?: string;
  downloadUrl?: string;
  samples?: Sample[];
  locked?: boolean;
}

export const soundDesignProjects: Project[] = [
  {
    id: 'project-01',
    title: '2Pit feat Evil P - ICE O LATOR',
    director: 'REC709VISUEL',
    youtubeUrl: 'https://youtu.be/Ov70T2sRrFw',
    thumbnail: 'https://img.youtube.com/vi/Ov70T2sRrFw/maxresdefault.jpg',
  },
  {
    id: 'project-02',
    title: 'KITKVT - 4 saisons',
    director: 'MassimoVisual',
    youtubeUrl: 'https://youtu.be/fKvJDVlzuOE',
    thumbnail: 'https://img.youtube.com/vi/fKvJDVlzuOE/maxresdefault.jpg',
  },
  {
    id: 'project-03',
    title: 'La Mano 1.9 - Célibataire',
    director: 'Harris Kaci',
    youtubeUrl: 'https://youtu.be/_xuNmoJEoIM',
    thumbnail: 'https://img.youtube.com/vi/_xuNmoJEoIM/maxresdefault.jpg',
  },
  {
    id: 'project-04',
    title: 'YORSSY - CHERRY WOOD',
    director: 'REC709VISUEL',
    youtubeUrl: 'https://youtu.be/Ch1qGpWWZ5Q',
    thumbnail: 'https://img.youtube.com/vi/Ch1qGpWWZ5Q/maxresdefault.jpg',
  },
  {
    id: 'project-05',
    title: 'Anyme - Shamballa feat. Shaydee\'s',
    director: 'REC709VISUEL',
    youtubeUrl: 'https://youtu.be/Uhmg30gpTiQ',
    thumbnail: 'https://img.youtube.com/vi/Uhmg30gpTiQ/maxresdefault.jpg',
  },
  {
    id: 'project-06',
    title: 'So La Zone - Parka ft. Alonzo',
    director: 'MassimoVisual',
    youtubeUrl: 'https://youtu.be/yua5F80KcPw',
    thumbnail: 'https://img.youtube.com/vi/yua5F80KcPw/maxresdefault.jpg',
  },
];

export const mixProjects: MixProject[] = [
  {
    id: 'mix-01',
    title: 'FAFREDDO FREESTYLE',
    artist: 'Calmé Zuu',
    type: 'single',
    youtubeUrl: 'https://youtu.be/VzU5r5hJ_cY',
    thumbnail: 'https://img.youtube.com/vi/VzU5r5hJ_cY/maxresdefault.jpg',
  },
  {
    id: 'mix-02',
    title: 'LPLM',
    artist: 'Calmé Zuu',
    type: 'playlist',
    youtubeUrl: 'https://youtube.com/playlist?list=OLAK5uy_lxmFJ_7JBZfh7glNerZcmEzpcA8mnqCcU',
    thumbnail: lplmCover,
  },
  {
    id: 'mix-03',
    title: 'ROCKSTAR',
    artist: 'Alamelooo',
    type: 'single',
    youtubeUrl: 'https://youtu.be/rzwMJ3JBP3M',
    thumbnail: rockstarCover,
  },
  {
    id: 'mix-04',
    title: 'JOJO',
    artist: 'Alamelooo',
    type: 'single',
    youtubeUrl: 'https://youtu.be/YVGms99zbZM',
    thumbnail: jojoCover,
  },
];

export const packzieuSamples: Sample[] = [
  { id: 'sample-1', name: 'Flash Elec 2', url: '/sounds/samples/FlashElec2_Zieu.wav' },
  { id: 'sample-2', name: 'Flash Texture Insect', url: '/sounds/samples/FlashTextureInsect_Zieu.wav' },
  { id: 'sample-3', name: 'Paper 07', url: '/sounds/samples/Paper07_Zieu.wav' },
  { id: 'sample-4', name: 'Texture Bubbles', url: '/sounds/samples/TextureBubbles_Zieu.wav' },
  { id: 'sample-5', name: 'Riser Short', url: '/sounds/samples/RiserShort_Zieu.wav' },
];

export const sfxPacks: Pack[] = [
  {
    id: 'packzieu',
    title: 'PACKZIEU',
    price: 'GRATUIT',
    isFree: true,
    badge: 'GRATUIT',
    coverImage: packzieuCover,
    description: 'PACKZIEU est un pack contenant des SFX conçu pour le réalisateur ZieuFilm notamment pour ses dernières pub.',
    sampleCount: '50+ Samples',
    downloadUrl: '/downloads/PACKZIEU.rar',
    samples: packzieuSamples,
  },
  {
    id: 'analog-hits',
    title: 'Analog Hits',
    price: 'Gratuit',
    isFree: true,
    badge: 'Gratuit',
    coverImage: analogHitsCover,
    description: 'Une sélection de percussions analogiques enregistrées sur bandes. Sons authentiques et chaleureux.',
    sampleCount: '20+ One-shots',
    locked: true,
  },
  {
    id: 'falaw-signature',
    title: 'Falaw Signature',
    price: '15.00€',
    isFree: false,
    badge: 'Exclusif',
    coverImage: falawSignatureCover,
    description: 'Le pack signature de Falaw. Drums & FX exclusifs. Créé avec passion pour des productions uniques.',
    sampleCount: 'Vol. 1',
    locked: true,
  },
];

export const navigationLinks = [
  { href: '#work', label: 'Sound Design' },
  { href: '#mix', label: 'Mix' },
  { href: '#packs', label: 'Packs' },
  { href: '#contact', label: 'Contact' },
];
