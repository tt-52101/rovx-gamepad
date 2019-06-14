import { StyleSheet, Platform } from 'react-native';
import { colors } from '@product/theme';

const ALIGN_STYLE_ROW = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center'
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: ALIGN_STYLE_ROW.center,
    height: Platform.select({ android: 56, default: 44 })
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: ALIGN_STYLE_ROW.center,
    justifyContent: ALIGN_STYLE_ROW.left
  },
  RightBox: {
    flexDirection: 'row',
    alignItems: ALIGN_STYLE_ROW.center,
    justifyContent: ALIGN_STYLE_ROW.right
  },
  leftIcon: {
    marginRight: 10
  },
  leftText: {
    color: colors.primary
  },
  RightText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 10
  },
  RightTextDisable: {
    color: colors.grayDark,
    fontWeight: 'bold',
    marginLeft: 10
  },
  RightIcon: {
    marginLeft: 10
  }
});
