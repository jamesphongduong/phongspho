import React from 'react';
import {
  AppBar as MaterialAppBar,
  Toolbar as MaterialToolBar
} from '@material-ui/core';
import { Button } from './Button';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { navbarItem } from '../types';

interface Props {
  items: navbarItem[];
}

export const Navbar = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { items } = props;

  const renderItems = (): JSX.Element[] => {
    return items.map(
      (item): JSX.Element => {
        const { label, route } = item;

        return (
          <Link to={`${route}`} key={shortid.generate()}>
            <Button color="secondary" label={label} variant="text" />
          </Link>
        );
      }
    );
  };

  // if admin
  const renderNewDishButton = (): JSX.Element => {
    return (
      <Link to="/upload">
        <Button color="secondary" label="Upload" />
      </Link>
    );
  };

  return (
    <MaterialAppBar position="static">
      <MaterialToolBar className={classes.container}>
        <div>
          <img src={'/camera.svg'} className={classes.img} />
        </div>
        <div>
          {renderNewDishButton()}
          {renderItems()}
        </div>
      </MaterialToolBar>
    </MaterialAppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'space-between'
  },
  img: {
    width: '24px',
    height: '24px'
  }
}));
