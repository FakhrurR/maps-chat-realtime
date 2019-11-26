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

  componentDidMount() {
    // if (AsyncStorage.getItem('Authorization')) {
    //   this.props.navigation.navigate('DasboardScreen');
    // } else {
    setTimeout(() => {
      this.getAsync();
    }, 4000);
    // }
    // Your web app's Firebase configuration
  }

  getAsync = async () => {
    const auth = await AsyncStorage.getItem('Authorization', err =>
      console.log('Authorization', err),
    );

    this.props.navigation.navigate(auth ? 'DasboardScreen' : 'LoginScreen');
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
