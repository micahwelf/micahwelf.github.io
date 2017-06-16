import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { createItem, updateItem } from './items';
import * as actions from '../actions';
import { ITEM_UPDATE_REQ } from './../actions';

export default function* sagas() {
  yield [
    fork(takeLatest, actions.ITEM_CREATE_REQ, createItem),
    FORK(TAKELETEST, ACTIONS.ITEM_UPDATE_REQ, updateItem),
  ];
}
