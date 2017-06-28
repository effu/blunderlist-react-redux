/* components/BlunderLeftDrawerContent.jsx */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// non default exports in curly braces
import { List, ListItem } from 'material-ui/List';
import MenuSVG from 'material-ui/svg-icons/navigation/menu';

class BlunderLeftDrawerContent extends Component {
  state = {}

  render() {
    return (
      <div>
        <List>
          <ListItem
            onTouchTap={() => this.props.closeDrawer()}
            rightIcon={<MenuSVG />}
          />
        </List>
      </div>
    );
  }
}

BlunderLeftDrawerContent.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default BlunderLeftDrawerContent;
