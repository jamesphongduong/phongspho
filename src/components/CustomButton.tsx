import { Button as MaterialButton, PropTypes } from '@material-ui/core';
import React from 'react';
import { buttonVariant } from '../types';

export interface CustomButtonProps {
  color: PropTypes.Color;
  label: string;
  variant: buttonVariant;
  onClick?: () => void;
  fullWidth?: boolean;
  size?: any;
}

export const CustomButton = (props: CustomButtonProps): JSX.Element => {
  const { label, variant, onClick, ...other } = props;
  return (
    <MaterialButton onClick={onClick} variant={variant} {...other}>
      {label}
    </MaterialButton>
  );
};

CustomButton.defaultProps = {
  variant: 'contained',
  color: 'secondary'
};
