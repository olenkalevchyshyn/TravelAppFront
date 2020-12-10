import React from "react";
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
class Place extends React.Component { 
  
    constructor(props) {
      super(props);
      this.state = {
        activeSlide: 0,
        data: []
      };
    }
   
  componentDidMount = async () => {
    fetch(url)
      .then(response => {
          if (response.ok) {
              return response;
          } else {
              let error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
          },
          error => {
              let errmess = new Error(error.message);
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
        <View>       
          <Text
          style = {styles.list}
          >Name place here</Text>  
          <View
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: 10,
              marginLeft: 10,
              marginRight:10
            }}
          />       
          <Text>Place description </Text>            
        </View>
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
  
  export default connect(mapStateToProps)(Place);