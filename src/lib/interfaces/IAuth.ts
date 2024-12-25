import { /* IDepense, IEvenement, ITache, */ IUtilisateur } from './entites';

export interface IAuth {
  userActuel: IUtilisateur | null;
  token: string | null;
  idEv: string | null;
}

/* export interface IAuth {
  userActuel: IUtilisateur | null;
  evenements: IEvenement[] | null; //uniquement les evenements de l'utilisateur connecté
  taches: ITache[] | null; //uniquement les taches de l'utilisateur connecté
  depenses: IDepense[] | null;//uniquement les depenses de l'utilisateur connecté
  token: string | null;
  idEv: string | null;
} */
