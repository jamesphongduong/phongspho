import axios, { AxiosPromise } from 'axios';

export const baseURL = 'http://localhost:4000';

//  GET REQS

export const getMeals = (): AxiosPromise => {
  return axios.get(`${baseURL}/dishes/`);
};

// POST REQS

export const postMeal = (data): AxiosPromise => {
  const { titleInput, descriptionInput, priceInput, fileInput } = data;

  const postData = {
    title: titleInput,
    description: descriptionInput,
    price: priceInput,
    file: fileInput
  };

  return axios.post(`${baseURL}/dishes/`, postData);
};
