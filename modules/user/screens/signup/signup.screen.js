import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Linking
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Root, Button, Icon } from 'native-base';
import CheckBox from 'react-native-check-box';
import { NavigationEvents } from 'react-navigation';
import { autobind } from 'core-decorators';

import { Store } from '@product/services/store';
import { colors } from '@product/theme';
import { SignUpEmailPost } from '@product/services/requests';
import { asEntities, trimObjectProperties } from '@product/common';
import { FormInput, InlineHeader } from '@modules/shared/shared.module';

import { styles } from './signup.styles';
import { ProgressbarComponent } from '../../components/progressbar/progressbar.component';
import {
  NavigateToLoginByEmail,
  NavigateToProfile,
  SetUser
} from '../../user.actions';
import { alert } from '../../../../shared/common';
import { translate } from '../../../../shared/translate';
import { PrivacyPolicy } from '../../components/privacy-policy/privacy-policy.component';

export class EmailSignupScreen extends Component {
  subscription = null;
  constructor() {
    super();
    this.state = this.initialState();
  }

  @autobind
  onWillBlur() {
    this.setState(this.initialState());
  }

  initialState() {
    return {
      token: null,
      user: null,
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      isAccept: false,
      isPosting: false,
      response: null
    };
  }

  componentDidMount() {
    SplashScreen && SplashScreen.hide && SplashScreen.hide();
  }

  @autobind
  onFirstNameChange(firstname) {
    this.setState({
      firstname
    });
  }

  @autobind
  onLastNameChange(lastname) {
    this.setState({
      lastname
    });
  }

  @autobind
  onPhoneChange(phone) {
    this.setState({
      phone
    });
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
  onConfirmPasswordChange(confirm_password) {
    this.setState({
      confirm_password
    });
  }
  @autobind
  onAcceptFormChanged() {
    this.setState({
      isAccept: !this.state.isAccept
    });
  }

  @autobind
  async onSubmitPress() {
    let data = trimObjectProperties(this.state);
    if (!data.isAccept) {
      return alert({
        text: translate('accept_terms')
      });
    }
    this.setState({ isPosting: true });
    try {
      const response = await SignUpEmailPost(data);
      this.setState({
        response,
        isPosting: false
      });
      const entities = asEntities(response);
      if (!entities && response.error) {
        return alert({
          text: response.error.message || translate('something_went_wrong')
        });
      }

      if (entities.length) {
        alert({
          text: translate('account_been_created').replace(
            '%name%',
            data.firstname
          )
        });
        SetUser({ ...data, ...entities[0].user }, entities[0].token);
        this.props.navigation.navigate(Store.afterLoginRedirect);
      }
    } catch (error) {
      this.setState({
        isPosting: false
      });
      alert({
        text: (error && error.message) || translate('try_again_later')
      });
    }
  }

  render() {
    return (
      <Root>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {this.getHeader()}
            {this.state.isPosting ? <ProgressbarComponent /> : null}
            {this.getForm()}
            {this.getFooter()}
          </View>
        </SafeAreaView>
      </Root>
    );
  }

  getHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.pageTitle}>{translate('create_account')}</Text>
        <Icon name="add" style={styles.headerIcon} />
      </View>
    );
  }

  getForm() {
    const { response } = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <NavigationEvents onWillBlur={this.onWillBlur} />

        <View style={styles.formContainer}>
          <KeyboardAvoidingView
            behavior="position"
            enabled
            keyboardVerticalOffset={-50}
          >
            <Text style={styles.formDescription}>
              {translate('signup_screen_title')}
            </Text>
            <View style={{ marginVertical: 30 }}>
              <InlineHeader text="Create Now" />
            </View>
            <FormInput
              response={response}
              field="firstname"
              value={this.state.firstname}
              disabled={false}
              onChangeText={this.onFirstNameChange}
              placeholder={translate('first_name')}
            />

            <FormInput
              response={response}
              field="lastname"
              value={this.state.lastname}
              disabled={false}
              onChangeText={this.onLastNameChange}
              placeholder={translate('last_name')}
            />
            <FormInput
              response={response}
              field="phone"
              value={this.state.phone}
              disabled={false}
              onChangeText={this.onPhoneChange}
              placeholder={translate('phone')}
              keyboardType="phone-pad"
            />
            <FormInput
              response={response}
              field="email"
              value={this.state.email}
              disabled={false}
              onChangeText={this.onEmailChange}
              placeholder={translate('your_email')}
              keyboardType="email-address"
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
            <FormInput
              response={response}
              value={this.state.confirm_password}
              field="confirm_password"
              disabled={false}
              onChangeText={this.onConfirmPasswordChange}
              secureTextEntry={true}
              placeholder={translate('confirm_password')}
            />
          </KeyboardAvoidingView>

          {this.acceptForm()}

          <View style={{ marginTop: 10, marginBottom: 5, fontSize: 19 }}>
            <Button full info transparent onPress={NavigateToProfile}>
              <Text>{translate('other_login_options')}</Text>
            </Button>
          </View>

          <View style={{ marginTop: 10, marginBottom: 5, fontSize: 19 }}>
            <Button full success transparent onPress={NavigateToLoginByEmail}>
              <Text>{translate('login_with_email')}</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  getFooter() {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={this.onSubmitPress}
          style={styles.submitContainer}
        >
          <Text style={styles.submitText}>{translate('confirm')}</Text>
          <Icon name="arrow-forward" style={styles.submitIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  acceptForm() {
    return (
      <View
        style={{
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <CheckBox
          style={styles.checkBoxStyle}
          onClick={this.onAcceptFormChanged}
          isChecked={this.state.isAccept}
          rightText={''}
          checkBoxColor={colors.primary}
          rightTextStyle={styles.checkboxText}
        />
        <Text style={styles.textAccept}>{translate('accept')}</Text>
        <PrivacyPolicy />
      </View>
    );
  }
}
