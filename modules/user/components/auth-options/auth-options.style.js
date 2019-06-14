import { StyleSheet } from 'react-native';
import { font, colors } from '@product/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  },
  formContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  safeArea: {},
  formDescription: {
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22
  },
  checkBoxStyle: {},
  checkboxText: {
    color: colors.black900,
    fontSize: font.textMedium
  },
  textAccept: {
    color: colors.black900
  },
  acceptFormRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',

    marginVertical: 20
  },
  signUpNowPart: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});
