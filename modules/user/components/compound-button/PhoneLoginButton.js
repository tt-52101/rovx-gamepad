import React, { Component } from 'react';
import { Image } from 'react-native';
import { colors } from '@product/theme';
import CompoundButton from './compound-button.component';

export default class PhoneLoginButton extends Component {
  render() {
    return (
      <CompoundButton
        onPress={this.props.onPress}
        badgeContent={
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={require('../../assets/emailios.png')}
          />
        }
        badgeContainerStyle={{ backgroundColor: colors.white }}
        text={'Login with phone'}
        textStyle={{ color: colors.white }}
        style={{
          backgroundColor: colors.secondary,
          marginHorizontal: 10,
          marginTop: 15
        }}
      />
    );
  }
}
