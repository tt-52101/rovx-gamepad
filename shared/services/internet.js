import { NetInfo } from 'react-native';

export const isInternetConnected = async () => NetInfo.isConnected.fetch();
