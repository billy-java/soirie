//src\lib\localDB.ts

import { initialiserInvitation } from './functions/initialiseEntities';
import {
  IUtilisateur,
  IEvenement,
  IPrestataire,
  ITache,
  IDepense,
  IFaq,
} from './interfaces/entites';

// Un seul utilisateur
export const utilisateurs: IUtilisateur[] = [
  {
    id: 'USER-M59JK763-1578',
    idsEvenements: ['1', '2'], // L'utilisateur participe à deux événements
    nom: 'Alice TEST',
    email: 'test@test.com',
    motDePasse: 'test@test.com',
    telephone: '0102030405',
    role: 1, // Organisateur
  },
];

// Deux événements différents
export const evenements: IEvenement[] = [
  {
    id: 'EV-M59JFWYK-5140',
    idUtilisateur: '1', // Alice est l'organisateur
    nom: "Fête d'anniversaire",
    type: 'Anniversaire',
    date: {
      jour: 26,
      mois: 12,
      annee: 2024,
      heure: 18,
      minute: 31,
    }, // Date au format ISO
    lieu: 'Salle des fêtes',
    budget: 1000,
    invitation: initialiserInvitation('EV-M59JFWYK-5140'),
  },
  {
    id: 'EV-M59JGO9P-3520',
    idUtilisateur: '1', // Alice est l'organisateur
    nom: 'Mariage de Bob',
    type: 'Anniversaire',
    date: {
      jour: 31,
      mois: 12,
      annee: 2024,
    }, // Date au format ISO
    lieu: 'Château de Versailles',
    budget: 5000,
    invitation: initialiserInvitation('EV-M59JGO9P-3520'),
  },
];

export const prestataires: IPrestataire[] = [
  {
    id: '1',
    nom: 'Traiteur Gourmet',
    type: 1, // Traiteur
    localisation: 'Paris',
    gammePrix: 'Moyenne',
    note: 4,
    telephone: '0600000001',
    email: 'contact@traiteurgourmet.fr',
  },
  {
    id: '2',
    nom: 'DJ Party',
    type: 2, // DJ
    localisation: 'Lyon',
    gammePrix: 'Élevée',
    note: 5,
    telephone: '0600000002',
    email: 'booking@djparty.fr',
  },
  {
    id: '3',
    nom: 'Décorations Magnifiques',
    type: 3, // Décorateur
    localisation: 'Marseille',
    gammePrix: 'Basse',
    note: 3,
    telephone: '0600000003',
    email: 'info@decomagnifiques.fr',
  },
  {
    id: '4',
    nom: 'Fleuriste en Fête',
    type: 3, // Décorateur
    localisation: 'Nice',
    gammePrix: 'Moyenne',
    note: 4,
    telephone: '0600000004',
    email: 'contact@fleuristeenfete.fr',
  },
  {
    id: '5',
    nom: 'Photographe Studio',
    type: 4, // Autre
    localisation: 'Lille',
    gammePrix: 'Élevée',
    note: 5,
    telephone: '0600000005',
    email: 'studio@photographe.fr',
  },
  {
    id: '6',
    nom: 'Musique Live',
    type: 2, // DJ
    localisation: 'Bordeaux',
    gammePrix: 'Moyenne',
    note: 4,
    telephone: '0600000006',
    email: 'booking@musiquelive.fr',
  },
  {
    id: '7',
    nom: 'Traiteur Delice',
    type: 1, // Traiteur
    localisation: 'Paris',
    gammePrix: 'Basse',
    note: 3,
    telephone: '0600000007',
    email: 'contact@traiteurdelice.fr',
  },
  {
    id: '8',
    nom: 'Catering Deluxe',
    type: 1, // Traiteur
    localisation: 'Toulouse',
    gammePrix: 'Élevée',
    note: 5,
    telephone: '0600000008',
    email: 'info@cateringdeluxe.fr',
  },
  {
    id: '9',
    nom: 'DJ Vibes',
    type: 2, // DJ
    localisation: 'Nantes',
    gammePrix: 'Basse',
    note: 3,
    telephone: '0600000009',
    email: 'vibes@djvibes.fr',
  },
  {
    id: '10',
    nom: 'Art & Design Events',
    type: 3, // Décorateur
    localisation: 'Lyon',
    gammePrix: 'Moyenne',
    note: 4,
    telephone: '0600000010',
    email: 'info@artdesign.fr',
  },
];

