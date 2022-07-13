import { createAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { TableType } from '../react-app-env';
import { ActionTypes } from './ActionTypes';

export const SetM = createAction<TableType[]>(ActionTypes.SET_M);

export const SetN = createAction<TableType[]>(ActionTypes.SET_N);

export const SetTable = createAction<TableType[][]>(ActionTypes.SET_TABLE);

export const SetAverageVal = createAction<number[]>(ActionTypes.SET_AVERAGE);

export const SetX = createAction<number>(ActionTypes.SET_X);
