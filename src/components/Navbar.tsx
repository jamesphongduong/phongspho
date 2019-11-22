import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
  // Button
  // MenuIcon
} from '@material-ui/core';
import { Button } from './Button';
import { withKey } from './hocs/WithKey';
import MenuIcon from '@material-ui/icons/Menu';
import shortid from 'shortid';

interface Props {
  items: string[];
}

export const Navbar = (props: Props): JSX.Element => {
  const { items } = props;

  const ButtonK = withKey(Button);
  const renderItems = (): JSX.Element[] => {
    return items.map(
      (item): JSX.Element => {
        return <ButtonK text={item} />;
      }
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
          edge="start"
          // className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        {/* <Button /> */}
        {renderItems()}
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};
