import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IDepense } from '../lib/interfaces/entites';
import * as depensesAPI from '../api/depensesAPI';

// Thunk pour créer une nouvelle dépense
export const createDepense = createAsyncThunk(
  'depenses/createDepense',
  async (depense: IDepense) => {
    const createdDepense = await depensesAPI.createDepense(depense);
    return createdDepense;
  }
);

// Thunk pour mettre à jour une dépense
export const updateDepense = createAsyncThunk(
  'depenses/updateDepense',
  async ({ id, depense }: { id: string; depense: IDepense }) => {
    const updatedDepense = await depensesAPI.updateDepense(id, depense);
    return updatedDepense;
  }
);

// Thunk pour supprimer une dépense
export const deleteDepense = createAsyncThunk(
  'depenses/deleteDepense',
  async (id: string) => {
    await depensesAPI.deleteDepense(id);
    return id;
  }
);

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
      .addCase(createDepense.fulfilled, (state, action) => {
        state.depenses.push(action.payload);
      })
      .addCase(updateDepense.fulfilled, (state, action) => {
        const index = state.depenses.findIndex(
          (depense) => depense.id === action.payload.id
        );
        if (index !== -1) {
          state.depenses[index] = action.payload;
        }
      })
      .addCase(deleteDepense.fulfilled, (state, action) => {
        state.depenses = state.depenses.filter(
          (depense) => depense.id !== action.payload
        );
      })
      .addCase(createOrUpdateDepenses.fulfilled, (state, action) => {
        state.depenses = action.payload;
      });
  },
});

export default depensesSlice.reducer;
