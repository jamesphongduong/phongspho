import React from 'react';
import { Typography as MaterialTypography, PropTypes } from '@material-ui/core';

interface Props {
  text: string;
  variant: 'h4';
  align?: PropTypes.Alignment;
}

export const Typography = (props: Props): JSX.Element => {
  const { text, ...other } = props;

  return (
    <MaterialTypography gutterBottom {...other}>
      {text}
    </MaterialTypography>
  );
};
