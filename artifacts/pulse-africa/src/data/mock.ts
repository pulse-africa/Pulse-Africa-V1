export type Category = 'Politique' | 'Économie' | 'Sport' | 'Culture' | 'Tech' | 'Santé' | 'Environnement' | 'Monde';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: Category;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  imageUrl: string;
  isBreaking?: boolean;
  isTrending?: boolean;
  views: number;
  likes: number;
  commentsCount: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  category: Category;
  duration: string;
  views: number;
  thumbnailUrl: string;
  publishedAt: string;
  author: string;
}

export interface Show {
  id: string;
  title: string;
  host: string;
  schedule: string;
  nextEpisode: string;
  coverUrl: string;
  subscribers: number;
  isLive?: boolean;
}

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'sommet-ua-addis-abeba-libre-circulation',
    title: 'Le sommet de l\'UA à Addis-Abeba : accord historique sur la libre circulation',
    excerpt: 'Les dirigeants africains ont franchi une étape décisive ce mardi en signant un protocole visant à instaurer un passeport unique continental d\'ici 2030.',
    category: 'Politique',
    author: { name: 'Amadou Diallo', avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&auto=format&fit=crop&q=60' },
    publishedAt: '2023-10-24T08:00:00Z',
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop&q=80',
    isBreaking: true,
    views: 45200,
    likes: 1205,
    commentsCount: 342,
    content: `<p>Dans ce qui est déjà qualifié de tournant majeur pour l'intégration continentale, les 54 chefs d'État et de gouvernement réunis à Addis-Abeba ont ratifié l'accord sur la libre circulation des personnes et des biens. Ce traité ambitionne de démanteler les barrières douanières et migratoires qui freinent historiquement le commerce intra-africain.</p><p>Le président de la Commission de l'Union africaine a souligné que cet accord est "l'épine dorsale de la Zone de libre-échange continentale africaine (ZLECAf)". Les experts estiment que cette mesure pourrait augmenter le commerce intra-africain de plus de 50% au cours de la prochaine décennie.</p><h3>Des défis de mise en œuvre</h3><p>Malgré l'enthousiasme général, plusieurs pays ont exprimé des réserves quant à la sécurité de leurs frontières et aux implications économiques à court terme. Un comité de transition de 5 ans a été mis en place pour accompagner les États les plus vulnérables économiquement.</p>`
  },
  {
    id: '2',
    slug: 'nigeria-naira-chute-libre-reformes-tinubu',
    title: 'Nigeria : la Naira en chute libre face au dollar malgré les réformes Tinubu',
    excerpt: 'La monnaie nigériane a atteint un nouveau plus bas historique, remettant en question l\'efficacité des politiques monétaires de la nouvelle administration.',
    category: 'Économie',
    author: { name: 'Chioma Okafor', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&auto=format&fit=crop&q=60' },
    publishedAt: '2023-10-23T14:30:00Z',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1613274640161-007e6b0ba6c3?w=1200&auto=format&fit=crop&q=80',
    isTrending: true,
    views: 32100,
    likes: 850,
    commentsCount: 215,
  },
  {
    id: '3',
    slug: 'can-2025-maroc-favorite',
    title: 'CAN 2025 : Le Maroc favori après sa victoire écrasante face à l\'Égypte',
    excerpt: 'Les Lions de l\'Atlas ont démontré leur suprématie lors du match de préparation avec un score sans appel de 3-0.',
    category: 'Sport',
    author: { name: 'Youssef Bennis', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60' },
    publishedAt: '2023-10-24T09:15:00Z',
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1518605368461-1ee7c5320746?w=1200&auto=format&fit=crop&q=80',
    isTrending: true,
    views: 56000,
    likes: 3400,
    commentsCount: 521,
  },
  {
    id: '4',
    slug: 'startup-africaines-10-licornes',
    title: 'Startups africaines : les 10 licornes émergentes qui bousculent la Silicon Valley',
    excerpt: 'De la fintech à l\'agritech, panorama des entreprises technologiques africaines valorisées à plus d\'un milliard de dollars.',
    category: 'Tech',
    author: { name: 'Sarah Mensah', avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&auto=format&fit=crop&q=60' },
    publishedAt: '2023-10-22T11:00:00Z',
    readTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    views: 18400,
    likes: 920,
    commentsCount: 145,
  },
  {
    id: '5',
    slug: 'cote-ivoire-boom-cacao-biologique',
    title: 'Côte d\'Ivoire : boom du cacao biologique sur les marchés européens',
    excerpt: 'Face aux nouvelles réglementations environnementales, les coopératives ivoiriennes s\'adaptent et voient leurs exportations de cacao bio exploser.',
    category: 'Environnement',
    author: { name: 'Kouassi Konan', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=60' },
    publishedAt: '2023-10-24T06:45:00Z',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1606500414406-81643c74ebfb?w=1200&auto=format&fit=crop&q=80',
    views: 12300,
    likes: 450,
    commentsCount: 89,
  },
  {
    id: '6',
    slug: 'dakar-biennale-art-contemporain-2024',
    title: 'Dak\'Art 2024 : L\'avant-garde de l\'art contemporain africain',
    excerpt: 'La Biennale de Dakar ouvre ses portes avec une sélection audacieuse d\'artistes redéfinissant les récits post-coloniaux.',
    category: 'Culture',
    author: { name: 'Fatou Diop', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60' },
    publishedAt: '2023-10-21T10:20:00Z',
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=1200&auto=format&fit=crop&q=80',
    views: 15600,
    likes: 1100,
    commentsCount: 78,
  },
  {
    id: '7',
    slug: 'rwanda-sante-drones-livraison',
    title: 'Rwanda : Les drones médicaux sauvent des milliers de vies',
    excerpt: 'Le programme de livraison de sang et de vaccins par drone s\'étend à tout le pays, devenant un modèle mondial.',
    category: 'Santé',
    author: { name: 'Jean-Paul Mugisha', avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&auto=format&fit=crop&q=60' },
    publishedAt: '2023-10-24T12:00:00Z',
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1520121401995-928cd50d4e27?w=1200&auto=format&fit=crop&q=80',
    views: 22100,
    likes: 1800,
    commentsCount: 156,
  }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Dans les coulisses du nouveau port de Lamu au Kenya',
    description: 'Enquête exclusive sur le méga-projet d\'infrastructure qui redessine la côte est-africaine.',
    category: 'Économie',
    duration: '24:15',
    views: 145000,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558231464-67d7168d3744?w=800&auto=format&fit=crop&q=80',
    publishedAt: '2023-10-23T00:00:00Z',
    author: 'Pulse Investigation'
  },
  {
    id: 'v2',
    title: 'Amapiano : La déferlante musicale sud-africaine à la conquête du monde',
    description: 'Comment ce genre né dans les townships de Pretoria est devenu un phénomène mondial.',
    category: 'Culture',
    duration: '18:40',
    views: 320000,
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=800&auto=format&fit=crop&q=80',
    publishedAt: '2023-10-20T00:00:00Z',
    author: 'Pulse Music'
  },
  {
    id: 'v3',
    title: 'L\'essor de la mobilité électrique à Nairobi',
    description: 'Les startups kenyanes transforment les transports publics avec des motos et bus électriques.',
    category: 'Tech',
    duration: '12:05',
    views: 89000,
    thumbnailUrl: 'https://images.unsplash.com/photo-1549315488-82a1b1513ee6?w=800&auto=format&fit=crop&q=80',
    publishedAt: '2023-10-24T00:00:00Z',
    author: 'Pulse Tech'
  },
  {
    id: 'v4',
    title: 'Sommet sur le Climat : Les voix africaines exigent des actes',
    description: 'Résumé des déclarations fortes des leaders africains face à la crise climatique.',
    category: 'Environnement',
    duration: '08:30',
    views: 210000,
    thumbnailUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410cbda?w=800&auto=format&fit=crop&q=80',
    publishedAt: '2023-10-24T14:00:00Z',
    author: 'Pulse Actu'
  }
];

export const MOCK_SHOWS: Show[] = [
  {
    id: 's1',
    title: 'Le Débat Panafricain',
    host: 'Alain Foka',
    schedule: 'Tous les mardis à 20h00',
    nextEpisode: '2023-10-31T20:00:00Z',
    coverUrl: 'https://images.unsplash.com/photo-1587829741301-8c0ce720d6c1?w=800&auto=format&fit=crop&q=80',
    subscribers: 1250000,
    isLive: false
  },
  {
    id: 's2',
    title: 'Africa Tech Review',
    host: 'Rebecca Enonchong',
    schedule: 'Jeudi, 18h30',
    nextEpisode: '2023-10-26T18:30:00Z',
    coverUrl: 'https://images.unsplash.com/photo-1531297122539-5692f692f089?w=800&auto=format&fit=crop&q=80',
    subscribers: 450000,
    isLive: false
  },
  {
    id: 's3',
    title: 'Le Grand Journal d\'Afrique',
    host: 'Marie-Laure N\'Goran',
    schedule: 'Lundi au Vendredi, 19h00',
    nextEpisode: '2023-10-24T19:00:00Z',
    coverUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&auto=format&fit=crop&q=80',
    subscribers: 890000,
    isLive: true
  },
  {
    id: 's4',
    title: 'Génération Entreprendre',
    host: 'Vusi Thembekwayo',
    schedule: 'Dimanche, 11h00',
    nextEpisode: '2023-10-29T11:00:00Z',
    coverUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=800&auto=format&fit=crop&q=80',
    subscribers: 620000,
    isLive: false
  }
];

export const MOCK_TRENDING_HASHTAGS = [
  { tag: 'CAN2025', posts: 145000 },
  { tag: 'AfricaTech', posts: 89000 },
  { tag: 'ZLECAf', posts: 65000 },
  { tag: 'Naira', posts: 54000 },
  { tag: 'Dakar2024', posts: 42000 },
  { tag: 'Amapiano', posts: 120000 }
];
