import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../components/HomeScreen';
import LoadingScreen from '../components/Loading';
import SignUpScreen from '../components/SignUp';

const AuthenticationNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Loading: { screen: LoadingScreen },
      SignUp: { screen: SignUpScreen },
      Home: { screen: HomeScreen }
    },
    {
      initialRouteName: 'Loading'
    }
  )
);

export default AuthenticationNavigator;