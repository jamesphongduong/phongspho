import React from 'react';
import { Typography as MaterialTypography, PropTypes } from '@material-ui/core';

interface TypographyProps {
  text: string;
  variant: 'h4';
  align?: PropTypes.Alignment;
}

export const Typography = (props: TypographyProps): JSX.Element => {
  const { text, ...other } = props;

  return (
    <MaterialTypography gutterBottom {...other}>
      {text}
    </MaterialTypography>
  );
};
