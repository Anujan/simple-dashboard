import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isInfoLoaded} from '../reducers/info';
import {load as loadInfo} from '../actions/infoActions';
import {createTransitionHook} from '../universalRouter';
import InfoBar from '../components/InfoBar';

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
        <InfoBar />
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

@connect(state => ({}))
export default
class AppContainer {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    const promises = [];
    if (!isInfoLoaded(store.getState())) {
      promises.push(store.dispatch(loadInfo()));
    }
    return Promise.all(promises);
  }

  render() {
    const { dispatch } = this.props;
    return <App>
      {this.props.children}
    </App>;
  }
}
