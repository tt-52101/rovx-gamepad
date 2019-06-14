import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { colors } from '../../../../shared/theme';

export class FullLoadingComponent extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: colors.primary,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          source={require('./logo.png')}
          style={{ width: 130, height: 130 }}
        />
      </View>
    );
  }
}
