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

export default class Contact extends Component {
  static navigationOptions = {
    title: 'Contact',
    headerStyle: {
      backgroundColor: '#FF8FB2',
      color: '#fff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: 'white',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messageList: [],
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
              {item.photo && (
                <Image
                  source={{
                    uri: item.photo,
                  }}
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
              )}
              {!item.photo && (
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
              )}
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
      </SafeAreaView>
    );
  }
}
