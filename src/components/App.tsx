import React from 'react';
import { Button } from './Button';
import { Navbar } from './Navbar';
import { Menu } from './pages/Menu';
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
        <Menu />
      </MuiThemeProvider>
      {/* <Button color="primary" /> */}
    </div>
  );
};
