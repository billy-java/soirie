import { IDate, IDepense, IEvenement, IInvitation, ITache } from '../interfaces/entites';

//1- Conversion d'un string en IDate
// "31/12/2024 23:59" ou "31/12/2024"
export function stringVersIDate(dateString: string): IDate {
  const [datePart, timePart] = dateString.split(' ');
  const [jour, mois, annee] = datePart.split('/');

  const date: IDate = {
    jour: parseInt(jour, 10),
    mois: parseInt(mois, 10),
    annee: parseInt(annee, 10),
  };

  if (timePart) {
    const [heure, minute] = timePart.split(':');
    date.heure = parseInt(heure, 10);
    date.minute = parseInt(minute, 10);
  }

  return date;
}

//2- Convertir un IDate en string
// const dateFormattee = iDateVersString({ jour: 31, mois: 12, annee: 2024, heure: 23, minute: 59 });
// const dateFormatteeSansHeure = iDateVersString({ jour: 31, mois: 12, annee: 2024 });
export function iDateVersString(
  date: IDate,
  afficherHeureMinute?: boolean
): string {
  const jour = date.jour.toString().padStart(2, '0');
  const mois = date.mois.toString().padStart(2, '0');
  const annee = date.annee.toString();

  let result = `${jour}/${mois}/${annee}`;

  // Si l'option pour afficher l'heure et la minute est activée et que les données existent, on les affiche
  if (
    afficherHeureMinute &&
    date.heure !== undefined &&
    date.minute !== undefined
  ) {
    const heure = date.heure.toString().padStart(2, '0');
    const minute = date.minute.toString().padStart(2, '0');
    result += ` ${heure}:${minute}`;
  }

  return result;
}

//3- Convertir un input de type datetime-local en IDate
// Exemple d'utilisation
// const valeurInput = "2024-12-31T23:59"; // Ou "2024-12-31"
export function inputVersIDate(inputValue: string): IDate {
  const [datePart, timePart] = inputValue.split('T');
  const [annee, mois, jour] = datePart.split('-');

  const date: IDate = {
    jour: parseInt(jour, 10),
    mois: parseInt(mois, 10),
    annee: parseInt(annee, 10),
  };

  if (timePart) {
    const [heure, minute] = timePart.split(':');
    date.heure = parseInt(heure, 10);
    date.minute = parseInt(minute, 10);
  }

  return date;
}

//4- Convertir un input de type datetime-local en IDate
// le format de date de l input est: 2024-12-21
export function iDateVersInput(date: IDate): string {
  const annee = date.annee.toString().padStart(4, '0');
  const mois = date.mois.toString().padStart(2, '0');
  const jour = date.jour.toString().padStart(2, '0');

  // Retourne la date au format 'YYYY-MM-DDTHH:mm'
  return `${annee}-${mois}-${jour}`;
}

//5- Convertir un IDate en Date JavaScript
export function iDateVersDateJS(date: IDate): Date {
  const heure = date.heure !== undefined ? date.heure : 0;
  const minute = date.minute !== undefined ? date.minute : 0;

  return new Date(date.annee, date.mois - 1, date.jour, heure, minute);
}

//6- Convertir une Date JavaScript en IDate
export function dateJSVersIDate(date: Date): IDate {
  const iDate: IDate = {
    jour: date.getDate(),
    mois: date.getMonth() + 1, // Les mois commencent à 0
    annee: date.getFullYear(),
  };

  const heure = date.getHours();
  const minute = date.getMinutes();

  if (heure !== 0 || minute !== 0) {
    iDate.heure = heure;
    iDate.minute = minute;
  }

  return iDate;
}


export function transformerListeStringDB_IDate_Evenements(
  evenements: IEvenement_BD[]
): IEvenement[] {
  return evenements.map((evenement) => {
    return {
      ...evenement,
      date: stringVersIDate(evenement.date), // Transformation de la date
    };
  });
}

export function transformerONEEvenement_StringDB_IDate(
  evenement: IEvenement_BD
): IEvenement {
  return {
    ...evenement,
    date: stringVersIDate(evenement.date), // Transformation de la date
  };
}

export function transformerONEEvenement_IDate_ListeStringDB(
  evenement: IEvenement
): IEvenement_BD {
  return {
    ...evenement,
    date: iDateVersString(evenement.date), // Transformation de la date
  };
}

export function transformerListeStringDB_IDate_Depenses(
  depenses: IDepense_BD[]
): IDepense[] {
  return depenses.map((dep) => {
    return {
      ...dep,
      date: stringVersIDate(dep.date), // Transformation de la date
    };
  });
}

export function transformerIDate_ListeStringDB_Depenses(
  depenses: IDepense[]
): IDepense_BD[] {
  return depenses.map((dep) => {
    return {
      ...dep,
      date: iDateVersString(dep.date), // Transformation de la date
    };
  });
}

export function transformerListeStringDB_IDate_Taches(
  taches: ITache_BD[]
): ITache[] {
  return taches.map((tache) => {
    return {
      ...tache,
      dateLimite: stringVersIDate(tache.dateLimite), // Transformation de la date
    };
  });
}

export function transformerIDate_ListeStringDB_Taches(
  taches: ITache[]
): ITache_BD[] {
  return taches.map((tache) => {
    return {
      ...tache,
      dateLimite: iDateVersString(tache.dateLimite), // Transformation de la date
    };
  });
}

export interface IEvenement_BD {
  id: string;
    idUtilisateur: string;
    nom: string;
    type: 'Fête' | 'Mariage' | 'Anniversaire' | 'Autre';
    date: string;
    lieu: string;
    budget: number;
    invitation: IInvitation;
  }
export interface IDepense_BD {
  id: string;
  idEvenement: string;
  nom: string;
  description?: string;
  montant: number;
  date: string;
  terminee: boolean;
}

export interface ITache_BD {
  id: string;
  idEvenement: string;
  titre: string;
  description?: string;
  dateLimite: string;
  terminee: boolean;
  priorite: 1 | 2 | 3; // 1 = basse, 2 = moyenne, 3 = haute
}
