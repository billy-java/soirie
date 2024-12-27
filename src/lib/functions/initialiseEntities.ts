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

// Exemple de méthode pour initialiser un utilisateur
export const initialiserUtilisateur = (): IUtilisateur => ({
  id: '',
  idsEvenements: [],
  nom: '',
  email: '',
  motDePasse: '',
  telephone: '',
  role: 2, // Par défaut, role = participant
});

// Exemple de méthode pour initialiser un événement
export const initialiserEvenement = (evID:string): IEvenement => ({
  id: evID,
  idUtilisateur: '',
  nom: '',
  type: 'Anniversaire',
  date: dateJSVersIDate(new Date()),
  lieu: '',
  budget: 0,
});

// Exemple de méthode pour initialiser une tâche
export const initialiserTache = (evID:string): ITache => ({
  id: Date.now().toString(),
  idEvenement: evID,
  titre: '',
  description: '',
  dateLimite: dateJSVersIDate(new Date()),
  terminee: false,
  priorite: 2, // Par défaut, priorité = basse
});

// Exemple de méthode pour initialiser une invitation
export const initialiserInvitation = (): IInvitation => ({
  id: '',
  idEvenement: '',
  nom: '',
  nombrePersonnes: 100, // Par défaut
  nombreConfirmations: 10,
  nombreDoute: 5,
  nombreRejets: 0,
  statut: 1, // Par défaut, statut = ouvert
  lien: '',
});

// Exemple de méthode pour initialiser une dépense
export const initialiserDepense = (evID:string): IDepense => ({
  id: Date.now().toString(),
  idEvenement: evID,
  nom: '',
  description: '',
  montant: 0,
  date: dateJSVersIDate(new Date()),
  terminee: false,
});

// Exemple de méthode pour initialiser un prestataire
export const initialiserPrestataire = (): IPrestataire => ({
  id: '',
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
  id: '',
  idEvenement: '',
  idDestinateur: '',
  titre: '',
  message: '',
  lu: false,
  dateCreation: dateJSVersIDate(new Date()),
  urlRedirection: '',
});
