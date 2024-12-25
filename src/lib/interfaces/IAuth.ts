import { IUtilisateur } from "./entites";

export interface IAuth {
  userActuel: IUtilisateur | null;
  token: string | null;
  idEv: string | null;
}