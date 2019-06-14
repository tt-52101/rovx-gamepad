import { StyleSheet } from 'react-native';
import { pallete } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  filterWrapper: {
    height: 28
  },
  filterItem: {
    flexDirection: 'row',
    backgroundColor: pallete.master,
    marginRight: 5,
    borderRadius: 3,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  filterItemText: {
    flex: 1,
    alignSelf: 'center',
    color: pallete.white,
    fontSize: 15
  },
  filterItemIcon: {
    color: pallete.white,
    marginRight: 6
  },
  filterItemsButton: {
    flex: 1,
    marginLeft: 7
  },
  removeIcon: {
    fontSize: 22
  }
});
