import { Button as MaterialButton, PropTypes } from '@material-ui/core';
import React from 'react';

export interface Props {
  color: PropTypes.Color;
  label: string;
  variant: 'text' | 'contained';
  onClick?(): void;
}

export const Button = (props: Props): JSX.Element => {
  const { label, variant, onClick, ...other } = props;

  return (
    <MaterialButton
      onClick={onClick}
      variant={variant}
      // color="primary"
      // color="default"
      // color="secondary"
      color="secondary"
      {...other}
    >
      {label}
    </MaterialButton>
  );
};

Button.defaultProps = {
  variant: 'contained'
};
