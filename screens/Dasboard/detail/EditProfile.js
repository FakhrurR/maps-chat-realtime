/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button, Form, Item, Label, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import db from './../../config';
import Users from './../Users';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.getParam('name'),
      phone: this.props.navigation.getParam('phone'),
      isMessage: false,
      message: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleChange = key => val => {
    this.setState({[key]: val});
    console.log(key + ' ' + val);
  };

  handleSubmit = () => {
    const {name, phone} = this.state;
    if (name === '' || phone === '') {
      this.setState({isMessage: true});
      this.setState({message: 'Please Fill All Field'});
    } else {
      db.database()
        .ref('users/' + Users.username)
        .update({
          name: this.state.name,
        });
      this.props.navigation.goBack();
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
              Edit Profile
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
              <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
            </Button>
          </View>
        </Content>
      </View>
    );
  }
}

export default EditProfile;

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
