import { StyleSheet, Dimensions } from 'react-native';
import { font } from '../../../../shared/theme';
const screen_width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 4,
    flex: 1,
    width: screen_width
  },
  inputText: {
    fontSize: font.input
  }
});
