import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { Button } from './Button';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { menuItem } from '../types';

interface Props {
  items: menuItem[];
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

  return (
    <AppBar position="static">
      <Toolbar className={classes.container}>{renderItems()}</Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'flex-end'
  }
}));
