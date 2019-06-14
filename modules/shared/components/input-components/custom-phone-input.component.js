import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './custom-phone-input.style';
import { ValidationTypes } from '@product/common';

import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';

export class CustomPhoneInput extends Component {
  constructor(props) {
    super(props);
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      cca2: 'US',
      value: ''
    };
  }
  componentWillMount() {
    if (this.props.value) {
      this.setState({
        value: this.props.value
      });
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData()
    });
  }

  onPressFlag() {
    this.countryPicker.openModal();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }
  handleChange() {
    if (this.props.onChangePhone) {
      this.props.onChangePhone(this.phone.getValue());
    }
  }
  render() {
    const { LabelText, ValidationMessage, ValidationType } = this.props;
    return (
      <View>
        {LabelText && <Text style={styles.Label}>{LabelText}</Text>}
        <View style={styles.container}>
          <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
            onPressFlag={this.onPressFlag}
            value={this.state.value}
            onChangePhoneNumber={this.handleChange}
          />

          <CountryPicker
            ref={ref => {
              this.countryPicker = ref;
            }}
            onChange={this.selectCountry}
            translation="eng"
            cca2={this.state.cca2}
          >
            <View />
          </CountryPicker>
        </View>
        {ValidationMessage !== '' && ValidationMessage !== undefined && (
          <Text
            style={
              ValidationType == ValidationTypes.Error
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
