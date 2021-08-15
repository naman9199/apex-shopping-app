import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from "react-native";

const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === "android") {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.container}>
            <View style={styles.touchable}>
                <TouchableCmp useForeground={true} onPress={props.onSelect}>
                    <View>
                        <Image
                            source={{ uri: props.image }}
                            style={styles.image}
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>
                                ${props.price.toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            {props.children}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 300,
        margin: 20,
        borderRadius: 20,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "60%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "23%",
        padding: 20,
    },
    touchable: {
        overflow: "hidden",
        borderRadius: 20,
    },
    title: {
        fontSize: 18,
        // fontWeight: "bold",
        fontFamily: "Nexa-Bold",
    },
    price: {
        color: "#888",
        fontFamily: "Gotham-Bold",
    },
    itemDetails: {
        alignItems: "center",
        height: "17%",
        padding: 10,
    },
});
