/* reducers/users.js */

import * as actions from '../actions';

export default function users(state = [], action) {
  switch (action.type) {
    case actions.USER_CREATE_RES:
      return [...state, action.user];
    default:
      return state;
  }
}
