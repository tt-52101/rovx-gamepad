import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { styles } from './auth-options.style';
import { Root } from 'native-base';
import { autobind } from 'core-decorators';
import { LoginButtonsComponent } from '../login-buttons/login-buttons.component';
import { translate } from '../../../../shared/translate';
import { alert } from '../../../../shared/common';
import { PrivacyPolicy } from '../privacy-policy/privacy-policy.component';

export class AuthOptionsComponent extends Component {
  @autobind
  onPressSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  @autobind
  emailLoginHandler() {
    if (this.props.onPressEmailButton) {
      this.props.onPressEmailButton();
    }
  }

  acceptForm() {
    return (
      <View>
        <View style={styles.acceptFormRow}>
          <Text style={styles.textAccept}>
            {translate('by_continue_you_agree')}{' '}
          </Text>
          <PrivacyPolicy />
        </View>
      </View>
    );
  }

  render() {
    return (
      <Root>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.formDescription}>
                {this.props.title || translate('login_header')}
              </Text>
              <LoginButtonsComponent />
            </View>
            {this.acceptForm()}
          </View>
        </SafeAreaView>
      </Root>
    );
  }
}
