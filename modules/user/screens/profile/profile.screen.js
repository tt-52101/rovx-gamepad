import React, { Component } from 'react';
import { Store } from '@product/services/store';
import { ProfileComponent } from '../../components/profile/profile.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { connect, screen } from '../../../shared/shared.helper';
import { translate } from '../../../../shared/translate';
import { ScreenInfo } from '../../../../shared/services/store';

@screen()
@connect({
  user: Store.user,
  userYachts: Store.userVessels,
  locale: Store.localisation,
  screen: ScreenInfo
})
export class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home!',
    tabBarVisible: false,
    tabBar: false
  };
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  getLoginOptionsView() {
    return (
      <LoginFormComponent
        title={translate('login_profile_header')}
        navigation={this.props.navigation}
      />
    );
  }
  getProfileView(screen) {
    return (
      <ProfileComponent
        navigation={this.props.navigation}
        user={this.props.store.user}
        screen={screen}
        userYachts={this.props.store.userYachts}
        title={translate('login_profile_header')}
      />
    );
  }
  render() {
    Store.afterLoginRedirect = 'Profile';
    if (this.props.store.user) {
      return this.getProfileView(this.props.store.screen);
    } else {
      return this.getLoginOptionsView();
    }
  }
}
