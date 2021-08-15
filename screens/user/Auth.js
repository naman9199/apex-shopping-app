import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useReducer, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import validator from "validator";
import Btn from "../../components/UI/Btn";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../store/actions/Auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        // console.log("HERE!!!");
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

const AuthScreen = (props) => {
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(true);
    const [firstTry, setFirstTry] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            pass: "",
        },
        inputValidities: {
            email: false,
            pass: false,
        },
        formIsValid: false,
    });

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = true;
        if (inputIdentifier === "email" && !validator.isEmail(text)) {
            isValid = false;
        }
        if (inputIdentifier === "pass" && !validator.isStrongPassword(text)) {
            isValid = false;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIdentifier,
        });
    };

    async function handleAuth() {
        let action;
        if (isSignUp) {
            action = signup(
                formState.inputValues.email,
                formState.inputValues.pass
            );
        } else {
            action = signin(
                formState.inputValues.email,
                formState.inputValues.pass
            );
        }
        setIsLoading(true);
        setError(null);
        try {
            await dispatch(action);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (error) {
            Alert.alert("Something went wrong!", error);
        }
    }, [error]);

    if (isLoading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <View>
                <Text style={styles.title}>
                    {isSignUp ? "Sign Up" : "Login"}
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.input1}>
                    <View style={styles.icon}>
                        <Ionicons name="person" size={20} color="#fff" />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.email}
                        onChangeText={textChangeHandler.bind(this, "email")}
                        placeholder="email"
                        placeholderTextColor="#aaa"
                    />
                    <View style={styles.icon}>
                        {firstTry || formState.inputValidities.email ? null : (
                            <MaterialIcons
                                name="error-outline"
                                size={22}
                                color="#fff"
                            />
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.input1}>
                    <View style={styles.icon}>
                        <FontAwesome name="lock" size={20} color="#fff" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="password"
                        secureTextEntry
                        value={formState.inputValues.pass}
                        onChangeText={textChangeHandler.bind(this, "pass")}
                        placeholderTextColor="#aaa"
                    />
                    <View style={styles.icon}>
                        {firstTry || formState.inputValidities.pass ? null : (
                            <MaterialIcons
                                name="error-outline"
                                size={22}
                                color="#fff"
                            />
                        )}
                    </View>
                </View>
            </View>
            <Btn
                title={isSignUp ? "Sign Up" : "Login"}
                style={{
                    width: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                }}
                onPress={() => {
                    setFirstTry(false);
                    if (formState.formIsValid) {
                        handleAuth();
                    }
                }}
            />
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={styles.signupText}>
                    {isSignUp ? "Login " : "Sign up "}instead!
                </Text>
            </TouchableOpacity>
        </View>
        // </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: Colors.primary,
        fontSize: 30,
        textTransform: "uppercase",
        marginBottom: 10,
        fontFamily: "Nexa-Bold",
    },
    input: {
        width: "70%",
        paddingVertical: 10,
        color: "#fff",
    },
    icon: {
        width: "15%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        marginVertical: 20,
        width: "80%",
    },
    errorContainer: {
        width: "15%",
    },
    input1: {
        backgroundColor: Colors.primary,
        borderRadius: 30,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    error: {
        color: "#a00",
    },
    signupText: {
        color: Colors.primary,
        marginTop: 20,
        fontFamily: "Nexa-Bold",
    },
});

export default AuthScreen;
