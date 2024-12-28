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
    setToutesLesTaches: (state, action: PayloadAction<ITache[]>) => {
      state.taches = action.payload;
    },
    setToutesLesTachesPrioritaires: (state, action: PayloadAction<ITache[]>) => {
      // Récupérer les tâches prioritaires existantes
      const tachesPrioritairesExistantes = state.taches.filter(tache => tache.priorite === 3);
    
      // Mettre à jour l'état avec les nouvelles tâches prioritaires
      state.taches = state.taches.map(tache =>
        tachesPrioritairesExistantes.some(tp => tp.id === tache.id)
          ? action.payload.find(nt => nt.id === tache.id) || tache
          : tache
      );
    
      // Ajouter les nouvelles tâches qui ne sont pas encore dans l'état
      action.payload.forEach(tache => {
        if (!state.taches.some(t => t.id === tache.id)) {
          state.taches.push(tache);
        }
      });
    },
    
  },
});

export const { addTache, updateTache, removeTache , setToutesLesTaches, setToutesLesTachesPrioritaires } =
  tacheSlice.actions;
export default tacheSlice.reducer;
