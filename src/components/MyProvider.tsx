import React, { PureComponent } from 'react';
import { AppContextInterface } from '../types';
import { checkLoggedInLocalStorage } from '../utils';

export const AppContext = React.createContext<AppContextInterface | null>(null);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

interface Props {}
interface State {
  loggedIn: boolean;
}

export class MyProvider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loggedIn: checkLoggedInLocalStorage() ? true : false
    };
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
            }
          }
        }}
      >
        {this.props.children}
      </AppContextProvider>
    );
  }
}
