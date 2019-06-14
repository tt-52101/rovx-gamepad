import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './static-header.style';
import Icon from 'react-native-vector-icons/FontAwesome';
export class StaticHeader extends React.Component {
  render() {
    const { leftIcon, leftText, large } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.leftBox}>
          <View style={styles.leftIconBox}>
            <Icon name={leftIcon} style={styles.icon} />
          </View>
          {leftText ? (
            <Text style={large ? styles.leftTextBold : styles.leftText}>
              {leftText}
            </Text>
          ) : null}
          {this.props.children}
        </View>
      </View>
    );
  }
}
