import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { random } from 'lodash';
import { NavigationEvents } from 'react-navigation';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import { SafeAreaView, Text, View } from 'react-native';
import { magnetometer } from 'react-native-sensors';

import { servoChange, escChange, builtinLed } from './src/services/network.js';

import { map, auditTime } from 'rxjs/operators';
import {
  EmailLoginScreen,
  EditProfileScreen,
  EmailSignupScreen,
  ProfileScreen
} from './modules/user/user.module.js';
import { Store } from './shared/services/store.js';
import { screen, connect } from './modules/shared/shared.helper.js';
import { ScreenInfo } from './src/services/screen-info.js';
import { PhoneLoginScreen } from './modules/user/screens/phone-login/phone-login.screen.js';
import { GamepadScreen } from './modules/gamepad/gamepad.screen.js';

// const AppNavigator = createStackNavigator(
//   {
//     Home: App
//   },
//   {
//     headerMode: 'none',
//     headerBackTitleVisible: false,
//     header:
//   }
// );

const Nav = createStackNavigator({
  Home: {
    screen: GamepadScreen
  },
  PhoneLogin: {
    screen: PhoneLoginScreen
  },

  Profile: {
    screen: ProfileScreen
  },
  EmailLogin: {
    screen: EmailLoginScreen
  },
  EmailSignup: {
    screen: EmailSignupScreen
  },

  EditProfile: {
    screen: EditProfileScreen
  }
});
export default createAppContainer(Nav);
