import React from 'react';

interface Props {
  src: string;
}

export const Image = (props: Props): JSX.Element => {
  const { src } = props;

  return <img src={src} style={styles.container} />;
};

const styles = {
  container: {
    height: '25vw',
    width: '25vw'
  }
};
