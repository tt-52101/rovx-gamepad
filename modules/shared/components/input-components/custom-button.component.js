import React from 'react';
import { View, Button } from 'react-native';

export default class CustomButton extends React.Component {
  constructor(props) {
    super(props);
    this._onPressHandler = this._onPressHandler.bind(this);
  }

  _onPressHandler() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  render() {
    const { title, color, margin } = this.props;
    return (
      <View
        style={{
          marginHorizontal: 10,
          marginTop: margin,
          marginBottom: margin
        }}
      >
        <Button
          title={title}
          color={color}
          accessibilityLabel={title}
          onPress={this._onPressHandler}
        />
      </View>
    );
  }
}
