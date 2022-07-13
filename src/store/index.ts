/* eslint-disable import/extensions */
import { configureStore, createReducer } from '@reduxjs/toolkit';
import {
  SetAverageVal,
  SetM,
  SetN,
  SetTable,
  SetX,
} from './actions';
// eslint-disable-next-line import/no-unresolved
import { State } from '../react-app-env';

const initialState: State = {
  M: [],
  N: [],
  table: [],
  average: [],
  delete: [],
  x: 0,
};

const reducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(SetM, (state, action) => {
        state.M = action.payload;
      })
      .addCase(SetN, (state, action) => {
        state.N = action.payload;
      })
      .addCase(SetTable, (state, action) => {
        state.table = action.payload;
      })
      .addCase(SetAverageVal, (state, action) => {
        state.average = action.payload;
      })
      .addCase(SetX, (state, action) => {
        state.x = action.payload;
      });
  },
);

export const store = configureStore({ reducer });
