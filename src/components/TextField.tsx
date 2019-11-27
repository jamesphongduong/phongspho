import React from 'react';
import {
  TextField as MaterialTextField,
  InputAdornment as MaterialInputAdornment
} from '@material-ui/core';

interface Props {
  id: string;
  type?: string;
  disabled?: boolean;
  label?: string;
  preIcon?: JSX.Element;
  postIcon?: JSX.Element;
  multiline?: boolean;
  handleInput(event: React.ChangeEvent<HTMLInputElement>): void;
  value: string;
  required?: boolean;
  helperText?: string;
  invalid?: boolean;
  autoFocus?: boolean;
}

export const TextField = (props: Props): JSX.Element => {
  const {
    preIcon,
    postIcon,
    handleInput,
    helperText,
    invalid,
    autoFocus,
    ...other
  } = props;

  const startAdornment = preIcon
    ? {
        startAdornment: (
          <MaterialInputAdornment position="start">
            {preIcon}
          </MaterialInputAdornment>
        )
      }
    : undefined;
  const endAdornment = postIcon
    ? {
        endAdornment: (
          <MaterialInputAdornment position="start">
            {postIcon}
          </MaterialInputAdornment>
        )
      }
    : undefined;
  const inputProps = { ...startAdornment, ...endAdornment };

  return (
    <MaterialTextField
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleInput(event)
      }
      error={invalid}
      autoFocus={autoFocus}
      {...other}
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      fullWidth
      helperText={invalid && helperText}
      InputProps={inputProps}
    />
  );
};

TextField.defaultProps = {
  required: true
};
