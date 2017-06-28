/* componenets/BlunderList.jsx */

import React from 'react';
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';

class BlunderList extends React.Component {
  state={}

  updateParams = (randomString) => {
    const path = `/lists/${randomString}`;
    console.log(path);
    this.props.showItemDetail();
  }

  render() {
    return (
      <List>
        <ListItem>
          <FlatButton
            label={<del>Item Name</del>}
            onTouchTap={() => this.updateParams('item')}
          />
        </ListItem>
      </List>
    );
  }
}

BlunderList.propTypes = {
  showItemDetail: PropTypes.func.isRequired,
};

export default BlunderList;
