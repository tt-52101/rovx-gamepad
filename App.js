import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { GamepadButton } from './src/components/GamepadButton.js';
import { servoChange, escChange, builtinLed } from './src/services/network.js';

export default class App extends Component {
  // holds each button lottie refereneces
  keysRef = {};
  constructor(props) {
    super(props);

    this.state = {
      angel: 0,
      speed: 40
    };
  }

  operateValue = (field, t, callback) => {
    this['interval_' + field] = setInterval(() => {
      this.setState(state => {
        const value = t(state[field]);
        if (callback) {
          callback(value);
        }
        return {
          [field]: value
        };
      });
    }, 100);
  };

  unoperate = field => {
    if (this['interval_' + field]) {
      clearInterval(this['interval_' + field]);
    }
  };

  Actions() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <GamepadButton
          onPressIn={() =>
            this.operateValue('speed', t => t - 1, speed => escChange(speed))
          }
          onPressOut={() => this.unoperate('speed')}
          keyCode="triangle"
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <GamepadButton onPress={() => builtinLed('on')} keyCode="rectangle" />
          <GamepadButton onPress={() => builtinLed('off')} keyCode="circle" />
        </View>
        <GamepadButton
          keyCode="cross"
          onPressIn={() =>
            this.operateValue('speed', t => t + 1, speed => escChange(speed))
          }
          onPressOut={() => this.unoperate('speed')}
        />
      </View>
    );
  }

  Axis() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <GamepadButton keyCode="up" />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <GamepadButton
            keyCode="left"
            onPressIn={() =>
              this.operateValue(
                'angel',
                t => t - 1,
                angel => servoChange(angel)
              )
            }
            onPressOut={() => this.unoperate('angel')}
          />
          <GamepadButton
            keyCode="right"
            onPressIn={() =>
              this.operateValue(
                'angel',
                t => t + 1,
                angel => servoChange(angel)
              )
            }
            onPressOut={() => this.unoperate('angel')}
          />
        </View>
        <GamepadButton keyCode="down" />
      </View>
    );
  }

  InfoPanel() {
    const { speed, angel } = this.state;

    return (
      <View
        style={{
          flex: 0.3,
          borderRightWidth: 1,
          borderRightColor: 'silver',
          borderLeftWidth: 1,
          borderLeftColor: 'silver',
          justifyContent: 'center'
        }}
      >
        <Text style={styles.label}>Speed</Text>
        <Text style={styles.labelValue}> {speed}</Text>
        <Text style={styles.label}>Angel</Text>
        <Text style={styles.labelValue}>{angel}</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.Axis()}
        {this.InfoPanel()}
        {this.Actions()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 30
  },
  label: {
    fontSize: 14,
    textAlign: 'center'
  },
  labelValue: {
    fontSize: 38,
    marginVertical: 10,
    textAlign: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
