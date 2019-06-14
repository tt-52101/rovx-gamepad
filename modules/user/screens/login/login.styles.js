import { StyleSheet } from 'react-native';
import { colors } from '@product/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(244, 255, 255)'
  },
  wrapper: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: colors.white
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  superheading: {
    fontSize: 14
  },
  heading: {
    marginTop: 15,
    fontSize: 31
  },
  browseText: {
    textAlign: 'center',
    marginRight: 8
  },
  browsePublic: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row'
  },
  googleLoginBtn: {
    fontSize: 20,
    color: colors.white,
    backgroundColor: colors.googleLoginBtn,
    padding: 10,
    margin: 20,
    borderRadius: 5
  },
  facebookLoginBtn: {
    fontSize: 20,
    color: colors.white,
    backgroundColor: 'blue',
    padding: 10,
    margin: 20,
    borderRadius: 5
  },
  loginBtnsDisabledStyle: { color: 'gray' },
  imageLogo: {
    width: 350,
    height: 350,
    alignContent: 'center',
    alignSelf: 'center'
  }
});
