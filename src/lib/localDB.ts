//src\lib\localDB.ts

import { IUtilisateur, IEvenement, IInvitation, IPrestataire, ITache, IDepense } from "./interfaces/entites"; 

// Un seul utilisateur
export const utilisateurs: IUtilisateur[] = [
  {
    id: '1',
    idsEvenements: ['1', '2'], // L'utilisateur participe à deux événements
    nom: 'Alice Dupont',
    email: 'alice@example.com',
    motDePasse: 'password123',
    telephone: '0102030405',
    role: 1, // Organisateur
  },
];

// Deux événements différents
export const evenements: IEvenement[] = [
  {
    id: '1',
    idUtilisateur: '1', // Alice est l'organisateur
    nom: 'Fête d\'anniversaire',
    type: 'Fête',
    date: '2024-12-31T23:59:59.999Z', // Date au format ISO
    lieu: 'Salle des fêtes',
    budget: 1000,
  },
  {
    id: '2',
    idUtilisateur: '1', // Alice est l'organisateur
    nom: 'Mariage de Bob',
    type: 'Fête',
    date: '2025-06-15T00:00:00.000Z', // Date au format ISO
    lieu: 'Château de Versailles',
    budget: 5000,
  },
];



  
export const invitations: IInvitation[] = [
    {
      id: '1',
      idEvenement: '1', // Événement 1
      nom: 'Jean Dupont',
      nombrePersonnes: 2,
      nombreConfirmations: 1,
      nombreRejets: 0,
      nombreDemandesEnAttente: 0,
      statut: 1, // Ouvert
    },
    {
      id: '2',
      idEvenement: '1', // Événement 1
      nom: 'Marie Martin',
      nombrePersonnes: 'Aucune limite',
      nombreConfirmations: 0,
      nombreRejets: 1,
      nombreDemandesEnAttente: 1,
      statut: 3, // Annulé
    },
    {
      id: '3',
      idEvenement: '1', // Événement 1
      nom: 'Paul Bernard',
      nombrePersonnes: 3,
      nombreConfirmations: 1,
      nombreRejets: 0,
      nombreDemandesEnAttente: 0,
      statut: 1, // Ouvert
    },
    {
      id: '4',
      idEvenement: '2', // Événement 2
      nom: 'Sophie Lemoine',
      nombrePersonnes: 1,
      nombreConfirmations: 1,
      nombreRejets: 0,
      nombreDemandesEnAttente: 0,
      statut: 2, // Terminé
    },
    {
      id: '5',
      idEvenement: '2', // Événement 2
      nom: 'Julien Lefevre',
      nombrePersonnes: 5,
      nombreConfirmations: 1,
      nombreRejets: 0,
      nombreDemandesEnAttente: 0,
      statut: 1, // Ouvert
    },
    {
      id: '6',
      idEvenement: '2', // Événement 2
      nom: 'Claire Moreau',
      nombrePersonnes: 'Aucune limite',
      nombreConfirmations: 0,
      nombreRejets: 1,
      nombreDemandesEnAttente: 2,
      statut: 3, // Annulé
    },
    {
      id: '7',
      idEvenement: '3', // Événement 3
      nom: 'Alice Dupont',
      nombrePersonnes: 4,
      nombreConfirmations: 2,
      nombreRejets: 0,
      nombreDemandesEnAttente: 0,
      statut: 1, // Ouvert
    },
    {
      id: '8',
      idEvenement: '3', // Événement 3
      nom: 'Marc Durand',
      nombrePersonnes: 2,
      nombreConfirmations: 1,
      nombreRejets: 1,
      nombreDemandesEnAttente: 0,
      statut: 2, // Terminé
    },
    {
      id: '9',
      idEvenement: '3', // Événement 3
      nom: 'Lucie Perrot',
      nombrePersonnes: 6,
      nombreConfirmations: 1,
      nombreRejets: 0,
      nombreDemandesEnAttente: 1,
      statut: 1, // Ouvert
    },
    {
      id: '10',
      idEvenement: '3', // Événement 3
      nom: 'Pierre Bonnet',
      nombrePersonnes: 3,
      nombreConfirmations: 0,
      nombreRejets: 1,
      nombreDemandesEnAttente: 0,
      statut: 3, // Annulé
    },
  ];
  

