/// <reference types="react-scripts" />

export interface State {
  M: TableType[],
  N: TableType[],
  table: TableType[][];
  average: number[];
  x: number;
  delete: TableType[][];
}

export interface TableType {
  id: string;
  value: number;
}
