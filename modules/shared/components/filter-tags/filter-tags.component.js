import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './filter-tags.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '@product/theme';

export const FilterTagComponent = props => {
  return (
    <View style={styles.filterItem}>
      <Icon name={props.icon} style={styles.filterItemIcon} />
      <Text style={styles.filterItemText}>{props.text}</Text>
      {props.onRemoveFilter ? (
        <TouchableOpacity
          style={styles.filterItemsButton}
          onPress={() => props.onRemoveFilter(props.tagkey)}
        >
          <Icon color={colors.white} style={styles.removeIcon} name="close" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const FilterTagsComponent = props => {
  if (!props.filters || !props.filters.map) {
    return null;
  }
  return (
    <View>
      <ScrollView
        style={styles.filterWrapper}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {props.filters.map(tag => (
          <FilterTagComponent
            onRemoveFilter={props.onRemoveFilter}
            icon={tag.icon}
            text={tag.text}
            key={tag.key}
            tagkey={tag.key}
          />
        ))}
      </ScrollView>
    </View>
  );
};
