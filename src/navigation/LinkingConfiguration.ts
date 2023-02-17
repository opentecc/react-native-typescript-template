/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import {LinkingOptions} from '@react-navigation/native';

import {RootStackParamList} from '../../types';

const linking: LinkingOptions<RootStackParamList> = {
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'Home',
            },
          },
          Settings: {
            screens: {
              ProfileScreen: 'Settings',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
  prefixes: [],
};

export default linking;
