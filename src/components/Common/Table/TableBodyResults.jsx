import React from 'react';
import { Link, TableCell, TableRow } from '@material-ui/core';
import {genericValueGetter} from '../../../utils/utils';

export const TableBodyResults = ({ rows, columns }) => {
  const renderCell = (column, row) => {
    const cellValue = genericValueGetter(row, column);

    if (column.asLink) {
      const href = column.href && typeof column.href === 'string' ?
        column.href : typeof column.href === 'function' ?
          column.href(row, column) : '#';
      return (
        <Link
          href={href}
          target='_blank'
          rel='noopener noreferrer'
        >
          {cellValue}
        </Link>
      );
    }
    return cellValue;
  };
  return rows
    .map(row => {
      return (
        <TableRow
          hover
          role="checkbox"
          tabIndex={-1}
          key={row.id}
        >
          {columns.map(column => (
            <TableCell
              padding={column.disablePadding ? 'none' : 'default'}
              align={column.numeric ? 'right' : 'left'}
              key={column.id}
            >
              {renderCell(column, row)}
            </TableCell>
          ))}
        </TableRow>
      );
    });
};
