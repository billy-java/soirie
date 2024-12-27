import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInvitation } from '../lib/interfaces/entites';
import { initialiserInvitation } from '../lib/functions/initialiseEntities';

interface InvitationsState {
  invitation: IInvitation;
}

const initialState: InvitationsState = {
  invitation: initialiserInvitation(),
};

const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    incrementConfirmations: (state) => {
      state.invitation.nombreConfirmations += 1;
      alert('test ' + state.invitation.nombreConfirmations);
    },
    incrementDoutes: (state) => {
      state.invitation.nombreDoute += 1;
      alert('test ' + state.invitation.nombreDoute);
    },
    incrementRejections: (state) => {
      state.invitation.nombreRejets += 1;
      alert('test ' + state.invitation.nombreRejets);
    },
    updateStatus: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.invitation.statut = action.payload;
      alert('test updateStatus' + action.payload);
    },
    updateNombrePersonnes: (state, action: PayloadAction<number>) => {
      state.invitation.nombrePersonnes = action.payload;
      alert('test updateNombrePersonnes' + action.payload);
    },
  },
});

export const {
  incrementConfirmations,
  incrementDoutes,
  incrementRejections,
  updateStatus,
  updateNombrePersonnes,
} = invitationSlice.actions;

export default invitationSlice.reducer;
