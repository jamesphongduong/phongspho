import { PHOTO_HOVERED, PHOTO_UNHOVERED, TOGGLE_EDIT } from './actionTypes';
import {
  PhotoHoveredAction,
  PhotoUnhoveredAction,
  ToggleEditAction
} from '../../types';

export const updateHoveredPhotoId = (id: number): PhotoHoveredAction => {
  return {
    type: PHOTO_HOVERED,
    payload: {
      id
    }
  };
};

export const removeHoveredPhotoId = (): PhotoUnhoveredAction => {
  return {
    type: PHOTO_UNHOVERED
  };
};

export const toggleEdit = (): ToggleEditAction => {
  return {
    type: TOGGLE_EDIT
  };
};
