import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { Button } from './Button';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  items: string[];
}

export const Navbar = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { items } = props;

  const renderItems = (): JSX.Element[] => {
    return items.map(
      (item): JSX.Element => {
        return (
          <Button color="secondary" text={item} key={shortid.generate()} />
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
