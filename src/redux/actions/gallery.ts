import { TOGGLE_EDIT } from './actionTypes';
import { ToggleEditAction } from '../../types';

export const toggleEdit = (): ToggleEditAction => {
  return {
    type: TOGGLE_EDIT
  };
};
