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
import Colors from "../constants/Colors";
import Btn from "./UI/Btn";

const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === "android") {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.container}>
            <View style={styles.touchable}>
                <TouchableCmp useForeground={true} onPress={props.onDetail}>
                    <View>
                        <Image
                            source={{ uri: props.image }}
                            style={styles.image}
                        />
                        <View style={styles.itemDetails}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>
                                $ {props.price.toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Btn
                                title="DETAILS"
                                onPress={props.onDetail}
                                style={{ backgroundColor: Colors.accent }}
                            />
                            <Btn
                                title="ADD TO CART"
                                onPress={props.onCart}
                                style={{ backgroundColor: Colors.primary }}
                            />
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
        height: "25%",
        padding: 20,
    },
    touchable: {
        overflow: "hidden",
        borderRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    price: {
        color: "#888",
    },
    itemDetails: {
        alignItems: "center",
        height: "15%",
        padding: 10,
    },
});
