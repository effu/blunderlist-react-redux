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

class BlunderLeftDrawerContent extends Component {
  state = {
    showCreateDialog: false,
    editList: {
      name: '',
    },
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
        <Dialog
          modal={false}
          open={this.state.showDeleteDialog}
          title={`"${this.state.editList.name}" will be deleted forever.`}
          actions={[
            <FlatButton
              label="Cancel"
              primaryText
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
};

const mapStateToProps = ({ groups }) => ({ groups });

export default connect(mapStateToProps)(withRouter(BlunderLeftDrawerContent));

// onTouchTap={() => this.setState({ ...clearDialogs })}
