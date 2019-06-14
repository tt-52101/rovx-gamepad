import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Text as NBText, Radio, Right, Left } from 'native-base';
import { styles } from './custom-radio-button.style';
import { ValidationTypes } from '@product/common';
import { autobind } from 'core-decorators';

export class CustomRadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  @autobind
  onSelectOption(value) {
    this.setState({ value: value });
    if (this.props.onSelectedRadioChanged) {
      this.props.onSelectedRadioChanged(value);
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
  }

  render() {
    const {
      labelText,
      radios,
      value = -1,
      ValidationMessage,
      ValidationType
    } = this.props;
    return (
      <View style={styles.container}>
        {labelText && <Text style={styles.Label}>{labelText}</Text>}
        {radios.map((radio, index) => {
          const selected = radio.value === value;
          return (
            <ListItem
              selected={selected}
              onPress={() => this.onSelectOption(radio.value)}
              key={index}
            >
              <Left>
                <NBText>{radio.label}</NBText>
              </Left>
              <Right>
                <Radio
                  onPress={() => this.onSelectOption(radio.value)}
                  selected={selected}
                />
              </Right>
            </ListItem>
          );
        })}

        {ValidationMessage !== '' && ValidationMessage !== undefined && (
          <Text
            style={[
              ValidationType == ValidationTypes.Error
                ? styles.message_error
                : styles.message_warning,
              styles.errorMessage
            ]}
          >
            {[ValidationMessage]}
          </Text>
        )}
      </View>
    );
  }
}
