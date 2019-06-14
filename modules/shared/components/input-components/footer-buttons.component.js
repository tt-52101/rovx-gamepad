import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './footer-buttons.style';

export class FooterButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onPositiveButtonHandler = this._onPositiveButtonHandler.bind(this);
    this._onNegativeButtonHandler = this._onNegativeButtonHandler.bind(this);
  }
  _onPositiveButtonHandler() {
    if (this.props.positiveButtonHandler) {
      this.props.positiveButtonHandler();
    }
  }
  _onNegativeButtonHandler() {
    if (this.props.negativeButtonHandler) {
      this.props.negativeButtonHandler();
    }
  }

  render() {
    const {
      PositiveButtonName,
      NegativeButtonName,
      Description,
      disable
    } = this.props;
    return (
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarButtons}>
          <TouchableOpacity
            onPress={this._onPositiveButtonHandler}
            disabled={disable ? true : false}
          >
            <Text
              style={
                disable ? styles.positiveButtonDisable : styles.positiveButton
              }
            >
              {PositiveButtonName}
            </Text>
          </TouchableOpacity>
          <Text style={styles.btnSeparator}>|</Text>
          <TouchableOpacity onPress={this._onNegativeButtonHandler}>
            <Text style={styles.negativeButton}>{NegativeButtonName}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{Description}</Text>
      </View>
    );
  }
}
