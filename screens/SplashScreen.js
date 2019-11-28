/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import db from './config';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
    };
  }

  UNSAFE_componentWillMount() {
    // if (AsyncStorage.getItem('Authorization')) {
    //   this.props.navigation.navigate('DasboardScreen');
    // } else {
    setTimeout(() => {
      this.getAsync();
      // this.props.navigation.navigate('LoginScreen');
    }, 4000);
    // }
    // Your web app's Firebase configuration
  }

  getAsync = () => {
    const user = db.auth().currentUser;

    if (user) {
      this.props.navigation.navigate('DasboardScreen');
    } else {
      this.props.navigation.navigate('LoginScreen');
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('./../assets/background1.png')}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Icon name="users" size={50} color="#FFF6F4" />
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#FFF6F4'}}>
              SOCIAL
            </Text>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#FFF6F4'}}>
              START
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FF8FB2',
  },
  splashBack: {
    flexDirection: 'column',
  },
  splashText: {
    color: '#FFF6F4',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
