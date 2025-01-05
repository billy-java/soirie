import axios from 'axios';
import { IEvenement } from '../lib/interfaces/entites';
import { transformerListeStringDB_IDate_Evenements, transformerONEEvenement_IDate_ListeStringDB, transformerONEEvenement_StringDB_IDate } from '../lib/functions/convertirDates';

// Définissez l'URL de base pour votre backend
const BASE_URL = 'http://localhost:8080/api/evenements';


// Fonction pour récupérer tous les événements
export const getEvenements = async (): Promise<IEvenement[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/liste`);
    return transformerListeStringDB_IDate_Evenements(response.data);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Fonction pour récupérer un événement par son ID
export const getEvenementById = async (id: string): Promise<IEvenement> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour créer un nouvel événement
export const createEvenement = async (evenement: IEvenement): Promise<IEvenement> => {
  try {
    const bonFormat = transformerONEEvenement_IDate_ListeStringDB(evenement)
    
    const response = await axios.post(`${BASE_URL}/creer`, bonFormat);
    return transformerONEEvenement_StringDB_IDate(response.data);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Fonction pour mettre à jour un événement
export const updateEvenement = async (id: string, evenement: IEvenement): Promise<IEvenement> => {
  try {
    const bonFormat = transformerONEEvenement_IDate_ListeStringDB(evenement)
    const response = await axios.put(`${BASE_URL}/${id}`, bonFormat);
    return transformerONEEvenement_StringDB_IDate(response.data);
  } catch (error) {
    console.error(`Error updating event with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer un événement
export const deleteEvenement = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting event with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour récupérer les événements d'un utilisateur par ID
export const getEvenementsByUtilisateur = async (idUtilisateur: string): Promise<IEvenement[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/utilisateur/${idUtilisateur}`);
    return transformerListeStringDB_IDate_Evenements(response.data);
  } catch (error) {
    console.error(`Error fetching events for user ${idUtilisateur}:`, error);
    throw error;
  }
};
