import { call, put } from 'redux-saga/effects';
import itemsApi from '../api/items';
import * as actions from '../actions';

export function* createItem(action) { // eslint-disable-line import/prefer-default-export
  try {
    const item = yield call(itemsApi.createItemPromise, action.item);
    yield put({
      type: actions.ITEM_CREATE_RES,
      item,
    });
  } catch (err) {
    console.log(err);
  }
}
