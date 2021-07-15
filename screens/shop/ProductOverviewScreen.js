import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import * as cartAction from "../../store/actions/cart";
import Btn from "../../components/UI/Btn";
import Colors from "../../constants/Colors";

const ProductOverviewScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
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
