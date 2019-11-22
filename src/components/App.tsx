import React from 'react';
import { DefaultButton } from './Button';
import { Navbar } from './Navbar';

export const App = (): JSX.Element => {
  return (
    <div>
      <Navbar items={['Menu', 'About', 'Login / Register']} />
      {/* <DefaultButton color="primary" /> */}
    </div>
  );
};
