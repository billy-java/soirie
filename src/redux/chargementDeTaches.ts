import { genererIdUnique } from '../lib/functions/mesFonctions';
import { ITache } from '../lib/interfaces/entites';


export function getTachesParType(typeEvenement: string, idEvenement:string): ITache[] {
  switch (typeEvenement) {
    case 'Anniversaire':
      return creerAnniversaireTaches(idEvenement);
    case 'Fête':
      return creerFeteTaches(idEvenement);
    case 'Mariage':
      return creerMariageTaches(idEvenement);
    case 'Autre':
      return creerAutreTaches(idEvenement);
    default:
      return [];
  }
}

function creerFeteTaches(idEvenement: string): ITache[] {
  return [
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Organiser une fête',
      description: 'Déterminer le thème principal pour la fête.',
      dateLimite: { jour: 10, mois: 1, annee: 2025 },
      terminee: false,
      priorite: 3,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Sélectionner un lieu',
      description: "Réserver ou préparer l'endroit où aura lieu la fête.",
      dateLimite: { jour: 15, mois: 1, annee: 2025 },
      terminee: false,
      priorite: 2,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Musique et divertissement',
      description:
        'Organiser une playlist, engager un DJ ou un groupe, et planifier des jeux ou activités.',
      dateLimite: { jour: 20, mois: 1, annee: 2025 },
      terminee: false,
      priorite: 1,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Planifier le menu',
      description: 'Choisir les snacks, repas et boissons qui seront servis.',
      dateLimite: { jour: 18, mois: 1, annee: 2025 },
      terminee: false,
      priorite: 2,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Envoyer les invitations',
      description: 'Créer et distribuer les invitations aux invités.',
      dateLimite: { jour: 12, mois: 1, annee: 2025 },
      terminee: false,
      priorite: 3,
    },
  ];
}

function creerMariageTaches(idEvenement: string): ITache[] {
  return [
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Organiser un mariage',	
      description: 'Acheter ou louer la robe de mariée et les costumes.',
      dateLimite: { jour: 20, mois: 2, annee: 2025 },
      terminee: false,
      priorite: 3,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Réservation du lieu',
      description:
        'Choisir et réserver le lieu de la cérémonie et de la réception.',
      dateLimite: { jour: 1, mois: 3, annee: 2025 },
      terminee: false,
      priorite: 3,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Liste des invités',
      description:
        'Établir une liste complète des invités et envoyer les invitations.',
      dateLimite: { jour: 15, mois: 2, annee: 2025 },
      terminee: false,
      priorite: 2,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Photographe et vidéaste',
      description: 'Engager un photographe et un vidéaste professionnels.',
      dateLimite: { jour: 10, mois: 2, annee: 2025 },
      terminee: false,
      priorite: 1,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Planification de la cérémonie',
      description:
        'Préparer les vœux, engager un officiant et choisir les musiques.',
      dateLimite: { jour: 28, mois: 2, annee: 2025 },
      terminee: false,
      priorite: 3,
    },
  ];
}

function creerAnniversaireTaches(idEvenement: string): ITache[] {
  return [
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Organiser un anniversaire',
      description:
        'Choisir une date et une heure, définir un budget et sélectionner un thème pour la fête.',
      dateLimite: { jour: 30, mois: 12, annee: 2024 },
      terminee: false,
      priorite: 3,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Invitations',
      description:
        "Établir une liste d'invités, envoyer les invitations et confirmer les RSVPs.",
      dateLimite: { jour: 25, mois: 12, annee: 2024 },
      terminee: false,
      priorite: 2,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Menu et Gâteau',
      description:
        'Planifier le menu, commander le gâteau et prévoir les boissons.',
      dateLimite: { jour: 18, mois: 12, annee: 2024 },
      terminee: false,
      priorite: 3,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Décorations et Activités',
      description:
        'Organiser les décorations, prévoir les activités, et prévoir les cadeaux et les surprises.',
      dateLimite: { jour: 20, mois: 12, annee: 2024 },
      terminee: false,
      priorite: 2,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Logistique',
      description:
        "Planifier la logistique, prévoir les sièges, les tables et l'espace pour tout le monde.",
      dateLimite: { jour: 20, mois: 12, annee: 2024 },
      terminee: false,
      priorite: 2,
    },
  ];
}
function creerAutreTaches(idEvenement: string): ITache[] {
  return [
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Organiser une Réunion',
      description: "Clarifier les objectifs principaux de l'événement.",
      dateLimite: { jour: 15, mois: 4, annee: 2025 },
      terminee: false,
      priorite: 3,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Créer un planning',
      description: "Établir un horaire pour les activités et présentations.",
      dateLimite: { jour: 20, mois: 4, annee: 2025 },
      terminee: false,
      priorite: 2,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Réunir les ressources',
      description: "Acheter ou louer les équipements nécessaires.",
      dateLimite: { jour: 25, mois: 4, annee: 2025 },
      terminee: false,
      priorite: 1,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Envoyer les invitations',
      description: 'Notifier toutes les parties prenantes de la date et de l’heure.',
      dateLimite: { jour: 18, mois: 4, annee: 2025 },
      terminee: false,
      priorite: 3,
    },
    {
      id: genererIdUnique('TA'),
      idEvenement: idEvenement,
      titre: 'Logistique',
      description: "S'assurer que tout est prêt pour le jour de l'événement.",
      dateLimite: { jour: 30, mois: 4, annee: 2025 },
      terminee: false,
      priorite: 2,
    },
  ];
}
