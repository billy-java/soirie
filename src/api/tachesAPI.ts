import axios from 'axios';
import { ITache } from '../lib/interfaces/entites';

// Définir l'URL de base pour l'API des tâches
const BASE_URL = 'http://localhost:8080/api/taches';

// Fonction pour récupérer toutes les tâches
export const getAllTaches = async (): Promise<ITache[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/liste`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Fonction pour récupérer les tâches prioritaires
export const getTachesPrioritaires = async (): Promise<ITache[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/prioritaires`);
    return response.data;
  } catch (error) {
    console.error('Error fetching priority tasks:', error);
    throw error;
  }
};

// Fonction pour récupérer une tâche par son ID
export const getTacheById = async (id: string): Promise<ITache> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour créer une nouvelle tâche
export const createTache = async (tache: ITache): Promise<ITache> => {
  try {
    const response = await axios.post(`${BASE_URL}/creer`, tache);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Fonction pour mettre à jour une tâche
export const updateTache = async (id: string, tache: ITache): Promise<ITache> => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, tache);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer une tâche
export const deleteTache = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour récupérer les tâches d'un événement
export const getTachesByEvenement = async (idEvenement: string): Promise<ITache[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/evenement/${idEvenement}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks for event ${idEvenement}:`, error);
    throw error;
  }
};
