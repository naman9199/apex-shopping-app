import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import * as cartAction from "../../store/actions/cart";

const ProductOverviewScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductItem
                        title={item.title}
                        image={item.imageUrl}
                        price={item.price}
                        onDetail={() =>
                            navigation.navigate("ProductDetail", {
                                ProductId: item.id,
                                ProductTitle: item.title,
                            })
                        }
                        onCart={() => {
                            // navigation.navigate("Cart");
                            dispatch(cartAction.addToCart(item));
                        }}
                    />
                )}
            />
        </View>
    );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
