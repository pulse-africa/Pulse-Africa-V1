export const STUDIO_USERS = [
  { id: 'u1', name: 'Koffi Diallo', email: 'koffi@pulse.africa', role: 'Administrateur', status: 'Actif', joined: '24 oct. 2023' },
  { id: 'u2', name: 'Chioma Okafor', email: 'chioma@pulse.africa', role: 'Journaliste', status: 'Actif', joined: '22 oct. 2023' },
  { id: 'u3', name: 'Youssef Bennis', email: 'youssef@pulse.africa', role: 'Journaliste', status: 'Actif', joined: '18 oct. 2023' },
  { id: 'u4', name: 'Aminata Sow', email: 'aminata@reader.com', role: 'Lectrice', status: 'Actif', joined: '14 oct. 2023' },
  { id: 'u5', name: 'Moussa Kone', email: 'moussa@reader.com', role: 'Lecteur', status: 'Suspendu', joined: '09 oct. 2023' },
];

export const STUDIO_COMMENTS = [
  { id: 'c1', user: 'Aïcha N.', content: 'Une avancée importante pour les échanges entre nos pays.', article: 'Sommet de l’UA à Addis-Abeba', status: 'En attente', time: 'Il y a 8 min' },
  { id: 'c2', user: 'Moussa K.', content: 'Le sujet mérite un vrai débat citoyen.', article: 'La Naira face au dollar', status: 'Approuvé', time: 'Il y a 24 min' },
  { id: 'c3', user: 'Nadia T.', content: 'Merci pour cette analyse claire et documentée.', article: 'Les licornes africaines', status: 'En attente', time: 'Il y a 1 h' },
  { id: 'c4', user: 'Reader_237', content: 'Ce commentaire contient un lien suspect.', article: 'La CAN 2025', status: 'Signalé', time: 'Il y a 2 h' },
];

export const STUDIO_REPORTS = [
  { id: 'r1', type: 'Commentaire', subject: 'La CAN 2025 : le Maroc favori', reason: 'Contenu hors sujet', reporter: 'A. N.', status: 'En attente' },
  { id: 'r2', type: 'Vidéo', subject: 'Mobilité électrique à Nairobi', reason: 'Droits d’auteur', reporter: 'Automatique', status: 'En attente' },
  { id: 'r3', type: 'Compte', subject: 'Reader_237', reason: 'Comportement abusif', reporter: 'M. K.', status: 'Traité' },
];

export const STUDIO_ANALYTICS = [
  { name: '01', visitors: 4200, views: 6800 },
  { name: '05', visitors: 5100, views: 8200 },
  { name: '10', visitors: 7300, views: 10400 },
  { name: '15', visitors: 6900, views: 9800 },
  { name: '20', visitors: 9200, views: 13700 },
  { name: '24', visitors: 11400, views: 16800 },
];

export const STUDIO_TRAFFIC_SOURCES = [
  { label: 'Recherche organique', value: 42 },
  { label: 'Réseaux sociaux', value: 28 },
  { label: 'Accès direct', value: 19 },
  { label: 'Newsletter', value: 11 },
];