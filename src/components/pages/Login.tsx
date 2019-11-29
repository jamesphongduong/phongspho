import React, { PureComponent } from 'react';
import { Typography as MaterialTypography, Container } from '@material-ui/core';
import { Button, TextField } from '../';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import { loginAdmin } from '../../redux/actions';
import { connect } from 'react-redux';
import { setLoggedInLocalStorage } from '../../utils';

type Props = {
  loginAdmin(): void;
};

interface State {
  passwordInput: string;
  showPassword: boolean;
}

class _Login extends PureComponent<Props & RouteComponentProps<{}>, State> {
  constructor(props) {
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
        <img src={'/login.svg'} style={styles.img} />
        <Container maxWidth="xs">
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
          <Button
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

const actionCreators = {
  loginAdmin
};

export const Login = connect(null, actionCreators)(withRouter(_Login));

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  img: {
    width: '25%',
    height: '25%',
    marginBottom: '80px'
  }
};
