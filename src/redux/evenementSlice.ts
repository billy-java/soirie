// src/redux/evenementSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IEvenement, IInvitation } from '../lib/interfaces/entites';
import * as evenementAPI from '../api/evenementsAPI';

interface EvenementState {
  evenementsAttr: IEvenement[];
  loading: boolean;
  error: string | null;
}

const initialState: EvenementState = {
  evenementsAttr: [],
  loading: false,
  error: null,
};

// Thunks pour les opérations asynchrones
export const fetchEvenements = createAsyncThunk('evenements/fetchEvenements', async () => {
  const evenements = await evenementAPI.getEvenements();
  return evenements;
});

export const fetchEvenementById = createAsyncThunk(
  'evenements/fetchEvenementById',
  async (id: string) => {
    const evenement = await evenementAPI.getEvenementById(id);
    return evenement;
  }
);

export const createEvenement = createAsyncThunk(
  'evenements/createEvenement',
  async (evenement: IEvenement) => {
    const newEvenement = await evenementAPI.createEvenement(evenement);
    return newEvenement;
  }
);

export const updateEvenement = createAsyncThunk(
  'evenements/updateEvenement',
  async ({ id, evenement }: { id: string; evenement: IEvenement }) => {
    const updatedEvenement = await evenementAPI.updateEvenement(id, evenement);
    return updatedEvenement;
  }
);

export const deleteEvenement = createAsyncThunk(
  'evenements/deleteEvenement',
  async (id: string) => {
    await evenementAPI.deleteEvenement(id);
    return id;
  }
);

// Slice Redux
const evenementSlice = createSlice({
  name: 'evenement',
  initialState,
  reducers: {
    incrementConfirmations: (state, action: PayloadAction<string>) => {
      const evenement = state.evenementsAttr.find((e) => e.id === action.payload);
      if (evenement) {
        evenement.invitation.nombreConfirmations += 1;
      }
    },
    incrementDoutes: (state, action: PayloadAction<string>) => {
      const evenement = state.evenementsAttr.find((e) => e.id === action.payload);
      if (evenement) {
        evenement.invitation.nombreDoute += 1;
      }
    },
    incrementRejections: (state, action: PayloadAction<string>) => {
      const evenement = state.evenementsAttr.find((e) => e.id === action.payload);
      if (evenement) {
        evenement.invitation.nombreRejets += 1;
      }
    },
    mettreAJourInvitation: (
      state,
      action: PayloadAction<{ idEv: string; invitation: IInvitation }>
    ) => {
      const { idEv, invitation } = action.payload;
      const evenement = state.evenementsAttr.find((e) => e.id === idEv);
      if (evenement) {
        evenement.invitation = invitation;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvenements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvenements.fulfilled, (state, action) => {
        state.loading = false;
        state.evenementsAttr = action.payload;
      })
      .addCase(fetchEvenements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching events';
      })
      .addCase(fetchEvenementById.fulfilled, (state, action) => {
        const index = state.evenementsAttr.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.evenementsAttr[index] = action.payload;
        } else {
          state.evenementsAttr.push(action.payload);
        }
      })
      .addCase(createEvenement.fulfilled, (state, action) => {
        state.evenementsAttr.unshift(action.payload);
      })
      .addCase(updateEvenement.fulfilled, (state, action) => {
        const index = state.evenementsAttr.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.evenementsAttr[index] = action.payload;
        }
      })
      .addCase(deleteEvenement.fulfilled, (state, action) => {
        state.evenementsAttr = state.evenementsAttr.filter((e) => e.id !== action.payload);
      });
  },
});

export const {
  incrementConfirmations,
  incrementDoutes,
  incrementRejections,
  mettreAJourInvitation,
} = evenementSlice.actions;

export default evenementSlice.reducer;
