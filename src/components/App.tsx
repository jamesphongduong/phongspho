import React from 'react';
import { Button } from './Button';
import { Navbar } from './Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[800] },
    secondary: { main: blue[500] }
  }
});
const navbarItems = ['Menu', 'About', 'Login / Register'];

export const App = (): JSX.Element => {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Navbar items={navbarItems} />
      </MuiThemeProvider>
      {/* <Button color="primary" /> */}
    </div>
  );
};
