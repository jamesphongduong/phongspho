import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const WithLoading = (Component) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <CircularProgress />;
  };
};
