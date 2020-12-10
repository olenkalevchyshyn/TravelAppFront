import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MenuButton from "../components/MenuButton";
import { AppIcon } from "../AppStyles";

export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <Text>USER NAME</Text>
          <Text>Main menu</Text>
        <MenuButton
            title="Find new"
            /*source={AppIcon.images.logout}*/
            onPress={() => this.props.navigation.navigate("Map")}
          />
          <MenuButton
            title="Existing list"
            /*source={AppIcon.images.logout}*/
            onPress={() => {
              navigation.dispatch({ type: "Home" });
            }}
          />
          <MenuButton
            title="Notifications"
            /*source={AppIcon.images.logout}
            onPress={() => {
              navigation.dispatch({ type: "Logout" });
            }}*/
          />
          <MenuButton
            title="Settings"
           /*source={AppIcon.images.logout}
            onPress={() => {
              navigation.dispatch({ type: "Logout" });
            }}*/
          />
          <MenuButton
            title="Rate us"
            /*source={AppIcon.images.logout}
            onPress={() => {
              navigation.dispatch({ type: "Logout" });
            }}*/
          />
          <MenuButton
            title="LOG OUT"
            source={AppIcon.images.logout}
            onPress={() => {
              navigation.dispatch({ type: "Logout" });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 20
  }
});
