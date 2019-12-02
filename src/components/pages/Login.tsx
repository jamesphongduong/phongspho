import React, { PureComponent } from 'react';
import { Box, InputAdornment, Container } from '@material-ui/core';
import { CustomButton, CustomTextField, Image } from '../';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import { loginAdmin } from '../../redux/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setLoggedInLocalStorage } from '../../utils';
import { LoginAction } from '../../types';

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

  onLogin = (): void => {
    const { loginAdmin } = this.props;

    loginAdmin();
    setLoggedInLocalStorage();
    // const { history } = this.props;
    // const { passwordInput } = this.state;
    // if (passwordInput === 'password') {
    //   alert('succesful');
    //   history.push('/gallery');
    // }
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
        <div style={styles.halfContainer}>
          <Image src={'/login.svg'} />
        </div>
        <Container maxWidth="xs" style={styles.halfContainer}>
          <CustomTextField
            id="loginInput"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
            value="Phong"
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
            label="Log in"
            color="primary"
            onClick={this.onLogin}
            size="large"
          />
        </Container>
      </div>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    height: '100%'
  },
  halfContainer: {
    width: '50%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    border: '1px solid black'
  }
};
