import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  PHOTO_HOVERED,
  PHOTO_UNHOVERED,
  TOGGLE_EDIT
} from '../redux/actions/actionTypes';
import { rootReducer } from '../redux/reducers';

export interface NavbarItem {
  label: string;
  route: string;
}

export interface Photo {
  captionInput: string;
  id?: number;
  imageURL: string;
}

export interface S3response {
  bucket: any;
  key: string;
  location: string;
  result: Response;
}

// union types
export type numOrUndefined = number | undefined;
export type numOrNull = number | null;
export type fileOrUndefined = File | undefined;
export type buttonVariant = 'text' | 'contained';
export type strOrNull = string | null;
export type imageSize = 'icon' | 'banner';

export enum InputValidation {
  Valid,
  Invalid,
  Empty
}

// REDUX
//
export interface PhotoId {
  id: number;
}

export interface Admin {
  loggedIn: boolean;
}

export interface SystemState {
  loggedIn: boolean;
}

export interface PhotoState {
  hovered;
}

// redux actions
// admin
export interface LoginAction {
  type: typeof ADMIN_LOGIN;
}

export interface LogoutAction {
  type: typeof ADMIN_LOGOUT;
}

export type AdminActionTypes = LoginAction & LogoutAction; // possible refactor

export interface PhotoHoveredAction {
  type: typeof PHOTO_HOVERED;
  payload: PhotoId;
}

export interface PhotoUnhoveredAction {
  type: typeof PHOTO_UNHOVERED;
}

export type GalleryActionTypes = PhotoHoveredAction & PhotoUnhoveredAction; // possible refactor

export interface ToggleEditAction {
  type: typeof TOGGLE_EDIT;
}

export type RootState = ReturnType<typeof rootReducer>;
