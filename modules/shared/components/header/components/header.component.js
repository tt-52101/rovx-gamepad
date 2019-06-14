import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './header.style';
import Icon from 'react-native-vector-icons/Ionicons';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this._leftPressHandler = this._leftPressHandler.bind(this);
    this._RightPressHandler = this._RightPressHandler.bind(this);
  }
  _leftPressHandler() {
    this.props.leftPressHandler();
  }
  _RightPressHandler() {
    this.props.RightPressHandler();
  }
  render() {
    const {
      leftIcon,
      leftIconColor,
      leftText,
      leftPressHandler,
      RightIcon,
      RightIconColor,
      RightText,
      RightPressHandler,
      disable
    } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        {leftPressHandler && (
          <TouchableOpacity onPress={this._leftPressHandler}>
            <View style={styles.leftBox}>
              {leftIcon && (
                <Icon
                  name={leftIcon}
                  size={30}
                  color={leftIconColor}
                  style={styles.leftIcon}
                />
              )}
              {leftText && <Text style={styles.leftText}>{leftText}</Text>}
            </View>
          </TouchableOpacity>
        )}
        {RightPressHandler && (
          <TouchableOpacity
            onPress={this._RightPressHandler}
            style={{ padding: 5 }}
            disabled={disable ? true : false}
          >
            <View style={styles.RightBox}>
              {RightText && (
                <Text
                  style={disable ? styles.RightTextDisable : styles.RightText}
                >
                  {RightText}
                </Text>
              )}
              {RightIcon && (
                <Icon
                  name={RightIcon}
                  size={25}
                  color={RightIconColor}
                  style={styles.RightIcon}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
