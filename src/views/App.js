import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isCampaignLoaded} from '../reducers/campaign';
import * as campaignActions from '../actions/campaignActions';
import {load as loadCampaign} from '../actions/campaignActions';
import {createTransitionHook} from '../universalRouter';

if (__CLIENT__) {
  require('./App.scss');
}

class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    router.addTransitionHook(createTransitionHook(store));
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div className="container app">
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

@connect(state => ({ campaigns: state.campaigns }))
export default
class AppContainer {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    const promises = [];
    if (!isCampaignLoaded(store.getState())) {
      promises.push(store.dispatch(loadCampaign()));
    }
    return Promise.all(promises);
  }

  render() {
    const { campaigns, dispatch } = this.props;
    return <App campaigns={campaigns} {...bindActionCreators(campaignActions, dispatch)}>
      {this.props.children}
    </App>;
  }
}
