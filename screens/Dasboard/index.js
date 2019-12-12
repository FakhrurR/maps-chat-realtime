/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Chat from './chat';
import maps from './maps/Map';
import Profile from './profile';
import ChatPerson from './detail/ChatPerson';
import PersonDetail from './detail/PersonDetail';
import Contact from './detail/Contact';
import EditProfile from './detail/EditProfile';
import MapChat from './maps/MapChat';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const ChatStack = createStackNavigator({
  Chat: Chat,
  ChatPerson,
  PersonDetail,
  Contact,
  MapChat,
});

const ProfileStack = createStackNavigator({
  Profile,
  EditProfile,
});

const MapStack = createStackNavigator({
  Maps: maps,
  MapChat,
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

const BottomNavigation = createMaterialBottomTabNavigator(
  {
    Chat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="comment-dots"
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
            name="map-marker-alt"
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
    resetOnBlur: true,
    tabBarOptions: {
      activeTintColor: '#FF8FB2',
      inactiveTintColor: '#FFF6F4',
      labelStyle: {
        fontSize: 12,
      },
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
    activeColor: '#FFF6F4',
    inactiveColor: '#FDD3E4',
    showLabel: false,
    barStyle: {backgroundColor: '#FF8FB2'},
    initialRouteName: 'Chat',
  },
);

export default createAppContainer(BottomNavigation);
