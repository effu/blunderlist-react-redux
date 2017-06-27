/* sagas/index.js */

import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { createItem, updateItem, deleteItem } from './items';
import { loginUser } from './users';
import * as actions from '../actions';

export default function* sagas() {
  yield [
    fork(takeLatest, actions.ITEM_CREATE_REQ, createItem),
    fork(takeLatest, actions.ITEM_DELETE_REQ, deleteItem),
    fork(takeLatest, actions.ITEM_UPDATE_REQ, updateItem),
    fork(takeLatest, actions.USER_CREATE_REQ, loginUser),
  ];
}
