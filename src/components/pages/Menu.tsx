import React, { PureComponent } from 'react';
import { MenuItem } from '../';
import { getMeals } from '../../api';
import { dish } from '../../types';
import shortid from 'shortid';
import { Typography } from '../Typography';

interface State {
  dishes: dish[];
}

export class Menu extends PureComponent<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      dishes: []
    };
  }

  componentDidMount() {
    getMeals().then((res) => {
      this.setState({ dishes: res.data });
    });
  }

  renderMenu = (): JSX.Element[] => {
    const { dishes } = this.state;

    return dishes.map(
      (dish: dish): JSX.Element => {
        return (
          <MenuItem
            key={shortid.generate()}
            title={dish.title}
            price={dish.price}
            description={dish.description}
            imageURL={dish.imageURL}
          />
        );
      }
    );
  };

  render() {
    return (
      <div>
        <Typography text="Dishes" variant="h4" /> {this.renderMenu()}
      </div>
    );
  }
}
