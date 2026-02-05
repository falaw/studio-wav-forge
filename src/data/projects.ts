import lplmCover from '@/assets/LPLM.webp';
import rockstarCover from '@/assets/rockstar.webp';
import jojoCover from '@/assets/JOJO.webp';
import packzieuCover from '@/assets/packzieu-cover.jpg';
import analogHitsCover from '@/assets/analog-hits-cover.jpg';
import falawSignatureCover from '@/assets/falaw-signature-cover.jpg';
import outabDifferentCover from '@/assets/outab-different.webp';
import instagramReelCover from '@/assets/instagram-reel-cover.jpg';
import psgCover from '@/assets/psg-cover.png';
import morpheus83RecitCover from '@/assets/morpheus-83recit.jpg';
import toraLostDoveCover from '@/assets/tora-lost-dove.jpg';
import toraShineCover from '@/assets/tora-shine.jpg';
import morpheusEtincelleCover from '@/assets/morpheus-etincelle.jpg';

export interface Project {
  id: string;
  title: string;
  director: string;
  youtubeUrl?: string;
  externalUrl?: string; // Pour les liens non-YouTube (Instagram, etc.)
  thumbnail?: string;
}

export interface MixProject {
  id: string;
  title: string;
  artist: string;
  type: 'single' | 'playlist' | 'album';
  youtubeUrl: string;
  thumbnail: string;
  date: string; // Format: YYYY-MM-DD for sorting
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
    id: 'project-new-01',
    title: 'REC 709 - SHOWREEL 2025',
    director: 'REC709VISUEL',
    youtubeUrl: 'https://youtu.be/OdyXZ5kS_z0',
    thumbnail: 'https://img.youtube.com/vi/OdyXZ5kS_z0/maxresdefault.jpg',
  },
  {
    id: 'project-new-02',
    title: 'PSG - Réédition Du Maillot 1975',
    director: '',
    externalUrl: 'https://www.instagram.com/reel/DKgbJ_Yhz1c/',
    thumbnail: psgCover,
  },
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

