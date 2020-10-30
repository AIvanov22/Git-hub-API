import {
  FETCH_LICENSES_ERROR,
  FETCH_LICENSES_START,
  FETCH_LICENSES_SUCCESS,
  FETCH_REPOSITORIES_ERROR,
  FETCH_REPOSITORIES_START,
  FETCH_REPOSITORIES_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/fetchGitConstants';
import { fetchLicenses, lookupRepositories } from '../api/gitApi';
import {formatDate, getMonthAgoDate} from '../utils/utils';

export const getRepositories = (query, license) => async (dispatch) => {
  dispatch({
    type:FETCH_REPOSITORIES_START
  })
  try {
    const { total_count, message } = await lookupRepositories(
      query,
      formatDate(getMonthAgoDate()),
      license,
      0,
      1
    );
    if (message) {
      dispatch({
        type: FETCH_REPOSITORIES_ERROR,
        payload: {
          message
        },
      });
      return;
    }
    const amountOfRequests = Math.ceil(total_count / 100);
    const requests = new Array(amountOfRequests)
      .fill(1)
      .map((_, page) => lookupRepositories(
        query,
        formatDate(getMonthAgoDate()),
        license,
        page + 1,
      ));
    const repositories = await Promise.all(requests)
      .then((data) => data.reduce((acc, result) => [...acc, ...result.items], []))
    dispatch({
      type: FETCH_REPOSITORIES_SUCCESS,
      payload: repositories,
    });
  } catch(error) {
    dispatch({
      type: FETCH_REPOSITORIES_ERROR,
      payload: error
    })
  }
}

export const getLicenses = () => async (dispatch) => {
  dispatch({
    type: FETCH_LICENSES_START
  });
  try {
    const licenses = await fetchLicenses();
    dispatch({
      type: FETCH_LICENSES_SUCCESS,
      payload: licenses
    });
  } catch(error) {
    dispatch({
      type: FETCH_LICENSES_ERROR,
      payload: error
    })
  }
}

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
