import { PHOTO_HOVERED, PHOTO_UNHOVERED } from './actionTypes';
import { PhotoHoveredAction, PhotoUnhoveredAction } from '../../types';

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
