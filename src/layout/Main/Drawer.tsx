import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTab';
import Animated from 'react-native-reanimated';
import {
  Avatar,
  VStack,
  Heading,
  useTheme,
  useColorModeValue,
  Pressable,
} from 'native-base';
const Drawer = createDrawerNavigator();
import { DrawerRouter } from '../../navigation/routes';
import { DrawerRouterInterface } from '../../../types';
import CustomIcon from '../../components/Icon';


import ChatStack from '../../navigation/Stacks/ChatStack';
import AuthStack from '../../navigation/Stacks/AuthStack';


function CustomDrawerContent({ ...props }: any) {
  const { theme } = props;
  const progress = useDrawerProgress();
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });
  function DrawerGroup({ name, children }: DrawerRouterInterface) {
    return (
      <VStack margin={0}>
        <Heading margin={3} size="xs" color={theme.label}>
          {name}
        </Heading>
        {children.map(child => {
          return (
            <DrawerItem
              inactiveTintColor={theme.label}
              key={child.path.name}
              {...child.options({ ...props, theme })}
              activeTintColor={theme.activeTintColor}
              activeBackgroundColor={theme.activeBackgroundColor}
            />
          );
        })}
      </VStack>
    );
  }

  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: theme.background,
      }}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <VStack space={2} alignItems="center">
          <Avatar
            bg="green.500"
            source={{
              uri: 'https://avatars.githubusercontent.com/u/19363749?v=4',
            }}>
            AJ
          </Avatar>
        </VStack>
        {DrawerRouter.map(({ name, children }, index) => {
          return (
            <DrawerGroup
              key={index}
              name={name}
              children={children}
              {...props}
            />
          );
        })}
      </Animated.View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  const { colors } = useTheme();
  const theme = {
    background: useColorModeValue(colors.primary[600], colors.dark[50]),
    label: useColorModeValue(colors.primary[50], colors.muted[200]),
    activeTintColor: useColorModeValue(
      colors.primary[700],
      colors.darkBlue[50],
    ),
    activeBackgroundColor: useColorModeValue(
      colors.primary[700],
      colors.darkBlue[800],
    ),
  };
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={navigation.toggleDrawer}>
            <CustomIcon
              margin={2}
              name="bars"
              provider="FontAwesome"
              color={theme.label}
              size={6}
            />
          </Pressable>
        ),
        headerShown: true,
        headerTitle: '',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
        },
      })}
      drawerContent={props => <CustomDrawerContent {...{ ...props, theme }} />}>
      <Drawer.Screen name="Root" component={BottomTabNavigator} />
      <Drawer.Screen
        name="Chat"
        component={ChatStack}
        options={{ headerShown: false }} // override headerShown to false
      />
      <Drawer.Screen
        name="Auth"
        component={AuthStack}
        options={{ headerShown: false }} // override headerShown to false
      />

    </Drawer.Navigator>
  );
}
