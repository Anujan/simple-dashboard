import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as campaignActions from '../actions/campaignActions';
import CurrentCampaignBox from './CurrentCampaignBox';
if (__CLIENT__) {
  require('./CampaignsContainer.scss');
}

class CampaignsList extends Component {
  componentWillMount() {
    this.setState({
      currentCampaign: this.props.campaigns[0]
    });
  }
  setCurrentCampaign(campaign) {
    this.setState({
      currentCampaign: campaign
    });
  }
  render() {
    const {campaigns} = this.props;
    const campaignNames = campaigns.map((campaign) => {
      return <li onClick={this.setCurrentCampaign.bind(this, campaign)}>{campaign.name}</li>
    });
    return (
      <div>
        <ul className="campaignSelection">
          {campaignNames}
        </ul>
        <CurrentCampaignBox currentCampaign={this.state.currentCampaign} />
      </div>
    );
  }
}

@connect(state => ({
  campaigns: state.campaigns
}))
export default class CampaignsContainer {
  render() {
    const { campaigns, dispatch } = this.props;
    return <CampaignsList campaigns={campaigns.data} {...bindActionCreators(campaignActions, dispatch)}/>;
  }
}
