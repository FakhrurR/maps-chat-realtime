/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'native-base';
import SafeAreaView from 'react-native-safe-area-view';

export default class index extends Component {
  static navigationOptions = {
    title: 'Contact',
    headerStyle: {
      backgroundColor: '#FF8FB2',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: 'white',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '1',
          name: 'Koko',
          status: 'Offline',
          image: require('./../../../assets/person.jpg'),
          number: '08131931313',
        },
        {
          id: '2',
          name: 'Chici',
          status: 'Online',
          image: require('./../../../assets/person.jpg'),
          number: '08131931312',
        },
        {
          id: '3',
          name: 'Lala',
          status: 'Offline',
          image: require('./../../../assets/person.jpg'),
          number: '08131931213',
        },
      ],
    };
  }

  renderRow = ({item}) => {
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
              <Image
                source={item.image}
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
            </View>
          </TouchableOpacity>
          <View style={{marginLeft: 20, flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {item.name}
                </Text>
              </View>
            </View>
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
          <FlatList data={this.state.data} renderItem={this.renderRow} />
        </View>
      </SafeAreaView>
    );
  }
}
