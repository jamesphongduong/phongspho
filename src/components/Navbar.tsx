import React from 'react';
import {
  AppBar as MaterialAppBar,
  Toolbar as MaterialToolBar
} from '@material-ui/core';
import { Button, Image } from './';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { navbarItem } from '../types';
import { connect } from 'react-redux';
import { logoutAdmin } from '../redux/actions';
import { removeLoggedInLocalStorage } from '../utils';

interface Props {
  items: navbarItem[];
  logoutAdmin(): any;
  loggedIn: boolean;
}

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
            <Button color="secondary" label={label} variant="text" />
          </Link>
        );
      }
    );
  };

  const renderNewDishButton = (): JSX.Element => {
    return (
      <Link className={classes.link} to="/upload">
        <Button color="secondary" label="Upload" />
      </Link>
    );
  };

  const onLogOut = (): void => {
    logoutAdmin();
    removeLoggedInLocalStorage();
  };

  return (
    <MaterialAppBar position="static">
      <MaterialToolBar className={classes.container}>
        <div>
          <Image src={'/camera.svg'} size="icon" />
        </div>
        <div>
          {loggedIn && renderNewDishButton()}
          {renderItems()}
          {loggedIn && (
            <Button label="Log out" onClick={onLogOut} variant="text" />
          )}
        </div>
      </MaterialToolBar>
    </MaterialAppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.adminReducer.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAdmin: () => dispatch(logoutAdmin())
  };
};

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(_Navbar);

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'space-between'
  },
  link: {
    textDecoration: 'none'
  }
}));
