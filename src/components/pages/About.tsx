import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Image } from '../Image';

export const About = (): JSX.Element => {
  return (
    <Box px={16} style={styles.container}>
      <div style={styles.contentContainer}>
        <Image style={styles.halfContainer} src={'./about.svg'} />
        <div style={styles.halfContainer}>
          <Typography variant="h4" gutterBottom>
            About this project
          </Typography>
          <Typography gutterBottom variant="body1">
            I wanted to build a web application that I could personally use,
            hence decided to opt for a 'photo platform' idea, using some of my
            personal travel photos.
          </Typography>
          <Box mt={8}>
            <Typography variant="h4" gutterBottom>
              Tech Stack
            </Typography>
            <Typography gutterBottom variant="body1">
              Technology used to build this app are: React / Redux / JavaScript
              / Typescript / Jest
            </Typography>
            <Typography gutterBottom variant="body1">
              {
                <a href="https://github.com/jamesphongduong/phongsphotos">
                  Link to Github Repository
                </a>
              }
            </Typography>
          </Box>
        </div>
      </div>
    </Box>
  );
};

const styles = {
  container: {
    height: '100%',
    boxSizing: 'border-box' as 'border-box'
  },
  halfContainer: {
    height: '50%',
    width: '50%'
  },
  contentContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
};
