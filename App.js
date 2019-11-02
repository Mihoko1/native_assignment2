import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
    createSwitchNavigator,
    createAppContainer,
    SafeAreaView
} from 'react-navigation';

import { createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer'

//パーツ読み込み
import Home from './screens/Home';
import Profile from './screens/Profile';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

import { isSignedIn, onSignOut } from "./auth";

const HomeTab = createBottomTabNavigator(
  {
      Home: { screen: createStackNavigator({ Home: { screen: Home } }) },
      Profile: { screen: createStackNavigator({ Profile: { screen: Profile } }) }
  }
);

//DrawerをかましてHomeTabを表示
const SignedIn = createDrawerNavigator(
  {
      Home: { screen: HomeTab }
  },
  {
      contentComponent: (props) => (
          <View style={{ flex: 1 }}>
              <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                  <DrawerItems {...props} />
                  <Button
                      title="Logout"
                      onPress={() => props.navigation.navigate('SignedOut')}
                  />
              </SafeAreaView>
          </View>
      )
  }
);

//SignOut時の標準画面
const SignedOut = createStackNavigator(
  {
      SignUp: { screen: SignUp },
      Login: { screen: Login }
  }
);

//Switchを定義
const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
      {
          SignedIn: { screen: SignedIn },
          SignedOut: { screen: SignedOut }
      },
      {
          initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
      }
  );
}

//AppContainerでラップ（RN v3より）
const Layout = createAppContainer(createRootNavigator(true));

export default class App extends React.Component {
  render() {
      return (
          <Layout />
      );
  }
}