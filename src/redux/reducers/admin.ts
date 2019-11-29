import { checkLoggedInLocalStorage } from '../../utils';

const initialState = {
  loggedIn: checkLoggedInLocalStorage() || false
};

export const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADMIN_LOGIN':
      return {
        ...state,
        loggedIn: true
      };
    case 'ADMIN_LOGOUT':
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};
