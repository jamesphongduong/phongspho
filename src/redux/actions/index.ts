const ADMIN_LOGIN = 'ADMIN_LOGIN';

export const loginAdmin = (text) => {
  return {
    type: ADMIN_LOGIN,
    text
  };
};
