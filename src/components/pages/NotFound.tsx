import React from 'react';
import { Typography } from '@material-ui/core';
import { Image } from '../';

export const NotFound = (): JSX.Element => {
  return (
    <div style={styles.container}>
      <Typography gutterBottom align="center" variant="h2">
        Page not found
      </Typography>
      <Typography gutterBottom align="center" variant="h6"></Typography>
      <Image src={'/404.svg'} alt="not found" />
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
