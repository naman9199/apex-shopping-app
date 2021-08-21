import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import Colors from "../constants/Colors";
// import {Text } from 'react-native-paper'

const IoniconsIcon = (name, size, color) => {
    return <Ionicons name={name} size={size} color={color} />;
};

const FontAwesomeIcon = (name, size, color) => {
    return <FontAwesome name={name} size={size} color={color} />;
};

const DrawerContent = (props) => {
    const { index, routes } = props.navigation.dangerouslyGetState();
    const currentRoute = routes[index].name;
    return (
        <>
            <View style={styles.centered}>
                {/* <View style={styles.profileCard}> */}
                {/* <View style={styles.profile}></View> */}
                <View style={styles.content}>
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 45,
                            fontFamily: "Suranna-Regular",
                            lineHeight: 10,
                            paddingTop: 30,
                            textAlignVertical: "center",
                        }}
                    >
                        APEX
                    </Text>
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 15,
                            fontFamily: "Suranna-Regular",
                            lineHeight: 10,
                            paddingTop: 10,
                        }}
                    >
                        Shop with elegance
                    </Text>
                    {/* </View>s */}
                </View>
            </View>
            <View style={{ backgroundColor: "#444", flex: 1 }}>
                <View
                    style={{
                        backgroundColor: "#fff",
                        flex: 1,
                        borderTopLeftRadius: 60,
                        paddingTop: 20,
                        paddingLeft: 30,
                    }}
                >
                    <DrawerItem
                        {...props}
                        label="Explore"
                        inactiveTintColor={
                            currentRoute === "ProductStack"
                                ? Colors.accent
                                : "#999"
                        }
                        activeBackgroundColor="#a00"
                        icon={() =>
                            FontAwesomeIcon(
                                "shopping-bag",
                                18,
                                currentRoute === "ProductStack"
                                    ? Colors.accent
                                    : Colors.labels
                            )
                        }
                        onPress={() => {
                            props.navigation.navigate("ProductStack");
                        }}
                    />
                    <DrawerItem
                        {...props}
                        label="Orders"
                        inactiveTintColor={
                            currentRoute === "OrdersStack"
                                ? Colors.accent
                                : "#999"
                        }
                        icon={() =>
                            FontAwesomeIcon(
                                "history",
                                22,
                                currentRoute === "OrdersStack"
                                    ? Colors.accent
                                    : Colors.labels
                            )
                        }
                        onPress={() => {
                            props.navigation.navigate("OrdersStack");
                        }}
                    />
                    <DrawerItem
                        {...props}
                        label="Admin"
                        inactiveTintColor={
                            currentRoute === "AdminStack"
                                ? Colors.accent
                                : Colors.labels
                        }
                        icon={() =>
                            IoniconsIcon(
                                "ios-create",
                                20,
                                currentRoute === "AdminStack"
                                    ? Colors.accent
                                    : Colors.labels
                            )
                        }
                        onPress={() => {
                            props.navigation.navigate("AdminStack");
                        }}
                    />
                    <DrawerItem
                        {...props}
                        label="Profile"
                        inactiveTintColor={
                            currentRoute === "Profile"
                                ? Colors.accent
                                : Colors.labels
                        }
                        icon={() =>
                            IoniconsIcon(
                                "person-circle",
                                22,
                                currentRoute === "Profile"
                                    ? Colors.accent
                                    : Colors.labels
                            )
                        }
                        onPress={() => {
                            props.navigation.navigate("Profile");
                        }}
                    />
                </View>
            </View>
        </>
    );
};

export default DrawerContent;

const styles = StyleSheet.create({
    centered: {
        paddingTop: 60,
        paddingLeft: 60,
        paddingBottom: 30,
        backgroundColor: "#444",
        borderBottomRightRadius: 60,
    },
    content: {
        paddingVertical: 10,
    },
    profileCard: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
    },
    profile: {
        backgroundColor: "#fff",
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    follow: {
        width: "100%",
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
});
