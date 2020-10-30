import React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

export const EnhancedTableHead = ({
  columns,
  orderBy,
  onRequestSort,
  order,
}) => {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.numeric ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === column.id && order === 0 ? false : orderBy === column.id && order === 1 ? 'asc' : 'desc'}
          >
            <TableSortLabel
              active={orderBy === column.id && order !== 0}
              direction={orderBy === column.id && order === 1 ? 'asc' : 'desc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};