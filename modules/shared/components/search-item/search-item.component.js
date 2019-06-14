import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './search-item.style';

export class SearchItemComponent extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => this.props.onSelect(item)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}
