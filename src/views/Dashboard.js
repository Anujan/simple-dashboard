import React, {Component} from 'react';
import CampaignsContainer from '../components/CampaignsContainer';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <CampaignsContainer />
      </div>
    );
  }
}
