import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  RootTabScreenProps,
  ScreensPathInterface,
  ScreensPathsInterface,
  DrawerRouterInterface,
} from '../../types';

import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Home';
import SettingScreen from '../screens/Settings';
import CustomIcon from '../components/Icon';
// ----------------------------------------------------------------------

export const PATH_AUTH: ScreensPathsInterface = {
  Login: {
    name: 'Login',
    components: LoginScreen,
  },
};

export const PATH_MAIN: ScreensPathsInterface = {
  Home: {
    name: 'Home',
    components: HomeScreen,
  },
  Settings: {
    name: 'Settings',
    components: SettingScreen,
  },
};

interface BottomTabInterface {
  path: ScreensPathInterface;
  options: (props: RootTabScreenProps<any>) => object;
}

export const BottomTabRouter: BottomTabInterface[] = [
  {
    path: PATH_MAIN.Home,
    options: ({}: RootTabScreenProps<'Home'>) => {
      return {
        title: 'Home',
        tabBarIcon: ({color}: {color: string}) => {
          return <TabBarIcon name="home" color={color} />;
        },
      };
    },
  },
  {
    path: PATH_MAIN.Settings,
    options: () => ({
      title: PATH_MAIN.Settings.name,
      tabBarIcon: ({color}: {color: string}) => (
        <TabBarIcon name="cog" color={color} />
      ),
    }),
  },
];

// Drawer

export const DrawerRouter: DrawerRouterInterface[] = [
  {
    name: 'General',
    children: [
      {
        path: PATH_MAIN.Home,
        options: props => {
          return {
            label: 'Home',
            onPress: () => {
              props.navigation.navigate(PATH_MAIN.Home.name);
            },
            icon: ({color}) => {
              return <TabBarIcon name="home" color={color} />;
            },
          };
        },
      },
    ],
  },
  {
    name: 'Profile',
    children: [
      {
        path: PATH_MAIN.Settings,
        options: props => {
          return {
            label: 'Settings',
            onPress: () => props.navigation.navigate(PATH_MAIN.Settings.name),
            icon: ({color}) => {
              return <TabBarIcon name="cog" color={color} />;
            },
          };
        },
      },
    ],
  },
];

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>['name'];
  color: string;
}) {
  return <CustomIcon size={30} provider={'FontAwesome'} {...props} />;
}
