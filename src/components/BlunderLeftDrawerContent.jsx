/* components/BlunderLeftDrawerContent.jsx */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  // routerShape,
  withRouter,
} from 'react-router';
// non default exports in curly braces
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FileFolderSVG from 'material-ui/svg-icons/file/folder';
import CreateNewFolderSVG from 'material-ui/svg-icons/file/create-new-folder';
import ModeEditSVG from 'material-ui/svg-icons/content/create';
import MenuSVG from 'material-ui/svg-icons/navigation/menu';
import {
  GROUP_CREATE_REQ,
  GROUP_DELETE_REQ,
  GROUP_UPDATE_REQ,
} from '../actions';


const clearDialogs = {
  showCreateDialog: false,
  showDeleteDialog: false,
  showEditDialog: false,
};

class BlunderLeftDrawerContent extends Component {
  state = {
    ...clearDialogs,
    editList: {
      name: '',
    },
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
      // dialog will not close until the groups change
      this.setState({
        ...clearDialogs,
        editList: { name: '' },
      });
    }
  }

  onGroupCreate = (newGroup) => {
    this.props.dispatch({
      type: GROUP_CREATE_REQ,
      group: newGroup,
    });
  }

  onGroupDelete = (deleteGroup) => {
    if (deleteGroup.id === 'theInbox') {
      return this.setState({ error: 'You cannot delete the Inbox' });
    }
    return this.props.dispatch({
      type: GROUP_DELETE_REQ,
      group: deleteGroup,
    });
  }

  onGroupUpdate = (editGroup) => {
    this.props.dispatch({
      type: GROUP_UPDATE_REQ,
      group: editGroup,
    });
    this.setState({
      editList: { name: '' },
      ...clearDialogs,
    });
  }

  onRedirect = (groupId) => {
    const path = `/lists/${groupId}`;
    // change the url
    this.props.router.push(path);
    // TODO details
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
            onTouchTap={() => this.setState({ ...clearDialogs, showCreateDialog: true })}
            leftAvatar={<Avatar icon={<FileFolderSVG />} />}
            rightIcon={<CreateNewFolderSVG />}
          />
          <Divider />
        </List>
        {this.props.groups.map(group => (
          <ListItem
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
                }
              }
              />
            }
          />
          ))
        }

        <Dialog
          open={this.state.showCreateDialog}
          title="Create a new list"
          modal={false}
          actions={[
            <FlatButton
              label="Cancel"
              primary
              onTouchTap={() => this.setState({ showCreateDialog: false })}
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
              onTouchTap={() => this.setState({ showDeleteDialog: false })}
            />,
            <FlatButton
              label="Delete a Blunder List"
              primary
              keyboardFocused
              onTouchTap={() => this.onGroupDelete(this.state.editList)}
            />,
          ]}
        >
          You will not be able to undo this action.
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
              keyboardFocused
              onTouchTap={() => this.onGroupUpdate(this.state.editList)}
              primary
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
// modal={false}

BlunderLeftDrawerContent.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
  }).isRequired,
  router: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

const mapStateToProps = ({ groups }) => ({ groups });

export default connect(mapStateToProps)(withRouter(BlunderLeftDrawerContent));

// onTouchTap={() => this.setState({ ...clearDialogs })}
