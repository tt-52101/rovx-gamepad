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
import { LoginEmailPost } from '@product/services/requests';
import { asEntities, alert } from '@product/common';
import { FormInput, InlineHeader } from '@modules/shared/shared.module';
import { colors } from '@product/theme';

import { styles } from './email-login.styles';
import { SimpleFormLayoutComponent } from '../../components/simple-form-layout/simple-form-layout.component';
import { ProgressbarComponent } from '../../components/progressbar/progressbar.component';
import {
  NavigateToProfile,
  NavigateToSignup,
  SetUser
} from '../../user.actions';
import { translate } from '../../../../shared/translate';

export class EmailLoginScreen extends Component {
  subscription = null;
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState() {
    return {
      email: '',
      password: '',
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
        <Text style={styles.pageTitle}>{translate('login_account')}</Text>
        <Icon name="add" style={styles.headerIcon} />
      </View>
    );
  }

  @autobind
  onEmailChange(email) {
    this.setState({
      email
    });
  }
  @autobind
  onPasswordChange(password) {
    this.setState({
      password
    });
  }

  @autobind
  onWillBlur() {
    this.setState(this.initialState());
  }

  getForm() {
    const { response } = this.state;
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
            <Text style={styles.formDescription}>
              {translate('login_description')}
            </Text>
            <View style={{ marginVertical: 30 }}>
              <InlineHeader text={translate('login')} />
            </View>
            <View>
              <FormInput
                response={response}
                field="email"
                value={this.state.email}
                disabled={false}
                onChangeText={this.onEmailChange}
                placeholder={translate('your_email')}
              />
              <FormInput
                response={response}
                value={this.state.password}
                field="password"
                disabled={false}
                onChangeText={this.onPasswordChange}
                secureTextEntry={true}
                placeholder={translate('password')}
              />
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PhoneLogin')}
            style={{
              marginTop: 30,
              marginBottom: 10,
              fontSize: 19
            }}
          >
            <Text style={{ color: colors.primary }}>Login by phone number</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={NavigateToSignup}
            style={{
              marginTop: 10,
              marginBottom: 40
            }}
          >
            <Text style={{ color: colors.primary }}>
              {translate('create_account_with_email')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  @autobind
  onSubmitPress() {
    const { email, password } = this.state;
    this.setState({ isPosting: true }, () => {
      LoginEmailPost({ email, password })
        .then(response => {
          this.setState({
            response,
            isPosting: false
          });
          const entities = asEntities(response);
          if (!entities && response.error) {
            return alert({
              text:
                response.error.message ||
                "Something wen't wrong, try again later"
            });
          }
          SetUser(entities[0].user, entities[0].token);
          this.props.navigation.navigate(Store.afterLoginRedirect);
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
  }

  render() {
    return (
      <SimpleFormLayoutComponent
        onSubmitPress={this.onSubmitPress}
        title={translate('login_account')}
        submitLabel={translate('login_button')}
      >
        {this.getForm()}
      </SimpleFormLayoutComponent>
    );
  }
}
