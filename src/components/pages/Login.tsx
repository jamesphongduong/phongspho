import React, { PureComponent } from 'react';
import { InputAdornment, Typography, Box } from '@material-ui/core';
import { SweetAlertResult } from 'sweetalert2';
import { CustomButton, CustomTextField, Image } from '../';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import { loginAdmin } from '../../redux/actions';
import { alertUnsuccessful, alertSuccessful } from '../../utils/';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setLoggedInLocalStorage } from '../../utils';
import { LoginAction } from '../../types';
import { app } from '../../styles';

interface _LoginProps {}

interface _LoginState {
  passwordInput: string;
  showPassword: boolean;
}

type Props = _LoginProps & RouteComponentProps & linkDispatchProps; // possible refactor on routecomponentprops

class _Login extends PureComponent<Props, _LoginState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      passwordInput: '',
      showPassword: false
    };
  }

  onLogin = (): Promise<SweetAlertResult> => {
    const { loginAdmin, history } = this.props;
    const { passwordInput } = this.state;

    if (passwordInput !== 'password')
      return alertUnsuccessful('Incorrect credentials.');

    loginAdmin();
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

interface linkDispatchProps {
  loginAdmin: () => LoginAction;
}

const mapDispatchToProps = (dispatch: Dispatch): linkDispatchProps => {
  return {
    loginAdmin: () => dispatch(loginAdmin())
  };
};

export const Login = connect(null, mapDispatchToProps)(withRouter(_Login));

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column' as 'column',
//     alignItems: 'center',
//     height: '100%',
//     justifyContent: 'center'
//   },
//   imageContainer: {
//     marginBottom: 40
//   }
// };
