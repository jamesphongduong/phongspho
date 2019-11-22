import React from 'react';
import { DefaultButton } from './Button';
import { Navbar } from './Navbar';

const navbarItems = ['Menu', 'About', 'Login / Register'];

export const App = (): JSX.Element => {
  return (
    <div>
      <Navbar items={navbarItems} />
      {/* <DefaultButton color="primary" /> */}
    </div>
  );
};
