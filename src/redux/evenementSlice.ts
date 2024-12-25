// src/redux/evenementSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvenement } from '../lib/interfaces/entites';
import { evenements } from '../lib/localDB';

interface EvenementState {
  evenementsAttr: IEvenement[];
}

const initialState: EvenementState = {
  evenementsAttr: evenements,
};

const evenementSlice = createSlice({
  name: 'evenement',
  initialState,
  reducers: {
    addEvenement: (state, action: PayloadAction<IEvenement>) => {
      state.evenementsAttr.push(action.payload);
    },
    setEvenements: (state, action: PayloadAction<IEvenement[]>) => {
      state.evenementsAttr = action.payload;
    },
    removeEvenement: (state, action: PayloadAction<string>) => {
      state.evenementsAttr = state.evenementsAttr.filter(
        (evenement) => evenement.id !== action.payload
      );
    },
  },
});

export const { addEvenement, setEvenements, removeEvenement } =
  evenementSlice.actions;
export default evenementSlice.reducer;
