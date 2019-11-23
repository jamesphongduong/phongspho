import React from 'react';
import { Navbar } from './Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';
import { Switch, Route } from 'react-router-dom';
import { About, Auth, Menu, NoMatch } from './pages';
import { Box } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[800] },
    secondary: { main: blue[500] }
  }
});
const navbarItems = [
  { label: 'Menu', route: '' },
  { label: 'About', route: 'about' },
  { label: 'Login / Register', route: 'login' }
];

export const App = (): JSX.Element => {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar items={navbarItems} />
      <Box p={4}>
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Auth />
          </Route>
          <Route exact path="/">
            <Menu />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Box>
    </MuiThemeProvider>
  );
};
