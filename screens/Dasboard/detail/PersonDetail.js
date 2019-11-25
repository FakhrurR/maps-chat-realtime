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
          id: '1',
          icon: 'comments',
          name: 'Chat',
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
      ],
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
                <Icon name="chevron-left" size={20} color="#FF8FB2" />
              </TouchableOpacity>
            </View>
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
