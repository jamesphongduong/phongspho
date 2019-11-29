const ADMIN_LOGIN = 'ADMIN_LOGIN';
const ADMIN_LOGOUT = 'ADMIN_LOGOUT';

export const loginAdmin = () => {
  return {
    type: ADMIN_LOGIN
  };
};

export const logoutAdmin = () => {
  return {
    type: ADMIN_LOGOUT
  };
};
