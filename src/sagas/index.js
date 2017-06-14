import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { createItem, updateItem } from './items';
import * as actions from '../actions';

export default function* sagas() {
  yield [
    fork(takeLatest, actions.ITEM_CREATE_REQ, createItem),
    fork(takeLatest, actions.ITEM_UPDATE_REQ, updateItem),
  ];
}
