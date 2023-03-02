import { Center, Heading, Text } from 'native-base';
import React from 'react';
export default function Home({ navigation }: any): JSX.Element {

  return (
    <Center flex={1}>
      <Heading margin={5}>
        <Text color="primary.500">Home Screen</Text>
      </Heading>
    </Center>
  );
}
