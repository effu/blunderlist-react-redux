/* src/routes.jsx */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NotFoundView from './components/NotFoundView';
import HomeView from './components/HomeView';
import LoginView from './components/LoginView';
import Clarence from './components/Clarence';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="/loafed_bread" component={LoginView} />
    <Route path="/desertTortoise" component={Clarence} />
    <Route path="*" component={NotFoundView} />
  </Route>
);
