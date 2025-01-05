import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ITache } from '../lib/interfaces/entites';
import {
  getTachesByEvenement,
  updateTachesByEvenement,
  updateTachesPrioritaires,
} from '../api/tachesAPI';
import { trierTachesParDate } from '../lib/functions/mesFonctions';

interface TacheState {
  taches: ITache[];
  loading: boolean;
  error: string | null;
}

const initialState: TacheState = {
  taches: [],
  loading: false,
  error: null,
};

// Thunks pour gérer les appels API

// Charger les tâches d'un événement spécifique
export const fetchTachesByEvenement = createAsyncThunk(
  'tache/fetchTachesByEvenement',
  async (idEvenement: string) => {
    const taches = await getTachesByEvenement(idEvenement);
    console.log('5555555555555');
    console.log(taches);
    return taches;
  }
);

export const fetchTachesPrioritaireByEvenement = createAsyncThunk(
  'tache/fetchTachesByEvenement',
  async (idEvenement: string) => {
    const taches = await getTachesByEvenement(idEvenement);
    console.log('5555555555555');
    console.log(taches);
    return taches.filter(
      (el) => el.idEvenement === idEvenement && el.priorite === 3
    );
  }
);

// Mettre à jour les tâches d'un événement
export const saveTachesByEvenement = createAsyncThunk(
  'tache/saveTachesByEvenement',
  async (taches: ITache[], { rejectWithValue }) => {
    try {
      const updatedTaches = await updateTachesByEvenement(taches);
      console.log('66666666666666');
      console.log(taches);
      return updatedTaches;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Mettre à jour les tâches prioritaires d'un événement
export const saveTachesPrioritaires = createAsyncThunk(
  'tache/saveTachesPrioritaires',
  async (taches: ITache[], { rejectWithValue }) => {
    try {
      const updatedTaches = await updateTachesPrioritaires(taches);
      console.log('77777777777');
      console.log(taches);
      return updatedTaches;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Slice Redux
const tacheSlice = createSlice({
  name: 'tache',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTachesByEvenement
      .addCase(fetchTachesByEvenement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTachesByEvenement.fulfilled, (state, action) => {
        state.loading = false;
        state.taches = trierTachesParDate(action.payload);
      })
      .addCase(fetchTachesByEvenement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // saveTachesByEvenement
      .addCase(saveTachesByEvenement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTachesByEvenement.fulfilled, (state, action) => {
        state.loading = false;
        state.taches = action.payload;
      })
      .addCase(saveTachesByEvenement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // saveTachesPrioritaires
      .addCase(saveTachesPrioritaires.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTachesPrioritaires.fulfilled, (state, action) => {
        state.loading = false;
        const updatedIds = action.payload.map((tache) => tache.id);
        state.taches = state.taches.map((tache) =>
          updatedIds.includes(tache.id)
            ? action.payload.find((updated) => updated.id === tache.id) || tache
            : tache
        );
      })
      .addCase(saveTachesPrioritaires.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});



export default tacheSlice.reducer;
