import React from "react";
//import SearchBar from 'react-native-search-bar';
import {DataItem} from "./DataItem";
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
class ListViewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Bucket list",
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
 
componentDidMount = async () => {
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
        <Text
        style = {styles.list}
        >Bucket list`s places:</Text>  
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
                onPress={() => this.props.navigation.navigate("Map")}
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
  button:{
    position:"absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    left: 310,
    bottom: 25,
    backgroundColor: AppStyles.color.white 
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10
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

export default connect(mapStateToProps)(ListViewScreen);
