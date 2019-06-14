import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Easing,
  Animated,
  ImageBackground
} from 'react-native';

import { InternetConnectionNotice } from '@modules/shared/shared.module';
import { styles } from './login-form.style';
import { Icon } from 'native-base';
import { autobind } from 'core-decorators';
import { AuthOptionsComponent } from '../auth-options/auth-options.component';
import { LocalisationOptionsComponent } from '../localisation-options/localisation-options.component';
import { translate } from '../../../../shared/translate';
import { NavigateToSignup } from '../../user.actions';

export class LoginFormComponent extends Component {
  subscription = null;
  constructor(props) {
    super(props);
    this.state = {
      working: false
    };
    this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {
    this.StartImageRotateFunction();
  }

  @autobind
  onLoginByGoogle() {}

  render() {
    return (
      <View style={styles.container}>
        {this.getForm()}
        {this.getFooter()}
      </View>
    );
  }

  getHeader() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={styles.header}>
        <ImageBackground
          source={require('../../assets/login_header.png')}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay}>
          <Animated.Image
            style={[
              styles.imageOverlay,
              {
                transform: [{ rotate: RotateData }]
              }
            ]}
            source={require('./logo.png')}
          />
        </View>
      </View>
    );
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      useNativeDriver: true,
      duration: 10000,
      easing: Easing.bounce
    }).start(() => this.StartImageRotateFunction());
  }

  getForm() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <InternetConnectionNotice />
          <AuthOptionsComponent
            navigation={this.props.navigation}
            onPressGoogleButton={this.onLoginByGoogle}
            onPressFacebookButton={this.onPressFacebookButton}
            onPressEmailButton={this.onLoginByEmail}
            title={this.props.title}
          />
          {/* <LocalisationOptionsComponent /> */}
        </View>
      </ScrollView>
    );
  }

  getFooter() {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={NavigateToSignup}
          style={styles.submitContainer}
        >
          <Text style={styles.submitText}>{translate('create_account')}</Text>
          <Icon name="arrow-forward" style={styles.submitIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}
