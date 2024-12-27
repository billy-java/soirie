// src/redux/tacheSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITache } from '../lib/interfaces/entites';
import { anniversaireTaches } from '../lib/localDB';

interface TacheState {
  taches: ITache[];
}

const initialState: TacheState = {
  taches: anniversaireTaches || [],
};

const tacheSlice = createSlice({
  name: 'tache',
  initialState,
  reducers: {
    addTache: (state, action: PayloadAction<ITache>) => {
      state.taches.push(action.payload);
    },
    updateTache: (state, action: PayloadAction<ITache>) => {
      const index = state.taches.findIndex(
        (tache) => tache.id === action.payload.id
      );
      if (index !== -1) {
        state.taches[index] = action.payload;
      }
    },

    removeTache: (state, action: PayloadAction<string>) => {
      state.taches = state.taches.filter(
        (tache) => tache.id !== action.payload
      );
    },
    setTaches: (state, action: PayloadAction<ITache[]>) => {
      state.taches = action.payload;
    },
  },
});

export const { addTache, updateTache, setTaches, removeTache } =
  tacheSlice.actions;
export default tacheSlice.reducer;
