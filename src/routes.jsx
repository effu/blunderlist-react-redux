/* src/routes.jsx */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import NotFoundView from './components/NotFoundView';
import HomeView from './components/HomeView';
// import LoginView from './components/LoginView';
import Clarence from './components/Clarence';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="/clarence" component={Clarence} />
    {/*
      "/lists(/:groupId)"
      1. http://localhost:3000/lists
      2. http://localhost:3000/lists/
      3. http://localhost:3000/lists/abcd-123-efgh
    */}
    <Route path="/lists(/:groupId)" component={HomeView} />
    {/*
      "http://localhost:3000/lists/:groupId/items/:itemId"
    */}
    <Route path="/lists/:groupId/items/:itemId" component={HomeView} />
    {/*
      "http://localhost:3000" everything else
    */}
    <Route path="*" component={NotFoundView} />
  </Route>
);
