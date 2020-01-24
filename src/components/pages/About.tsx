import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Image } from '../Image';
import { app } from '../../styles';

export const About = (): JSX.Element => {
  return (
    <Box px={16} style={app.splitContainer}>
      <Image src={'./about.svg'} alt="about" />
      <div>
        <Typography variant="h2" gutterBottom style={app.headingStyle}>
          About
        </Typography>
        <Typography gutterBottom variant="body1">
          This website was built to showcase photos I have taken whilst
          travelling abroad in South-East Asia.
        </Typography>
        <br />
        <Typography gutterBottom variant="body1">
          Illustrations are sourced thanks to&nbsp;
          <a href="https://undraw.co/">unDraw</a>
        </Typography>
        <br />
        <Typography gutterBottom variant="body1">
          <a href="https://github.com/jamesphongduong/phongsphotos">
            Github Repository
          </a>
        </Typography>
      </div>
    </Box>
  );
};
