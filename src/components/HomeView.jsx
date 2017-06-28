/* HomeView.jsx */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import BlunderLeftDrawerContent from './BlunderLeftDrawerContent';
import BlunderList from './BlunderList';

import { THEME } from '../utils';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showleftDrawer: false,
    };
  }
  state = {}

  render() {
    return (
      <MuiThemeProvider muiTheme={THEME}>
        <div>
          <AppBar
            title="Blunder List"
            onLeftIconButtonTouchTap={() => this.setState({ showLeftDrawer: true })}
          />
          <div className="home-view">
            <div className="blunder-left-drawer">
              <Drawer
                open={this.state.showLeftDrawer}
              >
                <BlunderLeftDrawerContent
                  closeDrawer={() => this.setState({ showLeftDrawer: false })}
                />
              </Drawer>
            </div>
            <BlunderList
              showItemDetail={() => console.log('BlunderListj component')}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default HomeView;
