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
} from 'react-native';
import styles from './styles';
import {ListItem, List, Right, Left, Body, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import db from './../../config';
import Users from './../Users';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = db.storage.ref('images').child(`${sessionId}`);

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, {type: `${mime};BASE64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error);
      });
  });
};

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
      uriImage: '',
      uri: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
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
        });
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
    }
  };

  handleImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        uploadImage(response.uri);
        const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          Isimage: true,
        });
      }
    });
  };

  render() {
    return (
      <View>
        <StatusBar backgroundColor="pink" barStyle="light-content" />
        {/* <ProgressBarAndroid styleAttr="Horizontal" backgroundColor="#FFF6F4" /> */}
        <ScrollView style={{flexDirection: 'column'}}>
          <SafeAreaView>
            <View
              style={{width: '100%', height: 210, backgroundColor: '#FFF6F4'}}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.handleImage()}>
                  {!this.state.Isimage && (
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
                  {this.state.Isimage && (
                    <Image
                      source={this.state.avatarSource}
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
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginTop: -20, marginLeft: 65, borderRadius: 20}}>
                  <Icon2 name="plus-circle" size={30} color="#FF8FB2" />
                </TouchableOpacity>
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
