/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  Auth: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
  Login: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

// Drawer Types
export type DrawerChildInterface = {
  path: ScreensPathInterface;
  options: (props: any) => {
    label: string;
    onPress: (props: RootTabScreenProps<keyof RootTabParamList>) => void;
    icon: (props: {color: string}) => JSX.Element;
  };
};
export type DrawerRouterInterface = {
  name: string;
  children: DrawerChildInterface[];
};
export type ScreensPathInterface = {
  name: keyof RootTabParamList;
  // options: RootTabScreenProps<keyof RootTabParamList> | {title: string};
  components: (props: any) => JSX.Element;
};

export interface ScreensPathsInterface {
  [key: string]: ScreensPathInterface;
}
