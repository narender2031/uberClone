import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, Platform } from 'react-native';

export default class Search extends React.Component{
    state = {
        searchFocused: false,
    }

    render() {
        const { searchFocused } = this.state
        const { onLocationSelected } = this.props
        return (
            <GooglePlacesAutocomplete 
                placeholder="Where to?"
                onPress={(data, details) => {
                    console.log(data, details)
                    onLocationSelected(data, details)
                }}
                query={{
                    key: 'AIzaSyAjj9PUjUFnTj_ZTwr_2eYLllO86-qoNSA',
                    language: 'en'
                }}
                textInputProps={{
                    onFocus: () => {this.setState({ searchFocused: true})},
                    onBlur: () => {this.setState({ searchFocused: false})},
                    autoCapitalize: 'none',
                    autoCorrect: false
                }}
                listViewDisplayed={searchFocused}
                fetchDetails
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        position: 'absolute',
                        top: Platform.select({ios: 60, android: 40}),
                        width: "100%"
                    },
                    textInputContainer: {
                        flex: 1,
                        backgroundColor: 'transparent',
                        height: 54,
                        marginHorizontal: 20,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                    },
                    textInput: {
                        height: 54,
                        margin: 0,
                        borderRadius: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 10,
                        paddingRight: 0,
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowOffset: {x: 0, y: 0},
                        shadowRadius: 15,
                        borderWidth: 1,
                        borderColor: '#DDD',
                        fontSize: 17
                    },
                    listView: {
                        borderWidth: 1,
                        borderColor: '#DDD',
                        backgroundColor: "#FFF",
                        marginHorizontal: 20,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowOffset: {x: 0, y: 0},
                        shadowRadius: 15,
                        margin: 10,

                    },
                    description: {
                        fontSize: 16,
                    },
                    row: {
                        padding: 20,
                        height: 58
                    }

                }}
            />
        )
    }   
}