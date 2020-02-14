import React from 'react';
import { Navbar } from './Navbar';
import { MyProvider } from './';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { colors } from '../config';
import { Switch, Route } from 'react-router-dom';
import { About, Login, Gallery, NotFound, Upload } from './pages';
import { Box } from '@material-ui/core';

interface Props {}

export const App = (props: Props): JSX.Element => {
  const navbarItems = [
    { label: 'Gallery', route: '/' },
    { label: 'About', route: 'about' }
  ];

  return (
    <MyProvider>
      <div style={styles.container}>
        <MuiThemeProvider theme={theme}>
          <Navbar items={navbarItems} />
          <Box p={4} style={{ height: '100%' }}>
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/upload">
                <Upload />
              </Route>
              <Route exact path="/">
                <Gallery />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Box>
        </MuiThemeProvider>
      </div>
    </MyProvider>
  );
};

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.main },
    secondary: { main: colors.secondary }
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

const styles = {
  container: {
    height: '100vh',
    boxSizing: 'border-box' as 'border-box',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column' as 'column'
  }
};
