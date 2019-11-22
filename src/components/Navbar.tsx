import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
  // MenuIcon
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import shortid from 'shortid';

interface Props {
  items: string[];
}

export const Navbar = (props: Props): JSX.Element => {
  const { items } = props;
  console.log('items', items);
  const renderItems = () => {
    return items.map((item) => {
      return (
        <Typography variant="h6" key={shortid.generate()}>
          {item}
        </Typography>
      );
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          // className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        {renderItems()}
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};
