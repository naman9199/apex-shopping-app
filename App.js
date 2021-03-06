import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ProductReducer from "./store/reducers/products";
import CartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";
import ShopNavigator from "./navigation/ShopNavigator";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import ReduxThunk from "redux-thunk";
import AuthReducer from "./store/reducers/Auth";
// import { composeWithDevTools } from "redux-devtools-extension";

const RootReducer = combineReducers({
    products: ProductReducer,
    cart: CartReducer,
    orders: orderReducer,
    auth: AuthReducer,
});

const store = createStore(
    RootReducer,
    applyMiddleware(ReduxThunk)
    // composeWithDevTools()
);
//IMP: composeWithDevTools is essential for the debugger tool for dev
// should be removed before production

export default function App() {
    let [fontsLoaded] = useFonts({
        "Nexa-Bold": require("./assets/fonts/NexaBold.otf"),
        "Nexa-light": require("./assets/fonts/NexaLight.otf"),
        "Gotham-Book": require("./assets/fonts/GothamBook.ttf"),
        "Gotham-Bold": require("./assets/fonts/GothamBold.ttf"),
        "Suranna-Regular": require("./assets/fonts/Suranna-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Provider store={store}>
                <StatusBar backgroundColor="white" />
                <ShopNavigator />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
