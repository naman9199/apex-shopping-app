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
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as cartAction from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
    const productId = props.route.params.productId;
    const Product = useSelector((state) =>
        state.products.availableProducts.find((prod) => prod.id === productId)
    );
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{Product.title}</Text>
            <Text style={styles.description}>{Product.description}</Text>
            <Image
                source={{ uri: Product.imageUrl }}
                style={{ width: "100%", height: "50%", marginVertical: 20 }}
            />
            <Text style={styles.price}>$ {Product.price}</Text>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.button}
                onPress={() => dispatch(cartAction.addToCart(Product))}
            >
                <Text style={styles.buttonText}>ADD TO CART</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    title: {
        fontSize: 30,
        marginHorizontal: 20,
        fontFamily: "Gotham-Bold",
    },
    description: {
        marginHorizontal: 20,
        marginVertical: 10,
        fontFamily: "Nexa-light",
    },
    price: {
        fontSize: 20,
        marginHorizontal: 20,
        fontFamily: "Nexa-Bold",
    },
    button: {
        backgroundColor: Colors.primary,
        alignItems: "center",
        width: 130,
        height: 130,
        borderWidth: 6,
        borderColor: "white",
        justifyContent: "center",
        borderRadius: 100,
        position: "absolute",
        bottom: "30%",
        right: "0.5%",
    },
    buttonText: {
        color: "white",
        fontFamily: "Nexa-Bold",
        fontSize: 12,
    },
});
