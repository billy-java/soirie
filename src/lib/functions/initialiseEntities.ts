// Initialisation des interfaces

import {
  IUtilisateur,
  IEvenement,
  ITache,
  IInvitation,
  IDepense,
  IPrestataire,
  TNotification,
} from '../interfaces/entites';
import { dateJSVersIDate } from './convertirDates';
import { genererIdUnique } from './mesFonctions';

// Exemple de méthode pour initialiser un utilisateur
export const initialiserUtilisateur = (): IUtilisateur => ({
  id: genererIdUnique('USER'),
  nom: '',
  email: '',
  motDePasse: '',
  telephone: '',
  role: 2, // Par défaut, role = participant
});

// Exemple de méthode pour initialiser un événement
export const initialiserEvenement = (): IEvenement => {
  const evenementID = genererIdUnique('EV');
  return {
    id: evenementID,
    idUtilisateur: '',
    nom: '',
    type: 'Anniversaire',
    date: dateJSVersIDate(new Date()),
    lieu: '',
    budget: 0,
    invitation: initialiserInvitation(evenementID),
  };
};

// Exemple de méthode pour initialiser une tâche
export const initialiserTache = (evID: string): ITache => ({
  id: genererIdUnique('TA'),
  idEvenement: evID,
  titre: '',
  description: '',
  dateLimite: dateJSVersIDate(new Date()),
  terminee: false,
  priorite: 2, // Par défaut, priorité = basse
});

// Exemple de méthode pour initialiser une invitation
export const initialiserInvitation = (evID: string): IInvitation => ({
  id: genererIdUnique('INV'),
  idEvenement: evID,
  nombrePersonnes: 100, // Par défaut
  nombreConfirmations: 10,
  nombreDoute: 5,
  nombreRejets: 0,
  statut: 1, // Par défaut, statut = ouvert
  lien: '',
});

// Exemple de méthode pour initialiser une dépense
export const initialiserDepense = (evID: string): IDepense => ({
  id: genererIdUnique('DEP'),
  idEvenement: evID,
  nom: '',
  description: '',
  montant: 0,
  date: dateJSVersIDate(new Date()),
  terminee: false,
});

// Exemple de méthode pour initialiser un prestataire
export const initialiserPrestataire = (): IPrestataire => ({
  id: genererIdUnique('PRESTA'),
  nom: '',
  type: 4, // Par défaut, type = Autre
  localisation: '',
  gammePrix: '',
  note: 1,
  telephone: '',
  email: '',
});

// Exemple de méthode pour initialiser une notification
export const initialiserNotification = (): TNotification => ({
  id: genererIdUnique('NOTIF'),
  idEvenement: '',
  idDestinateur: '',
  titre: '',
  message: '',
  lu: false,
  dateCreation: dateJSVersIDate(new Date()),
  urlRedirection: '',
});
