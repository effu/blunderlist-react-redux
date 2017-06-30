/* componenets/BlunderList.jsx */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  routerShape,
  withRouter,
} from 'react-router';


import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import CheckboxSVG from 'material-ui/svg-icons/toggle/check-box';
import AddSVG from 'material-ui/svg-icons/content/add';
import { List, ListItem } from 'material-ui/List';

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
      const filteredItems = items.filter(item => params.groupId === item.groupId);
      this.setState({ filteredItems: filteredItems || [] });
    }
  }

  onItemUpdate = (editItem) => {
    this.props.dispatch({
      type: ITEM_UPDATE_REQ,
      item: editItem,
    });
  }


  onItemNameChange = (event) => {
    this.setState({
      myItem: {
        ...this.state.myItem,
        name: event.target.value,
      },
    });
    // TODO close item detail
  }

  onItemCreate = (addItem) => {
    this.props.dispatch({
      type: ITEM_CREATE_REQ,
      item: {
        ...addItem,
        groupId: this.props.router.params.groupId,
      },
    });
    this.setState({ item: newItem });
  }

  updateParams = (item) => {
    const path = `/lists/${item.groupId}`;
    // takes whatever is in your request uri and replaces it
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
                      completed: !item.Completed,
                    });
                  }
                }
                >
                  <CheckboxSVG />
                </IconButton>
              </ListItem>
            );
          })}
          <ListItem>
            <FlatButton
              label={<del>Item Name</del>}
              onTouchTap={() => this.updateParams('item')}
            />
          </ListItem>
        </List>
      );
    }
    return null;
  }

  render() {
    // const showCompleted
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
                  label={<del>Item Name</del>}
                  onTouchTap={() => this.updateParams(item)}
                />
              </ListItem>
            );
          })}
        </List>


        {this.renderCompleted()}
      </div>
    );
  }
}

BlunderList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
  }).isRequired,
  params: PropTypes.string.isRequired,
  router: routerShape.isRequired,
  showItemDetail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ items: state.items });

// connects the router to components
export default connect(mapStateToProps)(withRouter(BlunderList));
