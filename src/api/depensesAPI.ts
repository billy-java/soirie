//src/api/depensesAPI.ts

import axios from 'axios';
import { IDepense } from '../lib/interfaces/entites';
import {
  transformerIDate_ListeStringDB_Depenses,
  transformerListeStringDB_IDate_Depenses,
} from '../lib/functions/convertirDates';

// Définir l'URL de base pour votre API backend des dépenses
const BASE_URL = 'http://localhost:8080/api/depenses';


// Fonction pour récupérer les dépenses d'un événement spécifique par son ID
export const getDepensesByEvenement = async (
  idEvenement: string
): Promise<IDepense[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/evenement/${idEvenement}`);
    return transformerListeStringDB_IDate_Depenses(response.data);
  } catch (error) {
    console.error(`Error fetching expenses for event ${idEvenement}:`, error);
    throw error;
  }
};

// Fonction pour créer ou mettre à jour plusieurs dépenses
export const creerOuMettreAJourDepenses = async (
  depensesDTOs: IDepense[]
): Promise<IDepense[]> => {
  try {
    // Conversion des dates avant d'envoyer à l'API
    const depensesBD = transformerIDate_ListeStringDB_Depenses(depensesDTOs);
    const response = await axios.post(`${BASE_URL}/cu-liste`, depensesBD);
    return transformerListeStringDB_IDate_Depenses(response.data);
  } catch (error) {
    console.error('Error creating or updating expenses:', error);
    throw error;
  }
};
