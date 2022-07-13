/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import './Table.scss';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { TableType } from '../../react-app-env';
import { SetTable } from '../../store/actions';
import {
  getMArray,
  getNArray,
  getTableArray,
  getX,
} from '../../store/selectors';

function getRowMore(length: number, col: TableType[]) {
  const newRow = [];

  if (col.length > 0) {
    for (let i = 0; i <= length; i++) {
      newRow.push({
        id: uuidv4(),
        value: (Math.floor(Math.random() * 100) + 1) * col[i].value,
      });
    }
  }

  return newRow;
}

const getSum = (val: TableType[]): number => {
  let sum = 0;

  for (let i = 0; i < val.length; i++) {
    sum += val[i].value;
  }

  return sum;
};

const getLightVal = (intX: number, tableArr: TableType[][], value: number) => {
  const lightArray: string[] = [];
  let count = 0;

  while (lightArray.length <= intX) {
    // eslint-disable-next-line no-loop-func
    tableArr.forEach(char => {
      char.find(elem => {
        if (elem.value === (value + count)) {
          lightArray.push(elem.id);
        }

        if (elem.value === (value - count)) {
          lightArray.push(elem.id);
        }

        return 0;
      });
    });

    count -= 1;
  }

  return lightArray;
};

const getAverage = (table: TableType[][]) => {
  let average = [];

  if (table.length > 0) {
    average = new Array(table[0].length);
  }

  average.fill(0);
  // eslint-disable-next-line no-console
  console.log(table);
  for (const char of table) {
    for (const elem of char) {
      average[char.indexOf(elem)] += elem.value;
    }
  }

  return average.map(sum => Math.round(sum / table.length));
};

export const Table: React.FC = () => {
  const dispatch = useDispatch();
  const row = useSelector(getMArray);
  const col = useSelector(getNArray);
  const X = useSelector(getX);
  const table = useSelector(getTableArray);
  const [lightArray, setLightArray] = useState<string[]>([]);

  const changeValue = (id: string) => {
    const tabled = [...table];

    for (const char of tabled) {
      tabled[table.indexOf(char)] = char.map(elem => (elem.id === id
        ? { value: elem.value + 1, id: elem.id }
        : { value: elem.value, id: elem.id }));
    }

    dispatch(SetTable(tabled));
  };

  const getTable = () => {
    const tableArray: TableType[][] = [];

    for (let i = 0; i < col.length; i++) {
      tableArray.push(row.map(elemOfRow => (
        { id: uuidv4(), value: elemOfRow.value * col[i].value }
      )));
    }

    dispatch(SetTable(tableArray));

    return tableArray;
  };

  useEffect(() => {
    getAverage(table);
    dispatch(SetTable(table));
    getTable();
    dispatch(SetTable(getTable()));
  }, []);

  return (
    <>
      <table className="
    matrix__table
    table
    is-bordered
    is-striped
    is-narrow
    is-hoverable
    content is-small"
      >
        <tbody className="matrix__table__body">
          {table.map(rows => (
            <tr key={table.indexOf(rows)} className="matrix__table__row">
              {rows.map(cols => (
                <td
                  key={uuidv4()}
                  className="matrix__table__col p-0"
                >
                  <button
                    type="button"
                    className={classNames(
                      'button is-white matrix__table__col-buttom is-small has-text-grey-dark',
                      {
                        'has-background-grey-light': lightArray.includes(cols.id),
                      },
                    )}
                    onFocus={() => (setLightArray(getLightVal(X, table, cols.value)))}
                    onMouseOver={() => (setLightArray(getLightVal(X, table, cols.value)))}
                    onMouseDown={() => changeValue(cols.id)}
                  >
                    <b>{cols.value}</b>
                  </button>
                </td>
              ))}
              <td className="
            has-background-primary-light
             matrix__table__sum-buttom
             p-0"
              >
                <button
                  type="button"
                  className="button
                is-primary
                is-light
                is-small
                matrix__table__col-buttom"
                  onMouseDown={() => {
                    dispatch(SetTable(table.filter(elem => (
                      table.indexOf(elem) !== table.indexOf(rows)))));
                  }}
                >
                  <b>
                    {getSum(rows)}
                  </b>
                </button>
              </td>
            </tr>
          ))}
          <tr className="matrix__table__row p-0">
            {getAverage(table).map(averageVal => (
              <td
                className="
              matrix__table__row-average
              p-0
              has-background-primary-light
              py-1
              "
                key={uuidv4()}
              >
                <b>{averageVal}</b>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => dispatch(SetTable([...table, getRowMore(table[0].length - 1, col)]))}
      >
        Add row
      </button>
    </>
  );
};
