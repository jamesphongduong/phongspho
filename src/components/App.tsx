import React from 'react';
import { Navbar } from './Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { colors } from '../config';
import { Switch, Route } from 'react-router-dom';
import { Home, About, Login, Gallery, NotFound, Upload } from './pages';
import { Box as MaterialBox } from '@material-ui/core';
import { connect } from 'react-redux';

const App = (): JSX.Element => {
  const navbarItems = [
    { label: 'Home', route: '/' },
    { label: 'Gallery', route: 'gallery' },
    { label: 'About', route: 'about' }
  ];

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
              <Login />
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

const mapStateToProps = (state) => {
  return {
    loggedIn: state.adminReducer.loggedIn
  };
};

export default connect(mapStateToProps)(App);

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.main, contrastText: '#f44336' },
    secondary: { main: colors.action }
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
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column' as 'column'
  }
};
