import React from 'react';
import LottieView from 'lottie-react-native';
import { random } from 'lodash';
import { TouchableOpacity } from 'react-native';

const buttons = {
  default: require('./json/btn-default.json'),
  up: require('./json/btn-up.json'),
  down: require('./json/btn-down.json'),
  left: require('./json/btn-left.json'),
  circle: require('./json/btn-circle.json'),
  triangle: require('./json/btn-triangle.json'),
  cross: require('./json/btn-cross.json'),
  rectangle: require('./json/btn-rectangle.json'),
  right: require('./json/btn-right.json')
};

const REVERT_FRAME = 18;
const MAX_FRAME = 29;

export class GamepadButton extends React.Component {
  onPressIn = () => {
    console.log('#2');
    const { onPressIn, keyCode } = this.props;
    if (onPressIn) {
      onPressIn(keyCode);
    }
    // this.ref.play(MAX_FRAME, REVERT_FRAME);
  };

  componentDidMount() {
    setTimeout(() => {
      this.ref.play();
    }, random(200, 900));
  }

  onPressOut = () => {
    const { onPressOut, keyCode } = this.props;
    if (onPressOut) {
      onPressOut(keyCode);
    }
  };

  fadeOut = () => {
    this.ref.play(MAX_FRAME, 0);
  };

  fadeIn = () => {
    this.ref.play(0, MAX_FRAME);
  };

  onPress = () => {
    const { onPress, keyCode } = this.props;
    if (onPress) {
      onPress(keyCode);
    }
    // setTimeout(() => {
    //   this.ref.reset();
    //   this.ref.play(REVERT_FRAME, MAX_FRAME);
    // }, 100);
  };

  get source() {
    const { keyCode } = this.props;
    if (keyCode && buttons[keyCode]) {
      return buttons[keyCode];
    }
    return buttons['default'];
  }

  onBlur = () => {
    alert('yay!');
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1
        }}
        activeOpacity={1}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
        onBlur={this.onBlur}
      >
        <LottieView
          loop={false}
          speed={3}
          source={this.source}
          ref={animation => {
            this.ref = animation;
          }}
        />
      </TouchableOpacity>
    );
  }
}
