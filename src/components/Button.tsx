import { Button as MaterialButton, PropTypes } from '@material-ui/core';
import React from 'react';
import { buttonVariant } from '../types';

export interface ButtonProps {
  color: PropTypes.Color;
  label: string;
  variant: buttonVariant;
  onClick?: () => void;
  fullWidth?: boolean;
  size?: any;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { label, variant, onClick, ...other } = props;
  return (
    <MaterialButton onClick={onClick} variant={variant} {...other}>
      {label}
    </MaterialButton>
  );
};

Button.defaultProps = {
  variant: 'contained',
  color: 'secondary'
};
