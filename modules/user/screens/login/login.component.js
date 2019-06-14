import React, { Component } from 'react';

import { ProfileComponent } from '../../components/profile/profile.component';
import { Store, ReloadUser } from '@product/services/store';
import { combineLatest } from 'rxjs';
import SplashScreen from 'react-native-splash-screen';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

export class LoginScreen extends Component {
  subscription = null;
  constructor() {
    super();
    this.state = {
      token: null,
      user: null
    };
  }

  componentWillMount() {
    this.subscription = combineLatest(Store.user, Store.token).subscribe(
      ([user, token]) => {
        this.setState({ user, token });
      }
    );
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  componentDidMount() {
    SplashScreen && SplashScreen.hide && SplashScreen.hide();
  }
  loginForm() {
    return <LoginFormComponent navigation={this.props.navigation} />;
  }

  render() {
    const { user, token } = this.state;
    if (!user && !token) {
      return this.loginForm();
    }
    return <ProfileComponent user={user} navigation={this.props.navigation} />;
  }
}
