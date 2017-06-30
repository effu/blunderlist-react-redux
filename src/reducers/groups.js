/* reducers/items.js */

import * as actions from '../actions';

const findIndex = (array, id) => {
  let itemIndex = -1;
  array.forEach((item, index) => {
    if (item.id === id) {
      itemIndex = index;
    }
  });
  return itemIndex;
};

export default function groups(state = [], action) {

  switch (action.type) {
    default:
      return state;
  }
}
