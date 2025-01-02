import axios from 'axios';
import { IUtilisateur } from '../lib/interfaces/entites';

// Définir l'URL de base pour l'API des utilisateurs
const BASE_URL = 'http://localhost:8080/api/utilisateurs';

// Fonction pour récupérer tous les utilisateurs
export const getAllUtilisateurs = async (): Promise<IUtilisateur[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/liste`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fonction pour récupérer un utilisateur par son ID
export const getUtilisateurById = async (id: string): Promise<IUtilisateur> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour récupérer un utilisateur par son email
export const getUtilisateurByEmail = async (email: string): Promise<IUtilisateur> => {
  try {
    const response = await axios.get(`${BASE_URL}/email/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw error;
  }
};

// Fonction pour créer un utilisateur
export const createUtilisateur = async (utilisateur: IUtilisateur): Promise<IUtilisateur> => {
  try {
    const response = await axios.post(`${BASE_URL}/creer`, utilisateur);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUtilisateur = async (id: string, utilisateur: IUtilisateur): Promise<IUtilisateur> => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, utilisateur);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUtilisateur = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};
