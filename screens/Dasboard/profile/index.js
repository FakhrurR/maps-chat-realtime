/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  BackHandler,
  StatusBar,
  ProgressBarAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {ListItem, List, Right, Left, Body, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import db from './../../config';
import storage from './../../config';
// import firebase from '@react-native-firebase/storage';
import Users from './../Users';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
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
          icon: 'info-circle',
          name: 'About',
        },
        {
          id: '5',
          icon: 'sign-out-alt',
          name: 'Logout',
        },
      ],
      name: '',
      phone: '',
      email: '',
      username: '',
      avatarSource: '',
      Isimage: false,
      photo: null,
      url: '',
      Uri: null,
      progress: 0,
      photoData: '',
      photoFileName: '',
      photoType: '',
      photoFilePath: '',
      isProgress: false,
    };
  }

  componentDidMount() {
    console.log('component did mount profile');
    this.getData();
  }

  getData = () => {
    this.setState({isProgress: true});
    const user = Users.username;
    db.database()
      .ref(`users/${user}`)
      .on('value', snapshot => {
        let person = snapshot.val();
        console.log(person.email);
        this.setState({
          name: person.name,
          phone: person.phone,
          email: person.email,
          username: person.username,
          photo: person.photo,
        });
        this.setState({isProgress: false});
      });
  };

  handleImageChoose = async () => {
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, async response => {
      if (response.uri) {
        this.setState({photo: response.uri});
      }
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else {
        this.setState({isProgress: true});
        this.uploadImage(response.uri, response.fileName);
      }
    });
  };

  uploadImage = async (uri, imageName) => {
    this.setState({isProgress: true});
    const response = await fetch(uri);
    const blob = await response.blob();
    let user = Users.username;
    let ref = db
      .storage()
      .ref()
      .child(`images/${user}`);
    ref.put(blob).then(resi => {
      if (resi.state === 'success') {
        db.storage()
          .ref()
          .child(`images/${user}`)
          .getDownloadURL()
          .then(ress => {
            this.setState({
              photo: ress,
            });
            db.database()
              .ref('users/' + Users.username)
              .update({
                photo: ress,
              });
            this.setState({isProgress: false});
          });
      }
      this.getData();
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
    if (item === '1') {
      this.props.navigation.navigate('EditProfile', {
        name: this.state.name,
        username: this.state.username,
        phone: this.state.phone,
      });
    } else if (item === '5') {
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
            onPress: () => {
              db.auth().signOut();
              this.props.navigation.navigate('LoginScreen');
            },
          },
        ],
        {cancelable: false},
      );
    } else if (item === '2') {
      Alert.alert('Warning!!', 'Coming Soon');
    } else if (item === '3') {
      Alert.alert('Help', 'Maps And Chat Realtime');
    } else if (item === '4') {
      Alert.alert('Version v.01', 'Author: Fakhrur Rijal');
    }
  };

  render() {
    return (
      <View>
        <StatusBar backgroundColor="pink" barStyle="light-content" />
        <ScrollView style={{flexDirection: 'column'}}>
          <SafeAreaView>
            <View
              style={{width: '100%', height: 210, backgroundColor: '#FFF6F4'}}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.handleImageChoose()}>
                  {/* {this.state.isProgress && (
                    <ActivityIndicator
                      size="small"
                      color="#00ff00"
                      value={this.state.progress}
                    />
                  )} */}
                  <View style={{flexDirection: 'row-reverse'}}>
                    {!this.state.photo && (
                      <Image
                        // source={require('./../../../assets/blank.png')}
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
                    {this.state.photo && (
                      <Image
                        source={{uri: this.state.photo}}
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
                    {this.state.isProgress && (
                      <View
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <ActivityIndicator
                          size="large"
                          color="#00ff00"
                          value={this.state.progress}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                <View>
                  <Icon2
                    name="plus-circle"
                    size={30}
                    color="#FF8FB2"
                    style={{
                      marginTop: -25,
                      alignItems: 'center',
                      marginLeft: 60,
                      borderRadius: 20,
                    }}
                  />
                </View>
                <Text
                  style={{color: '#FF8FB2', fontSize: 20, fontWeight: 'bold'}}>
                  {this.state.name}
                </Text>
                <Text style={{color: '#FF8FB2', fontSize: 13}}>
                  {this.state.phone}
                </Text>
                <Text style={{color: '#FF8FB2', fontSize: 13}}>
                  {this.state.email}
                </Text>
              </View>
            </View>
            <FlatList
              data={this.state.List}
              renderItem={this.renderRow}
              key={item => item.id}
            />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
