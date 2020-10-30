import React, { useCallback, useState, useMemo } from 'react';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { EnhancedTableHead } from './TableHeader';
import { TableLoading } from './TableLoading';
import { TableBodyResults } from './TableBodyResults';
import { genericValueGetter } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root:     {
    width:   '100%',
    padding: theme.spacing(2)
  },
  paper:    {
    width:        '100%',
    marginBottom: theme.spacing(2),
  },
  table:    {
    minWidth: 750,
  },
  notFound: {
    textAlign: 'center'
  }
}));

export const TableComponent = ({
  rows = [],
  columns = [],
  loading = false
}) => {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handlePageChange = useCallback((evt, page) => {
    setPage(page);
  }, [setPage]);

  const handleRowsCountChange = useCallback((evt) => {
    setRowsPerPage(parseInt(evt.target.value, 10));
    setPage(0);
  }, [setRowsPerPage, setPage]);

  const handleRequestSort = useCallback((columnName) => {
    if (columnName !== orderBy) {
      setOrder(1);
      setOrderBy(columnName);
    } else if (columnName === orderBy && !order) {
      setOrder(1);
    } else if (columnName === orderBy && order === 1) {
      setOrder(-1);
    } else if (columnName === orderBy && order === -1) {
      setOrder(0);
      setOrderBy('');
    }
  }, [order, setOrder, setOrderBy, orderBy]);

  const sortedData = useMemo(() => {
    if (!order || !orderBy) return rows;
    const column = columns.find(col => col.id === orderBy);
    const fallbackA = column.numeric ? -1 : '';
    const fallbackB = column.numeric ? -1 : '';
    return rows
      .sort((itemA, itemB) => {
        const valueA = genericValueGetter(itemA, column, fallbackA);
        const valueB = genericValueGetter(itemB, column, fallbackB);
        return (valueA < valueB ? -1 : (valueA > valueB ? 1 : 0)) * order;
      });
  }, [order, orderBy, rows, columns]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData, page, rowsPerPage, order, orderBy]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {loading && (
                <TableLoading
                  rowsCount={rowsPerPage}
                  columnsCount={columns.length}
                />
              )}
              {!loading && !rows.length ? (
                <TableRow style={{ height: 53 * rowsPerPage }}>
                  <TableCell colSpan={6} className={classes.notFound}>
                    <h3>No results found.</h3>
                  </TableCell>
                </TableRow>
              ) : null}
              {!loading && rows.length ? (
                <TableBodyResults
                  rows={paginatedData}
                  columns={columns}
                />
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
        {!loading && rows.length > 5 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsCountChange}
          />
        )}
      </Paper>
    </div>
  );
};