/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconBar from 'react-native-vector-icons/FontAwesome5';
import {GiftedChat} from 'react-native-gifted-chat';

import BackButton from './../../../components/BackButton';
import {
  Container,
  Header,
  Left,
  Right,
  Title,
  Body,
  Content,
} from 'native-base';

class ChatPerson extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#FF8FB2'}}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <IconBar name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
          </Left>
          <Body>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('./../../../assets/person.jpg')}
                style={{width: 50, height: 50, borderRadius: 50}}
              />
              <View style={{flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: 'white', fontSize: 20}}>Koko</Text>
                <Text style={{color: 'white', fontSize: 10}}>Offline</Text>
              </View>
            </View>
          </Body>
          <Right />
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* <Content style={{flex: 1}}>
          <Text>chat person</Text>
        </Content>
        <View
          style={{
            flex: 1,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
          }}>
          <View
            style={{
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
              flex: 1,
            }}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  backgroundColor: 'white',
                  flex: 1,
                }}>
                <TextInput
                  placeholder="Type Message..."
                  style={{
                    marginLeft: 10,
                     fontSize: 15,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  borderRadius: 40,
                  marginTop: 5,
                }}>
                <Icon
                  name="send"
                  size={40}
                  style={{marginLeft: 5, marginRight: 5}}
                  color="pink"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
       */}
      </Container>
    );
  }
}
export default ChatPerson;
