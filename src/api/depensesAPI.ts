import axios from 'axios';
import { IDepense } from '../lib/interfaces/entites';

// Définir l'URL de base pour votre API backend des dépenses
const BASE_URL = 'http://localhost:8080/api/depenses';

// Fonction pour récupérer toutes les dépenses
export const getDepenses = async (): Promise<IDepense[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/liste`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

// Fonction pour récupérer une dépense par son ID
export const getDepenseById = async (id: string): Promise<IDepense> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching expense with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour créer une nouvelle dépense
export const createDepense = async (depense: IDepense): Promise<IDepense> => {
  try {
    const response = await axios.post(`${BASE_URL}/creer`, depense);
    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

// Fonction pour mettre à jour une dépense
export const updateDepense = async (id: string, depense: IDepense): Promise<IDepense> => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, depense);
    return response.data;
  } catch (error) {
    console.error(`Error updating expense with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer une dépense
export const deleteDepense = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting expense with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour récupérer les dépenses d'un événement spécifique par son ID
export const getDepensesByEvenement = async (idEvenement: string): Promise<IDepense[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/evenement/${idEvenement}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching expenses for event ${idEvenement}:`, error);
    throw error;
  }
};
