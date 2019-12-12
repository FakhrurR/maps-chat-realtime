/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import db from './../../config';
import Users from './../Users';

let {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LONGITUDE = 0;
const LATITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LONGITUDEF = 0;
const LATITUDEF = 0;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      regionFriend: {
        latitudeF: 0,
        longitudeF: 0,
        latitudeDeltaF: LATITUDE_DELTA,
        longitudeDeltaF: LONGITUDE_DELTA,
      },
      location: [],
      markers: [
        {
          title: ' ',
          coordinates: {
            latitude: 0,
            longitude: 0,
          },
        },
      ],
    };
  }

  async componentDidMount() {
    await this.getDataMap();
    await Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      },
      error => console.log(error.message),
    );
    this.watchID = Geolocation.watchPosition(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
    });
  }

  getDataMap = () => {
    db.database()
      .ref('location')
      .on('child_added', snapshot => {
        let person = snapshot.val();
        // console.log(snapshot.key);
        // console.log(
        //   'latitude: ' + person.latitude + ' longitude: ' + person.longitude,
        // );
        // console.log(person.longitude);
        // person.username = snapshot.key;
        // Users.username = person.username;
        this.setState(prevState => {
          return {
            location: [...prevState.location, person],
          };
        });
      });
  };

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={styles.container}
          region={this.state.region}>
          {/* <MapView.Marker
            coordinate={this.state.regionFriend}
            title="Your Location"
          /> */}
          {/* {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={this.state.location}
              title={marker.title}
            />
          ))} */}
          {this.state.location.map(location => (
            <MapView.Marker
              coordinate={location.coordinate}
              title={location.name}
            />
          ))}
          {/* {console.log(this.state.location)} */}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
