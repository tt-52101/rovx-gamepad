import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './compound-button.style';
import { Button, Text } from 'native-base';

export default class CompoundButton extends Component {
  render() {
    const {
      rtl,
      badgeContent,
      badgeContainerStyle = {},
      text = '',
      textStyle = {},
      style = {},
      isFacebook = false
    } = this.props;
    return (
      <Button
        rounded
        block
        style={[
          style,
          styles.mainButton,
          isFacebook ? styles.facebook_btn : null
        ]}
        onPress={this.props.onPress}
      >
        <View style={styles.innerRow}>
          {!rtl && this.badgeContainer(badgeContent, badgeContainerStyle)}
          <Text
            style={[
              textStyle,
              styles.mainText,
              rtl ? styles.rightTextStyle : styles.leftTextStyle
            ]}
            uppercase={false}
          >
            {text}
          </Text>
          {rtl && this.badgeContainer(badgeContent, badgeContainerStyle)}
        </View>
      </Button>
    );
  }

  badgeContainer(badgeContent, badgeContainerStyle) {
    return (
      <View style={[styles.mainBadgeContainer, badgeContainerStyle]}>
        {badgeContent}
      </View>
    );
  }
}
