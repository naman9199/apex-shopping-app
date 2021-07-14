import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem";

const OrdersScreen = ({ navigation }) => {
    const orders = useSelector((state) => state.orders.orders);
    orders.sort((a, b) => a.date < b.date);

    function renderItem({ item }) {
        return (
            <OrderItem
                totalAmount={item.totalAmount}
                getDate={item.getDate}
                item={item}
                navigation={navigation}
            />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
});
