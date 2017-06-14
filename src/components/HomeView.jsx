import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BlunderInput from './BlunderInput';
import BlunderList from './BlunderList';
import { ITEM_CREATE_REQ, ITEM_UPDATE_REQ } from '../actions';


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

  render() {
    const { items } = this.props;
    const {
      currentItem,
      editItem,
    } = this.state;

    return (
      <div>
        <BlunderInput
          item={currentItem}
          type="Add"
          onChange={this.onItemChange}
          onClick={this.onItemCreate}
        />
        <BlunderList
          items={items}
          onClick={this.onEditItemClick}
          onChange={this.onEditItemCheck}
        />
        {editItem ?
          <BlunderInput
            type="Update"
            item={editItem}
            onChange={this.onEditItemChange}
            onClick={this.onItemUpdate}
          /> : null
        }
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
