import React, { PureComponent } from 'react';
import { AppContextInterface } from '../types';

const ctxt = React.createContext<AppContextInterface | null>(null);
export const AppContextProvider = ctxt.Provider;
export const AppContextConsumer = ctxt.Consumer;

interface Props {}
interface State {
  loggedIn: boolean;
}

export class MyProvider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loggedIn: true
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
