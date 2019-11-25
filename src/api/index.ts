import axios from 'axios';

export const baseURL = 'http://localhost:3000';

// get

// get all meals
export const getMeals = () => {
  return axios
    .get(baseURL)
    .then((res) => console.log('res', res))
    .catch((err) => console.log('err', err));
};
