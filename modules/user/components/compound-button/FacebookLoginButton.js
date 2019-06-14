import React, { Component } from 'react';
import { Image } from 'react-native';
import { colors } from '@product/theme';
import CompoundButton from './compound-button.component';
import { autobind } from 'core-decorators';
import { translate } from '../../../../shared/translate';

export class FacebookLoginButton extends Component {
  render() {
    return (
      <CompoundButton
        onPress={this.props.onPress}
        isFacebook={true}
        badgeContent={
          <Image
            style={{ width: 42, height: 42, borderRadius: 21 }}
            source={require('../../assets/facebook.png')}
          />
        }
        badgeContainerStyle={{ backgroundColor: colors.white }}
        text={translate('connect_with_facebook')}
        textStyle={{ color: colors.primary }}
        style={{
          backgroundColor: colors.white,
          marginHorizontal: 10,
          marginTop: 15
        }}
      />
    );
  }
}
