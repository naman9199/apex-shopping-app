import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/CartItem";
import Btn from "../../components/UI/Btn";
import Colors from "../../constants/Colors";
import * as cartAction from "../../store/actions/cart";
import * as orderAction from "../../store/actions/orders";

const CartScreen = (props) => {
    const amount = useSelector((state) => state.cart.totalAmount);
    const products = useSelector((state) => {
        const CartItemArray = [];
        for (const key in state.cart.items) {
            CartItemArray.push({
                productId: key,
                productPrice: state.cart.items[key].productPrice,
                productTitle: state.cart.items[key].productTitle,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return CartItemArray.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });
    const dispatch = useDispatch();

    const renderItem = ({ item }) => (
        <CartItem
            title={item.productTitle}
            quantity={item.quantity}
            price={item.productPrice}
            sum={item.sum.toFixed(2)}
            onDelete={() => dispatch(cartAction.removeFromCart(item.productId))}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{" "}
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </Text>
                <Btn
                    title="Order Now"
                    onPress={() =>
                        dispatch(orderAction.addOrder(products, amount))
                    }
                    disabled={products.length === 0}
                />
            </View>
            {/* <CartItem title="title" quantity="qty" price="price" /> */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.productId}
                renderItem={renderItem}
            />
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        padding: 20,
        borderWidth: 2,
        borderColor: Colors.grey,
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "white",
        elevation: 4,
    },
    summaryText: {
        fontSize: 17,
        color: Colors.primary,
        fontFamily: "Gotham-Bold",
    },
    amount: {
        color: Colors.accent,
    },
});
