import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './screens/SplashScreen';
import DasboardScreen from './screens/Dasboard';
import EditProfile from './screens/Dasboard/detail/EditProfile';

const navigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: {
        header: null,
      },
    },
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },
    DasboardScreen: {
      screen: DasboardScreen,
      navigationOptions: {
        header: null,
      },
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

const MainContainer = createAppContainer(createSwitchNavigator({navigator}));

class App extends Component {
  render() {
    return <MainContainer />;
  }
}

export default App;
