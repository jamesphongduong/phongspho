import React from 'react';
import { Image } from '../';
import { Typography } from '@material-ui/core';

export const Home = (): JSX.Element => {
  return (
    <div style={styles.container}>
      <Typography gutterBottom align="center" variant="h2">
        Phong's Photos
      </Typography>
      <Typography gutterBottom align="center" variant="h6">
        Some of my travel photos...
      </Typography>
      <div style={styles.halfContainer}>
        <Image src={'/home.svg'} />
      </div>
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
  halfContainer: {
    height: '50%',
    width: '50%'
  }
};
