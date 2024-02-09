export const navigations = [
  {
    name: 'Statistique',
    icon: 'trending_up',
    path: '/accueil'
  },
  { label: 'Gestion', type: 'label' },
  { name: 'Commission', path: '/comission', icon: 'account_balance' },
  { name: 'Categorie', path: '/categories', icon: 'dashboard' },
  {
    name: 'Marque',
    icon: 'directions_car',
    children: [
      { name: 'Ajout marque', iconText: 'SI', path: '/marques' },
      { name: 'Ajout model', iconText: 'SU', path: '/models' },
      { name: 'Liste model / marque', iconText: 'FP', path: '/listesmodels' }
    ]
  },
  {
    name: 'Utilisateurs',
    icon: 'people',
    path: '/utilisateur'
  },
  { name: 'Carburant', path: '/carburants', icon: 'local_gas_station' },

  {
    name: 'Public',
    icon: 'public',
    children: [{ name: 'Annonce', iconText: 'A', path: '/public/annonces' }]
  }
];
