import { StyleSheet, Dimensions } from 'react-native';
import { colors, font } from '@product/theme';

const height = 100;

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
    paddingVertical: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerIcon: {
    color: colors.white,
    fontSize: 38,
    marginLeft: 10,
    marginTop: 2
  },
  scrollViewStyle: {
    marginTop: 10
  },
  footerContainer: {
    marginTop: 20,
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
  },
  checkBoxStyle: {},
  checkboxText: {
    color: colors.black900,
    fontSize: font.textMedium
  },
  textAccept: {
    color: colors.black900
  },
  headerImage: {
    height: height
  },
  title: {
    fontSize: 28,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  image: {
    alignSelf: 'center',
    borderRadius: 90,
    width: 180,
    height: 180
  },
  signout: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    fontSize: 20
  },

  headerChangePictureIcon: { fontSize: 20, color: colors.white },
  headerChangePictureText: { marginLeft: 5, color: colors.white },
  profilePictureHolder: {
    alignSelf: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: 100,
    width: 200,
    height: 200,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowIcon: { fontSize: 20, color: colors.grayDarkExtra },
  rowText: { marginLeft: 5, color: colors.grayDarkExtra },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  lineBreak: {
    height: 1,
    backgroundColor: colors.grayLight,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 15
  }
});
