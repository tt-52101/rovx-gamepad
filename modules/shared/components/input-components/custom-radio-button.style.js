import { StyleSheet } from 'react-native';
import { colors, font } from '@product/theme';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20
  },
  Label: {
    color: colors.primary,
    fontSize: font.textMedium,
    marginBottom: 7
  },
  errorMessage: {
    fontSize: font.textMedium,
    marginTop: 5,
    marginLeft: 10
  },
  message_error: {
    color: colors.message_error
  },
  message_warning: {
    color: colors.message_warning
  }
});
