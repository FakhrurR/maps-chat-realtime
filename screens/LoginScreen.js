/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {Input, Button, Form, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import db from './config';
import Users from './Dasboard/Users';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isMessage: false,
      hidePass: true,
      icon: 'eye-slash',
    };
  }

  handleChange = key => val => {
    this.setState({[key]: val});
    console.log(val);
  };

  // validateEmail = email => {
  //   let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return regex.test(email);
  // };

  handleSubmit = async () => {
    const {username, password} = this.state;
    if (username === '' || password === '') {
      this.setState({isMessage: true});
      this.setState({username: '', password: ''});
    } else {
      // await AsyncStorage.setItem('Authorization');
      this.getData();
    }
  };

  getData = () => {
    Users.username = this.state.username;
    Users.password = this.state.password;
    db.database()
      .ref('users')
      .on('child_added', async snapshot => {
        console.log([snapshot.val(), snapshot.key]);
        let person = snapshot.val();
        person.username = snapshot.key;
        if (
          person.username === Users.username &&
          person.password === Users.password
        ) {
          db.database()
            .ref('users/' + Users.username)
            .update({
              username: this.state.username,
              password: this.state.password,
            });
          await AsyncStorage.setItem('Authorization', this.state.username);
          this.props.navigation.navigate('DasboardScreen');
          this.setState({isMessage: false});
        } else {
          this.setState({
            isMessage: true,
          });
          this.setState({username: '', password: ''});
        }
      });
  };

  togglePass = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
      hidePass: !prevState.hidePass,
    }));
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
          <View style={{marginLeft: 20, marginRight: 30, marginBottom: 20}}>
            <Form>
              <Item>
                <Icon
                  name="user-circle"
                  size={25}
                  color="#FFF6F4"
                  style={{marginRight: 10, marginBottom: 2}}
                />
                <Input
                  style={{color: '#FFF6F4', marginBottom: 2}}
                  placeholder="Username"
                  keyboardType={'email-address'}
                  placeholderTextColor="#FFF6F4"
                  value={this.state.username}
                  onChangeText={this.handleChange('username')}
                />
              </Item>
              <Item>
                <Icon
                  name="lock"
                  size={25}
                  color="#FFF6F4"
                  style={{marginRight: 10, marginBottom: 5}}
                />
                <Input
                  style={{color: '#FFF6F4', marginBottom: 5}}
                  secureTextEntry={this.state.hidePass}
                  placeholder="Password"
                  placeholderTextColor="#FFF6F4"
                  value={this.state.password}
                  onChangeText={this.handleChange('password')}
                />
                <TouchableOpacity onPress={() => this.togglePass()}>
                  <Icon
                    name={this.state.icon}
                    size={25}
                    color="#FFF6F4"
                    style={{marginRight: 10, marginBottom: 5}}
                  />
                </TouchableOpacity>
              </Item>
              {this.state.isMessage && (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: 'red',
                    marginLeft: 10,
                  }}>
                  Email or Password is incorrect or you must register before
                  enter
                </Text>
              )}
            </Form>
          </View>
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <Button
              block
              style={{borderRadius: 30, backgroundColor: '#FF8FB2'}}
              onPress={() => this.handleSubmit()}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>SIGN IN</Text>
            </Button>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={{color: '#FFF6F4'}}>Don't Have an Account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RegisterScreen')}>
              <Text style={{color: '#FF8FB2', fontWeight: 'bold'}}>
                {' '}
                Sign Up
              </Text>
            </TouchableOpacity>
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
  },
  loginView: {
    flexDirection: 'column',
    backgroundColor: 'yellow',
  },
});