const unsortedMixProjects: MixProject[] = [
  {
    id: 'mix-01',
    title: 'FAFREDDO FREESTYLE',
    artist: 'Calmé Zuu',
    type: 'single',
    youtubeUrl: 'https://youtu.be/VzU5r5hJ_cY',
    thumbnail: 'https://img.youtube.com/vi/VzU5r5hJ_cY/maxresdefault.jpg',
    date: '2024-01-01',
  },
  {
    id: 'mix-02',
    title: 'LPLM',
    artist: 'Calmé Zuu',
    type: 'playlist',
    youtubeUrl: 'https://youtube.com/playlist?list=OLAK5uy_lxmFJ_7JBZfh7glNerZcmEzpcA8mnqCcU',
    thumbnail: lplmCover,
    date: '2024-02-01',
  },
  {
    id: 'mix-03',
    title: 'ROCKSTAR',
    artist: 'Alamelooo',
    type: 'single',
    youtubeUrl: 'https://youtu.be/rzwMJ3JBP3M',
    thumbnail: rockstarCover,
    date: '2024-03-01',
  },
  {
    id: 'mix-04',
    title: 'JOJO',
    artist: 'Alamelooo',
    type: 'single',
    youtubeUrl: 'https://youtu.be/YVGms99zbZM',
    thumbnail: jojoCover,
    date: '2024-04-01',
  },
  {
    id: 'mix-05',
    title: 'Chut',
    artist: 'Outab',
    type: 'single',
    youtubeUrl: 'https://youtu.be/vmPZSaj4Ids',
    thumbnail: 'https://img.youtube.com/vi/vmPZSaj4Ids/maxresdefault.jpg',
    date: '2025-02-20',
  },
  {
    id: 'mix-06',
    title: 'Est-ce que demain il fera beau ?',
    artist: 'Outab',
    type: 'single',
    youtubeUrl: 'https://youtu.be/RXSraJ_y4j4',
    thumbnail: 'https://img.youtube.com/vi/RXSraJ_y4j4/maxresdefault.jpg',
    date: '2025-03-13',
  },
  {
    id: 'mix-07',
    title: 'Chaque fois',
    artist: 'Outab',
    type: 'single',
    youtubeUrl: 'https://youtu.be/fO1X9wrNaqs',
    thumbnail: 'https://img.youtube.com/vi/fO1X9wrNaqs/maxresdefault.jpg',
    date: '2025-04-04',
  },
  {
    id: 'mix-08',
    title: 'Différent',
    artist: 'Outab',
    type: 'single',
    youtubeUrl: 'https://youtu.be/VqqMK93SnCA',
    thumbnail: outabDifferentCover,
    date: '2025-05-20',
  },
  {
    id: 'mix-09',
    title: '83 RÉCIT',
    artist: 'MORPHEUS',
    type: 'single',
    youtubeUrl: 'https://youtu.be/oE7_rSe_Y2E',
    thumbnail: morpheus83RecitCover,
    date: '2025-06-01',
  },
  {
    id: 'mix-10',
    title: 'LOST DOVE',
    artist: 'Tora Meishi',
    type: 'single',
    youtubeUrl: 'https://youtu.be/qkJmEvtBKZo',
    thumbnail: toraLostDoveCover,
    date: '2025-06-15',
  },
  {
    id: 'mix-11',
    title: 'Shine',
    artist: 'Tora Meishi',
    type: 'single',
    youtubeUrl: 'https://youtu.be/Lz3QGWLbfzI',
    thumbnail: toraShineCover,
    date: '2025-07-01',
  },
  {
    id: 'mix-12',
    title: 'ETINCELLE',
    artist: 'MORPHEUS',
    type: 'single',
    youtubeUrl: 'https://youtu.be/TLTrb_eo1x4',
    thumbnail: morpheusEtincelleCover,
    date: '2025-07-15',
  },
];

// Tri personnalisé : FAFREDDO FREESTYLE en premier, puis non-Outab (par date), puis Outab en bas (par date)
export const mixProjects: MixProject[] = [...unsortedMixProjects].sort((a, b) => {
  // FAFREDDO FREESTYLE toujours en premier
  if (a.title === 'FAFREDDO FREESTYLE') return -1;
  if (b.title === 'FAFREDDO FREESTYLE') return 1;
  
  const aIsOutab = a.artist.toLowerCase() === 'outab';
  const bIsOutab = b.artist.toLowerCase() === 'outab';
  
  // Si un seul des deux est Outab, le non-Outab passe en premier
  if (aIsOutab && !bIsOutab) return 1;
  if (!aIsOutab && bIsOutab) return -1;
  
  // Sinon, tri par date décroissante dans chaque groupe
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export const packzieuSamples: Sample[] = [
  { id: 'sample-1', name: 'Flash Pencil', url: '/sounds/samples/FlashPencil_Zieu.wav' },
  { id: 'sample-2', name: 'Impact Cinematic', url: '/sounds/samples/ImpactCinematic_Zieu.wav' },
  { id: 'sample-3', name: 'Paper Texture', url: '/sounds/samples/PaperTexture_Zieu.wav' },
  { id: 'sample-4', name: 'Cinematic Riser', url: '/sounds/samples/CinematicRiser_Zieu.wav' },
  { id: 'sample-5', name: 'Bubble Texture', url: '/sounds/samples/BubbleTexture_Zieu.wav' },
  { id: 'sample-6', name: 'Whoosh Low', url: '/sounds/samples/WhooshLow_Zieu.wav' },
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
    downloadUrl: 'https://www.dropbox.com/scl/fo/dyzavbdytgcr3ckcs5va6/ACgbw9de7X0DUD5Jg2rBvvI?rlkey=zgnb2ydstmwh6audgti49yh6b&st=vfc50lg0&dl=1',
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
