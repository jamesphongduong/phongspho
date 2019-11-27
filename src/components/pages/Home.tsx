import React from 'react';
import { Typography } from '@material-ui/core';

export const Home = (): JSX.Element => {
  return (
    <div style={styles.container}>
      <Typography gutterBottom align="center" variant="h2">
        Phong's Photos
      </Typography>
      <Typography gutterBottom align="center" variant="h6"></Typography>
      <img src={'/home.svg'} style={styles.img} />
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
