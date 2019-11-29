import React from 'react';
import { Typography as MaterialTypography } from '@material-ui/core';
import { Image } from '../';

export const NotFound = (): JSX.Element => {
  return (
    <div style={styles.container}>
      <MaterialTypography gutterBottom align="center" variant="h2">
        Page not found
      </MaterialTypography>
      <MaterialTypography
        gutterBottom
        align="center"
        variant="h6"
      ></MaterialTypography>
      <Image src={'/404.svg'} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  img: {
    width: '50%',
    height: '50%'
  }
};
