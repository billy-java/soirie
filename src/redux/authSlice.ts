import { IUtilisateur } from './../lib/interfaces/entites';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '../lib/interfaces/IAuth';
import { utilisateurs } from '../lib/localDB';
import { genererIdUnique, genererToken } from '../lib/functions/mesFonctions';

const initialState: IAuth = {
  userActuel: null,
  token: null,
  idEv: '0',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    connexionF: (
      state,
      action: PayloadAction<{ email: string; motDePasse: string }>
    ) => {
      const user = utilisateurs.find(
        (u) =>
          u.email === action.payload.email &&
          u.motDePasse === action.payload.motDePasse
      );

      if (user) {
        state.userActuel = user;
        state.token = genererToken(user.id);
        state.idEv = null;
      } else {
        state.userActuel = null;
        state.token = null;
        state.idEv = null;
      }
    },
    inscriptionF: (
      state,
      action: PayloadAction<{
        nom: string;
        email: string;
        motDePasse: string;
        telephone: string;
      }>
    ) => {
      const user = utilisateurs.find((u) => u.email === action.payload.email);

      if (!user) {
        const userID = genererIdUnique('USER');
        state.userActuel = {
          id: userID,
          idsEvenements: [],
          nom: action.payload.nom,
          email: action.payload.email,
          motDePasse: action.payload.motDePasse,
          telephone: action.payload.telephone,
          role: 1,
        };
        state.token = genererToken(userID);
        state.idEv = null;
      } else {
        state.userActuel = null;
        state.token = null;
        state.idEv = null;
      }
    },
    logoutF: (state) => {
      state.userActuel = null;
      state.token = null;
      state.idEv = null;
    },
    restaurerF: (state, action: PayloadAction<string>) => {
      const user = utilisateurs.find((u) => u.email === action.payload);

      if (user) {
        state.userActuel = user;
        state.token = genererToken(user.id);
        state.idEv = null;
      } else {
        state.userActuel = null;
        state.token = null;
        state.idEv = null;
      }
    },
    setTokenF: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setIdEvF: (state, action: PayloadAction<string | null>) => {
      state.idEv = action.payload;
    },
    mettreAJourUtilisateur: (
      state,
      action: PayloadAction<Partial<IUtilisateur>>
    ) => {
      if (state.userActuel) {
        state.userActuel = { ...state.userActuel, ...action.payload };
     }
    },
  },
});

export const {
  connexionF,
  inscriptionF,
  logoutF,
  restaurerF,
  setTokenF,
  setIdEvF,
  mettreAJourUtilisateur,
} = authSlice.actions;

export default authSlice.reducer;
