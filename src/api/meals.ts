import axios, { AxiosPromise } from 'axios';

//  GET REQS

export const getMeals = (): AxiosPromise => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/dishes/`);
};

// POST REQS

export const postMeal = (data): AxiosPromise => {
  const { titleInput, descriptionInput, priceInput, imageURL } = data;

  const postData = {
    title: titleInput,
    description: descriptionInput,
    price: priceInput,
    imageURL
  };

  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/dishes/`, postData);
};

// PUT REQS

// DELETE REQS
export const deleteMeal = (id): AxiosPromise => {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/dishes/${id}`);
};
