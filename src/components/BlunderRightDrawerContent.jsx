/* components/BlunderRightDrawerContent.jsx */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
} from 'material-ui/List';
import MenuSVG from 'material-ui/svg-icons/navigation/menu';


class BlunderRightDrawerContent extends Component {
  state = {};

  render() {
    return (
      <List>
        <ListItem
          onTouchTap={() => this.props.closeDrawer()}
          rightIcon={<MenuSVG />}
        />
      </List>

    );
  }
}
BlunderRightDrawerContent.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default BlunderRightDrawerContent;
