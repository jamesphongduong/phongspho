import axios, { AxiosPromise } from 'axios';

//  GET REQS

export const getPhotos = (): AxiosPromise => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/photos/`);
};

// POST REQS

export const postPhoto = (data): AxiosPromise => {
  const { titleInput, descriptionInput, priceInput, imageURL } = data;

  const postData = {
    title: titleInput,
    description: descriptionInput,
    price: priceInput,
    imageURL
  };

  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/photos/`, postData);
};

// PUT REQS

// DELETE REQS
export const deletePhoto = (id): AxiosPromise => {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/photos/${id}`);
};
