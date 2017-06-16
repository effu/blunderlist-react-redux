/* reducers/index.js */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import items from './items';
import users from './users';

export default combineReducers({
  items,
  users,
  routing,
});
