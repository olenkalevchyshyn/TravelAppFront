
import React from "react";
//import SearchBar from 'react-native-search-bar';
import {DataItem} from "../screens/DataItem";
import {
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TouchableHighlight
} from "react-native";

import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import {
  AppIcon,
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";
const url = 'https://gitlab.com/gHashTag/react-native-init/raw/master/db.json'
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Home",
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
      data: []
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      menuIcon: this.props.user.profileURL    
    });
    console.log(this.props.user);
    fetch(url)
      .then(response => {
          if (response.ok) {
              return response;
          } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
          },
          error => {
              var errmess = new Error(error.message);
              throw errmess;
          })
      .then(response => response.json())
      .then(data => {
          this.setState({ data: data });
      })
      .catch(error => {
          this.setState({ errMessage: error.message });
      });
  }

  render() {
    const {data} = this.state
    return (
      <ScrollView>
      <View>
        <Image
        style={styles.mainuserPhoto}
        source={AppIcon.images.defaultUser}>
        </Image>
        <Text 
        style = {styles.name} //fullname: user.displayName
        >{this.props.user.email}</Text>       
        <Text
        style = {styles.list}
        >Your bucket lists:</Text>  
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 10,
            marginLeft: 10,
            marginRight:10
          }}
        />       
              <View style={{flex:1}}>
          {
            data.map(item=>(              
              <DataItem data = {item.name} key = {item.id}/>
            ))
          }            
        </View>     
        
      <TouchableOpacity 
                style ={styles.button}
                onPress={() => this.props.navigation.navigate("AddList")}
                >
            <Text
            style ={styles.add}
            >+</Text>
      </TouchableOpacity>      
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  add:{
    textAlign:"center",
    fontWeight:"bold",
    fontSize:50,    
    color: "#eb344c",
    marginTop: -6
  },
  loc:{
    position:"absolute",
    width: 60,
    height: 60,
  },
  button:{
    position:"absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    left: 310,
    bottom: 25,
    backgroundColor: AppStyles.color.white 
  },
  buttonlocate:{
    position:"absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    left: 310,
    bottom: -40,
    backgroundColor: AppStyles.color.white 
  },
  container: {
    backgroundColor: AppStyles.color.white,
    flex: 1,
    alignItems: "center",
    padding: Configuration.home.listing_item.offset
  },
  title: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    fontSize: 25
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10
  },
  mainuserPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop:10,
    marginLeft: 150
  },
  name: {
    fontFamily: AppStyles.fontName.main,
    color: AppStyles.color.tint,
    fontWeight: "bold",
    fontSize: 35,
    textAlign:"center",
    
  },
  list: {
    marginLeft: 10,
    fontFamily: AppStyles.fontName.main,
    color: AppStyles.color.subtitle,
    marginTop:10,
    marginBottom:10,
    fontWeight:"bold",
    fontSize: 20,
    textAlign:"left"
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(HomeScreen);