export const anniversaireTaches: ITache[] = [
  {
    id: '1',
    idEvenement: '1',
    titre: 'Planification générale',
    description:
      'Choisir une date et une heure, définir un budget et sélectionner un thème pour la fête.',
    dateLimite: { jour: 30, mois: 12, annee: 2024 },
    terminee: false,
    priorite: 3,
  },
  {
    id: '2',
    idEvenement: '1',
    titre: 'Invitations',
    description:
      "Établir une liste d'invités, envoyer les invitations et confirmer les RSVPs.",
    dateLimite: { jour: 25, mois: 12, annee: 2024 },
    terminee: false,
    priorite: 2,
  },
  {
    id: '3',
    idEvenement: '1',
    titre: 'Menu et Gâteau',
    description:
      'Planifier le menu, commander le gâteau et prévoir les boissons.',
    dateLimite: { jour: 18, mois: 12, annee: 2024 },
    terminee: false,
    priorite: 3,
  },
  {
    id: '4',
    idEvenement: '1',
    titre: 'Décorations et Activités',
    description:
      'Organiser les décorations, prévoir les activités, et prévoir les cadeaux et les surprises.',
    dateLimite: { jour: 20, mois: 12, annee: 2024 },
    terminee: false,
    priorite: 2,
  },
  {
    id: '5',
    idEvenement: '1',
    titre: 'Logistique',
    description:
      "Planifier la logistique, prévoir les sièges, les tables et l'espace pour tout le monde.",
    dateLimite: { jour: 20, mois: 12, annee: 2024 },
    terminee: false,
    priorite: 2,
  },
];

export const depenses: IDepense[] = [
  {
    id: '1',
    idEvenement: '1',
    nom: 'Location de salle',
    description: "Location d'une salle de fête pour l'anniversaire.",
    montant: 0.0,
    date: { jour: 1, mois: 12, annee: 2023 },
    terminee: false,
  },
  {
    id: '2',
    idEvenement: '1',
    nom: 'Décoration',
    description: 'Ballons, banderoles, et autres décorations pour la fête.',
    montant: 0.0,
    date: { jour: 2, mois: 12, annee: 2023 },
    terminee: false,
  },
  {
    id: '3',
    idEvenement: '1',
    nom: 'Nourriture',
    description: 'Catering pour les invités, incluant boissons et repas.',
    montant: 150.0,
    date: { jour: 3, mois: 12, annee: 2023 },
    terminee: false,
  },
  {
    id: '4',
    idEvenement: '1',
    nom: 'Boissons',
    description: 'Catering pour les invités, incluant boissons et repas.',
    montant: 200.0,
    date: { jour: 3, mois: 12, annee: 2023 },
    terminee: false,
  },
  {
    id: '5',
    idEvenement: '1',
    nom: "Gâteau d'anniversaire",
    description: "Gâteau personnalisé pour l'anniversaire.",
    montant: 32.0,
    date: { jour: 4, mois: 12, annee: 2023 },
    terminee: false,
  },
  {
    id: '6',
    idEvenement: '1',
    nom: 'Divertissement',
    description: 'DJ et matériel de sonorisation pour la musique.',
    montant: 0.0,
    date: { jour: 5, mois: 12, annee: 2023 },
    terminee: false,
  },
  {
    id: '7',
    idEvenement: '1',
    nom: 'Invitations',
    description: "Cartes d'invitation imprimées et envoyées aux invités.",
    montant: 0.0,
    date: { jour: 6, mois: 12, annee: 2023 },
    terminee: false,
  },
];

