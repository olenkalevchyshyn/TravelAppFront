import React from "react";
//import SearchBar from 'react-native-search-bar';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  StyleSheet
} from "react-native";

import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import {
  AppIcon,
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";

class AddListScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: "Create new bucket list",
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

  render() {
      return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Add new bucket list</Text>
            <View
            style={{
                borderBottomColor: 'white',
                borderBottomWidth: 10,
                marginLeft: 10,
                marginRight:10}}/> 
            <Text style = {styles.textBlock}>Enter bucket list name:</Text>
            <TextInput style = {styles.inputBlock}
            placeholder = "Enter name...."></TextInput>
            <TouchableOpacity 
                style ={styles.button}
                onPress={() => this.props.navigation.navigate("ListView")}
                >
            <Text
            style ={styles.add}
            >+</Text>
            </TouchableOpacity> 
        </View>
      );
    }
}

const styles = StyleSheet.create({
    textBlock:{
        width: "auto",
        height: 50,
        backgroundColor: AppStyles.color.tint,
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    inputBlock:{
        width: "auto",
        height: 50,
        backgroundColor: "#d1d1d1",
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    add:{
      textAlign:"center",
      fontWeight:"bold",
      fontSize:50,    
      color: "#eb344c",
      marginTop: -6
    },
    button:{
      position:"relative",
      width: 60,
      height: 60,
      borderRadius: 30,
      left: 310,
      bottom: -30,
      backgroundColor: AppStyles.color.white 
    },
    container: {
      position: "relative",
      top: 150,
      backgroundColor: "#e0e0e0"
    },
    title: {
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

export default connect(mapStateToProps)(AddListScreen);