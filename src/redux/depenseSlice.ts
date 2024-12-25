// src/redux/depenseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDepense } from '../lib/interfaces/entites';

interface DepenseState {
  depenses: IDepense[];
}

const initialState: DepenseState = {
  depenses: [],
};

const depenseSlice = createSlice({
  name: 'depense',
  initialState,
  reducers: {
    addDepense: (state, action: PayloadAction<IDepense>) => {
      state.depenses.push(action.payload);
    },
    updateDepense: (state, action: PayloadAction<IDepense>) => {
      // Trouver l'indice de la dépense à mettre à jour
      const index = state.depenses.findIndex(
        (depense) => depense.id === action.payload.id
      );

      // Si la dépense existe, on met à jour ses informations
      if (index !== -1) {
        state.depenses[index] = action.payload;
      }
    },

    removeDepense: (state, action: PayloadAction<string>) => {
      state.depenses = state.depenses.filter(
        (depense) => depense.id !== action.payload
      );
    },
    setDepenses: (state, action: PayloadAction<IDepense[]>) => {
      state.depenses = action.payload;
    },
  },
});

export const { addDepense, setDepenses, removeDepense, updateDepense } =
  depenseSlice.actions;
export default depenseSlice.reducer;
