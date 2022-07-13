/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import { Table } from './components/Table/Table';
import { TableType } from './react-app-env';
import { SetM, SetN, SetX } from './store/actions';

const getRundomInt = (num: number) => {
  return Math.floor(Math.random() * num) + 1;
};

export const App: React.FC = () => {
  const rowArray: TableType[] = [];
  const colArray: TableType[] = [];
  const dispatch = useDispatch();

  function getRownCol() {
    let x = 0;
    const lengthsCol = getRundomInt(100);
    const lengthsRow = getRundomInt(100);

    for (let i = 0; i <= lengthsCol; i++) {
      colArray.push({ id: uuidv4(), value: getRundomInt(100) });
    }

    for (let i = 0; i <= lengthsRow; i++) {
      rowArray.push({ id: uuidv4(), value: getRundomInt(100) });
    }

    dispatch(SetM(rowArray));
    dispatch(SetN(colArray));
    x = getRundomInt((lengthsCol + lengthsRow) - 1);
    dispatch(SetX(x));
  }

  useEffect(() => { }, []);

  getRownCol();

  return (
    <div className="matrix">
      <div className="table-container">
        <Table />
      </div>
    </div>
  );
};
