import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/Auth";

const startScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const loginAttempt = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                props.setIsVerified(false);
            } else {
                const jsonData = JSON.parse(userData);

                const { token, userId, expirationDate } = jsonData;
                const expiryDate = new Date(expirationDate);

                if (expiryDate <= new Date() || !token || !userId) {
                    props.setIsVerified(false);
                } else {
                    props.setIsVerified(true);
                    dispatch(authenticate(userId, token));
                }
            }
            props.navigation.navigate("Main");
        };
        loginAttempt();
    }, []);

    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default startScreen;
