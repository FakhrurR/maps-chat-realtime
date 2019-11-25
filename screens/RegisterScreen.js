/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button, Form, Item, Label, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      phone: '',
      password: '',
      isMessage: false,
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

  handleSubmit = () => {
    const {name, email, username, phone, password} = this.state;
    if (
      name === '' ||
      email === '' ||
      username === '' ||
      phone === '' ||
      password === ''
    ) {
      this.setState({isMessage: true});
      this.setState({message: 'Please Fill All Field'});
    } else if (!this.validateEmail(email)) {
      this.setState({isMessage: true});
      this.setState({message: 'Please Fill Proper Email'});
    } else {
      alert('Success');
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
              <Icon name="chevron-left" size={20} color="#FF8FB2" />
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
