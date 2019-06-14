import React, { Component } from 'react';
import { Image } from 'react-native';
import { colors } from '@product/theme';
import CompoundButton from './compound-button.component';
import { autobind } from 'core-decorators';
import { translate } from '../../../../shared/translate';

export default class EmailLoginButton extends Component {
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
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={require('../../assets/emailios.png')}
          />
        }
        badgeContainerStyle={{ backgroundColor: colors.white }}
        text={translate('login_with_email')}
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
