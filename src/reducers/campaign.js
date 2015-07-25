import {
  CAMPAIGN_LOAD,
  CAMPAIGN_LOAD_SUCCESS,
  CAMPAIGN_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {
  loaded: false
};

export default function load(state = initialState, action = {}) {
  switch (action.type) {
    case CAMPAIGN_LOAD:
      return {
        ...state,
        loading: true
      };
    case CAMPAIGN_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case CAMPAIGN_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.campaigns && globalState.campaigns.loaded;
}