import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Text,
    Button,
} from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem";
import { fetchOrder } from "../../store/actions/orders";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

const OrdersScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    async function loadData() {
        setIsLoading(true);
        setError(null);
        try {
            await dispatch(fetchOrder());
        } catch (err) {
            setError(err.message);
            console.log("Error while loading data!");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [dispatch]);

    const orders = useSelector((state) => state.orders.orders);
    // console.log(orders.length);
    orders.sort((a, b) => a.date < b.date);

    function renderItem({ item }) {
        // console.log(item.date);
        return (
            <OrderItem
                totalAmount={item.totalAmount}
                getDate={item.getDate}
                item={item}
                navigation={navigation}
            />
        );
    }

    if (orders.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>Let's order some products!</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An Error Occured!</Text>
                <Button title="Try Again" onPress={() => loadData()} />
            </View>
        );
    }

    return isLoading ? (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    ) : (
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
    centered: {
        backgroundColor: "white",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});
