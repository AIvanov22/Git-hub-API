import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { SelectComponent } from '../Common/Select/Select';
import {getLicenses, getRepositories} from '../../actions/fetchGitActions';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  queryInput: {
    marginRight: theme.spacing(2),
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  inputClass: {
    width: '100%'
  },
  licenseSelect: {
    width: '25%',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    },
  },
  submit: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  }
}));

export const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const licenses = useSelector(
    ({gitReducer}) => gitReducer.licensesData,
    shallowEqual
  );
  const licensesLoading = useSelector(
    ({gitReducer}) => gitReducer.licensesLoading,
    shallowEqual
  );
  const repositoriesLoading = useSelector(
    ({gitReducer}) => gitReducer.repositoriesLoading,
    shallowEqual
  );

  const [query, setQuery] = useState('');
  const [license, setLicense] = useState('');
  const [errors, setErrors] = useState({
    query: false,
    license: false
  });

  const handleQueryChange = useCallback((evt) => {
    const { value } = evt.target;
    setQuery(value);
    setErrors({
      ...errors,
      query: false
    })
  }, [errors]);

  const handleLicenseChange = useCallback((evt) => {
    const { value } = evt.target;
    setLicense(value);
    setErrors({
      ...errors,
      license: false
    })
  }, [errors]);

  const startSearch = useCallback(() => {
    if (!query.length || !license.length) {
      setErrors({
        query: !query.length ,
        license: !license.length
      })
      return;
    }
    dispatch(getRepositories(query, license));
  }, [dispatch, license, query])

  const handleKeyDown = useCallback((evt) => {
    if (evt.which === 13) {
      startSearch();
    }
  }, [startSearch]);

  useEffect(() => {
    dispatch(getLicenses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classes.searchContainer}
      onKeyDown={handleKeyDown}
    >
      <div className={classes.queryInput}>
        <TextField
          name="query"
          label="Search query"
          value={query}
          onChange={handleQueryChange}
          className={classes.inputClass}
          required
          helperText={errors.query ? "Query string is required" : ''}
          error={errors.query}
        />
      </div>
      <div className={classes.licenseSelect}>
        <SelectComponent
          name="license"
          label="Search license"
          value={license}
          onChange={handleLicenseChange}
          loading={licensesLoading}
          values={licenses}
          helperText={errors.license ? 'License is required': ''}
          error={errors.license}
        />
      </div>
      <div className={classes.submit}>
        <Button
          variant="contained"
          color="primary"
          onClick={startSearch}
          disabled={repositoriesLoading}
        >
          Search
        </Button>
      </div>
    </div>
  )

}