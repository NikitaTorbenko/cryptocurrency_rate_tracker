import {StyleSheet} from 'react-native';
import { colors } from './variables/colors';

export const globalStyles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: colors.bg,
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
});
