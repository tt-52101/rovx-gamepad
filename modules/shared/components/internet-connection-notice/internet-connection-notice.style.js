import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { colors } from '@product/theme';

export const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.ux_red,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    zIndex: 100,
    margin: 0,
    padding: 7
  },
  offlineText: { color: colors.white, fontSize: 13 }
});
