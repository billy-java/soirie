import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IDepense } from '../lib/interfaces/entites';
import * as depensesAPI from '../api/depensesAPI';



// Thunk pour créer ou mettre à jour plusieurs dépenses
export const fetchDepenses = createAsyncThunk(
  'depenses/fetchDepenses',
  async (id: string) => {
    const allDepenses = await depensesAPI.getDepensesByEvenement(id);
    return allDepenses;
  }
);
// Thunk pour créer ou mettre à jour plusieurs dépenses
export const createOrUpdateDepenses = createAsyncThunk(
  'depenses/createOrUpdateDepenses',
  async (depenses: IDepense[]) => {
    const updatedDepenses =
      await depensesAPI.creerOuMettreAJourDepenses(depenses);
    return updatedDepenses;
  }
);

// src/redux/depensesSlice.ts
// Correction de la duplication dans le code
const depensesSlice = createSlice({
  name: 'depenses',
  initialState: {
    depenses: [] as IDepense[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepenses.fulfilled, (state, action) => {
        state.loading = false;
        state.depenses = action.payload;
      })
      .addCase(fetchDepenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching events';
      })
      .addCase(createOrUpdateDepenses.fulfilled, (state, action) => {
        state.depenses = action.payload;
      });
  },
});

export default depensesSlice.reducer;
