/* eslint-disable @typescript-eslint/no-unused-vars */
import {Center, Container, Heading, Text} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Home({navigation}: any): JSX.Element {
  return (
    <Center flex={1}>
      <Heading margin={5}>
        <Text color="primary.500">Home Screen</Text>
      </Heading>
    </Center>
  );
}
