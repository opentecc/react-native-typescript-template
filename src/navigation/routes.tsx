import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  RootTabScreenProps,
  ScreensPathInterface,
  ScreensPathsInterface,
  DrawerRouterInterface,
} from '../../types';

import LoginScreen from '../screens/Auth/Login';
import Liveness from '../components/Liveness';
import HomeScreen from '../screens/Home';
import SettingScreen from '../screens/Settings';
// Chat
import Conversation from '../screens/chat/conversations';

// Auth
import AuthStack from './Stacks/AuthStack';
import CustomIcon from '../components/Icon';
// ----------------------------------------------------------------------

export const PATH_AUTH: ScreensPathsInterface = {
  Login: {
    name: 'Login',
    components: AuthStack,
  },
  Liveness: {
    name: 'Liveness',
    components: Liveness,
  },
};

export const PATH_MAIN: ScreensPathsInterface = {
  Home: {
    name: 'Home',
    components: HomeScreen,
  },
  Conversations: {
    name: 'Conversations',
    components: Conversation,
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
    options: ({ }: RootTabScreenProps<'Home'>) => {
      return {
        title: 'Home',
        tabBarIcon: ({ color }: { color: string }) => {
          return <TabBarIcon name="home" color={color} />;
        },
      };
    },
  },
  {
    path: PATH_MAIN.Conversations,
    options: ({ }: RootTabScreenProps<'Conversations'>) => {
      return {
        title: 'Chat',
        tabBarIcon: ({ color }: { color: string }) => {
          return <TabBarIcon name="comments" color={color} />;
        },
      };
    },
  },

  {
    path: PATH_MAIN.Settings,
    options: () => ({
      title: PATH_MAIN.Settings.name,
      tabBarIcon: ({ color }: { color: string }) => (
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
            icon: ({ color }) => {
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
            icon: ({ color }) => {
              return <TabBarIcon name="cog" color={color} />;
            },
          };
        },
      },
    ],
  },


  {
    name: 'Chat',
    children: [
      {
        path: PATH_MAIN.Conversations,
        options: props => {
          return {
            label: 'Conversation',
            onPress: () => props.navigation.navigate(PATH_MAIN.Conversations.name),
            icon: ({ color }) => {
              return <TabBarIcon name="comments" color={color} />;
            },
          };
        },
      },
    ],
  },




  {
    name: 'Auth',
    children: [
      {
        path: PATH_AUTH.Login,
        options: props => {
          return {
            label: 'Login',
            onPress: () => props.navigation.navigate(PATH_AUTH.Login.name),
            icon: ({ color }) => {
              return <TabBarIcon name="comments" color={color} />;
            },
          };
        },
      },
      {
        path: PATH_AUTH.Liveness,
        options: props => {
          return {
            label: 'Login',
            onPress: () => props.navigation.navigate(PATH_AUTH.Liveness.name),
            icon: ({ color }) => {
              return <TabBarIcon name="comments" color={color} />;
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
