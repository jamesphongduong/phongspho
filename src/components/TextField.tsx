import React from 'react';
import {
  TextField as MaterialTextField,
  InputAdornment as MaterialInputAdornment
} from '@material-ui/core';

interface Props {
  label?: string;
  preLabel?: string;
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
    preLabel,
    label,
    handleInput,
    helperText,
    invalid,
    autoFocus,
    ...other
  } = props;

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
      id={label && `${label.toLowerCase()}Input`}
      label={label}
      fullWidth
      helperText={invalid && helperText}
      InputProps={
        preLabel
          ? {
              startAdornment: (
                <MaterialInputAdornment position="start">
                  {preLabel}
                </MaterialInputAdornment>
              )
            }
          : undefined
      }
    />
  );
};

TextField.defaultProps = {
  required: true
};
