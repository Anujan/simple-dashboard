import {
  CAMPAIGN_LOAD,
  CAMPAIGN_LOAD_SUCCESS,
  CAMPAIGN_LOAD_FAIL,
  SET_CURRENT_CAMPAIGN
} from './actionTypes';

export function load() {
  return {
    types: [CAMPAIGN_LOAD, CAMPAIGN_LOAD_SUCCESS, CAMPAIGN_LOAD_FAIL],
    promise: (client) => client.get('/loadCampaign')
  };
}

export function setCurrentCampaign(campaign) {
  return {
    types: [SET_CURRENT_CAMPAIGN],
    payload: campaign
  };
}
