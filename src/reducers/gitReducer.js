import {
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_LICENSES_START,
  FETCH_LICENSES_ERROR,
  FETCH_LICENSES_SUCCESS,
  FETCH_REPOSITORIES_START,
  FETCH_REPOSITORIES_ERROR,
  CLEAR_ERRORS
} from '../constants/fetchGitConstants';

const initialState = {
  repositoriesData: [],
  repositoriesLoading: false,
  repositoriesError: null,
  repositoriesDirty: false,
  licensesData: [],
  licensesLoading: false,
  licensesError: null,
};

export const gitReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LICENSES_START: {
      return {...state, licensesLoading: true};
    }
    case FETCH_LICENSES_ERROR: {
      return {...state, licensesLoading: false, licensesError: action.payload}
    }
    case FETCH_LICENSES_SUCCESS: {
      return {...state, licensesLoading: false, licensesData: action.payload}
    }
    case FETCH_REPOSITORIES_START: {
      return {...state, repositoriesLoading: true, repositoriesDirty: true};
    }
    case FETCH_REPOSITORIES_ERROR: {
      return {...state, repositoriesLoading: false, repositoriesError: action.payload}
    }
    case FETCH_REPOSITORIES_SUCCESS: {
      return {...state, repositoriesLoading: false, repositoriesData: action.payload}
    }
    case CLEAR_ERRORS: {
      return {...state, licensesError: null, repositoriesError: null};
    }
    default: {
      return state;
    }
  }
};