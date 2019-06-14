import React, { Component } from 'react';
import { Image } from 'react-native';
import { colors } from '@product/theme';
import CompoundButton from './compound-button.component';
import { autobind } from 'core-decorators';
import { translate } from '../../../../shared/translate';

export default class GoogleLoginButton extends Component {
  @autobind
  onPressHandler() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  render() {
    return (
      <CompoundButton
        onPress={this.onPressHandler}
        badgeContent={
          <Image
            style={{ width: 42, height: 42, borderRadius: 21 }}
            source={require('../../assets/google.png')}
          />
        }
        badgeContainerStyle={{ backgroundColor: colors.white }}
        text={translate('connect_with_google')}
        textStyle={{ color: colors.white }}
        style={{ backgroundColor: colors.primary, marginHorizontal: 10 }}
      />
    );
  }
}
