// src/redux/evenementSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvenement, IInvitation } from '../lib/interfaces/entites';
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
    ajouterEvenement: (state, action: PayloadAction<IEvenement>) => {
      /* getTachesParType(action.payload.type!, action.payload.id!); */
      state.evenementsAttr.unshift(action.payload);
    },
    mettreAJourEvenement: (state, action: PayloadAction<IEvenement>) => {
      const index = state.evenementsAttr.findIndex(
        (evenement) => evenement.id === action.payload.id
      );
      if (index !== -1) {
        state.evenementsAttr[index] = {
          ...state.evenementsAttr[index],
          ...action.payload,
        };
      }
    },
    supprimerEvenement: (state, action: PayloadAction<string>) => {
      state.evenementsAttr = state.evenementsAttr.filter(
        (evenement) => evenement.id !== action.payload
      );
    },
    replacerTousLesEvenements: (state, action: PayloadAction<IEvenement[]>) => {
      state.evenementsAttr = action.payload;
    },
    incrementConfirmations: (state, action: PayloadAction<string>) => {
      const evenement = state.evenementsAttr.find(
        (e) => e.id === action.payload
      );
      if (evenement) {
        evenement.invitation.nombreConfirmations += 1;
      }
    },
    incrementDoutes: (state, action: PayloadAction<string>) => {
      const evenement = state.evenementsAttr.find(
        (e) => e.id === action.payload
      );
      if (evenement) {
        evenement.invitation.nombreDoute += 1;
      }
    },
    incrementRejections: (state, action: PayloadAction<string>) => {
      const evenement = state.evenementsAttr.find(
        (e) => e.id === action.payload
      );
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
});

export const {
  ajouterEvenement,
  mettreAJourEvenement,
  supprimerEvenement,
  replacerTousLesEvenements,
  incrementConfirmations,
  incrementDoutes,
  incrementRejections,
  mettreAJourInvitation,
} = evenementSlice.actions;
export default evenementSlice.reducer;
