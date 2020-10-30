import React, { memo, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {clearErrors} from '../../../actions/fetchGitActions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ErrorHandler = memo((props) => {
  const dispatch = useDispatch();
  const repositoriesError = useSelector(({gitReducer}) => gitReducer.repositoriesError, shallowEqual);
  const licensesError = useSelector(({gitReducer}) => gitReducer.licensesError, shallowEqual);

  const handleClose = useCallback(() => {
    dispatch(clearErrors())
  }, [dispatch])

  return (
    <Snackbar open={!!(repositoriesError || licensesError)} autoHideDuration={3000} onClose={handleClose} >
      <Alert severity="error">
        {/* eslint-disable-next-line no-mixed-operators */}
        {repositoriesError && repositoriesError.message || licensesError && licensesError.message}
      </Alert>
    </Snackbar>
  );
});