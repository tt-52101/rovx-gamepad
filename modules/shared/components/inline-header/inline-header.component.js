import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './inline-header.style';
import { capitalizeText } from '@product/common';

export const InlineHeader = props => {
  return (
    <View style={styles.inlineHeaderContainer}>
      <View style={styles.inlineHeaderBorder}>
        <View style={styles.inlineHeaderBar} />
      </View>
      <Text style={styles.inlineHeaderText}>{capitalizeText(props.text)}</Text>
      <View style={styles.inlineHeaderBorder}>
        <View style={styles.inlineHeaderBar} />
      </View>
    </View>
  );
};
