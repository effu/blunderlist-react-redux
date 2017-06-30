
/* BlunderList.jsx */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import {
  routerShape,
  withRouter,
} from 'react-router';
import {
  List,
  ListItem,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import AddSVG from 'material-ui/svg-icons/content/add';
import CheckboxSVG from 'material-ui/svg-icons/toggle/check-box';

import {
  ITEM_CREATE_REQ,
  ITEM_UPDATE_REQ,
} from '../actions';

const newItem = { name: '' };

class BlunderList extends React.Component {
  constructor(props) {
    super(props);

    const {
      items,
      params,
    } = props;
    const filteredItems = items.filter(item => item.groupId === params.groupId);
    this.state = {
      showCompleted: false,
      myItem: newItem,
      filteredItems: filteredItems || [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.params.groupId !== nextProps.params.groupId) ||
        (this.props.items.length !== nextProps.items.length)) {
      const {
        items,
        params,
      } = nextProps;
      let filteredItems;
      if (this.props.params.groupId === 'theInbox') {
        filteredItems = items.filter(item => !item.groupId);
      } else {
        filteredItems = items.filter(item => params.groupId === item.groupId);
      }
      this.setState({ filteredItems: filteredItems || [] });
    }
  }

  onItemCreate = (spongeBob) => {
    this.props.dispatch({
      type: ITEM_CREATE_REQ,
      item: {
        ...spongeBob,
        groupId: this.props.router.params.groupId,
      },
    });
    this.setState({ myItem: newItem });
  }

  onItemUpdate = (editItem) => {
    this.props.dispatch({
      type: ITEM_UPDATE_REQ,
      item: editItem,
    });
  }

  onItemNameChange = (e) => {
    this.setState({
      myItem: {
        ...this.state.myItem,
        name: e.target.value,
      },
    });
    this.props.closeItemDetail();
  }

  updateParams = (item) => {
    const path = `/lists/${item.groupId}/items/${item.id}`;
    this.props.router.replace(path);
    this.props.showItemDetail();
  }

  renderCompleted = () => {
    if (this.state.showCompleted) {
      return (
        <List>
          {this.state.filteredItems.map((item) => {
            if (!item.completed) return null;
            return (
              <ListItem
                key={item.id}
              >
                <IconButton
                  onTouchTap={() => {
                    this.onItemUpdate({
                      ...item,
                      completed: !item.completed,
                    });
                  }}
                >
                  <CheckboxSVG />
                </IconButton>
                <FlatButton
                  label={<del>Item Name</del>}
                  onTouchTap={() => this.updateParams(item)}
                />
              </ListItem>
            );
          })}
        </List>
      );
    }
    return null;
  }

  render() {
    const { showCompleted } = this.state;

    return (
      <div className="blunder-list">
        <List>
          <ListItem
            leftAvatar={
              <Avatar
                icon={<AddSVG />}
                onTouchTap={() => this.onItemCreate(this.state.myItem)}
              />
            }
          >
            <TextField
              fullWidth
              hintText={'Add a blunder...'}
              value={this.state.myItem.name}
              onChange={this.onItemNameChange}
            />
          </ListItem>
        </List>
        <List>
          {this.state.filteredItems.map((item) => {
            if (item.completed) return null;
            return (
              <ListItem
                key={item.id}
              >
                <IconButton
                  onTouchTap={() => {
                    this.onItemUpdate({
                      ...item,
                      completed: !item.completed,
                    });
                  }}
                />
                <FlatButton
                  label={item.name}
                  onTouchTap={() => this.updateParams(item)}
                />
              </ListItem>
            );
          })}
          <ListItem
            primaryText="Show Completed Blunders"
            onTouchTap={() => this.setState({ showCompleted: !showCompleted })}
          />
        </List>

        {this.renderCompleted()}

      </div>
    );
  }
}

BlunderList.propTypes = {
  closeItemDetail: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
  }).isRequired,
  params: PropTypes.string.isRequired,
  router: routerShape.isRequired,
  showItemDetail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ items: state.items });

export default connect(mapStateToProps)(withRouter(BlunderList));
