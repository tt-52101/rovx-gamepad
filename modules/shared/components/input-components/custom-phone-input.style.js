import { StyleSheet } from 'react-native';
import { colors, font } from '@product/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    fontSize: font.textMedium,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.textInputBackground,
    height: 38
  },
  Label: {
    color: colors.primary,
    fontSize: font.textMedium,
    marginBottom: 7,
    marginHorizontal: 10
  },
  message_error: {
    color: colors.message_error,
    fontSize: font.textSmall
  },
  message_warning: {
    color: colors.message_warning,
    fontSize: font.textSmall
  }
});
