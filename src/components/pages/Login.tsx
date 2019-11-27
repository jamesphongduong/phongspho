import React, { PureComponent } from 'react';
import { Typography as MaterialTypography } from '@material-ui/core';
import { Button, TextField } from '../';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';

type Props = RouteComponentProps<{}>; // possibly need to refactor

interface State {
  passwordInput: string;
  showPassword: boolean;
}

class _Login extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      passwordInput: '',
      showPassword: false
    };
  }

  onLogin = (): void => {
    const { history } = this.props;
    const { passwordInput } = this.state;

    if (passwordInput === 'password') {
      alert('succesful');
      history.push('/gallery');
    }
  };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { id, value }
    } = e;
    this.setState({ [id]: value } as any); // possible refactor
  };

  toggleShowPassword = (): void => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword
    }));
  };

  render(): JSX.Element {
    const { passwordInput, showPassword } = this.state;

    return (
      <div style={styles.container}>
        <MaterialTypography gutterBottom align="center" variant="h2">
          Root user login
        </MaterialTypography>
        <TextField
          id="loginInput"
          preIcon={<AccountCircle />}
          value="Phong"
          handleInput={this.onInputChange}
          disabled
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          id="passwordInput"
          preIcon={<Lock />}
          postIcon={
            showPassword ? (
              <Visibility onClick={this.toggleShowPassword} />
            ) : (
              <VisibilityOff onClick={this.toggleShowPassword} />
            )
          }
          value={passwordInput}
          handleInput={this.onInputChange}
        />
        <Button label="Log in" color="primary" onClick={this.onLogin} />
        <img src={'/login.svg'} style={styles.img} />
      </div>
    );
  }
}

export const Login = withRouter(_Login);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  img: {
    width: '50%',
    height: '50%'
  }
};
