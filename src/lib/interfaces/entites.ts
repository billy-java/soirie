export interface IDepense {
    id: string;
    idEvenement: string;
    nom: string;
    description?: string;
    montant: number;
    date: string;
  }
  
  export interface IEvenement {
    id: string;
    idUtilisateur: string;
    nom: string;
    type: 'Fête';
    date: string;
    lieu: string;
    budget: number;
  }
  
  export interface IInvitation {
    id: string;
    idEvenement: string;
    nom: string;
    nombrePersonnes: number | 'Aucune limite';
    nombreConfirmations: number;
    nombreRejets: number;
    nombreDemandesEnAttente: number;
    statut: 1 | 2 | 3; // 1 = ouvert, 2 = terminé, 3 = annulé
  }

  
  
  export interface IPrestataire {
    id: string;
    nom: string;
    type: 1 | 2 | 3 | 4; // 1 = Traiteur, 2 = DJ, 3 = Décorateur, 4 = Autre
    localisation: string;
    gammePrix: string;
    note: 1 | 2 | 3 | 4 | 5;
  }
  
  export interface ITache {
    id: string;
    idEvenement: string;
    titre: string;
    description?: string;
    dateLimite?: string;
    statut: 1 | 2 | 3; // 1 = à faire, 2 = en cours, 3 = terminé
    priorite: 1 | 2 | 3; // 1 = basse, 2 = moyenne, 3 = haute
  }
  
  export interface IUtilisateur {
    id: string;
    idsEvenements: string[];
    nom: string;
    email: string;
    motDePasse?: string;
    telephone: string;
    role: 1 | 2; // 1 = organisateur, 2 = participant
  }
  