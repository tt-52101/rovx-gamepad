import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';
export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7
  },
  currencyNotice: {
    color: colors.primary,
    textAlign: 'left',
    lineHeight: 18,
    fontSize: 12
  },
  currencyWarning: {
    backgroundColor: colors.grayLight,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  currencyIcon: {
    fontSize: 25,
    marginRight: 10,
    color: colors.primary
  }
});
