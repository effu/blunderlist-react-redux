/* HomeView.jsx */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BlunderInput from './BlunderInput';
import BlunderList from './BlunderList';
import BlunderListItem from './BlunderListItem';
import {
  ITEM_CREATE_REQ,
  ITEM_UPDATE_REQ,
  ITEM_DELETE_REQ,
} from '../actions';


const propTypes = {
  items: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  items: [],
};

class HomeView extends Component {
  state = {
    currentItem: this.props.items[0],
    showCompleted: false,
  }


  onItemChange = (event) => {
    const currentItem = {
      name: event.target.value,
    };
    this.setState({ currentItem });
  }

  onItemCreate = (currentItem) => {
    this.props.dispatch({
      type: ITEM_CREATE_REQ,
      item: currentItem,
    });
    this.setState({ currentItem: { name: '' } });
  }

  onItemDelete = (editItem, callback) => {
    const action = {
      type: ITEM_DELETE_REQ,
      item: editItem,
    };
    this.props.dispatch(action);
    if (callback) callback();
  }

  onItemUpdate = (editItem) => {
    this.props.dispatch({
      type: ITEM_UPDATE_REQ,
      item: editItem,
    });
    this.setState({ editItem: null });
  }

  onEditItemClick = (editItem) => {
    this.setState({ editItem });
  }

  onEditItemChange = (event) => {
    const { id } = this.state.editItem;
    const editItem = {
      name: event.target.value,
      id,
    };
    this.setState({ editItem });
  }

  onEditItemCheck = (editItem) => {
    this.onItemUpdate({ ...editItem, completed: true });
  }

  renderDeleteModal = () => {
    const {
      showDeleteModal,
      editItem,
    } = this.state;
    if (showDeleteModal) {
      return (
        <div>
          <h3>{`"${editItem.name}" will be deleted forever.`}</h3>
          <div>You will not be able to undo this action.</div>
          <button
            onClick={() => {
              this.onItemDelete(editItem, () => {
                this.setState({
                  showDeleteModal: false,
                  editItem: null,
                });
              });
            }}
          >
            Delete Blunder
          </button>
        </div>
      );
    }
    return null;
  }

  renderEditItem = () => {
    if (this.state.editItem) {
      return (
        <BlunderInput
          type="Update"
          item={this.state.editItem}
          onChange={this.onEditItemChange}
          onClick={this.onItemUpdate}
        >
          <button onClick={() => this.setState({ showDeleteModal: true })}>
            Delete Blunder
          </button>
        </BlunderInput>
      );
    }
    return null;
  }

  render() {
    const { items } = this.props;
    const {
      currentItem,
      showCompleted,
    } = this.state;

    return (
      <div>
        <BlunderInput
          item={currentItem}
          type="Add"
          onChange={this.onItemChange}
          onClick={this.onItemCreate}
        />
        <BlunderList>
          {items.map((item) => {
            if (item.completed !== showCompleted) return null;
            return (
              <BlunderListItem
                key={item.id}
                item={item}
                onClick={this.onEditItemClick}
                onChange={this.onEditItemCheck}
              />
            );
          })}
          <button
            onClick={() => this.setState({ showCompleted: !showCompleted })}
          >
            {showCompleted ? 'Show Blunder List' : 'Show Completed Blunders'}
          </button>
        </BlunderList>
        {this.renderEditItem()}
        {this.renderDeleteModal()}
      </div>
    );
  }
}

HomeView.propTypes = propTypes;
HomeView.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps)(HomeView);
