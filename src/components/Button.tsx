import { Button as MaterialButton, PropTypes } from '@material-ui/core';
import React from 'react';

export interface Props {
  color: PropTypes.Color;
  text: string;
}

export const Button = (props: Props): JSX.Element => {
  const { text, ...other } = props;

  return <MaterialButton {...other}>{text}</MaterialButton>;
};
