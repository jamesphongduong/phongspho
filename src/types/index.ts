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

export interface PhotoId {
  id: number;
}

// union types
export type numOrUndefined = number | undefined;
export type numOrNull = number | null;
export type fileOrUndefined = File | undefined;
export type buttonVariant = 'text' | 'contained';
export type strOrNull = string | null;
export type imageSize = 'icon' | 'banner';
export type InputValidation = 'Valid' | 'Invalid' | 'Empty';

// REDUX
// actions
export interface LoginAction {
  type: typeof ADMIN_LOGIN;
}

export interface LogoutAction {
  type: typeof ADMIN_LOGOUT;
}

export type AdminAction = LoginAction | LogoutAction;

export interface PhotoHoveredAction {
  type: typeof PHOTO_HOVERED;
  payload: PhotoId;
}

export interface PhotoUnhoveredAction {
  type: typeof PHOTO_UNHOVERED;
}

export type GalleryAction =
  | PhotoHoveredAction
  | PhotoUnhoveredAction
  | ToggleEditAction;

export interface ToggleEditAction {
  type: typeof TOGGLE_EDIT;
}

// states
export type RootState = ReturnType<typeof rootReducer>;

export interface GalleryState {
  photoIdHovered: numOrNull;
  editMode: boolean;
}

export interface AdminState {
  loggedIn: boolean;
}
