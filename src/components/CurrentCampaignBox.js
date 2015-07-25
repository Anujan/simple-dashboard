import * as campaignActions from '../actions/campaignActions';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {LineChart, Brush} from 'react-d3-components';
import d3 from 'd3';
import StatsTable from './StatsTable';

let dashFunc = function(label) {
  if (label == "Impressions") {
    return "4 4 4";
  }
  return "3 4 3";
};

let widthFunc = function(label) {
  if (label == "Impressions") {
    return "4";
  }
  if (label == "Impressions") {
    return "2";
  }
};

let linecapFunc = function(label) {
  return "round";
};

export default class CurrentCampaignBox extends Component {
  componentWillMount() {
    this.setChartData(this.props.currentCampaign);
  }

  componentWillUpdate(nextProps) {
    //TODO compare with id
    if (this.props.currentCampaign.name !== nextProps.currentCampaign.name) {
      this.setChartData(nextProps.currentCampaign);
    }
  }

  setChartData(campaign) {
    this.setState({
      data: [{
              label: 'Impressions',
              values: campaign.impressions.map((impression) => {
                return { x: impression.date, y: impression.count };
              })
            },
            {
              label: 'Clicks',
              values: campaign.clicks.map((clicks) => {
                return { x: clicks.date, y: clicks.count };
              })
            }],
      xScale: d3.time.scale().domain([new Date(2015, 7, 16), new Date(2015, 7, 25)]).range([0, 700])
    });
  }

  render() {
    const {currentCampaign} = this.props;
    if (typeof currentCampaign !==  'object') {
      return (<div></div>);
    }
    return (
      <div>
        <h1>{currentCampaign.name}</h1>
        <LineChart
           key={currentCampaign.name}
           data={this.state.data}
           width={700}
           height={400}
           margin={{top: 10, bottom: 50, left: 50, right: 20}}
           xAxis={{label: 'Date', tickValues: this.state.xScale.ticks(d3.time.day, 2), tickFormat: d3.time.format('%m/%d')}}
           yAxis={{label: 'Impressions'}}
           stroke={{strokeDasharray: dashFunc, strokeWidth: widthFunc, strokeLinecap: linecapFunc}}
        />
        <StatsTable currentCampaign={currentCampaign} />
      </div>
    );
  }
}
