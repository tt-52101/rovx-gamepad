import { StyleSheet } from 'react-native';
import { colors, font } from '@product/theme';

const ALIGN_STYLE = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center'
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: ALIGN_STYLE.center,
    paddingVertical: 5
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: ALIGN_STYLE.center,
    justifyContent: ALIGN_STYLE.left
  },
  leftIconBox: {
    flexDirection: 'row',
    alignItems: ALIGN_STYLE.center,
    justifyContent: ALIGN_STYLE.center,
    width: 40,
    margin: 0,
    padding: 0
  },
  leftText: {
    color: colors.white,
    marginLeft: 10
  },
  leftTextBold: {
    color: colors.white,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: font.textLarge
  },
  icon: {
    color: colors.white,
    fontSize: 30
  }
});
