/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Input} from 'native-base';
import SafeAreaView from 'react-native-safe-area-view';
import db from './../../config';
import Users from '../Users';

export default class index extends Component {
  static navigationOptions = {
    title: 'Chats',
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
      data: [
        {
          id: '1',
          name: 'Koko',
          status: 'Offline',
          image: require('./../../../assets/person.jpg'),
          chat:
            'When I was an undergraduate student, we had a requirement to complete a summer internship',
          lastChat: '13.40',
        },
        {
          id: '2',
          name: 'Chici',
          status: 'Online',
          image: require('./../../../assets/person.jpg'),
          chat: 'Where Are you?',
          lastChat: '11.40',
        },
        {
          id: '3',
          name: 'Lala',
          status: 'Offline',
          image: require('./../../../assets/person.jpg'),
          chat: 'Invite you',
          lastChat: '10.00',
        },
      ],
      users: [],
      messageList: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    db.database()
      .ref('users')
      .on('child_added', snapshot => {
        console.log([snapshot.val(), snapshot.key]);
        let person = snapshot.val();
        person.username = snapshot.key;
        if (person.username === Users.username) {
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

  getMessage = () => {
    db.database()
      .ref('messages/' + 'messages')
      .on('child_added', snapshot => {
        console.log(snapshot.val());
        let person = snapshot.val();
        person.username = snapshot.key;
        // console.log(person.username + ' ' + snapshot.key);
        if (person.username === Users.username) {
          Users.username = person.username;
        } else {
          this.setState(prevState => {
            return {
              messageList: [...prevState.messageList, person],
            };
          });
        }
      });
  };

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ChatPerson', item)}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#FFF6F4',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PersonDetail', item)
            }>
            <View>
              <Image
                source={item.image}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                  borderColor: '#FFF6F4',
                  overflow: 'hidden',
                  borderWidth: 1,
                  marginBottom: 10,
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={{marginLeft: 20, flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {item.name}
                </Text>
              </View>
              <View style={{marginTop: 5, flex: 1, alignItems: 'flex-end'}}>
                <Text style={{color: 'gray'}}>{item.lastChat}</Text>
              </View>
            </View>
            <View>
              <Text numberOfLines={1} style={{width: 200, color: 'gray'}}>
                {item.chat}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ChatPerson', item)}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#FFF6F4',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PersonDetail', item)
            }>
            <View>
              <Image
                source={require('./../../../assets/blank.png')}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                  borderColor: '#FFF6F4',
                  overflow: 'hidden',
                  borderWidth: 1,
                  marginBottom: 10,
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={{marginLeft: 20, flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {item.username}
                  {/* {item.gender} */}
                </Text>
              </View>
              <View style={{marginTop: 5, flex: 1, alignItems: 'flex-end'}}>
                <Text style={{color: 'gray'}}>{item.time}</Text>
              </View>
            </View>
            {/* <View>
              <Text numberOfLines={1} style={{width: 200, color: 'gray'}}>
                {item.chat}
              </Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, paddingBottom: 40}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFF6F4',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Search Here.."
            placeholderTextColor="#FDD3E4"
            style={{flex: 1, textAlign: 'center', color: '#FF8FB2'}}
          />
          <TouchableOpacity>
            <Icon
              name="search"
              size={20}
              color="#FF8FB2"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 10}}>
          <FlatList
            data={this.state.users}
            renderItem={this._renderRow}
            keyExtractor={item => item.username}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Contact')}
          style={{
            borderWidth: 1,
            borderColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 60,
            backgroundColor: '#FF8FB2',
            borderRadius: 100,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOpacity: 0.8,
            elevation: 3,
            shadowRadius: 15,
            shadowOffset: {width: 1, height: 13},
          }}>
          <Icon2 name="chat" size={30} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
