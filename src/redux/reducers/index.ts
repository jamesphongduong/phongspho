import { combineReducers } from 'redux';
import { adminReducer } from './admin';
import { galleryReducer } from './gallery';

export default combineReducers({ adminReducer, galleryReducer });
