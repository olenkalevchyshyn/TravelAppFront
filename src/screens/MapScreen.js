import React from "react";
import  {Image, Buttton} from "react-native";
// import { SearchBar } from 'react-native-elements';
import MapView, { MapContainer, Polygon, Circle, Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import {request, PERMISSIONS} from 'react-native-permissions';
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import {
  AppIcon,
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";

class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Map",
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          {navigation.state.params && navigation.state.params.menuIcon ? (
            <FastImage
              style={styles.userPhoto}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: navigation.state.params.menuIcon }}
            />
          ) : (
            <FastImage
              style={styles.userPhoto}
              resizeMode={FastImage.resizeMode.cover}
              source={AppIcon.images.defaultUser}
            />
          )}
        </TouchableOpacity>
      );
    }
  });

   constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      reports: []      
    };
  } 

  componentDidMount() {
    this.requestLocationPermission();
    this.props.navigation.setParams({
      menuIcon: this.props.user.profileURL
    });  
    fetch('https://enigmatic-reaches-55405.herokuapp.com/reports')
      .then(response => {
        if(response.ok){
          return response;
        }
        else{
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }},
        error =>{
          var errmess = new Error(error.message);
            throw errmess;
        })
      .then(res => res.json())          
      .then(data => {
        this.setState({ reports: data.reports })
      })
      .catch(console.error)  
  }
 
  requestLocationPermission = async () =>{
    if(Platform.OS ==='android'){
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log("Android: " + response);
      if(response==='granted')
        this.locateCurrentPosition();
    }
  }

  locateCurrentPosition=()=>{
    Geolocation.watchPosition(
      position=>{
         console.log(JSON.stringify(position));
        var initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          longitudeDelta: 0.005,
          latitudeDelta: 0.005  
        }             
        this.setState({initialPosition}),        
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
      } 
      )
  }

  mapMarkers = () => {
    return this.state.reports.map((report) => <Marker
      key={report.id}
      coordinate={{ latitude: report.lat, longitude: report.lon }}
      title={report.location}
      description={report.comments}>
    </Marker >)
  }
  render() {
    return (
      // <View style = {styles.container}>
      //   <SearchBar
      //   placeholder="Type Here..."
      //   onChangeText={this.updateSearch}
      //   value={search}
      // />
       <MapView
        provider = {PROVIDER_GOOGLE}
        ref = {map=>this._map = map}           
        style = {styles.map}
        initialRegion = {this.state.initialPosition}
        showsUserLocation={true}> 
        {this.mapMarkers()}       
        </MapView> 
      // </View>          
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },  
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(MapScreen);
