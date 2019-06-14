import React, { Component } from 'react';
import { magnetometer } from 'react-native-sensors';
import { ScreenInfo } from '../../src/services/screen-info';
import { styles } from './gamepad.styles';
import { NavigationEvents } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { random } from 'lodash';
import { screen, connect } from '../shared/shared.helper.js';
import { TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { GamepadButton } from './GamepadButton/GamepadButton';
import { map, auditTime } from 'rxjs/operators';
import { servoChange, escChange, builtinLed } from '../../src/services/network';
import { Store } from '../../shared/services/store';

@screen()
@connect({
  screen: ScreenInfo
})
export class GamepadScreen extends Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none',
    headerBackTitleVisible: false
  };
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
        auditTime(500),
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

  btnRefs = {};

  Actions() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <GamepadButton
          onPressIn={() =>
            this.operateValue('speed', t => t - 1, speed => escChange(speed))
          }
          onPressOut={() => this.unoperate('speed')}
          keyCode="triangle"
          ref={ref => (this.btnRefs.triangle = ref)}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <GamepadButton
            ref={ref => (this.btnRefs.rectangle = ref)}
            onPress={() => builtinLed('on')}
            keyCode="rectangle"
          />
          <GamepadButton
            ref={ref => (this.btnRefs.circle = ref)}
            onPress={() => builtinLed('off')}
            keyCode="circle"
          />
        </View>
        <GamepadButton
          keyCode="cross"
          ref={ref => (this.btnRefs.cross = ref)}
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
        <GamepadButton keyCode="up" ref={ref => (this.btnRefs.up = ref)} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <GamepadButton
            ref={ref => (this.btnRefs.left = ref)}
            keyCode="left"
            onPressIn={this.decreaseAngel}
            onPress={this.decreaseAngelOnce}
            onPressOut={() => this.unoperate('angel')}
          />
          <GamepadButton
            keyCode="right"
            onPressIn={this.increaseAngel}
            ref={ref => (this.btnRefs.right = ref)}
            onPress={this.increaseAngelOnce}
            onPressOut={() => this.unoperate('angel')}
          />
        </View>
        <GamepadButton keyCode="down" ref={ref => (this.btnRefs.down = ref)} />
      </View>
    );
  }

  infoLabel(label, value) {
    return (
      <View style={{}}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.labelValue}>{value}</Text>
      </View>
    );
  }

  InfoPanel() {
    const { speed, angel } = this.state;
    const { x, y } = this.state.magnetometer || { x: 0, y: 0 };
    const { isPortrait } = this.props.store.screen;
    const flexDirection = isPortrait === true ? 'row' : 'column';
    return (
      <View
        style={[
          {
            minWidth: 50,
            opacity: 0.7,
            backgroundColor: 'white',
            borderRightWidth: 1,
            borderRightColor: 'silver',
            borderLeftWidth: 1,
            borderLeftColor: 'silver',
            flexDirection,
            justifyContent: 'space-between'
          },
          isPortrait
            ? {
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 1,
                borderTopColor: 'silver',
                borderBottomWidth: 1,
                borderBottomColor: 'silver',
                padding: 5
              }
            : null
        ]}
      >
        {this.infoLabel('Speed', speed)}
        {this.infoLabel('Angel', angel)}
        {this.infoLabel('G-X', x)}
        {this.infoLabel('G-Y', y)}

        <TouchableOpacity
          onPress={this.settings}
          style={{ alignSelf: 'center', marginTop: 20 }}
        >
          <Icon name={'md-cog'} size={45} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  fadeGamepadButton = (type = 'out') => {
    const keys = Object.keys(this.btnRefs);
    for (let key of keys) {
      setTimeout(
        this.btnRefs[key][type === 'out' ? 'fadeOut' : 'fadeIn'],
        random(100, 500)
      );
    }
  };

  settings = () => {
    this.fadeGamepadButton();
    setTimeout(() => {
      Store.navigation.navigate('Profile');
    }, 1000);
  };

  onDidFocus = () => {
    this.fadeGamepadButton('in');
  };

  render() {
    const flexDirection =
      this.props.store.screen.isPortrait === false ? 'row' : 'column';
    return (
      <View style={{ backgroundColor: '#333333', flex: 1 }}>
        <NavigationEvents onDidFocus={this.onDidFocus} />

        <SafeAreaView style={[styles.container, { flexDirection }]}>
          {this.InfoPanel()}

          <View style={{ marginVertical: 30, flex: 1, flexDirection }}>
            {this.Axis()}
            {this.Actions()}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
