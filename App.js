import React from 'react';
import {View, Button } from 'react-native';
import {createSwitchNavigator,createAppContainer,SafeAreaView
} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home';
import Profile from './screens/Profile';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const HomeTab = createBottomTabNavigator(
  {
      Home: { screen: createStackNavigator({ Home: { screen: Home } }) },
      Profile: { screen: createStackNavigator({ Profile: { screen: Profile } }) }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
          
        } else if (routeName === 'Profile') {
          iconName = `md-happy`;
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#d81b60',
      inactiveTintColor: 'gray',
    },
  }
);

const SignedIn = createDrawerNavigator(
  {
      Home: { screen: HomeTab }
  },
  {
      contentComponent: (props) => (
          <View style={{ flex: 1 }}>
              <SafeAreaView style={{ flex:1, backgroundColor: '#3a2995' }}>
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


const SignedOut = createStackNavigator(
  {
      SignUp: { screen: SignUp },
      Login: { screen: Login }
  }
);


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


const Layout = createAppContainer(createRootNavigator(true));

export default class App extends React.Component {

     static navigationOptions = ()=>({
        title: 'Hi Miho',
        //Sets Header text of Status Bar
        headerStyle: {
          backgroundColor: '#e8c121',
          //Sets Header color
        },
        headerTintColor: '#e8c121',
        //Sets Header text color
        headerTitleStyle: {
          fontWeight: 'bold',
          //Sets Header text style
        },
      });
      
  render() {
      return (
          <Layout />
      );
  }
}