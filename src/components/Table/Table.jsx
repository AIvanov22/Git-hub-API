import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {TableComponent} from '../Common/Table/Table';
import { makeStyles } from '@material-ui/core/styles';

const columns = [{
  id: 'name',
  numeric: false,
  disablePadding: false,
  label: 'Name',
}, {
  id: 'svn_url',
  numeric: false,
  disablePadding: false,
  label: 'URL',
  asLink: true,
  href: (row, column) => row[column.id],
}, {
  id: 'stargazers_count',
  numeric: true,
  disablePadding: false,
  label: 'Stars',
}, {
  id: 'license',
  numeric: false,
  disablePadding: false,
  label: 'License',
  cellRenderer: (row) => {
    return row.license.name;
  },
}];

const useStyles = makeStyles((theme) => ({
  executeSearchText: {
    padding: theme.spacing(5),
    fontWeight: 600,
    textAlign: 'center'
  }
}))

export default function EnhancedTable () {
  const classes = useStyles();
  const repositoriesData = useSelector(({gitReducer}) => gitReducer.repositoriesData, shallowEqual);
  const repositoriesLoading = useSelector(({gitReducer}) => gitReducer.repositoriesLoading, shallowEqual);
  const repositoriesDirty = useSelector(({gitReducer}) => gitReducer.repositoriesDirty, shallowEqual);

  if (!repositoriesDirty) {
    return (
      <div className={classes.executeSearchText}>
        <h2>Please execute search to see some results.</h2>
        <h4>Ex. "google" with "Apache 2.0" license.</h4>
      </div>
    )
  }
  
  return (
    <TableComponent
      columns={columns}
      rows={repositoriesData}
      loading={repositoriesLoading}
    />
  );
}
