import React from 'react';
import {
  TextField as MaterialTextField,
  InputAdornment
} from '@material-ui/core';

interface Props {
  label: string;
  preLabel?: string;
  multiline?: boolean;
  handleInput(event: React.ChangeEvent<HTMLInputElement>): void;
  value: string;
  required?: boolean;
  helperText?: string;
  invalid?: boolean;
}

export const TextField = (props: Props): JSX.Element => {
  const { preLabel, label, handleInput, helperText, invalid, ...other } = props;

  return (
    <MaterialTextField
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleInput(event)
      }
      error={invalid}
      {...other}
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      id={`${label.toLowerCase()}Input`}
      label={label}
      fullWidth
      helperText={invalid && helperText}
      InputProps={
        preLabel
          ? {
              startAdornment: (
                <InputAdornment position="start">{preLabel}</InputAdornment>
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
