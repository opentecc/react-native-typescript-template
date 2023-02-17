/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  useColorMode,
  Text,
  Center,
  Container,
  Heading,
} from 'native-base';
import React from 'react';

export default function SettingScreen({navigation}: any): JSX.Element {
  const {toggleColorMode} = useColorMode();
  return (
    <Center flex={1}>
      <Heading margin={5}>
        <Text color="primary.500">Settings Screen</Text>
      </Heading>
      <Button onPress={toggleColorMode} h={10}>
        Theme Toggle
      </Button>
    </Center>
  );
}
