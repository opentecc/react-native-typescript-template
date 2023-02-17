import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Icon} from 'native-base';

type IconsProvider =
  | 'FontAwesome'
  | 'AntDesign'
  | 'MaterialIcons'
  | 'Entypo'
  | 'Ionicons'
  | 'Foundation'
  | 'Feather'
  | 'SimpleLineIcons'
  | 'MaterialCommunityIcons'
  | 'Zocial'
  | 'Octicons'
  | 'FontAwesome5';

type IconType =
  | typeof FontAwesome
  | typeof AntDesign
  | typeof MaterialIcons
  | typeof Entypo
  | typeof Ionicons
  | typeof Foundation
  | typeof Feather
  | typeof SimpleLineIcons
  | typeof MaterialCommunityIcons
  | typeof Zocial
  | typeof Octicons
  | typeof FontAwesome5;

interface IconInterface {
  [key: string]: IconType;
}
const IconProviders: IconInterface = {
  FontAwesome: FontAwesome,
  AntDesign,
  MaterialIcons,
  Entypo,
  Ionicons,
  Foundation,
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Zocial,
  Octicons,
  FontAwesome5,
};

interface CustomIconProps extends React.ComponentProps<typeof Icon> {
  provider: IconsProvider;
}

export default function CustomIcon(props: CustomIconProps) {
  return <Icon as={IconProviders[props.provider]} {...props} />;
}
