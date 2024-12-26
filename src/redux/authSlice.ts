import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUtilisateur } from '../lib/interfaces/entites';
import { IAuth } from '../lib/interfaces/IAuth';

const initialState: IAuth = {
  userActuel: null,
  token: null,
  idEv: '0',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<IAuth>
    ) => {
      const { userActuel, token, idEv } = action.payload;
      state.userActuel = userActuel;
      state.token = token;
      state.idEv = idEv;
    },
    logout: (state) => {
      state.userActuel = null;
      state.token = null;
      state.idEv = null;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserActuel: (state, action: PayloadAction<IUtilisateur | null>) => {
      state.userActuel = action.payload;
    },
    setIdEv: (state, action: PayloadAction<string | null>) => {
      state.idEv = action.payload;
    },
  },
});

export const { login, logout, setToken, setUserActuel, setIdEv } = authSlice.actions;

export default authSlice.reducer;
