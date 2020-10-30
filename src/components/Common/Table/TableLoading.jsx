import React, { memo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { TableRow, TableCell } from '@material-ui/core';

export const TableLoading = memo(({rowsCount, columnsCount}) => {
  const rows = new Array(rowsCount)
    .fill(1)
    .map((_, idx) => idx);
  const columns = new Array(columnsCount)
    .fill(1)
    .map((_, idx) => idx);
  return (
    <>
      {rows.map((rowKey) => (
        <TableRow key={rowKey}>
          {columns.map(columnKey => (
            <TableCell key={columnKey}>
              <Skeleton height={40}/>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
});
