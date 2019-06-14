import { StyleSheet } from 'react-native';
import { colors } from '@product/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  localisationOptions: {
    backgroundColor: colors.white
  },
  languageImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50
  },
  description: {
    textAlign: 'center',
    marginVertical: 20
  },
  continueButton: {
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 20,
    backgroundColor: colors.primary,
    borderRadius: 10
  }
});
