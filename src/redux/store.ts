// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import evenementReducer from './evenementSlice';
import tacheReducer from './tacheSlice';
import depenseReducer from './depenseSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    evenement: evenementReducer,
    tache: tacheReducer,
    depense: depenseReducer,
  },
});

export type RootState_DB = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
