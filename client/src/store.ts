// src/store.ts

import { createStore, combineReducers } from 'redux';
import edtReducer from './reducers/edtReducer';

const rootReducer = combineReducers({
  edt: edtReducer,
  // Ajoutez d'autres reducers ici si nécessaire
});

export const store = createStore(rootReducer);

// Si vous utilisez TypeScript, vous pouvez également exporter le type RootState
export type RootState = ReturnType<typeof rootReducer>;