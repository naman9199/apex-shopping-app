import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Btn from "../../components/UI/Btn";
import Colors from "../../constants/Colors";

const Profile = (props) => {
    return (
        <View style={styles.screen}>
            <View>
                <Text style={styles.header}>Profile Screen</Text>
            </View>
            <Btn
                title="Logout!"
                onPress={async () => {
                    await AsyncStorage.removeItem("userData");
                    props.shopProps.setIsVerified(false);
                    console.log("LOGGED OUT SUCCESS!");
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 30,
        fontFamily: "Nexa-Bold",
        color: Colors.primary,
        marginBottom: 50,
    },
});

export default Profile;
