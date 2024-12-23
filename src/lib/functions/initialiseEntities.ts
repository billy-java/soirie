// Initialisation des interfaces

import { IUtilisateur, IEvenement, ITache, IInvitation, IDepense, IPrestataire, TNotification } from "../interfaces/entites";

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
  export const initialiserEvenement = (): IEvenement => ({
    id: '',
    idUtilisateur: '',
    nom: '',
    type: 'Fête',
    date: '',
    lieu: '',
    budget: 0,
  });
  
  // Exemple de méthode pour initialiser une tâche
  export const initialiserTache = (): ITache => ({
    id: '',
    idEvenement: '',
    titre: '',
    description: '',
    dateLimite: '',
    terminee: false,
    priorite: 1, // Par défaut, priorité = basse
  });
  
  // Exemple de méthode pour initialiser une invitation
  export const initialiserInvitation = (): IInvitation => ({
    id: '',
    idEvenement: '',
    nom: '',
    nombrePersonnes: 'Aucune limite', // Par défaut
    nombreConfirmations: 0,
    nombreRejets: 0,
    statut: 1, // Par défaut, statut = ouvert
    lien: '',
  });
  
  // Exemple de méthode pour initialiser une dépense
  export const initialiserDepense = (): IDepense => ({
    id: '',
    idEvenement: '',
    nom: '',
    description: '',
    montant: 0,
    date: new Date().toISOString().split('T')[0],
    terminee: false,
  });
  
  // Exemple de méthode pour initialiser un prestataire
  export const initialiserPrestataire = (): IPrestataire => ({
    id: '',
    nom: '',
    type: 4, // Par défaut, type = Autre
    localisation: '',
    gammePrix: '',
    note: 1, // Par défaut, note = 1
  });
  
  // Exemple de méthode pour initialiser une notification
  export const initialiserNotification = (): TNotification => ({
    id: '',
    idEvenement: '',
    idDestinateur: '',
    titre: '',
    message: '',
    lu: false,
    dateCreation: '',
    urlRedirection: '',
  });
  