import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { authenticate, logout } from "../store/actions/Auth";

const startScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const loginAttempt = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                await dispatch(logout());
            } else {
                const jsonData = JSON.parse(userData);

                const { token, userId, expirationDate } = jsonData;
                const expiryDate = new Date(expirationDate);

                const expirationTime =
                    expiryDate.getTime() - new Date().getTime();

                if (expiryDate <= new Date() || !token || !userId) {
                    await dispatch(logout());
                } else {
                    await dispatch(authenticate(userId, token, expirationTime));
                }
            }
            props.navigation.replace("Main");
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
