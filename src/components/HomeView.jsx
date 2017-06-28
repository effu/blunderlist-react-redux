/* HomeView.jsx */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import { THEME } from '../utils';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {}

  render() {
    return (
      <MuiThemeProvider muiTheme={THEME}>
        <div>
          <AppBar
            title="Blunder List"
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default HomeView;
