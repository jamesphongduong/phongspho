import React, { PureComponent } from 'react';
import { AppContextInterface } from '../types';
import { checkLoggedInLocalStorage } from '../utils';
import { getAlbums } from '../api';

export const AppContext = React.createContext<AppContextInterface | null>(null);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

interface Props {}
interface State {
  loggedIn: boolean;
  albums: string[];
  albumSelected: number;
}

export class MyProvider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loggedIn: checkLoggedInLocalStorage() ? true : false,
      albums: [],
      albumSelected: 0
    };
  }

  componentDidMount() {
    getAlbums().then((res) => this.setState({ albums: res.data.sort() }));
  }

  render() {
    return (
      <AppContextProvider
        value={{
          state: this.state,
          updateState: {
            toggleLogin: () => {
              this.setState((prevState) => ({
                loggedIn: !prevState.loggedIn
              }));
            },
            changeAlbum: (index) => {
              this.setState({ albumSelected: index });
            }
          }
        }}
      >
        {this.props.children}
      </AppContextProvider>
    );
  }
}
