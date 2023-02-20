/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  useColorMode,
  Text,
  Center,
  Heading,
  VStack,
} from 'native-base';
import React from 'react';
import useLocalAuthentication from '../../hooks/useLocalAuthentication';

export default function SettingScreen({navigation}: any): JSX.Element {
  const {toggleColorMode} = useColorMode();
  const callback = () => {
    console.log('Working Call back');
  };
  const {isAuthenticated, authenticate, error, biometryType, hasHardware} =
    useLocalAuthentication(callback);
  return (
    <Center flex={1}>
      <Heading margin={5}>
        <Text color="primary.500">Settings Screen</Text>
      </Heading>
      <VStack space={5}>
        <Button onPress={toggleColorMode} h={10}>
          Theme Toggle
        </Button>
        <Button onPress={authenticate} h={10}>
          Touch ID
        </Button>
        <Heading margin={5}>
          <Text color={isAuthenticated ? 'success.400' : 'error.400'}>
            {isAuthenticated ? 'Verified' : 'Unverified'}
          </Text>
        </Heading>
      </VStack>
    </Center>
  );
}
