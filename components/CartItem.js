import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CartItem = (props) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.quantity}>{props.quantity}</Text>
            </View>
            <View>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View>
                <Text style={styles.sum}>{props.sum}</Text>
            </View>
            <TouchableOpacity onPress={props.onDelete}>
                <Ionicons name="ios-trash" color={Colors.redAccent} size={24} />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        elevation: 4,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: Colors.grey,
        borderRadius: 20,
        height: 60,
        alignItems: "center",
        justifyContent: "space-between",
        margin: 10,
        padding: 20,
        // paddingVertical: 20,
        // pad
    },
    title: {
        fontSize: 17,
        fontFamily: "Nexa-Bold",
    },
    quantity: {
        fontSize: 17,
        fontFamily: "Nexa-Bold",
        color: Colors.accent,
    },
    sum: {
        fontSize: 17,
        fontFamily: "Nexa-Bold",
        color: Colors.accent,
    },
});
