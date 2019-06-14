import { StyleSheet, Dimensions } from 'react-native';
import { colors, font } from '../../../../shared/theme';

const screen_width = Dimensions.get('window').width;
const height = 230;
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
    position: 'relative',
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
  formContainer: {
    paddingTop: 40,
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
    width: screen_width,
    height,
    resizeMode: 'stretch'
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screen_width,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageOverlay: {
    width: screen_width,
    height: 150,
    resizeMode: 'contain',
    marginRight: 50,
    marginLeft: 50
  }
});
