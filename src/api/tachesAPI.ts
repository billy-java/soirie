import axios from 'axios';
import { ITache } from '../lib/interfaces/entites';
import { transformerIDate_ListeStringDB_Taches, transformerListeStringDB_IDate_Taches } from '../lib/functions/convertirDates';

// Définir l'URL de base pour l'API des tâches
const BASE_URL = 'http://localhost:8080/api/taches';



// Fonction pour récupérer les tâches associées à un événement
export const getTachesByEvenement = async (idEvenement: string): Promise<ITache[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/evenement/${idEvenement}`);
    return transformerListeStringDB_IDate_Taches(response.data);
  } catch (error) {
    console.error(`Erreur lors de la récupération des tâches pour l'événement ${idEvenement} :`, error);
    throw error;
  }
};

// Fonction pour mettre à jour toutes les tâches d'un événement
export const updateTachesByEvenement = async (
  tacheDTOs: ITache[]
): Promise<ITache[]> => {
  try {
    const tachesBD = transformerIDate_ListeStringDB_Taches(tacheDTOs);
    const response = await axios.put(`${BASE_URL}/cu-liste`, tachesBD);
    return transformerListeStringDB_IDate_Taches(response.data);
  } catch (error) {
    console.error('Erreur lors de la mise à jour des tâches de l\'événement :', error);
    throw error;
  }
};

// Fonction pour mettre à jour les tâches prioritaires d'un événement
export const updateTachesPrioritaires = async (
  tacheDTOs: ITache[]
): Promise<ITache[]> => {
  try {
    const tachesBD = transformerIDate_ListeStringDB_Taches(tacheDTOs);
    const response = await axios.put(`${BASE_URL}/prioritaires`, tachesBD);
    return transformerListeStringDB_IDate_Taches(response.data);
  } catch (error) {
    console.error('Erreur lors de la mise à jour des tâches prioritaires :', error);
    throw error;
  }
};
