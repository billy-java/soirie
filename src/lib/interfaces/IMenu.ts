import { ReactNode } from "react";

export type IMenu = {
    actif: boolean;
    afficher: boolean;
    nom: string;
    lien: string;
    icon1?: ReactNode;
    icon2?: ReactNode;
  };