import {
  PHOTO_HOVERED,
  PHOTO_UNHOVERED,
  TOGGLE_EDIT
} from '../actions/actionTypes';

import { GalleryActionTypes } from '../../types';
const initialState = {
  photoIdHovered: null,
  editMode: false
};

export const galleryReducer = (
  state = initialState,
  action: GalleryActionTypes
) => {
  const { type, payload } = action;
  switch (type) {
    case PHOTO_HOVERED:
      return {
        ...state,
        photoIdHovered: payload.id
      };
    case PHOTO_UNHOVERED:
      return {
        ...state,
        photoIdHovered: null
      };
    case TOGGLE_EDIT:
      return {
        ...state,
        editMode: !state.editMode
      };
    default:
      return state;
  }
};
