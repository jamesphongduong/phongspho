import { TOGGLE_EDIT } from '../actions/actionTypes';

import { ToggleEditAction, GalleryState } from '../../types';
const initialState: GalleryState = {
  photoIdHovered: null,
  editMode: false
};

export const galleryReducer = (
  state = initialState,
  action: ToggleEditAction
): GalleryState => {
  switch (action.type) {
    case TOGGLE_EDIT:
      return {
        ...state,
        editMode: !state.editMode
      };
    default:
      return state;
  }
};
