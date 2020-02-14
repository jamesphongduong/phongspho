import React from 'react';
import { Navbar } from './Navbar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { colors } from '../config';
import { Switch, Route } from 'react-router-dom';
import { About, Login, Gallery, NotFound, Upload } from './pages';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState, AppContextInterface } from '../types';
import { AppContextProvider } from './';

const sampleAppContext: AppContextInterface = {
  loggedIn: true
};

interface AppProps {}

type Props = AppProps & linkStateProps;

const App = (props: Props): JSX.Element => {
  const navbarItems = [
    { label: 'Gallery', route: '/' },
    { label: 'About', route: 'about' }
  ];

  return (
    <AppContextProvider value={sampleAppContext}>
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
    </AppContextProvider>
  );
};

interface linkStateProps {
  loggedIn: boolean;
}

const mapStateToProps = (state: RootState): linkStateProps => {
  return {
    loggedIn: state.adminReducer.loggedIn
  };
};

export default connect(mapStateToProps)(App);

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
