import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPrestataire } from '../lib/interfaces/entites';
import { getAllPrestataires } from '../api/prestatairesAPI'; // Import de la fonction existante

// Création de l'async thunk pour récupérer les prestataires
export const fetchPrestataires = createAsyncThunk(
  'prestataire/fetchPrestataires',
  async () => {
    const prestataires = await getAllPrestataires(); // Appel à l'API existante
    return prestataires;
  }
);

interface PrestataireState {
  prestataires: IPrestataire[];
  loading: boolean;
  error: string | null;
}

const initialState: PrestataireState = {
  prestataires: [],
  loading: false,
  error: null,
};

const prestataireSlice = createSlice({
  name: 'prestataire',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrestataires.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrestataires.fulfilled, (state, action) => {
        state.loading = false;
        state.prestataires = action.payload;
      })
      .addCase(fetchPrestataires.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch prestataires';
      });
  },
});

export default prestataireSlice.reducer;
