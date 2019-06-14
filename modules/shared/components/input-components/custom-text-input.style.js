import { StyleSheet, Dimensions } from 'react-native';
import { colors, font } from '@product/theme';
const _ScreenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    marginTop: 7
  },
  containerMiddle: {
    marginTop: 7,
    flex: 1
  },
  Label: {
    color: colors.primary,
    fontSize: font.textMedium,
    marginBottom: 7
  },
  inputText: {
    height: 38,
    fontSize: font.textMedium,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: colors.textInputBackground,
    textAlignVertical: 'center'
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
