import React from 'react';
import { TextField } from '../TextField';
import Container from '@material-ui/core/Container';

export const NewDish = (): JSX.Element => {
  return (
    <Container maxWidth="sm">
      <TextField label="Title" />
      <TextField label="Price" preLabel="$" />
      <TextField label="Description" />
    </Container>
  );
};


interface Object1 {
    name: string;
}
const object = {name: 'james'}: Object1;