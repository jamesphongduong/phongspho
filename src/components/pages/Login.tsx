import React, { PureComponent } from 'react';
import { InputAdornment, Typography, Box } from '@material-ui/core';
import { SweetAlertResult } from 'sweetalert2';
import { CustomButton, CustomTextField, Image, AppContext } from '../';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import { alertUnsuccessful, alertSuccessful } from '../../utils/';
import { setLoggedInLocalStorage } from '../../utils';
import { app } from '../../styles';

interface _LoginProps {}

interface State {
  passwordInput: string;
  showPassword: boolean;
}

type Props = _LoginProps & RouteComponentProps; // possible refactor on routecomponentprops

class _Login extends PureComponent<Props, State> {
  static contextType = AppContext;
  constructor(props: Props) {
    super(props);
    this.state = {
      passwordInput: '',
      showPassword: false
    };
  }

  onLogin = (): Promise<SweetAlertResult> => {
    const { history } = this.props;
    const { passwordInput } = this.state;
    const appContext = this.context;

    if (passwordInput !== 'password')
      return alertUnsuccessful('Incorrect credentials.');

    appContext.updateState.toggleLogin();
    setLoggedInLocalStorage();
    history.push('/');
    return alertSuccessful('Successfully logged in as admin.');
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
      <Box px={16} style={app.splitContainer}>
        <Image src={'/login.svg'} alt="login" />
        <div>
          <Typography variant="h2" gutterBottom style={app.headingStyle}>
            Login
          </Typography>
          <CustomTextField
            id="loginInput"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
            value="admin"
            handleInput={this.onInputChange}
            disabled
          />
          <CustomTextField
            type={showPassword ? 'text' : 'password'}
            id="passwordInput"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  {showPassword ? (
                    <Visibility onClick={this.toggleShowPassword} />
                  ) : (
                    <VisibilityOff onClick={this.toggleShowPassword} />
                  )}
                </InputAdornment>
              )
            }}
            value={passwordInput}
            handleInput={this.onInputChange}
          />
          <CustomButton
            fullWidth
            label="Login"
            color="secondary"
            onClick={this.onLogin}
            size="large"
          />
        </div>
      </Box>
    );
  }
}

export const Login = withRouter(_Login);
