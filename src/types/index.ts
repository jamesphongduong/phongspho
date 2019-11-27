export interface navbarItem {
  label: string;
  route: string;
}

export interface photo {
  caption: string;
  id: number;
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
