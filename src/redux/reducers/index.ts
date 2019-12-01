import { combineReducers } from 'redux';
import { adminReducer } from './admin';
import { galleryReducer } from './gallery';

export const rootReducer = combineReducers({ adminReducer, galleryReducer });
