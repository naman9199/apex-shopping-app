import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useReducer, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import validate from "validate.js";
import validator from "validator";
import Colors from "../../constants/Colors";
import * as productAction from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedInputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        // const updatedFormIsValid =
        let updatedFormIsValid = true;
        for (let key in updatedInputValidities) {
            if (!updatedInputValidities[key]) {
                updatedFormIsValid = false;
            }
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedInputValidities,
            inputValues: updatedValues,
        };
    }
    return state;
};

const EditProductScreen = (props) => {
    const productId = props.route.params.productId;
    const dispatch = useDispatch();

    const [firstTry, setFirstTry] = useState(true);
    const editProduct = useSelector((state) =>
        state.products.userProducts.find((prod) => prod.id === productId)
    );

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : "",
            imageUrl: editProduct ? editProduct.imageUrl : "",
            description: editProduct ? editProduct.description : "",
            price: "",
        },
        inputValidities: {
            title: editProduct ? true : false,
            imageUrl: editProduct ? true : false,
            description: editProduct ? true : false,
            price: editProduct ? true : false,
        },
        formIsValid: editProduct ? true : false,
    });

    function onPressHandler() {
        if (!formState.formIsValid) {
            Alert.alert("Invalid Input!", "please check the error messages", [
                { text: "okay" },
            ]);
            return;
        }
        if (editProduct) {
            dispatch(
                productAction.updateProduct(
                    productId,
                    formState.inputValues.title,
                    formState.inputValues.imageUrl,
                    formState.inputValues.description
                )
            );
        } else {
            dispatch(
                productAction.addProduct(
                    formState.inputValues.title,
                    formState.inputValues.imageUrl,
                    formState.inputValues.description,
                    parseFloat(formState.inputValues.price)
                )
            );
        }
        props.navigation.navigate("userProducts");
    }
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        setFirstTry(false);
                        onPressHandler();
                    }}
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
    }, [formState]);

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = true;
        if (inputIdentifier === "title" && validator.isEmpty(text)) {
            isValid = false;
        }
        if (inputIdentifier === "imageUrl" && !validator.isURL(text)) {
            isValid = false;
        }

        if (
            inputIdentifier === "price" &&
            validator.isEmpty(text) &&
            !validator.isNumeric(text)
        ) {
            isValid = false;
        } else if (parseFloat(text) < 0.1) {
            isValid = false;
        }

        if (inputIdentifier === "description" && text.trim().length === 0) {
            isValid = false;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIdentifier,
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
        >
            <ScrollView style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.formElement}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.title}
                            onChangeText={textChangeHandler.bind(this, "title")}
                            autoCapitalize="words"
                        />
                        {firstTry || formState.inputValidities.title ? null : (
                            <Text style={styles.warnings}>
                                title not valid!
                            </Text>
                        )}
                    </View>
                    <View style={styles.formElement}>
                        <Text style={styles.label}>Image Url</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.imageUrl}
                            onChangeText={textChangeHandler.bind(
                                this,
                                "imageUrl"
                            )}
                        />
                        {firstTry ||
                        formState.inputValidities.imageUrl ? null : (
                            <Text style={styles.warnings}>
                                imageUrl not valid!
                            </Text>
                        )}
                    </View>
                    {editProduct ? null : (
                        <View style={styles.formElement}>
                            <Text style={styles.label}>Price($)</Text>
                            <TextInput
                                style={styles.input}
                                value={formState.inputValues.price}
                                onChangeText={textChangeHandler.bind(
                                    this,
                                    "price"
                                )}
                                keyboardType="decimal-pad"
                            />
                            {firstTry ||
                            formState.inputValidities.price ? null : (
                                <Text style={styles.warnings}>
                                    Price not valid!
                                </Text>
                            )}
                        </View>
                    )}
                    <View style={styles.formElement}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.description}
                            onChangeText={textChangeHandler.bind(
                                this,
                                "description"
                            )}
                            autoCapitalize="sentences"
                            numberOfLines={3}
                            multiline
                        />
                        {firstTry ||
                        formState.inputValidities.description ? null : (
                            <Text style={styles.warnings}>
                                Description not valid!
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    warnings: {
        color: "red",
    },
});
