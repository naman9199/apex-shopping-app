import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductItem from "../../components/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import Btn from "../../components/UI/Btn";
import Colors from "../../constants/Colors";
import * as ProductAction from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.userProducts);
    const dispatch = useDispatch();
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
                onPress={() => dispatch(ProductAction.deleteProduct(item.id))}
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

const styles = StyleSheet.create({});
