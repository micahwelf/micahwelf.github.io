//   reducers/users.js  //

import {combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import items from './items';
import * as actions from '..actions';

export default function users(state = [], action) {
	switch (action.type) {
		case actions.USER_CREATE_RES:
		return [...state,action.user];
		default:
		return state;
	}
}
