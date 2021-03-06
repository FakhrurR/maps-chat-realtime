/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, Alert} from 'react-native';
import styles from './styles';
import {ListItem, List, Right, Left, Body, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native-gesture-handler';
import Users from './../Users';
import db from './../../config';
import SafeAreaView from 'react-native-safe-area-view';

export default class index extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      List: [
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
      ],
      users: [],
      imageProfile: this.props.navigation.getParam('photo'),
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const user = db.auth().currentUser.email;
    console.log(user);
    db.database()
      .ref('users')
      .on('child_added', snapshot => {
        let person = snapshot.val();
        console.log(snapshot.key);
        person.username = snapshot.key;
        let email = person.email.toLowerCase();
        if (user === email) {
          Users.email = person.email;
          Users.username = person.username;
        } else {
          this.setState(prevState => {
            return {
              users: [...prevState.users, person],
            };
          });
        }
      });
  };

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
    if (item === '2') {
      Alert.alert('Warning!!', 'Coming Soon');
    } else if (item === '3') {
      Alert.alert('Help', 'Maps And Chat Realtime');
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
              await AsyncStorage.clear();
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
            style={{width: '100%', height: 300, backgroundColor: '#FFF6F4'}}>
            <View style={{margin: 20}}>
              <TouchableOpacity
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="times" size={20} color="#FF8FB2" />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              {this.state.imageProfile && (
                <Image
                  source={{
                    uri: this.state.imageProfile,
                  }}
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
              )}
              {!this.state.imageProfile && (
                <Image
                  source={require('./../../../assets/blank.png')}
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
              )}
              <Text
                style={{color: '#FF8FB2', fontSize: 20, fontWeight: 'bold'}}>
                {this.props.navigation.getParam('name')}
              </Text>
              <Text style={{color: 'black', fontSize: 13}}>
                {this.props.navigation.getParam('phone')}
              </Text>
              <Text style={{color: 'black', fontSize: 13}}>
                {this.props.navigation.getParam('email')}
              </Text>
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
