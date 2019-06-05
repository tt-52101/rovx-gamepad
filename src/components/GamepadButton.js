import React from 'react';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native';

const buttons = {
  default: require('./default.json'),
  up: require('./up.json'),
  down: require('./down.json'),
  left: require('./left.json'),
  circle: require('./circle.json'),
  right: require('./right.json')
};

export class GamepadButton extends React.Component {
  onPressIn = () => {
    const { onPressIn, keyCode } = this.props;
    if (onPressIn) {
      onPressIn(keyCode);
    }
    this.ref.play(40, 60);
  };

  componentDidMount() {
    this.ref.play();
  }

  onPressOut = () => {
    const { onPressOut, keyCode } = this.props;
    if (onPressOut) {
      onPressOut(keyCode);
    }
    // setTimeout(() => {
    //   this.ref.reset();
    // }, 200);
  };

  onPress = () => {
    const { onPress, keyCode } = this.props;
    if (onPress) {
      onPress(keyCode);
    }
  };

  get source() {
    const { keyCode } = this.props;
    if (keyCode && buttons[keyCode]) {
      return buttons[keyCode];
    }
    return buttons['default'];
  }

  render() {
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
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
