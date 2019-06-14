import { StyleSheet } from 'react-native';
import { font, colors } from '@product/theme';
export const styles = StyleSheet.create({
  bottomBar: {
    paddingTop: 10,
    marginTop: 20,
    bottom: 0,
    marginBottom: 10
  },
  bottomBarButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 10
  },
  positiveButton: {
    color: colors.primary,
    fontSize: font.textLarge
  },
  positiveButtonDisable: {
    color: colors.grayDark,
    fontSize: font.textLarge
  },
  negativeButton: {
    color: colors.orange,
    fontSize: font.textLarge
  },
  btnSeparator: {
    color: colors.grayLight,
    fontSize: font.textLarge,
    marginHorizontal: 10
  },
  description: {
    marginTop: 5,
    marginHorizontal: 10,
    color: colors.black900,
    fontSize: font.textSmall
  }
});
