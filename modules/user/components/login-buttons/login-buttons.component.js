import React from 'react';
import { View } from 'react-native';
import { FacebookLoginButton } from '../compound-button/FacebookLoginButton';
import EmailLoginButton from '../compound-button/EmailLoginButton';
import { autobind } from 'core-decorators';
import { Store, cacheCredentials } from '../../../../shared/services/store';
import { ProgressbarComponent } from '../progressbar/progressbar.component';
import { alert } from '../../../../shared/common';
import { translate } from '../../../../shared/translate';
import { AuthUsingFacebook } from '../../../../shared/services/requests';
import { SetUser } from '../../user.actions';
import PhoneLoginButton from '../compound-button/PhoneLoginButton';

export class LoginButtonsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      working: false
    };
  }
  @autobind
  async onPressFacebookButton() {
    this.cancellationFlag = true;
    this.setState({
      working: true
    });
    try {
      const auth = await AuthUsingFacebook();
      if (auth && auth.data && auth.data.items && auth.data.items[0]) {
        const api = auth.data.items[0];
        SetUser(api.user, api.token);
        cacheCredentials(api);
      }
    } catch (error) {
      alert({
        text: error.message || error.msg || translate('facebook_cannot_login')
      });
    }

    this.setState({
      working: false
    });
  }

  hideProgressBar() {
    setTimeout(() => {
      this.setState({
        working: false
      });
    }, 2000);
  }

  cancellationFlag = true;
  componentWillUpdate() {
    if (this.cancellationFlag) {
      this.cancellationFlag = false;
      this.hideProgressBar();
    }
  }

  @autobind
  emailLoginHandler() {
    Store.navigation.navigate('EmailLogin');
  }

  phoneLogin = () => {
    Store.navigation.navigate('PhoneLogin');
  };

  render() {
    // @todo <GoogleLoginButton onPress={this.googleLoginHandler} />
    return (
      <View>
        {this.state.working ? <ProgressbarComponent /> : null}
        <EmailLoginButton onPress={this.emailLoginHandler} />
        <PhoneLoginButton onPress={this.phoneLogin} />
      </View>
    );
  }
}
