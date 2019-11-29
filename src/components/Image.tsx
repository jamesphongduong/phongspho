import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { imageSize } from '../types';

interface Props {
  src: string;
  size: imageSize;
}

export const Image = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { src, size } = props;

  return (
    <img
      src={src}
      className={size === 'icon' ? classes.icon : classes.banner}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    height: '25px',
    width: '25px'
  },
  banner: {
    height: '25vw',
    width: '25vw'
  }
}));

Image.defaultProps = {
  size: 'banner'
};
