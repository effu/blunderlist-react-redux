/* sagas/groups.js */

import { call, put } from 'redux-saga/effects';
import groupsApi from '../api/groups';
import * as actions from '../actions';

export function* createGroup(action) { // eslint-disable-line import/prefer-default-export
  try {
    const group = yield call(groupsApi.createGroupPromise, action.group);
    yield put({
      type: actions.GROUP_CREATE_RES,
      group,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* deleteGroup(action) {
  try {
    yield call(groupsApi.deleteGroupPromise, action.group);
    yield put({
      type: actions.GROUP_DELETE_RES,
      group: action.group,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* updateGroup(action) { // eslint-disable-line import/prefer-default-export
  try {
    const group = yield call(groupsApi.updateGroupPromise, action.group);
    yield put({
      type: actions.GROUP_UPDATE_RES,
      group,
    });
  } catch (err) {
    console.log(err);
  }
}
