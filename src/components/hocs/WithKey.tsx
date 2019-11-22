import shortid from 'shortid';
import React from 'react';

export const withKey = (Component) => {
  const WithKey = (props) => {
    return <Component {...props} key={shortid.generate()} />;
  };

  return WithKey;
};
