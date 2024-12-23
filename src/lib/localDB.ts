//src\lib\localDB.ts

import {
  IUtilisateur,
  IEvenement,
  IInvitation,
  IPrestataire,
  ITache,
  IDepense,
} from './interfaces/entites';

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
    nom: "Fête d'anniversaire",
    type: 'Fête',
    date: '2024-12-31T23:59:59.999Z', // Date au format ISO
    lieu: 'Salle des fêtes',
    budget: 1000,
  },
  {
    id: '1',
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

    statut: 1,
    lien: '',
  },
  {
    id: '2',
    idEvenement: '1', // Événement 1
    nom: 'Marie Martin',
    nombrePersonnes: 'Aucune limite',
    nombreConfirmations: 0,
    nombreRejets: 1,

    statut: 3,
    lien: '',
  },
  {
    id: '3',
    idEvenement: '1', // Événement 1
    nom: 'Paul Bernard',
    nombrePersonnes: 3,
    nombreConfirmations: 1,
    nombreRejets: 0,

    statut: 1,
    lien: '',
  },
  {
    id: '4',
    idEvenement: '2', // Événement 2
    nom: 'Sophie Lemoine',
    nombrePersonnes: 1,
    nombreConfirmations: 1,
    nombreRejets: 0,

    statut: 2,
    lien: '',
  },
  {
    id: '5',
    idEvenement: '2', // Événement 2
    nom: 'Julien Lefevre',
    nombrePersonnes: 5,
    nombreConfirmations: 1,
    nombreRejets: 0,

    statut: 1,
    lien: '',
  },
  {
    id: '6',
    idEvenement: '2', // Événement 2
    nom: 'Claire Moreau',
    nombrePersonnes: 'Aucune limite',
    nombreConfirmations: 0,
    nombreRejets: 1,

    statut: 3,
    lien: '',
  },
  {
    id: '7',
    idEvenement: '3', // Événement 3
    nom: 'Alice Dupont',
    nombrePersonnes: 4,
    nombreConfirmations: 2,
    nombreRejets: 0,

    statut: 1,
    lien: '',
  },
  {
    id: '8',
    idEvenement: '3', // Événement 3
    nom: 'Marc Durand',
    nombrePersonnes: 2,
    nombreConfirmations: 1,
    nombreRejets: 1,

    statut: 2,
    lien: '',
  },
  {
    id: '9',
    idEvenement: '3', // Événement 3
    nom: 'Lucie Perrot',
    nombrePersonnes: 6,
    nombreConfirmations: 1,
    nombreRejets: 0,

    statut: 1,
    lien: '',
  },
  {
    id: '10',
    idEvenement: '3', // Événement 3
    nom: 'Pierre Bonnet',
    nombrePersonnes: 3,
    nombreConfirmations: 0,
    nombreRejets: 1,

    statut: 3,
    lien: '',
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

export const anniversaireTaches: ITache[] = [
  {
    id: '1',
    idEvenement: '1',
    titre: 'Choisir une date et une heure',
    description: "Déterminer la date et l'heure de la fête.",
    dateLimite: '2024-12-30',
    terminee: false,
    priorite: 3,
  },
  {
    id: '2',
    idEvenement: '1',
    titre: 'Définir un budget',
    description: 'Établir un budget pour les dépenses de la fête.',
    dateLimite: '2024-12-01',
    terminee: false,
    priorite: 2,
  },
  {
    id: '3',
    idEvenement: '1',
    titre: "Établir une liste d'invités",
    description: 'Lister toutes les personnes à inviter.',
    dateLimite: '2024-12-05',
    terminee: false,
    priorite: 3,
  },
  {
    id: '4',
    idEvenement: '1',
    titre: 'Sélectionner un thème',
    description: 'Choisir un thème pour la fête.',
    dateLimite: '2024-12-05',
    terminee: false,
    priorite: 2,
  },
  {
    id: '5',
    idEvenement: '1',
    titre: 'Envoyer les invitations',
    description:
      'Envoyer des invitations papier, électroniques ou via les réseaux sociaux.',
    dateLimite: '2024-12-10',
    terminee: false,
    priorite: 3,
  },
  {
    id: '6',
    idEvenement: '1',
    titre: 'Planifier le menu',
    description: 'Décider des plats et des boissons à servir.',
    dateLimite: '2024-12-15',
    terminee: false,
    priorite: 3,
  },
  {
    id: '7',
    idEvenement: '1',
    titre: 'Organiser les décorations',
    description: 'Acheter ou faire des décorations selon le thème.',
    dateLimite: '2024-12-20',
    terminee: false,
    priorite: 2,
  },
  {
    id: '8',
    idEvenement: '1',
    titre: 'Prévoir les activités',
    description: "Planifier des jeux, de la musique, ou d'autres animations.",
    dateLimite: '2024-12-20',
    terminee: false,
    priorite: 2,
  },
  {
    id: '9',
    idEvenement: '1',
    titre: 'Commander le gâteau',
    description: "Commander le gâteau d'anniversaire à l'avance.",
    dateLimite: '2024-12-18',
    terminee: false,
    priorite: 3,
  },
  {
    id: '10',
    idEvenement: '1',
    titre: 'Prévoir les cadeaux et les surprises',
    description: 'Organiser des cadeaux ou des activités surprises.',
    dateLimite: '2024-12-18',
    terminee: false,
    priorite: 2,
  },
  {
    id: '11',
    idEvenement: '1',
    titre: 'Confirmer les RSVPs',
    description: "S'assurer du nombre de personnes présentes.",
    dateLimite: '2024-12-25',
    terminee: false,
    priorite: 3,
  },
  {
    id: '12',
    idEvenement: '1',
    titre: 'Planifier la logistique',
    description:
      "Prévoir les sièges, les tables et l'espace pour tout le monde.",
    dateLimite: '2024-12-20',
    terminee: false,
    priorite: 2,
  },
];

export const depenses: IDepense[] = [
  {
    id: '1',
    idEvenement: '1',
    nom: 'Location de salle',
    description: 'Location d\'une salle de fête pour l\'anniversaire.',
    montant: 500.00,
    date: '2023-12-01',
    terminee: false
  },
  {
    id: '2',
    idEvenement: '1',
    nom: 'Décoration',
    description: 'Ballons, banderoles, et autres décorations pour la fête.',
    montant: 150.00,
    date: '2023-12-02',
    terminee: false
  },
  {
    id: '3',
    idEvenement: '1',
    nom: 'Nourriture et boissons',
    description: 'Catering pour les invités, incluant boissons et repas.',
    montant: 600.00,
    date: '2023-12-03',
    terminee: false
  },
  {
    id: '4',
    idEvenement: '1',
    nom: 'Gâteau d\'anniversaire',
    description: 'Gâteau personnalisé pour l\'anniversaire.',
    montant: 100.00,
    date: '2023-12-04',
    terminee: false
  },
  {
    id: '5',
    idEvenement: '1',
    nom: 'Divertissement',
    description: 'DJ et matériel de sonorisation pour la musique.',
    montant: 300.00,
    date: '2023-12-05',
    terminee: false
  },
  {
    id: '6',
    idEvenement: '1',
    nom: 'Invitations',
    description: 'Cartes d\'invitation imprimées et envoyées aux invités.',
    montant: 50.00,
    date: '2023-12-06',
    terminee: false
  },
];

