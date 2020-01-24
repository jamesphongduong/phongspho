import {
  PHOTO_HOVERED,
  PHOTO_UNHOVERED,
  TOGGLE_EDIT
} from '../actions/actionTypes';

import { GalleryAction, GalleryState } from '../../types';
const initialState: GalleryState = {
  photoIdHovered: null,
  editMode: false
};

export const galleryReducer = (
  state = initialState,
  action: GalleryAction
): GalleryState => {
  switch (action.type) {
    case PHOTO_HOVERED:
      return {
        ...state,
        photoIdHovered: action.payload.id
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
