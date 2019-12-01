import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { imageSize } from '../types';

interface ImageProps {
  src: string;
  size: imageSize;
}

export const Image = (props: ImageProps): JSX.Element => {
  const classes = useStyles();
  const { src, size } = props;

  return (
    <img
      src={src}
      className={size === 'icon' ? classes.icon : classes.banner}
    />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      height: '25px',
      width: '25px'
    },
    banner: {
      height: '25vw',
      width: '25vw'
    }
  })
);

Image.defaultProps = {
  size: 'banner'
};
