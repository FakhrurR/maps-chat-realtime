/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import MapView from 'react-native-maps';

export default class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map} //window pake Dimensions
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            title="Lokasi"
            description="Hello"
          />
        </MapView>
      </View>
    );
  }
}
