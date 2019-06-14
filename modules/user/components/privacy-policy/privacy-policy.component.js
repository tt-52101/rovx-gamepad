import React, { Component } from 'react';
import { Linking, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../../../shared/theme';
import { translate } from '../../../../shared/translate';
export class PrivacyPolicy extends Component {
  privacyPolicyHandler = () => {
    Linking.openURL('https://pixelplux.com/en/dokayak/privacy-policy').catch(
      err => {
        alert({
          text: 'Browse https://pixelplux.com/en/dokayak/privacy-policy'
        });
      }
    );
  };

  render() {
    return (
      <TouchableOpacity onPress={this.privacyPolicyHandler}>
        <Text
          style={{ color: colors.grayDark, textDecorationLine: 'underline' }}
        >
          {translate('privacy_policy')}
        </Text>
      </TouchableOpacity>
    );
  }
}
