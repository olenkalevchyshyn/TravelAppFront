import React, { Component } from 'react';

import {
  View, Text, StyleSheet,
  Platform,
  TextInput
} from 'react-native';

import {
    AppStyles,
  } from "../AppStyles";

const DataItem =({data})=> {
const name = data
      return(
        <View style = {styles.block}>
          <Text>{name}</Text>
        </View>
      )    
}

const styles = StyleSheet.create({   
block:{
    width: "auto",
    height: 50,
    backgroundColor: AppStyles.color.tint,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
}
});
export {DataItem};