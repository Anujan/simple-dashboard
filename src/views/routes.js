import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import Dashboard from 'views/Dashboard';

export default (
  <Route component={App}>
    <Route path="/" component={Dashboard}/>
  </Route>
);
