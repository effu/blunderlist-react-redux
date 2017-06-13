/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/Root';
import { store, history } from './store/configureStore';
import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
