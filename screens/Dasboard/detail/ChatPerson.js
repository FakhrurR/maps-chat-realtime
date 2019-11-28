/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, Dimensions, Alert} from 'react-native';
import styles from './styles';
import {
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconBar from 'react-native-vector-icons/FontAwesome5';
import {GiftedChat} from 'react-native-gifted-chat';
import db from './../../config';
import Firebase from 'firebase';

import BackButton from './../../../components/BackButton';
import {
  Container,
  Header,
  Left,
  Right,
  Title,
  Body,
  Content,
} from 'native-base';
import Users from '../Users';
import SafeAreaView from 'react-native-safe-area-view';
import Geolocation from '@react-native-community/geolocation';

const {heightku, widthku} = Dimensions.get('window');

const ASPECT_RATIO = widthku / heightku;
const LONGITUDE = 0;
const LATITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ChatPerson extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    textMessage: '',
    // messages: [],
    person: {
      username: this.props.navigation.getParam('username'),
      phone: this.props.navigation.getParam('phone'),
    },
    messageList: [],
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  componentDidMount() {
    console.log(this.state.person.username);
    console.log(Users.username);
    db.database()
      .ref('messages/')
      .child(Users.username)
      .child(this.state.person.username)
      .on('child_added', snapshot => {
        console.log(snapshot.val());
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, snapshot.val()],
          };
        });
      });
  }

  convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }

    return result;
  };

  handleChange = key => val => {
    this.setState({[key]: val});
    console.log(val);
  };
  sendMessages = () => {
    if (this.state.textMessage.length > 0) {
      let msg = db
        .database()
        .ref('messages')
        .child(Users.username)
        .child(this.state.person.username)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: Firebase.database.ServerValue.TIMESTAMP,
        from: Users.username,
      };
      updates[
        'messages/' +
          Users.username +
          '/' +
          this.state.person.username +
          '/' +
          msg
      ] = message;
      updates[
        'messages/' +
          this.state.person.username +
          '/' +
          Users.username +
          '/' +
          msg
      ] = message;
      db.database()
        .ref()
        .update(updates);
      this.setState({textMessage: ''});
    }
  };

  ChatRow = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '60%',
          alignSelf: item.from === Users.username ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === Users.username ? 'pink' : 'white',
          elevation: 2,
          borderRadius: 10,
          marginLeft: 5,
          marginTop: 2,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: 'black', padding: 7, fontSize: 16}}>
            {item.message}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#eee',
              fontSize: 12,
              textAlign: 'right',
              marginRight: 10,
            }}>
            {this.convertTime(item.time)}
          </Text>
        </View>
      </View>
    );
  };

  sendLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  handelMap = () => {
    Alert.alert(
      'Confirm',
      'Share your location?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          // onPress: () => {
          //   db.auth().signOut();
          //   this.props.navigation.navigate('LoginScreen');
          // },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#FF8FB2'}}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <IconBar name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
          </Left>
          <Body>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('./../../../assets/blank.png')}
                style={{width: 50, height: 50, borderRadius: 50}}
              />
              <View style={{flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: 'white', fontSize: 15}}>
                  {this.props.navigation.getParam('name')}
                </Text>
                <Text style={{color: 'white', fontSize: 10}}>
                  {this.props.navigation.getParam('status')}
                </Text>
              </View>
            </View>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => this.handelMap()}>
              <IconBar name="map-marker-alt" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 20}}>
              <IconBar name="ellipsis-v" size={20} color="white" />
            </TouchableOpacity>
          </Right>
        </Header>
        {/* <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        /> */}
        <FlatList
          style={{padding: 10, marginBottom: 70}}
          data={this.state.messageList}
          renderItem={this.ChatRow}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            flex: 1,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
              flex: 1,
            }}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  backgroundColor: 'white',
                  flex: 1,
                }}>
                <TextInput
                  placeholder="Type Message..."
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                  }}
                  onChangeText={this.handleChange('textMessage')}
                  value={this.state.textMessage}
                />
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  borderRadius: 40,
                  marginTop: 5,
                }}
                onPress={() => this.sendMessages()}>
                <Icon
                  name="send"
                  size={40}
                  style={{marginLeft: 5, marginRight: 5}}
                  color="pink"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
export default ChatPerson;
