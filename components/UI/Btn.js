import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const Btn = (props) => {
    return props.disabled ? (
        <TouchableOpacity onPress={props.onPress} disabled>
            <View
                style={{
                    ...styles.Button,
                    ...props.style,
                    backgroundColor: Colors.grey,
                }}
            >
                <Text style={styles.buttonText}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{ ...styles.Button, ...props.style }}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Btn;

const styles = {
    Button: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
};
