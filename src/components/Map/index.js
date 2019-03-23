import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Search from '../Search'
import Directions from '../Directions';
import { LocationBox, LocationText, LocationTimeTextSmall, LocationTimeBox, LocationTimeText } from './style'
import { getPixelSize } from '../../utils';
import markerImage from '../../assets/marker.png'

export default class Map extends React.Component {
  state = {
    region: null,
    destination: null,
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            longitudeDelta: 0.0064,
            latitudeDelta: 0.0054,
          }
        })
      }, //success
      () => {}, //error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,

      }
    )
  }

  handleLocationSelected= (data, details) => {
    console.log(data, 'manu')
    const { lat, lng} = details.geometry.location;
    this.setState({
      destination: {
        latitude: lat, 
        longitude: lng,
        title: data.structured_formatting.main_text,

      },
    })
  }

  render() {
    const { region, destination } = this.state;
    return (
      <View style={{flex: 1}}>
        <MapView
        style={{flex: 1}}
        region={region}
        showsUserLocation
        loadingEnabled
        ref={el => this.mapView = el}
        >
          {destination && (
            <Fragment>
              <Directions 
              origin ={region}
              destination={destination}
                onReady={result => {
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(60),
                      left: getPixelSize(60),
                      top: getPixelSize(60),
                      bottom: getPixelSize(60)
                    }
                  })
                }}
              />
              <Marker 
                coordinate={destination}
                anchor={{x:0, y:0}}
                image ={markerImage}
              >
                <LocationBox>
                  <LocationText>
                    {destination.title}
                  </LocationText>
                </LocationBox>
              </Marker>

              <Marker 
              coordinate={region}
              anchor={{x:0, y:0}}
              image ={markerImage}
            >
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>
                    31
                  </LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>
                  <LocationText>
                    Nirmal Corner
                  </LocationText>
              </LocationBox>
            </Marker>
            </Fragment>
          )}
        </MapView>
        <Search 
          onLocationSelected={this.handleLocationSelected}
        />
      </View>
    )
  }
}