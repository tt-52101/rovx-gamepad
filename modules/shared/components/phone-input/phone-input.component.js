import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './phone-input.style';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import { autobind } from 'core-decorators';

export class PhoneFormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: 'US',
      value: '',
      initialCountry: 'pl'
    };
  }
  componentWillMount() {
    const { value, initialCountry } = this.props;
    if (value) {
      this.setState({
        value
      });
    }
    if (initialCountry) {
      this.setState({
        initialCountry
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

  @autobind
  onPressFlag() {
    this.countryPicker.openModal();
  }

  @autobind
  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  @autobind
  handleChange() {
    if (this.props.onChangePhone) {
      this.props.onChangePhone(this.phone.getValue());
    }
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
            textStyle={styles.inputText}
            onPressFlag={this.onPressFlag}
            value={this.state.value}
            onChangePhoneNumber={this.handleChange}
            initialCountry={this.state.initialCountry}
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
      </View>
    );
  }
}
