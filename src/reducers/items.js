import * as actions from '../actions';

export default function items(state = [], action) {
  switch (action.type) {
    case actions.ITEM_CREATE_RES:
      return [...state, action.item];
    default:
      return state;
  }
}
