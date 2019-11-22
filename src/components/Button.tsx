import { Button as MaterialButton, PropTypes } from '@material-ui/core';
import React from 'react';

interface Props {
  color: PropTypes.Color;
  text: string;
}

export const Button = (props: Props): JSX.Element => {
  const { color, text } = props;

  return <MaterialButton color={color}>{text}</MaterialButton>;
};

Button.defaultProps = {
  // color: 'primary'
};
