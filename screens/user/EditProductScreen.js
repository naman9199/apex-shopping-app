import { Ionicons } from "@expo/vector-icons";
import React, { useState, useLayoutEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Button,
    TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as productAction from "../../store/actions/products";

const EditProductScreen = (props) => {
    const productId = props.route.params.productId;
    const dispatch = useDispatch();

    const editProduct = useSelector((state) =>
        state.products.userProducts.find((prod) => prod.id === productId)
    );

    // console.log(editProduct);

    const [title, setTitle] = useState(editProduct ? editProduct.title : "");
    const [url, setUrl] = useState(editProduct ? editProduct.imageUrl : "");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState(
        editProduct ? editProduct.description : ""
    );

    function onPressHandler() {
        // console.log("dispatch => ", productId, title, url, description);
        if (editProduct) {
            dispatch(
                productAction.updateProduct(productId, title, url, description)
            );
        } else {
            dispatch(
                productAction.addProduct(
                    title,
                    url,
                    description,
                    parseInt(price)
                )
            );
        }
        props.navigation.navigate("userProducts");
    }
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => onPressHandler()}
                    style={{ marginRight: 10 }}
                >
                    <Ionicons
                        name="ios-checkmark-sharp"
                        size={24}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            ),
        });
    }, [props.navigation, title, price, url, description]);

    // console.log("screen data => ", productId, title, url, description);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formElement}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                </View>
                <View style={styles.formElement}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput
                        style={styles.input}
                        value={url}
                        onChangeText={(text) => setUrl(text)}
                    />
                </View>
                {editProduct ? null : (
                    <View style={styles.formElement}>
                        <Text style={styles.label}>Price($)</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                        />
                    </View>
                )}
                <View style={styles.formElement}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default EditProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    form: {
        // margin: 10,
    },
    formElement: {
        margin: 20,
    },
    input: {
        borderBottomWidth: 2,
        borderColor: "#ccc",
    },
});
