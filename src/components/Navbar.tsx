import React, { Fragment } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { CustomButton, Image, AppContextConsumer } from './';
import shortid from 'shortid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { NavbarItem } from '../types';
import { removeLoggedInLocalStorage } from '../utils';
import { alertSuccessful } from '../utils';

interface Props {
  items: NavbarItem[];
}

export const Navbar = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { items } = props;

  const renderItems = (): JSX.Element[] => {
    return items.map(
      (item): JSX.Element => {
        const { label, route } = item;
        return (
          <Link
            className={classes.link}
            to={`${route}`}
            key={shortid.generate()}
          >
            <CustomButton color="secondary" label={label} variant="text" />
          </Link>
        );
      }
    );
  };

  const renderUploadButton = (): JSX.Element => {
    return (
      <Link className={classes.link} to="/upload">
        <CustomButton color="secondary" label="Upload" />
      </Link>
    );
  };

  const renderAdminLoginButton = (): JSX.Element => {
    return (
      <Link className={classes.link} to="/login">
        <CustomButton color="secondary" label="Admin Login" />
      </Link>
    );
  };

  return (
    <AppContextConsumer>
      {(context) => (
        <Fragment>
          <AppBar position="static">
            <Toolbar className={classes.container}>
              <div>
                <Image src={'/camera.svg'} size="icon" alt="camera" />
              </div>
              <div>
                {context && context.state.loggedIn && renderUploadButton()}
                {context && !context.state.loggedIn && renderAdminLoginButton()}
                {renderItems()}
                {context && context.state.loggedIn && (
                  <CustomButton
                    label="Log out"
                    onClick={() => {
                      context.updateState.toggleLogin();
                      removeLoggedInLocalStorage();
                      return alertSuccessful('Successfully logged out.');
                    }}
                    variant="text"
                  />
                )}
              </div>
            </Toolbar>
          </AppBar>
        </Fragment>
      )}
    </AppContextConsumer>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      justifyContent: 'space-between'
    },
    link: {
      textDecoration: 'none'
    }
  })
);
