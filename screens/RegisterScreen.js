/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {Input, Button, Form, Item, Label, Content, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import db from './config';
import Users from './Dasboard/Users';
import AsyncStorage from '@react-native-community/async-storage';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      phone: '',
      gender: '',
      password: '',
      isMessage: false,
      isLoading: false,
      message: '',
    };
  }

  handleChange = key => val => {
    this.setState({[key]: val});
    console.log(key + ' ' + val);
  };

  validateEmail = email => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  clearText = () => {
    this.setState({
      name: '',
      email: '',
      username: '',
      phone: '',
      password: '',
      gender: '',
    });
  };

  handleSubmit = async () => {
    this.setState({isLoading: true});
    Users.username = this.state.username;
    Users.phone = this.state.phone;
    Users.email = this.state.email;
    const {gender, name, email, username, phone, password} = this.state;
    if (
      name === '' ||
      email === '' ||
      username === '' ||
      phone === '' ||
      password === '' ||
      gender === ''
    ) {
      this.setState({isLoading: false});
      this.setState({isMessage: true});
      this.setState({message: 'Please Fill All Field'});
      this.clearText();
    } else if (!this.validateEmail(email)) {
      this.setState({isLoading: false});
      this.setState({isMessage: true});
      this.setState({message: 'Please Fill Proper Email'});
    } else {
      this.setState({isLoading: false});
      // await AsyncStorage.setItem('Authorization');
      db.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          db.database()
            .ref('users/' + Users.username)
            .set({
              name: this.state.name,
              username: this.state.username,
              email: this.state.email,
              phone: this.state.phone,
              password: this.state.password,
              gender: this.state.gender,
            });
          this.props.navigation.navigate('DasboardScreen');
        })
        .catch(error => {
          this.clearText();
          this.setState({isMessage: true});
          this.setState({message: error.message});
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Content>
          <View style={{margin: 20}}>
            <TouchableOpacity
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Icon name="times" size={20} color="#FF8FB2" />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', marginBottom: 10, marginTop: 10}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#FF8FB2'}}>
              SIGN IN
            </Text>
          </View>
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 10}}>
            <Form>
              <Item floatingLabel>
                <Label>
                  <Text style={{color: '#FF8FB2'}}>Name</Text>
                </Label>
                <Input
                  style={{color: '#FF8FB2', marginBottom: 10}}
                  onChangeText={this.handleChange('name')}
                  value={this.state.name}
                />
              </Item>
              <Item floatingLabel>
                <Label>
                  <Text style={{color: '#FF8FB2'}}>Email</Text>
                </Label>
                <Input
                  style={{color: '#FF8FB2', marginBottom: 10}}
                  keyboardType={'email-address'}
                  onChangeText={this.handleChange('email')}
                  value={this.state.email}
                />
              </Item>
              <Item floatingLabel>
                <Label>
                  <Text style={{color: '#FF8FB2'}}>Username</Text>
                </Label>
                <Input
                  style={{color: '#FF8FB2', marginBottom: 10}}
                  onChangeText={this.handleChange('username')}
                  value={this.state.username}
                />
              </Item>
              <Item style={{marginTop: 10}}>
                <Picker
                  selectedValue={this.state.gender}
                  style={{
                    height: 50,
                    width: 100,
                    color: '#FF8FB2',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({gender: itemValue})
                  }>
                  <Picker.Item label="Choose.." value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </Item>
              <Item floatingLabel>
                <Label>
                  <Text style={{color: '#FF8FB2'}}>Phone Number</Text>
                </Label>
                <Input
                  style={{color: '#FF8FB2', marginBottom: 10}}
                  keyboardType={'phone-pad'}
                  onChangeText={this.handleChange('phone')}
                  value={this.state.phone}
                />
              </Item>
              <Item floatingLabel>
                <Label>
                  <Text style={{color: '#FF8FB2'}}>Password</Text>
                </Label>
                <Input
                  style={{color: '#FF8FB2', marginBottom: 10}}
                  secureTextEntry={true}
                  onChangeText={this.handleChange('password')}
                  value={this.state.password}
                />
              </Item>
              {this.state.isMessage && (
                <Label
                  style={{
                    color: 'red',
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  {this.state.isLoading && (
                    <ActivityIndicator size="small" color="#0000ff" />
                  )}
                  {this.state.message}
                </Label>
              )}
            </Form>
          </View>
          <View style={{marginLeft: 20, marginRight: 20, marginBottom: 10}}>
            <Button
              block
              style={{borderRadius: 30, backgroundColor: '#FF8FB2'}}
              onPress={() => this.handleSubmit()}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>SIGN UP</Text>
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            <Text style={{color: '#FF8FB2'}}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={{color: '#FF8FB2', fontWeight: 'bold'}}>
                {' '}
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </View>
    );
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loginView: {
    flexDirection: 'column',
    backgroundColor: 'yellow',
  },
});