// 10 prestataires différents
export const prestataires: IPrestataire[] = [
  {
    id: '1',
    nom: 'Traiteur Gourmet',
    type: 1, // Traiteur
    localisation: 'Paris',
    gammePrix: 'Moyenne',
    note: 4,
  },
  {
    id: '2',
    nom: 'DJ Party',
    type: 2, // DJ
    localisation: 'Lyon',
    gammePrix: 'Élevée',
    note: 5,
  },
  {
    id: '3',
    nom: 'Décorations Magnifiques',
    type: 3, // Décorateur
    localisation: 'Marseille',
    gammePrix: 'Basse',
    note: 3,
  },
  {
    id: '4',
    nom: 'Fleuriste en Fête',
    type: 3, // Décorateur
    localisation: 'Nice',
    gammePrix: 'Moyenne',
    note: 4,
  },
  {
    id: '5',
    nom: 'Photographe Studio',
    type: 4, // Autre
    localisation: 'Lille',
    gammePrix: 'Élevée',
    note: 5,
  },
  {
    id: '6',
    nom: 'Musique Live',
    type: 2, // DJ
    localisation: 'Bordeaux',
    gammePrix: 'Moyenne',
    note: 4,
  },
  {
    id: '7',
    nom: 'Traiteur Delice',
    type: 1, // Traiteur
    localisation: 'Paris',
    gammePrix: 'Basse',
    note: 3,
  },
  {
    id: '8',
    nom: 'Catering Deluxe',
    type: 1, // Traiteur
    localisation: 'Toulouse',
    gammePrix: 'Élevée',
    note: 5,
  },
  {
    id: '9',
    nom: 'DJ Vibes',
    type: 2, // DJ
    localisation: 'Nantes',
    gammePrix: 'Basse',
    note: 3,
  },
  {
    id: '10',
    nom: 'Art & Design Events',
    type: 3, // Décorateur
    localisation: 'Lyon',
    gammePrix: 'Moyenne',
    note: 4,
  },
];

// 10 tâches différentes
export const taches: ITache[] = [
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 1}`,
    idEvenement: '1', // Tâche liée à l'événement 1
    titre: `Tâche ${i + 1} pour l'événement 1`,
    description: `Description de la tâche ${i + 1}`,
    dateLimite: '2024-12-20T12:00:00.000Z', // Date limite au format ISO
    statut: 1 as 1 | 2 | 3, // À faire
    priorite: (i % 3 + 1) as 1 | 2 | 3, // Priorité varie entre 1 et 3
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 6}`,
    idEvenement: '2', // Tâche liée à l'événement 2
    titre: `Tâche ${i + 6} pour l'événement 2`,
    description: `Description de la tâche ${i + 6}`,
    dateLimite: '2025-06-01T12:00:00.000Z', // Date limite au format ISO
    statut: 2 as 1 | 2 | 3, // En cours
    priorite: (i % 3 + 1) as 1 | 2 | 3, // Priorité varie entre 1 et 3
  })),
];
// 10 dépenses différentes
export const depenses: IDepense[] = [
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 1}`,
    idEvenement: '1', // Dépense liée à l'événement 1
    nom: `Dépense ${i + 1}`,
    description: `Description de la dépense ${i + 1}`,
    montant: 100 * (i + 1),
    date: '2024-12-15T12:00:00.000Z', // Date de la dépense au format ISO
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 6}`,
    idEvenement: '2', // Dépense liée à l'événement 2
    nom: `Dépense ${i + 6}`,
    description: `Description de la dépense ${i + 6}`,
    montant: 100 * (i + 6),
    date: '2025-06-01T12:00:00.000Z', // Date de la dépense au format ISO
  })),
];
