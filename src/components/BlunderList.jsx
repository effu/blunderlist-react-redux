/* componenets/BlunderList.jsx */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  routerShape,
  withRouter,
} from 'react-router';


import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';

class BlunderList extends React.Component {
  state={}

  updateParams = (randomString) => {
    const path = `/lists/${randomString}`;
    // takes whatever is in your request uri and replaces it
    this.props.router.replace(path);
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
  router: routerShape.isRequired,
  showItemDetail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ items: state.items });

// connects the router to components
export default connect(mapStateToProps)(withRouter(BlunderList));
