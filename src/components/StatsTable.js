import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as campaignActions from '../actions/campaignActions';
import CurrentCampaignBox from './CurrentCampaignBox';
if (__CLIENT__) {
  require('./CampaignsContainer.scss');
}

const stats = ['impressions', 'clicks'];

export default class StatsTable extends Component {
  render() {
    return <div>{this.renderTable()}</div>;
  }

  renderTable() {
    return (
      <div>
        <h3>Campaign Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>
                Stat
              </th>
              <th>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {(
              stats.map((stat) => {
                return <tr>
                  <td>
                    {stat}
                  </td>
                  <td>
                    {this.props.currentCampaign[stat].map((data) => data.count).reduce((acc, count) => acc + count, 0)}
                  </td>
                </tr>
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
