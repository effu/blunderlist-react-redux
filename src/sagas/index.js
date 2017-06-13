import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { createItem } from './items';
import * as actions from '../actions';

export default function* sagas() {
  yield [
    fork(takeLatest, actions.ITEM_CREATE_REQ, createItem),
  ];
}
