/* sagas/getTheAppStarted.js */

import { call, put } from 'redux-saga/effects';
import groupsApi from '../api/groups';
import itemsApi from '../api/items';
import * as actions from '../actions';
import { GROUP_LIST_RES, ITEM_LIST_RES } from '../actions';

export default function* getTheAppStarted() {
  try {
    const groups = yield call(groupsApi.getAllGroupsPromise);
    const items = yield call(itemsApi.getAllItemsPromise);
    yield put({
      type: GROUP_LIST_RES,
      groups,
    });
    yield put({
      type: ITEM_LIST_RES,
      items,
    });
  } catch (err) {
    console.log(err);
  }
}
