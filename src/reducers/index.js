import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import items from './items';

export default combineReducers({
  items,
  routing,
});
