import { Button, PropTypes } from '@material-ui/core';
import React from 'react';

interface Props {
  color: PropTypes.Color;
}

export const DefaultButton = (props: Props): JSX.Element => {
  const { color } = props;

  return <Button color={color}>Hello</Button>;
};

DefaultButton.defaultProps = {
  color: 'primary'
};
