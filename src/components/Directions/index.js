import React from 'react';
import MapViewDirections from 'react-native-maps-directions';


const Directions = ({ destination, origin, onReady }) => 
    (
    
    <MapViewDirections 
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyAjj9PUjUFnTj_ZTwr_2eYLllO86-qoNSA"
        strokeWidth={1}
        strokeColor="#222"

    />
    
);

export default Directions;