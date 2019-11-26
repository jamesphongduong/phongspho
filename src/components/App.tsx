import React from 'react';
import { Navbar } from './Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';
import { Switch, Route } from 'react-router-dom';
import { Home, About, Auth, Gallery, NotFound, Upload } from './pages';
import { Box as MaterialBox } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3F3D56' },
    secondary: { main: '#D0D0D0' }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
});
const navbarItems = [
  { label: 'Home', route: '/' },
  { label: 'Gallery', route: 'Gallery' },
  { label: 'About', route: 'about' }
  // { label: 'Login / Register', route: 'login' }
];

export const App = (): JSX.Element => {
  return (
    <div style={styles.container}>
      <MuiThemeProvider theme={theme}>
        <Navbar items={navbarItems} />
        <MaterialBox p={4} style={{ height: '100%' }}>
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Auth />
            </Route>
            <Route exact path="/upload">
              <Upload />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/gallery">
              <Gallery />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </MaterialBox>
      </MuiThemeProvider>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column' as 'column'
    // alignItems: 'center'
    // justifyContent: 'center'
  }
};
