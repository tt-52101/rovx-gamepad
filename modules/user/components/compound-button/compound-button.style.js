import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  innerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainButton: {
    height: 50
  },
  facebook_btn: {
    borderColor: colors.primary,
    borderWidth: 1
  },
  mainText: {
    flex: 1,
    textAlign: 'center'
  },
  mainBadgeContainer: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    margin: 5,
    padding: 0,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftTextStyle: {
    marginRight: 40
  },
  rightTextStyle: {
    marginLeft: 40
  }
});
