import shortid from 'shortid';
import React from 'react';

// P represents the props of the component that is passed into HOC
export const withKey = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WithKey = (props: P) => {
    return <Component {...props} key={shortid.generate()} />;
  };

  return WithKey;
};
