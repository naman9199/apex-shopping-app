import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import * as cartAction from "../../store/actions/cart";
import Btn from "../../components/UI/Btn";
import Colors from "../../constants/Colors";
import { fetchAllProducts } from "../../store/actions/products";

const ProductOverviewScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const loadProducts = async () => {
        console.log("Loaded Products");
        setIsRefreshing(true);
        try {
            setError(null);
            await dispatch(fetchAllProducts());
            // await has effect its just that redux thunk returns a promise which is not understood by compiler or lint you will not see a loader if you remove await
        } catch (err) {
            setError(err.message);
            console.log("error => ", error);
        }
        setIsRefreshing(false);
    };

    const setLoader = async () => {
        setIsLoading(true);
        await loadProducts();
        setIsLoading(false);
    };

    useEffect(() => {
        setLoader();
    }, [dispatch]);

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ActivityIndicator color={Colors.primary} size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>An Error Occured</Text>
                <Button title="Try Again" onPress={() => loadProducts()} />
            </View>
        );
    }

    if (products.length === 0) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Add Some Products</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
                onRefresh={loadProducts}
                refreshing={isRefreshing}
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductItem
                        title={item.title}
                        image={item.imageUrl}
                        price={item.price}
                        onSelect={() =>
                            navigation.navigate("ProductDetail", {
                                productId: item.id,
                                ProductTitle: item.title,
                            })
                        }
                    >
                        <Btn
                            title="DETAILS"
                            onPress={() =>
                                navigation.navigate("ProductDetail", {
                                    productId: item.id,
                                    ProductTitle: item.title,
                                })
                            }
                            style={{ backgroundColor: Colors.accent }}
                        />
                        <Btn
                            title="ADD TO CART"
                            onPress={() => dispatch(cartAction.addToCart(item))}
                            style={{ backgroundColor: Colors.primary }}
                        />
                    </ProductItem>
                )}
            />
        </View>
    );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
