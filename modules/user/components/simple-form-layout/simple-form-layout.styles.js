import { StyleSheet } from 'react-native';
import { colors, font } from '@product/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,

    justifyContent: 'space-between'
  },
  pageTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: font.textLarge
  },
  header: {
    backgroundColor: colors.primary,
    paddingBottom: 40,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerIcon: {
    color: colors.white,
    fontSize: 38,
    marginLeft: 10,
    marginTop: 2
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  footerContainer: {
    backgroundColor: colors.primary
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary
  },
  submitContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15
  },
  submitText: {
    fontSize: font.textLarge,
    color: colors.white
  },
  submitIcon: {
    color: colors.white,
    marginLeft: 15,
    marginTop: 2
  },

  formDescription: {
    marginBottom: 50,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22
  }
});
