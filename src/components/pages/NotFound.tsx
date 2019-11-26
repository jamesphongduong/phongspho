import React from 'react';
import { Typography, Paper } from '@material-ui/core';

export const NotFound = (): JSX.Element => {
  return (
    <div style={styles.container}>
      <Typography gutterBottom align="center" variant="h2">
        Page not found
      </Typography>
      <Typography gutterBottom align="center" variant="h6"></Typography>
      <img src={'/notfound.svg'} style={styles.img} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    height: '100%'
    // border: '1px solid black'
  },
  img: {
    width: '50%',
    height: '50%'
  }
};
