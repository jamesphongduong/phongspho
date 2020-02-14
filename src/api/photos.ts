import axios, { AxiosPromise } from 'axios';
import { Photo } from '../types';

//  GET REQS
export const getPhotos = (): AxiosPromise => {
  return axios.get(`${process.env.REACT_APP_API}/photos/`);
};

// get PHOTO ALBUMNS
export const getAlbums = (): AxiosPromise => {
  return axios.get(`${process.env.REACT_APP_API}/albums/`);
};

// POST REQS
export const postPhoto = (data: Photo): AxiosPromise => {
  const { caption, imageURL, album } = data;
  const postData = {
    caption,
    imageURL,
    album
  };

  return axios.post(`${process.env.REACT_APP_API}/photos/`, postData);
};

// PUT / PATCH REQS
export const putPhoto = (id: number, data: Photo): AxiosPromise => {
  const { caption, imageURL, album } = data;
  const putData = {
    caption: caption,
    imageURL,
    album
  };

  return axios.put(`${process.env.REACT_APP_API}/photos/${id}`, putData);
};

// DELETE REQS
export const deletePhoto = (id: number): AxiosPromise => {
  return axios.delete(`${process.env.REACT_APP_API}/photos/${id}`);
};
