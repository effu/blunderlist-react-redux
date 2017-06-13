import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NotFoundView from './components/NotFoundView';
import HomeView from './components/HomeView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="*" component={NotFoundView} />
  </Route>
);
