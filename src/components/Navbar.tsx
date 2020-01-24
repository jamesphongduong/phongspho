import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { CustomButton, Image } from './';
import shortid from 'shortid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { NavbarItem, LogoutAction } from '../types';
import { connect } from 'react-redux';
import { logoutAdmin } from '../redux/actions';
import { removeLoggedInLocalStorage } from '../utils';
import { RootState } from '../types';
import { Dispatch } from 'redux';
import { alertSuccessful } from '../utils';
import { SweetAlertResult } from 'sweetalert2';

interface _NavbarProps {
  items: NavbarItem[];
  logoutAdmin: () => void;
  loggedIn: boolean;
}

type Props = _NavbarProps & LinkStateProps & LinkDispatchProps;

const _Navbar = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { items, loggedIn, logoutAdmin } = props;

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

  const renderNewDishButton = (): JSX.Element => {
    return (
      <Link className={classes.link} to="/upload">
        <CustomButton color="secondary" label="Upload" />
      </Link>
    );
  };

  const onLogOut = (): Promise<SweetAlertResult> => {
    logoutAdmin();
    removeLoggedInLocalStorage();
    return alertSuccessful('Successfully logged out.');
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.container}>
        <div>
          <Image src={'/camera.svg'} size="icon" alt="camera" />
        </div>
        <div>
          {loggedIn && renderNewDishButton()}
          {renderItems()}
          {loggedIn && (
            <CustomButton label="Log out" onClick={onLogOut} variant="text" />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

interface LinkStateProps {
  loggedIn: boolean;
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  return {
    loggedIn: state.adminReducer.loggedIn
  };
};

interface LinkDispatchProps {
  logoutAdmin: () => LogoutAction;
}

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchProps => {
  return {
    logoutAdmin: () => dispatch(logoutAdmin())
  };
};

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(_Navbar);

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
