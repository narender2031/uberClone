import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Search from '../Search'
import Directions from '../Directions';
import { LocationBox, LocationText, LocationTimeTextSmall, LocationTimeBox, LocationTimeText, Back } from './style'
import { getPixelSize } from '../../utils';
import markerImage from '../../assets/marker.png'
import Geocoder from 'react-native-geocoding';
import Details from '../Details/index'
import backImage from '../../assets/back.png'

Geocoder.init("AIzaSyAjj9PUjUFnTj_ZTwr_2eYLllO86-qoNSA");
export default class Map extends React.Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async ({coords: {latitude, longitude}}) => {
        const response = await Geocoder.from({latitude, longitude})
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','))
        this.setState({
          location,
          region: {
            latitude: latitude,
            longitude: longitude,
            longitudeDelta: 0.0054,
            latitudeDelta: 0.0044,
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

  handleBack = () => {
    this.setState({
      destination: null
    })
  };

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
    const { region, destination, duration, location } = this.state;
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
                  console.log(result, "manu")
                  this.setState({
                    duration: Math.floor(result.duration)
                  })
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(60),
                      left: getPixelSize(60),
                      top: getPixelSize(60),
                      bottom: getPixelSize(330)
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
                    {duration}
                  </LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>
                  <LocationText>
                    {location}
                  </LocationText>
              </LocationBox>
            </Marker>
            </Fragment>
          )}
        </MapView>
        { destination ? (
            <Fragment>
              <Back onPress={this.handleBack}>
                <Image source={backImage} />
              </Back>
              <Details />
            </Fragment>
          ) : <Search onLocationSelected={this.handleLocationSelected}/>}
      </View>
    )
  }
}