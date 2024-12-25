import { IDate } from "../interfaces/entites";


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
export function iDateVersString(date: IDate, afficherHeureMinute?: boolean): string { 
  const jour = date.jour.toString().padStart(2, '0');
  const mois = date.mois.toString().padStart(2, '0');
  const annee = date.annee.toString();

  let result = `${jour}/${mois}/${annee}`;

  // Si l'option pour afficher l'heure et la minute est activée et que les données existent, on les affiche
  if (afficherHeureMinute && date.heure !== undefined && date.minute !== undefined) {
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

// Exemple d'utilisation
const dateJS = iDateVersDateJS({ jour: 31, mois: 12, annee: 2024, heure: 23, minute: 59 });
console.log(dateJS); // Tue Dec 31 2024 23:59:00 GMT+0000 (UTC)

const dateJSWithoutTime = iDateVersDateJS({ jour: 31, mois: 12, annee: 2024 });
console.log(dateJSWithoutTime); // Wed Dec 31 2024 00:00:00 GMT+0000 (UTC)




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