import { StyleSheet } from 'react-native';
import { colors, font } from '@product/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  },
  safeArea: {
    flex: 1
  },
  header: {
    paddingTop: 35,
    backgroundColor: colors.primary,
    width: undefined,
    height: 200
  },
  profileImageIcon: {
    fontSize: 20,
    color: colors.white,
    top: 80,
    left: 80,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusIcon: {
    fontSize: 20,
    color: colors.white,
    marginRight: 5
  },
  rowChangePictureItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 15
  },
  mailIcon: {
    fontSize: 20,
    color: colors.grayDark,
    marginRight: 5
  },
  mailText: {
    color: colors.grayDark
  },
  changePictureText: {
    color: colors.white
  },
  pageContainer: {
    backgroundColor: colors.primary
  },
  rowItem: {
    marginLeft: 7,
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  changePictureHolder: {
    backgroundColor: colors.blackHalfOpacity,
    position: 'absolute',
    right: 0,
    top: 50,
    width: 160,
    height: 40,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profilePictureHolder: {
    flex: 1,
    position: 'absolute',
    top: 100,
    left: 30,
    backgroundColor: colors.grayLight,
    borderRadius: 100,
    width: 200,
    height: 200,
    zIndex: 1001,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },

  image: {
    alignSelf: 'center',
    borderRadius: 90,
    width: 180,
    height: 180
  },
  scrollViewStyle: {
    marginTop: 105,
    flex: 1
  },
  formContainer: {
    paddingHorizontal: 20,
    flex: 1
  },
  footerContainer: {
    marginTop: 20,
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
  backToProfileContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backToProfileIcon: {
    color: colors.ux_master_text,
    fontSize: 20,
    marginRight: 5
  },
  backToProfileText: {
    color: colors.ux_master_text
  }
});
