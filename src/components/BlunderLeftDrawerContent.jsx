/* components/BlunderLeftDrawerContent.jsx */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// non default exports in curly braces
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MenuSVG from 'material-ui/svg-icons/navigation/menu';

class BlunderLeftDrawerContent extends Component {
  state = {
    showCreateDialog: false,
  }

  render() {
    return (
      <div>
        <List>
          <ListItem
            onTouchTap={() => this.props.closeDrawer()}
            rightIcon={<MenuSVG />}
          />
          <ListItem
            primaryText="Folders"
            onTouchTap={() => this.setState({ showCreateDialog: true })}
          />
        </List>
        <Dialog
          open={this.state.showCreateDialog}
          title="Create a new list"
          actions={[
            <FlatButton
              label="Cancel"
              primary
              onTouchTap={() => console.log('cancel dialog')}
            />,
            <FlatButton
              label="Create"
              keyboardFocused
              onTouchTap={() => console.log('create a new list')}
              primary
            />,
          ]}
        >
          <TextField
            hintText={'Add a list...'}
            onChange={(e) => { console.log(e.target.value); }}
          />
        </Dialog>
      </div>
    );
  }
}
// modal={false}

BlunderLeftDrawerContent.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default BlunderLeftDrawerContent;
