import { StyleSheet } from 'react-native';
import { colors, font } from '@product/theme';
export const styles = StyleSheet.create({
  inlineHeaderContainer: {
    flexDirection: 'row'
  },
  inlineHeaderBorder: {
    flex: 2
  },
  inlineHeaderBar: {
    height: 2,
    marginTop: 11,
    marginHorizontal: 20,
    backgroundColor: colors.primary
  },
  inlineHeaderText: {
    textAlign: 'center',
    fontSize: font.textLarge
  }
});
