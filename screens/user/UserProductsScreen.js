import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import ProductItem from "../../components/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import Btn from "../../components/UI/Btn";
import Colors from "../../constants/Colors";
import * as ProductAction from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.userProducts);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured!", error);
        }
    }, [error]);

    const handleDelete = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await dispatch(ProductAction.deleteProduct(id));
        } catch (err) {
            console.log("error while deleting!");
            setError(err.message);
        }
        setIsLoading(false);
    };

    const renderItem = ({ item }) => (
        <ProductItem
            title={item.title}
            image={item.imageUrl}
            price={item.price}
            onSelect={() =>
                navigation.navigate("editProducts", {
                    productId: item.id,
                })
            }
        >
            <Btn
                title="DELETE"
                onPress={() =>
                    Alert.alert(
                        "Are you sure?",
                        "are you sure, you want to delete this item?",
                        [
                            { text: "No", style: "default" },
                            {
                                text: "Yes",
                                style: "destructive",
                                onPress: async () => handleDelete(item.id),
                            },
                        ]
                    )
                }
                style={{ backgroundColor: Colors.redAccent }}
            />
            <Btn
                title="EDIT"
                onPress={() =>
                    navigation.navigate("editProducts", {
                        productId: item.id,
                    })
                }
                style={{ backgroundColor: Colors.accent }}
            />
        </ProductItem>
    );

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Items to show!</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

export default UserProductsScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
