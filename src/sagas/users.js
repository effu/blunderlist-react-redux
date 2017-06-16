/* sagas/users.js */

import { call, put } from 'redux-saga/effects';
import usersApi from '../api/users';
import * as actions from '../actions';

export function* loginUser(action) { // eslint-disable-line import/prefer-default-export
  try {
    const user = yield call(usersApi.loginUserPromise, action.user);
    yield put({
      type: actions.USER_CREATE_RES,
      user,
    });
  } catch (err) {
    console.log(err);
  }
}
