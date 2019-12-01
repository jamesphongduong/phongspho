import axios, { AxiosPromise } from 'axios';
import { Photo } from '../types';

//  GET REQS
export const getPhotos = (): AxiosPromise => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/photos/`);
};

// POST REQS
export const postPhoto = (data: Photo): AxiosPromise => {
  const { captionInput, imageURL } = data;
  const postData = {
    captionInput,
    imageURL
  };

  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/photos/`, postData);
};

// PUT / PATCH REQS
export const putPhoto = (id: number, data: Photo): AxiosPromise => {
  const { captionInput, imageURL } = data;
  const putData = {
    captionInput: captionInput,
    imageURL
  };

  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/photos/${id}`,
    putData
  );
};
// DELETE REQS
export const deletePhoto = (id: number): AxiosPromise => {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/photos/${id}`);
};
