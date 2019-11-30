import { PHOTO_HOVERED, PHOTO_UNHOVERED } from '../actions/actionTypes';

const initialState = {
  photoIdHovered: null
};

export const galleryReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
