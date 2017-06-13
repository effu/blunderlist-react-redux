import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddBlunder from './AddBlunder';
import BlunderList from './BlunderList';
import { ITEM_CREATE_REQ } from '../actions';


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
    const currentItem = { name: event.target.value };
    this.setState({ currentItem });
  }

  onItemCreate = () => {
    const { currentItem } = this.state;
    this.props.dispatch({
      type: ITEM_CREATE_REQ,
      item: currentItem,
    });
    this.setState({ currentItem: { name: '' } });
  }

  render() {
    const { items } = this.props;
    const { currentItem } = this.state;

    return (
      <div>
        <AddBlunder
          item={currentItem}
          onChange={this.onItemChange}
          onClick={this.onItemCreate}
        />
        <BlunderList items={items} />
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
