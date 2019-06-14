import React from 'react';
import { findErrorMessage, capitalizeText } from '@product/common';
import { styles } from './form-input.style';
import { View, Text } from 'react-native';
import { Item, Input, Icon } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import { PhoneFormInput } from '../phone-input/phone-input.component';
import { colors } from '../../../../shared/theme';
import { translate } from '../../../../shared/translate';

export class FormInput extends React.Component {
  simpleInput() {
    const value = '' + (this.props.value || '');
    return (
      <Input
        {...this.props}
        onChangeText={text => {
          this.props.onChangeText(text, this.props.field);
        }}
        placeholderTextColor={colors.grayDark}
        value={value}
      />
    );
  }

  moneyOptions() {
    let suffixUnit = '$';
    let delimiter = ',';
    let sample = '45,000$';
    const currencyUnit = this.props.currencyUnit;
    if (currencyUnit && currencyUnit === 'pln') {
      suffixUnit = 'zł';
      delimiter = ' ';
      sample = '45 000 zł';
    }
    if (currencyUnit && currencyUnit === 'euro') {
      suffixUnit = '€';
      delimiter = ',';
      sample = '32,000 €';
    }
    return {
      precision: 0,
      separator: ' ',
      delimiter,
      unit: ``,
      suffixUnit,
      sample
    };
  }
  priceInput() {
    const value = '' + (this.props.value || '');
    const options = this.moneyOptions();
    return (
      <TextInputMask
        type={'money'}
        ref={ref => (this.fieldRef = ref)}
        options={options}
        placeholder={((this.props.placeholder || '') + '').replace(
          '%sample_price%',
          options.sample
        )}
        style={styles.itemStyle}
        value={value}
        onChangeText={text => {
          this.props.onChangeText(
            this.fieldRef.getRawValue(),
            this.props.field
          );
        }}
      />
    );
  }

  getPhone() {
    const value = '' + this.props.value;
    const { initialCountry } = this.props;
    return (
      <PhoneFormInput
        {...this.props}
        initialCountry={initialCountry}
        value={value}
        textProps={{ placeholder: translate('phone_placeholder') }}
        onChangePhone={text => this.props.onChangeText(text, this.props.field)}
      />
    );
  }
  render() {
    const { field, response, type, icon } = this.props;
    const message = findErrorMessage(field, response);

    let fieldType = '';
    if (type === 'phone') {
      fieldType = this.getPhone();
    } else if (type === 'price') {
      fieldType = this.priceInput();
    } else {
      fieldType = this.simpleInput();
    }

    return (
      <View>
        <Item error={!!message}>
          {!!icon ? (
            <Icon type="FontAwesome" name={icon} style={styles.icon} />
          ) : null}
          {fieldType}
          {!!message ? <Icon name="close-circle" /> : null}
        </Item>
        {message ? (
          <Text style={styles.textInputMessage}>{capitalizeText(message)}</Text>
        ) : null}
      </View>
    );
  }
}