export const faqData: IFaq[] = [
  // Catégorie "Utilisation"
  {
    id: '1',
    question: 'Comment créer un événement ?',
    reponse:
      'Pour créer un événement, cliquez sur "Créer un événement" dans le tableau de bord.',
    categorie: 'Utilisation',
    estPopulaire: true,
  },
  {
    id: '5',
    question: 'Puis-je personnaliser le design de mon événement ?',
    reponse:
      'Oui, vous pouvez personnaliser l’apparence de votre événement en choisissant un thème, une couleur et une image de couverture.',
    categorie: 'Utilisation',
    estPopulaire: false,
  },
  {
    id: '6',
    question: 'Comment ajouter un lieu à mon événement ?',
    reponse:
      'Dans la page de création de l’événement, vous pouvez ajouter un lieu en saisissant l’adresse ou en choisissant un lieu sur la carte intégrée.',
    categorie: 'Utilisation',
    estPopulaire: false,
  },

  // Catégorie "Invitations"
  {
    id: '2',
    question: 'Puis-je inviter plusieurs personnes à un événement ?',
    reponse:
      'Oui, vous pouvez inviter autant de personnes que nécessaire en partageant le lien d’invitation.',
    categorie: 'Invitations',
    estPopulaire: true,
  },
  {
    id: '7',
    question: 'Comment envoyer des invitations par email ?',
    reponse:
      'Pour envoyer des invitations par email, allez dans la section "Invitations" de l’événement et ajoutez les adresses des invités.',
    categorie: 'Invitations',
    estPopulaire: false,
  },
  {
    id: '8',
    question: 'Puis-je personnaliser le message d’invitation ?',
    reponse:
      'Oui, vous pouvez personnaliser le message envoyé avec chaque invitation en modifiant le modèle dans la section "Paramètres des invitations".',
    categorie: 'Invitations',
    estPopulaire: false,
  },

  // Catégorie "Compte"
  {
    id: '3',
    question: 'Comment modifier mes informations personnelles ?',
    reponse:
      'Vous pouvez modifier vos informations dans la section "Paramètres" de votre compte.',
    categorie: 'Compte',
    estPopulaire: false,
  },
  {
    id: '9',
    question: 'Comment réinitialiser mon mot de passe ?',
    reponse:
      'Cliquez sur "Mot de passe oublié" sur la page de connexion et suivez les instructions envoyées par email.',
    categorie: 'Compte',
    estPopulaire: true,
  },
  {
    id: '10',
    question: 'Comment changer mon adresse email ?',
    reponse:
      'Allez dans les paramètres de votre compte, puis modifiez votre adresse email dans la section "Informations personnelles".',
    categorie: 'Compte',
    estPopulaire: false,
  },

  // Catégorie "Événements"
  {
    id: '4',
    question: 'Comment annuler un événement ?',
    reponse:
      'Accédez à l’événement concerné et cliquez sur "Annuler". Un message de confirmation s’affichera.',
    categorie: 'Événements',
    estPopulaire: false,
  },
  {
    id: '11',
    question: 'Puis-je modifier la date d’un événement ?',
    reponse:
      'Oui, vous pouvez modifier la date de votre événement en accédant à la page de gestion de l’événement et en sélectionnant "Modifier les détails".',
    categorie: 'Événements',
    estPopulaire: false,
  },
  {
    id: '12',
    question: 'Comment ajouter des intervenants à mon événement ?',
    reponse:
      'Dans la page de gestion de l’événement, vous pouvez ajouter des intervenants en cliquant sur "Ajouter un intervenant" et en remplissant leurs informations.',
    categorie: 'Événements',
    estPopulaire: false,
  },
  {
    id: '13',
    question: 'Comment suivre le nombre de participants ?',
    reponse:
      'Vous pouvez suivre les inscriptions en temps réel dans la section "Participants" de l’événement, où vous verrez une liste des invités confirmés.',
    categorie: 'Événements',
    estPopulaire: true,
  },
];
