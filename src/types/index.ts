export interface AppContextInterface {
  state: { loggedIn: boolean; albums: string[]; albumSelected: number };
  updateState: {
    toggleLogin: () => void;
    changeAlbum: (index: number) => void;
  }; //tofix
}

export interface NavbarItem {
  label: string;
  route: string;
}

export interface Photo {
  caption: string;
  id?: number;
  imageURL: string;
  album: string;
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
