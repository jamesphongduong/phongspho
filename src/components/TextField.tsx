import React from 'react';
import {
  TextField as MaterialTextField,
  InputAdornment
} from '@material-ui/core';

interface Props {
  label: string;
  preLabel?: string;
}

export const TextField = (props: Props): JSX.Element => {
  const { preLabel, ...other } = props;

  return (
    <MaterialTextField
      {...other}
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      fullWidth
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
