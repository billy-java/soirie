//src\api\prestatairesAPI.ts

import axios from 'axios';
import { IPrestataire } from '../lib/interfaces/entites';

// Définir l'URL de base pour l'API des prestataires
const BASE_URL = 'http://localhost:8080/api/prestataires';

// Fonction pour récupérer tous les prestataires
export const getAllPrestataires = async (): Promise<IPrestataire[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/liste`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prestataires:', error);
    throw error;
  }
};
