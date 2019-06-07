import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { magnetometer } from 'react-native-sensors';

import { servoChange, escChange, builtinLed } from './src/services/network.js';
import { GamepadButton } from './src/components/GamepadButton/GamepadButton.js';

import { map, auditTime } from 'rxjs/operators';

export default class App extends Component {
  // holds each button lottie refereneces
  keysRef = {};
  constructor(props) {
    super(props);

    this.state = {
      angel: 0,
      speed: 40,
      magnetometer: 'Not connected'
    };
  }

  componentDidMount() {
    this.subscription = magnetometer
      .pipe(
        auditTime(60),
        map(e => ({
          x: e.x.toFixed(0),
          y: e.y.toFixed(0)
        }))
      )
      .subscribe(
        ({ x, y, z, timestamp }) =>
          this.setState({ magnetometer: { x, y, z, timestamp } }),
        err => console.log('erro')
      );
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  operateOnce = (field, t, callback) => {
    this.setState(state => {
      const value = t(state[field]);
      if (callback) {
        callback(value);
      }
      return {
        [field]: value
      };
    });
  };

  operateValue = (field, t, callback) => {
    this['interval_' + field] = setInterval(() => {
      this.operateOnce(field, t, callback);
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

  increaseAngel = () => {
    this.operateValue('angel', t => t + 1, angel => servoChange(angel));
  };

  increaseAngelOnce = () => {
    this.operateOnce('angel', t => t + 1, angel => servoChange(angel));
  };

  decreaseAngel = () => {
    this.operateValue('angel', t => t - 1, angel => servoChange(angel));
  };

  decreaseAngelOnce = () => {
    this.operateOnce('angel', t => t - 1, angel => servoChange(angel));
  };

  Axis() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <GamepadButton keyCode="up" />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <GamepadButton
            keyCode="left"
            onPressIn={this.decreaseAngel}
            onPress={this.decreaseAngelOnce}
            onPressOut={() => this.unoperate('angel')}
          />
          <GamepadButton
            keyCode="right"
            onPressIn={this.increaseAngel}
            onPress={this.increaseAngelOnce}
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
        <Text style={styles.label}>
          {JSON.stringify(this.state.magnetometer)}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: '#333333', flex: 1 }}>
        <SafeAreaView style={styles.container}>
          {this.Axis()}
          {this.InfoPanel()}
          {this.Actions()}
        </SafeAreaView>
      </View>
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
    textAlign: 'center',
    color: 'white'
  },
  labelValue: {
    fontSize: 38,
    marginVertical: 10,
    textAlign: 'center',
    color: 'white'
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
