export interface IUtilisateur {
  id: string;
  idsEvenements: string[];
  nom: string;
  email: string;
  motDePasse?: string;
  telephone: string;
  role: 1 | 2; // 1 = organisateur, 2 = participant
}

export interface IEvenement {
  id: string;
  idUtilisateur: string;
  nom: string;
  type: 'Fête';
  date: IDate;
  lieu: string;
  budget: number;
}

export interface ITache {
  id: string;
  idEvenement: string;
  titre: string;
  description?: string;
  dateLimite?: string;
  terminee: boolean;
  priorite: 1 | 2 | 3; // 1 = basse, 2 = moyenne, 3 = haute
}

export interface IInvitation {
  id: string;
  idEvenement: string;
  nom: string;
  nombrePersonnes: number | 'Aucune limite';
  nombreConfirmations: number;
  nombreRejets: number;
  statut: 1 | 2 | 3; // 1 = ouvert, 2 = terminé, 3 = annulé
  lien: string;
}

export interface IDepense {
  id: string;
  idEvenement: string;
  nom: string;
  description?: string;
  montant: number;
  date: string;
  terminee: boolean;
}

export interface IPrestataire {
  id: string;
  nom: string;
  type: 1 | 2 | 3 | 4; // 1 = Traiteur, 2 = DJ, 3 = Décorateur, 4 = Autre
  localisation: string;
  gammePrix: string;
  note: 1 | 2 | 3 | 4 | 5;
  telephone: string;
  email: string;
}


export interface IFaq {
  id: string;
  question: string;
  reponse: string;
  categorie: string; // Permet de regrouper les questions par thème
  estPopulaire: boolean; // Indique si cette question est fréquemment posée
}

export interface IDate {
  jour: number;   // Le jour du mois (1-31)
  mois: number;   // Le mois de l'année (1-12)
  annee: number;  // L'année (e.g., 2024)
  heure?: number; // L'heure (0-23), facultatif
  minute?: number; // Les minutes (0-59), facultatif
}


export interface TNotification {
  id: string;
  idEvenement: string;
  idDestinateur?: string; //si la notification est envoyée par un membre
  titre: string;
  message: string;
  lu: boolean;
  dateCreation: string;
  urlRedirection: string;
}
