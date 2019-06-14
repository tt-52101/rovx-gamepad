import React, { Component } from 'react';
import { Text } from 'react-native';
import { colors } from '@product/theme';
import CompoundButton from './compound-button.component';
import { translate } from '../../../../shared/translate';

export default class MyBoatsButton extends Component {
  getBadge() {
    return <Text>{this.props.value}</Text>;
  }

  render() {
    return (
      <CompoundButton
        onPress={this.props.onPress}
        badgeContent={this.getBadge()}
        badgeContainerStyle={{ backgroundColor: colors.white }}
        text={translate('view_my_boats')}
        textStyle={{ color: colors.white }}
        style={{
          backgroundColor: colors.primary,
          marginHorizontal: 10,
          marginTop: 15
        }}
        rtl
      />
    );
  }
}
