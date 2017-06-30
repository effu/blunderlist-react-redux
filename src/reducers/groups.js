/* reducers/groups.js */

import * as actions from '../actions';

const findIndex = (array, id) => {
  let groupIndex = -1;
  array.forEach((group, index) => {
    if (group.id === id) {
      groupIndex = index;
    }
  });
  return groupIndex;
};

export default function groups(state = [], action) {
  let index;
  switch (action.type) {
    case actions.GROUP_CREATE_RES:
      return [...state, action.group];
    case actions.GROUP_DELETE_RES:
      index = findIndex(state, action.group.id);
      if (index === -1) return state;
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    case actions.GROUP_UPDATE_RES:
      index = findIndex(state, action.group.id);
      if (index === -1) {
        return state;
      }
      return [
        ...state.slice(0, index),
        action.group,
        ...state.slice(index + 1),
      ];
    default:
      return state;
  }
}
