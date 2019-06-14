import { StyleSheet } from 'react-native';
import { colors } from '@product/theme';

export const styles = StyleSheet.create({
  textInputMessage: {
    color: 'red',
    fontSize: 12,
    marginLeft: 8,
    marginTop: 3,
    marginBottom: 5
  },
  icon: {
    color: colors.primary,
    marginLeft: 5
  },
  itemStyle: {
    height: 50,
    fontSize: 17,
    paddingLeft: 4,
    flex: 1
  }
});
