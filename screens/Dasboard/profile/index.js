/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, Alert, BackHandler} from 'react-native';
import styles from './styles';
import {ListItem, List, Right, Left, Body, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import db from './../../config';
import Users from './../Users';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';

export default class index extends Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#FF8FB2',
    },
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      color: 'white',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      List: [
        {
          id: '1',
          icon: 'pen-square',
          name: 'Edit Profile',
        },
        {
          id: '2',
          icon: 'users',
          name: 'Invite a Friend',
        },
        {
          id: '3',
          icon: 'info-circle',
          name: 'Help',
        },
        {
          id: '4',
          icon: 'sign-out-alt',
          name: 'Logout',
        },
      ],
      users: [],
      phone: '',
    };
  }

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.actionRow(item.id)}
        style={{marginLeft: 5, marginRight: 10}}>
        <ListItem
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            marginLeft: 10,
            marginRight: 10,
            borderBottomColor: '#FFF6F4',
          }}>
          <Icon name={item.icon} size={20} color="#FF8FB2" />
          <Text
            style={{
              marginLeft: 10,
              color: '#FF8FB2',
              alignSelf: 'center',
            }}>
            {item.name}
          </Text>
        </ListItem>
      </TouchableOpacity>
    );
  };

  actionRow = async item => {
    console.log('Selected Item :', item);
    if (item === '1') {
      this.props.navigation.navigate('EditProfile');
    } else if (item === '4') {
      Alert.alert(
        'Confirm',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await AsyncStorage.removeItem('Authorization', err =>
                console.log('Authorization', err),
              );
              this.props.navigation.navigate('LoginScreen');
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  render() {
    return (
      <View>
        <SafeAreaView style={{flexDirection: 'column'}}>
          <View
            style={{width: '100%', height: 200, backgroundColor: '#FFF6F4'}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('./../../../assets/person.jpg')}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 150 / 2,
                  borderColor: '#FFF6F4',
                  overflow: 'hidden',
                  borderWidth: 1,
                  marginTop: 30,
                }}
              />
              <Text
                style={{color: '#FF8FB2', fontSize: 20, fontWeight: 'bold'}}>
                Karin Benny
              </Text>
              <Text style={{color: 'black', fontSize: 13}}>+623488584848</Text>
            </View>
          </View>
          <SafeAreaView>
            <FlatList
              data={this.state.List}
              renderItem={this.renderRow}
              key={item => item.id}
            />
          </SafeAreaView>
        </SafeAreaView>
      </View>
    );
  }
}
