import React from 'react';
import { TextField } from '@material-ui/core';

interface CustomTextFieldProps {
  id: string;
  type?: string;
  disabled?: boolean;
  label?: string;
  multiline?: boolean;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  helperText?: string;
  invalid?: boolean;
  autoFocus?: boolean;
  fullWidth?: boolean;
  InputProps?: object;
}

export const CustomTextField = (props: CustomTextFieldProps): JSX.Element => {
  const { handleInput, helperText, invalid, autoFocus, ...other } = props;

  return (
    <TextField
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleInput(event)
      }
      error={invalid}
      autoFocus={autoFocus}
      {...other}
      InputLabelProps={{
        shrink: true
      }}
      fullWidth
      helperText={invalid && helperText}
      style={{ marginBottom: '32px' }}
      onFocus={(e) => {
        const val = e.target.value;
        e.target.value = '';
        e.target.value = val;
      }}
    />
  );
};

CustomTextField.defaultProps = {
  required: true
};
