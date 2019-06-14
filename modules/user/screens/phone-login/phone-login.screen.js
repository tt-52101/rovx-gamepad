import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import { Icon } from 'native-base';
import { autobind } from 'core-decorators';

import { Store } from '@product/services/store';
import { LoginByPhone } from '@product/services/requests';
import { asEntities, alert } from '@product/common';
import { FormInput, InlineHeader } from '@modules/shared/shared.module';
import { colors } from '@product/theme';

import { styles } from './phone-login.styles';
import { SimpleFormLayoutComponent } from '../../components/simple-form-layout/simple-form-layout.component';
import { ProgressbarComponent } from '../../components/progressbar/progressbar.component';
import { SetUser, NavigateToLoginByEmail } from '../../user.actions';
import { translate } from '../../../../shared/translate';

export class PhoneLoginScreen extends Component {
  subscription = null;
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState() {
    return {
      phone: '',
      activation_code: '',
      activation_code_requested: false,
      isPosting: false,
      response: null
    };
  }

  componentDidMount() {
    SplashScreen && SplashScreen.hide && SplashScreen.hide();
    Store.navigation = this.props.navigation;
  }

  getHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.pageTitle}>SMS Login</Text>
        <Icon name="add" style={styles.headerIcon} />
      </View>
    );
  }

  onPhoneChange = phone => {
    this.setState({
      phone
    });
  };

  onActivationCodeChange = activation_code => {
    this.setState({
      activation_code
    });
  };

  @autobind
  onWillBlur() {
    this.setState(this.initialState());
  }

  getForm() {
    const { response, activation_code_requested } = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <NavigationEvents onWillBlur={this.onWillBlur} />

        <View style={styles.formContainer}>
          {this.state.isPosting ? <ProgressbarComponent /> : null}
          <KeyboardAvoidingView
            behavior="position"
            enabled
            keyboardVerticalOffset={150}
          >
            <View style={{ marginVertical: 30 }}>
              <InlineHeader text={translate('login')} />
            </View>
            <View>
              <FormInput
                response={response}
                field="phone"
                value={this.state.phone}
                type="phone"
                onChangeText={this.onPhoneChange}
                placeholder="Your phone"
              />

              {activation_code_requested ? (
                <FormInput
                  response={response}
                  field="activation_code"
                  value={this.state.activation_code}
                  onChangeText={this.onActivationCodeChange}
                  placeholder="Activation code (4-5 digits)"
                />
              ) : null}
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity
            onPress={NavigateToLoginByEmail}
            style={{
              marginTop: 30,
              marginBottom: 10,
              fontSize: 19
            }}
          >
            <Text style={{ color: colors.primary }}>
              You can signin or create account by email
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  onSubmitPress = () => {
    const { phone, activation_code } = this.state;
    this.setState({ isPosting: true }, () => {
      LoginByPhone(phone, activation_code)
        .then(response => {
          this.setState({
            response,
            isPosting: false
          });
          if (!response) {
            return alert({
              text: 'Internet connection might be slow or unavailable'
            });
          }
          const entities = asEntities(response);
          if (!entities && response.error) {
            return alert({
              text:
                response.error.message ||
                "Something wen't wrong, try again later"
            });
          }
          this.setState({
            activation_code_requested: true
          });

          if (entities && entities[0].token) {
            SetUser({ phone }, entities[0].token);
            this.props.navigation.navigate(Store.afterLoginRedirect);
          }
        })
        .catch(error => {
          this.setState({
            isPosting: false
          });
          alert({
            text: (error && error.message) || 'Please try again later'
          });
        });
    });
  };

  render() {
    const { activation_code_requested } = this.state;
    return (
      <SimpleFormLayoutComponent
        onSubmitPress={this.onSubmitPress}
        title={translate('login_account')}
        submitLabel={
          activation_code_requested ? 'Login now' : 'Get activation code'
        }
      >
        {this.getForm()}
      </SimpleFormLayoutComponent>
    );
  }
}
