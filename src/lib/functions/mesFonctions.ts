import { ITache } from "../interfaces/entites";
import { iDateVersDateJS } from "./convertirDates";

export function trierTachesParDate(taches: ITache[]): ITache[] {
  return taches.slice().sort((a, b) => {
    // Si une des tâches n'a pas de date limite, la placer en dernier
    if (!a.dateLimite && !b.dateLimite) return 0;
    if (!a.dateLimite) return 1;
    if (!b.dateLimite) return -1;

    // Utiliser iDateVersDateJS pour convertir les dates
    const dateA = iDateVersDateJS(a.dateLimite);
    const dateB = iDateVersDateJS(b.dateLimite);

    // Comparer les deux dates
    return dateA.getTime() - dateB.getTime();
  });
}


export function gerer_IUtilisateur_Role(
  valeur: number | string
): string | number {
  if (valeur === 1 || valeur === 'Organisateur') {
    return typeof valeur === 'number' ? 'Organisateur' : 1;
  } else if (valeur === 2 || valeur === 'Participant') {
    return typeof valeur === 'number' ? 'Participant' : 2;
  }
  return 'ERREUR RÔLE UTILISATEUR';
}

export function gerer_ITache_Statut(valeur: number | string): string | number {
  if (valeur === 1 || valeur === 'À faire') {
    return typeof valeur === 'number' ? 'À faire' : 1;
  } else if (valeur === 2 || valeur === 'En cours') {
    return typeof valeur === 'number' ? 'En cours' : 2;
  } else if (valeur === 3 || valeur === 'Terminé') {
    return typeof valeur === 'number' ? 'Terminé' : 3;
  }
  return 'ERREUR STATUT TÂCHE';
}

export function convertirPrioriteF(valeur: number | string): string | number {
  if (valeur === 1 || valeur === 'Basse') {
    return typeof valeur === 'number' ? 'Basse' : 1;
  } else if (valeur === 2 || valeur === 'Moyenne') {
    return typeof valeur === 'number' ? 'Moyenne' : 2;
  } else if (valeur === 3 || valeur === 'Haute') {
    return typeof valeur === 'number' ? 'Haute' : 3;
  }
  return 'ERREUR PRIORITÉ';
}

export function gerer_IReponseRSV_Statut(
  valeur: number | string
): string | number {
  if (valeur === 1 || valeur === 'Confirmé') {
    return typeof valeur === 'number' ? 'Confirmé' : 1;
  } else if (valeur === 2 || valeur === 'Refusé') {
    return typeof valeur === 'number' ? 'Refusé' : 2;
  } else if (valeur === 3 || valeur === 'En attente') {
    return typeof valeur === 'number' ? 'En attente' : 3;
  }
  return 'ERREUR STATUT RSVP';
}

export function gerer_IPrestataire_Type(
  valeur: number | string
): string | number {
  if (valeur === 1 || valeur === 'Traiteur') {
    return typeof valeur === 'number' ? 'Traiteur' : 1;
  } else if (valeur === 2 || valeur === 'DJ') {
    return typeof valeur === 'number' ? 'DJ' : 2;
  } else if (valeur === 3 || valeur === 'Décorateur') {
    return typeof valeur === 'number' ? 'Décorateur' : 3;
  } else if (valeur === 4 || valeur === 'Autre') {
    return typeof valeur === 'number' ? 'Autre' : 4;
  }
  return 'ERREUR TYPE PRESTATAIRE';
}

export function gerer_IInvitation_statut(
  valeur: number | string
): string | number {
  if (valeur === 1 || valeur === 'Ouvert') {
    return typeof valeur === 'number' ? 'Ouvert' : 1;
  } else if (valeur === 2 || valeur === 'Terminé') {
    return typeof valeur === 'number' ? 'Terminé' : 2;
  } else if (valeur === 3 || valeur === 'Annulé') {
    return typeof valeur === 'number' ? 'Annulé' : 3;
  }
  return 'ERREUR STATUT INVITATION';
}


export function genererIdUnique(prefixe?: string): string {
  // Obtenir l'heure actuelle en millisecondes
  const maintenant = Date.now();
  
  // Convertir le timestamp en base 36 pour plus de compacité
  const base36Timestamp = maintenant.toString(36).toUpperCase();

  // Générer un suffixe aléatoire de 4 chiffres
  const suffixe = Math.floor(1000 + Math.random() * 9000).toString();
  
  // Générer l'identifiant unique
  const identifiant = `${prefixe ? `${prefixe}-` : ''}${base36Timestamp}-${suffixe}`;
  
  return identifiant;
}

export const genererToken = (userId: string): string => {
  const randomPart = Math.random().toString(36).substr(2); // Partie aléatoire en base 36
  const timestamp = Date.now().toString(36); // Timestamp en base 36
  return `${userId}-${randomPart}-${timestamp}`;
};

function creerId(prefixe: string): string {
  const part1 = Math.floor(Math.random() * 100)
  .toString()
  .padStart(2, '0');
  const part2 = Math.floor(Math.random() * 10000)
  .toString()
  .padStart(4, '0');
  return `${prefixe}-${part1}-${part2}`;
}

export function genererIdentifiantUnique<T extends { id: string }>(
  uneListe: T[],
  prefixe: string
): string {
  const ids_existants = new Set(uneListe.map((element) => element.id));

  let nouveauId: string;
  do {
    nouveauId = creerId(prefixe);
  } while (ids_existants.has(nouveauId));
  return nouveauId;
}