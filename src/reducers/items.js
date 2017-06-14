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

export default function items(state = [], action) {
  let index;
  switch (action.type) {
    case actions.ITEM_CREATE_RES:
      return [...state, action.item];
    case actions.ITEM_UPDATE_RES:
      index = findIndex(state, action.item.id);
      if (index === -1) {
        return state;
      }
      return [
        ...state.slice(0, index),
        action.item,
        ...state.slice(index + 1),
      ];
    default:
      return state;
  }
}
