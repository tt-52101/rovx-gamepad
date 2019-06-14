import React from 'react';
import { findErrorMessage, capitalizeText } from '@product/common';
import { styles } from './form-picker.style';
import { View, Text, Platform } from 'react-native';
import { Item } from 'native-base';
import { Picker, Icon } from 'native-base';

export class FormPicker extends React.Component {
  render() {
    const { field, response, icon, collection } = this.props;
    const message = findErrorMessage(field, response);

    return (
      <View>
        <Item error={!!message}>
          {!!icon ? (
            <Icon type="FontAwesome" name={icon} style={styles.icon} />
          ) : null}
          <Picker
            mode="dropdown"
            iosHeader={this.props.placeholder}
            selectedValue={this.props.value}
            placeholder={this.props.placeholder}
            onValueChange={data =>
              this.props.onChangeText(data, this.props.field)
            }
          >
            {collection && collection.map
              ? collection.map(item => (
                  <Picker.Item label={item.label} value={item.value} />
                ))
              : null}
          </Picker>
        </Item>
        {message ? (
          <Text style={styles.textInputMessage}>{capitalizeText(message)}</Text>
        ) : null}
      </View>
    );
  }
}
