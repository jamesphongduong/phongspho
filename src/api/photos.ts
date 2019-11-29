import axios, { AxiosPromise } from 'axios';
import { Photo } from '../types';
//  GET REQS

export const getPhotos = (): AxiosPromise => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/photos/`);
};

// PUT / PATCH REQS

export const putPhoto = (id: number, data: Photo): AxiosPromise => {
  const { captionInput, imageURL } = data;
  const putData = {
    caption: captionInput,
    imageURL
  };

  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/photos/${id}`,
    putData
  );
};

// POST REQS

export const postPhoto = (data: Photo): AxiosPromise => {
  const { captionInput, imageURL } = data;

  const postData = {
    caption: captionInput,
    imageURL
  };

  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/photos/`, postData);
};

// PUT REQS

// DELETE REQS
export const deletePhoto = (id): AxiosPromise => {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/photos/${id}`);
};
