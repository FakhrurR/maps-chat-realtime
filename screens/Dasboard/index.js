/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Chat from './chat';
import maps from './maps';
import Profile from './profile';
import ChatPerson from './detail/ChatPerson';
import PersonDetail from './detail/PersonDetail';
import Contact from './detail/Contact';
import EditProfile from './detail/EditProfile';

import Icon from 'react-native-vector-icons/FontAwesome5';

const ChatStack = createStackNavigator({
  Chat: Chat,
  ChatPerson,
  PersonDetail,
  Contact,
});

const ProfileStack = createStackNavigator({
  Profile,
  EditProfile,
});

ChatStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const BottomNavigation = createBottomTabNavigator(
  {
    Chat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="comments"
            color={tintColor}
            size={20}
            style={{textAlign: 'center'}}
          />
        ),
      },
    },
    Maps: {
      screen: maps,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="map-marked-alt"
            color={tintColor}
            size={20}
            style={{textAlign: 'center'}}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="user"
            color={tintColor}
            size={20}
            style={{textAlign: 'center'}}
          />
        ),
      },
    },
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FF8FB2',
      labelStyle: {
        fontSize: 12,
      },
      activeBackgroundColor: '#FFF6F4',
      showLabel: false,
    },
    upperCaseLabel: false,
    showIcon: true,
    indicatorStyle: {
      height: 20,
    },
    style: {
      backgroundColor: '#FFF6F4',
      textAlign: 'center',
    },
  },
);

export default createAppContainer(BottomNavigation);
