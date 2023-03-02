import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../../screens/chat/chat';
import { Pressable } from 'react-native';
import CustomIcon from '../../components/Icon';
import { useTheme, useColorModeValue } from 'native-base';
import ConversationScreen from '../../screens/chat/conversations';
const Stack = createNativeStackNavigator();
export default function ChatStack({ navigation }: any) {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <CustomIcon
              name="arrow-left"
              provider="FontAwesome"
              color={useColorModeValue(colors.primary[50], colors.muted[200])}
              size={6}
            />
          </Pressable>
        ),
      }}>
      <Stack.Screen name="Conversation" component={ConversationScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}