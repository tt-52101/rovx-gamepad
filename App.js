/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import MultiSlider from '@ptomasroos/react-native-multi-slider';

function post(url) {
  console.log(url);
  fetch(url, { method: 'POST' })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}

function builtinLed(value = 'on') {
  const order = `http://192.168.8.101:3000/api/native/builtin-led/${value}`;
  post(order);
}
function escChange(value) {
  const order = `http://192.168.8.101:3000/api/native/esc/default/${value}`;
  post(order);
}
function servoChange(value) {
  const order = `http://192.168.8.101:3000/api/native/move/default/${value}`;
  post(order);
}

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      angel: [0],
      speed: [40]
    };
  }
  onAngelChange = value => {
    this.setState({
      angel: value
    });
    servoChange(value);
  };

  onSpeedChange = value => {
    this.setState({
      speed: value
    });
    escChange(value[0]);
  };

  render() {
    const { speed, angel } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>Angel {angel}</Text>
            <MultiSlider
              min={0}
              max={180}
              values={angel}
              onValuesChange={this.onAngelChange}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>Speed {speed}</Text>
            <MultiSlider
              min={40}
              max={180}
              values={speed}
              onValuesChange={this.onSpeedChange}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => builtinLed('off')}>
          <Text>Off</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => builtinLed('on')}>
          <Text>On</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#DDFCFF'
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
