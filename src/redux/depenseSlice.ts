// src/redux/depenseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDepense } from '../lib/interfaces/entites';
import { depenses } from '../lib/localDB';

interface DepenseState {
  depenses: IDepense[];
}

const initialState: DepenseState = {
  depenses: depenses || [],
};

const depenseSlice = createSlice({
  name: 'depense',
  initialState,
  reducers: {
    ajouterDepense: (state, action: PayloadAction<IDepense>) => {
      state.depenses.unshift(action.payload);
    },
    mettreAJourDepense: (state, action: PayloadAction<IDepense>) => {
      // Trouver l'indice de la dépense à mettre à jour
      const index = state.depenses.findIndex(
        (depense) => depense.id === action.payload.id
      );

      // Si la dépense existe, on met à jour ses informations
      if (index !== -1) {
        state.depenses[index] = {
          ...state.depenses[index],
          ...action.payload,
        };
      }
    },

    supprimerDepense: (state, action: PayloadAction<string>) => {
      state.depenses = state.depenses.filter(
        (depense) => depense.id !== action.payload
      );
    },
    replacerTousLesDepenses: (state, action: PayloadAction<IDepense[]>) => {
      state.depenses = action.payload;
    },
  },
});

export const {
  ajouterDepense,
  mettreAJourDepense,
  supprimerDepense,
  replacerTousLesDepenses,
} = depenseSlice.actions;
export default depenseSlice.reducer;
