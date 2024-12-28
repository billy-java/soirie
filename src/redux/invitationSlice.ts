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
      alert('test ' + state.invitation.nombrePersonnes);
    },
    incrementRejections: (state) => {
      state.invitation.nombreRejets += 1;
      alert('test ' + state.invitation.nombreRejets);
    },
    updateInvitation: (state, action: PayloadAction<Partial<IInvitation>>) => {
      state.invitation = { ...state.invitation, ...action.payload };
    },
  },
});

export const {
  incrementConfirmations,
  incrementDoutes,
  incrementRejections,
  updateInvitation,
} = invitationSlice.actions;

export default invitationSlice.reducer;
