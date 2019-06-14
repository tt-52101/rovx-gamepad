import { BehaviorSubject } from 'rxjs';
import { Dimensions } from 'react-native';

export const ScreenInfo = new BehaviorSubject({ cols: 2 });

export function calculateScreen() {
  const { width, height } = Dimensions.get('window');
  const isPortrait = width < height;
  const numColumns = isPortrait ? 1 : 2;
  const data = { isPortrait, numColumns, screen_width: width };
  ScreenInfo.next(data);
}

Dimensions.addEventListener('change', calculateScreen);
calculateScreen();
