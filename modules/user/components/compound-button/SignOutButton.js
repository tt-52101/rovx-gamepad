import React, { Component } from 'react';
import { Text } from 'react-native';
import { colors } from '@product/theme';
import CompoundButton from './compound-button.component';
import Icon from 'react-native-vector-icons/Ionicons';
import { autobind } from 'core-decorators';
import { translate } from '../../../../shared/translate';

export default class SignOutButton extends Component {
  @autobind
  onPressHandler() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  getBadge() {
    return <Icon name={'md-close'} size={25} color={colors.primary} />;
  }

  render() {
    return (
      <CompoundButton
        onPress={this.onPressHandler}
        badgeContent={this.getBadge()}
        badgeContainerStyle={{ backgroundColor: colors.white }}
        text={translate('sign_out')}
        textStyle={{ color: colors.white }}
        style={{
          backgroundColor: colors.ux_red,
          marginHorizontal: 10,
          marginTop: 15
        }}
        rtl
      />
    );
  }
}
