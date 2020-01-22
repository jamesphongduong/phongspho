import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Image } from '../Image';

export const About = (): JSX.Element => {
  return (
    <Box px={16} style={styles.container}>
      <Image src={'./about.svg'} alt="about" />
      <div style={styles.halfContainer}>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography gutterBottom variant="body1">
          This website was built to showcase photos I have taken whilst
          travelling abroad in South-East Asia.
        </Typography>
        <br />
        <Typography gutterBottom variant="body1">
          Technology used to build this website are: <br /> React / Redux /
          JavaScript / Typescript / Jest
        </Typography>
        <Typography gutterBottom variant="body1">
          <a href="https://github.com/jamesphongduong/phongsphotos">
            Link to Github Repository
          </a>
        </Typography>
      </div>
    </Box>
  );
};

const styles = {
  container: {
    height: '100%',
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  halfContainer: {
    height: '50%',
    width: '50%'
  }
};
