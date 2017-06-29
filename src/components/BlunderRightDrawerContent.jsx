/* components/BlunderRightDrawerContent.jsx */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuSVG from 'material-ui/svg-icons/navigation/menu';

const defaultItem = {
  id: 'blunder',
  name: 'I forgot to pass out the roll.',
  completed: false,
};

class BlunderRightDrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      myItem: defaultItem,
    };
  }


  render() {
    const { myItem } = this.state;
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
              onCheck={() => { console.log('item onCheck !completed'); }}
            />
            <TextField
              fullWidth
              hintText={'Rename the blunder'}
              value={myItem.name}
              onChange={this.onItemNameChange}
              onBlur={this.onItemUpdate(myItem)}
            />
          </ListItem>
          <ListItem
            primartyText="Remove Blunder"
            onTouchTap={() => this.setState({ showDialog: true })}
          />
        </List>
        <Dialog
          modal={false}
          open={showDialog}
          title={`"${myItem.name}" will be deleted forever!`}
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
          You Will not be able to undo this action!
        </Dialog>
      </div>
    );
  }
}
BlunderRightDrawerContent.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default BlunderRightDrawerContent;
