
/* BlunderLeftDrawerContent */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MenuSVG from 'material-ui/svg-icons/navigation/menu';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FileFolderSVG from 'material-ui/svg-icons/file/folder';
import CreateNewFolderSVG from 'material-ui/svg-icons/file/create-new-folder';
import ModeEditSVG from 'material-ui/svg-icons/editor/mode-edit';
import {
  List,
  ListItem,
} from 'material-ui/List';
import {
  GROUP_UPDATE_REQ,
  GROUP_CREATE_REQ,
  GROUP_DELETE_REQ,
} from '../actions';

const clearDialogs = {
  showCreateDialog: false,
  showDeleteDialog: false,
  showEditDialog: false,
};

class BlunderLeftDrawerContent extends Component {
  state = {
    ...clearDialogs,
    editList: { name: '' },
  }

  componentWillMount() {
    const { pathname } = this.props.location;

    if ((pathname === '/') || (pathname === '/lists') || (pathname === '/lists/')) {
      this.onRedirect('theInbox');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.groups.length !== nextProps.groups.length) {
      const newGroup = nextProps.groups[nextProps.groups.length - 1];
      this.onRedirect(newGroup.id);
      this.setState({
        ...clearDialogs,
        editList: { name: '' },
      });
    }
  }

  onRedirect = (groupId) => {
    const path = `/lists/${groupId}`;
    this.props.router.push(path);
    // TODO close item detail
  }

  onGroupCreate = (newList) => {
    this.props.dispatch({
      type: GROUP_CREATE_REQ,
      group: newList,
    });
  }

  onGroupDelete = (deleteList) => {
    if (deleteList.id === 'theInbox') {
      return this.setState({ error: 'You cannot delete the Inbox' });
    }
    return this.props.dispatch({
      type: GROUP_DELETE_REQ,
      group: deleteList,
    });
  }

  onGroupUpdate = (editList) => {
    this.props.dispatch({
      type: GROUP_UPDATE_REQ,
      group: editList,
    });
    this.setState({
      editList: { name: '' },
      ...clearDialogs,
    });
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
            onTouchTap={() => {
              this.setState({
                ...clearDialogs,
                showCreateDialog: true,
              });
            }}
            leftAvatar={<Avatar icon={<FileFolderSVG />} />}
            rightIcon={<CreateNewFolderSVG />}
            primaryText="Folders"
          />
          <Divider />
        </List>
        {this.props.groups.map(group => (
          <ListItem
            key={group.id}
            onTouchTap={() => this.onRedirect(group.id)}
            leftAvatar={<Avatar icon={<FileFolderSVG />} />}
            primaryText={group.name}
            rightIcon={
              <ModeEditSVG
                onTouchTap={() => {
                  this.setState({
                    ...clearDialogs,
                    showEditDialog: true,
                    editList: group,
                  });
                }}
              />
            }
          />
        ))
        }
        <Dialog
          modal={false}
          open={this.state.showCreateDialog}
          title="Create New Blunder List"
          actions={[
            <FlatButton
              label="Cancel"
              primary
              onTouchTap={() => this.setState({ ...clearDialogs })}
            />,
            <FlatButton
              label="Create"
              primary
              keyboardFocused
              onTouchTap={() => this.onGroupCreate(this.state.editList)}
            />,
          ]}
        >
          <TextField
            hintText={'Add a list...'}
            onChange={(e) => {
              this.setState({
                editList: {
                  ...this.state.editList,
                  name: e.target.value,
                },
              });
            }}
          />
        </Dialog>
        <Dialog
          modal={false}
          open={this.state.showDeleteDialog}
          title={`"${this.state.editList.name}" will be deleted forever.`}
          actions={[
            <FlatButton
              label="Cancel"
              primaryText
              onTouchTap={() => this.setState({ ...clearDialogs })}
            />,
            <FlatButton
              label="Delete Blunder List"
              primary
              keyboardFocused
              onTouchTap={() => this.onGroupDelete(this.state.editList)}
            />,
          ]}
        >
          You will not be able to undo this action.
          <div>{this.state.error}</div>
        </Dialog>
        <Dialog
          modal={false}
          open={this.state.showEditDialog}
          title="Edit Blunder List"
          actions={[
            <FlatButton
              label="Delete"
              primary
              onTouchTap={() => {
                this.setState({
                  ...clearDialogs,
                  showDeleteDialog: true,
                });
              }}
            />,
            <FlatButton
              label="Update"
              primary
              keyboardFocused
              onTouchTap={() => this.onGroupUpdate(this.state.editList)}
            />,
          ]}
        >
          <TextField
            hintText={'Edit a list...'}
            value={this.state.editList.name}
            onChange={(e) => {
              this.setState({
                editList: {
                  ...this.state.editList,
                  name: e.target.value,
                },
              });
            }}
          />
        </Dialog>
      </div>
    );
  }
}

BlunderLeftDrawerContent.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  groups: PropTypes.string.isRequired,
  router: PropTypes.string.isRequired,
};

const mapStateToProps = ({ groups }) => ({ groups });

export default connect(mapStateToProps)(withRouter(BlunderLeftDrawerContent));
