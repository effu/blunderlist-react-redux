
/* BlunderRightDrawerContent.jsx */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  routerShape,
  withRouter,
} from 'react-router';
import {
  List,
  ListItem,
} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MenuSVG from 'material-ui/svg-icons/navigation/menu';

import {
  ITEM_DELETE_REQ,
  ITEM_UPDATE_REQ,
} from '../actions';

const defaultItem = {
  id: 'blunder',
  name: 'I tripped on my shoelace.',
};

class BlunderRightDrawerContent extends Component {
  state = {
    showDialog: false,
    myItem: defaultItem,
  }

  componentWillReceiveProps(nextProps) {
    const myItem = nextProps.items.find(item => item.id === nextProps.params.itemId);
    this.setState({
      myItem: myItem || defaultItem,
    });
  }

  onItemNameChange = (e) => {
    const { myItem } = this.state;
    const { value } = e.target;
    this.setState({
      myItem: {
        ...myItem,
        name: value,
      },
    });
  }

  onItemUpdate = (updateItem) => {
    this.props.dispatch({
      type: ITEM_UPDATE_REQ,
      item: updateItem,
    });
  }

  onItemDelete = (deleteItem) => {
    this.props.dispatch({
      type: ITEM_DELETE_REQ,
      item: deleteItem,
    });
    this.props.closeDrawer();
    const path = `/lists/${this.props.params.groupId}`;
    this.props.router.replace(path);
    this.setState({ showDialog: false });
  }

  render() {
    const {
      myItem,
      showDialog,
    } = this.state;

    return (
      <div>
        <List>
          <ListItem
            onTouchTap={() => this.props.closeDrawer()}
            rightIcon={<MenuSVG />}
          />
          <ListItem>
            <Checkbox
              checked={myItem.completed}
              onCheck={() => {
                this.onItemUpdate({
                  ...myItem,
                  completed: !myItem.completed,
                });
              }}
            />
            <TextField
              fullWidth
              hintText={'Rename the blunder'}
              value={myItem.name}
              onChange={this.onItemNameChange}
              onBlur={() => this.onItemUpdate(myItem)}
            />
          </ListItem>
          <ListItem
            primaryText="Remove Blunder"
            onTouchTap={() => this.setState({ showDialog: true })}
          />
        </List>
        <Dialog
          modal={false}
          open={showDialog}
          title={`"${myItem.name}" will be deleted forever.`}
          actions={[
            <FlatButton
              label="Cancel"
              primary
              onTouchTap={() => this.setState({ showDialog: false })}
            />,
            <FlatButton
              label="Delete Blunder"
              primary
              keyboardFocused
              onTouchTap={() => this.onItemDelete(myItem)}
            />,
          ]}
        >
         You will not be able to undo this action.
        </Dialog>
      </div>
    );
  }
}

BlunderRightDrawerContent.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  router: routerShape.isRequired,
};

const mapStateToProps = ({ items }) => ({ items });

export default connect(mapStateToProps)(withRouter(BlunderRightDrawerContent));
