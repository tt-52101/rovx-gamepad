import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './custom-text-input.style';
import { ValidationTypes } from '@product/common';
import { colors } from '@product/theme';

export class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this._handleChange = this._handleChange.bind(this);
  }
  componentWillMount() {
    this.setState({
      value: this.props.value
    });
  }
  componentWillReceiveProps(props) {
    if (props.value === this.state.value) {
      return;
    }
    this.setState({
      value: props.value
    });
  }
  _handleChange(text) {
    this.setState({ value: text });
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  }
  render() {
    const {
      LabelText,
      KeyboardType,
      ValidationMessage,
      ValidationType,
      Middle,
      PlaceHolderText = '',
      MarginHorizontal = 10
    } = this.props;
    return (
      <View
        style={[
          Middle ? styles.containerMiddle : styles.container,
          { marginHorizontal: MarginHorizontal }
        ]}
      >
        {LabelText && <Text style={styles.Label}>{LabelText}</Text>}
        <TextInput
          style={styles.inputText}
          onChangeText={text => this._handleChange(text)}
          value={this.state.value}
          keyboardType={KeyboardType || 'default'}
          placeholder={PlaceHolderText}
          placeholderTextColor={colors.placeHolderText}
        />
        {ValidationMessage !== '' && ValidationMessage !== undefined && (
          <Text
            style={
              ValidationType === ValidationTypes.Error
                ? styles.message_error
                : styles.message_warning
            }
          >
            {[ValidationMessage]}
          </Text>
        )}
      </View>
    );
  }
}
