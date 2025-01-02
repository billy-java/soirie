import axios from 'axios';
import { IInvitation } from '../lib/interfaces/entites';

// Définir l'URL de base pour votre API backend des invitations
const BASE_URL = 'http://localhost:8080/api/invitations';



// Fonction pour récupérer une invitation par son ID
export const getInvitationById = async (id: string): Promise<IInvitation> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching invitation with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour récupérer une invitation par l'ID de l'événement
export const getInvitationByEvenement = async (idEvenement: string): Promise<IInvitation | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/evenement/${idEvenement}`);
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching invitation for event ${idEvenement}:`, error);
    throw error;
  }
};

// Fonction pour créer une nouvelle invitation
export const createInvitation = async (invitation: IInvitation): Promise<IInvitation> => {
  try {
    const response = await axios.post(`${BASE_URL}/creer`, invitation);
    return response.data;
  } catch (error) {
    console.error('Error creating invitation:', error);
    throw error;
  }
};

// Fonction pour mettre à jour une invitation
export const updateInvitation = async (id: string, invitation: IInvitation): Promise<IInvitation> => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, invitation);
    return response.data;
  } catch (error) {
    console.error(`Error updating invitation with id ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer une invitation
export const deleteInvitation = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting invitation with id ${id}:`, error);
    throw error;
  }
};
