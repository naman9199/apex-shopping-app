import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screens/user/Profile";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import DrawerContent from "./DrawerContent";

const ShopDrawer = createDrawerNavigator();

const Drawer = (props) => {
    return (
        <ShopDrawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            initialRouteName="ProductStack"
            drawerContentOptions={{
                style: {
                    backgroundColor: "#fff",
                    paddingLeft: 10,
                },
                labelStyle: {
                    fontSize: 17,
                    fontFamily: "Nexa-Bold",
                    marginLeft: -15,
                },
            }}
        >
            <ShopDrawer.Screen
                name="ProductStack"
                component={props.ProductNavigator}
                options={{
                    unmountOnBlur: true,
                }}
            />
            <ShopDrawer.Screen
                name="OrdersStack"
                component={props.OrderNavigator}
                options={{
                    unmountOnBlur: true,
                }}
            />
            <ShopDrawer.Screen
                name="AdminStack"
                component={props.AdminNavigator}
                options={{
                    unmountOnBlur: true,
                }}
            />
            <ShopDrawer.Screen name="Profile">
                {(props) => <Profile {...props} shopProps={props.shopProps} />}
            </ShopDrawer.Screen>
        </ShopDrawer.Navigator>
    );
};

export default Drawer;

const styles = StyleSheet.create({});
