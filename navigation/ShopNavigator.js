import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import CustomHeaderButton from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

const ProductsStack = createStackNavigator();
const OrderStack = createStackNavigator();
const ShopDrawer = createDrawerNavigator();

const headerConfig = {
    headerTintColor: Colors.primary,
    headerTitleStyle: { fontWeight: "bold" },
    headerStyle: {
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    headerTitleAlign: "center",
};

function HeaderIcon(props) {
    return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Cart"
                iconName={props.iconName}
                onPress={props.onPress}
            />
        </HeaderButtons>
    );
}

function ProductNavigator() {
    return (
        <ProductsStack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                },
            }}
        >
            <ProductsStack.Screen
                name="ProductsOverview"
                component={ProductOverviewScreen}
                options={({ navigation }) => ({
                    ...headerConfig,
                    headerTitle: "SHOPPING",
                    headerTitleStyle: { fontFamily: "Nexa-Bold" },
                    headerRight: () => (
                        <HeaderIcon
                            iconName="ios-cart"
                            onPress={() => navigation.navigate("Cart")}
                        />
                    ),
                    headerLeft: () => (
                        <HeaderIcon
                            iconName="ios-menu"
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                })}
            />
            <ProductsStack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={({ route }) => ({
                    headerTitle: "",
                })}
            />
            <ProductsStack.Screen
                name="Cart"
                component={CartScreen}
                options={{ ...headerConfig, headerTitle: "CART" }}
            />
        </ProductsStack.Navigator>
    );
}

function OrderNavigator() {
    return (
        <OrderStack.Navigator>
            <OrderStack.Screen
                name="Orders"
                component={OrdersScreen}
                options={({ navigation }) => ({
                    ...headerConfig,
                    headerLeft: () => (
                        <HeaderIcon
                            iconName="arrow-back-outline"
                            onPress={() => navigation.navigate("ProductStack")}
                        />
                    ),
                })}
            />
        </OrderStack.Navigator>
    );
}

function ShopNavigator() {
    return (
        <ShopDrawer.Navigator
            drawerContentOptions={{
                activeTintColor: Colors.accent,
                activeBackgroundColor: "white",
                style: {
                    backgroundColor: "white",
                    paddingTop: 20,
                    paddingLeft: 10,
                },
                labelStyle: {
                    fontSize: 20,
                    fontFamily: "Nexa-Bold",
                    marginLeft: -15,
                },
            }}
        >
            <ShopDrawer.Screen
                name="ProductStack"
                component={ProductNavigator}
                options={{
                    title: "Products",
                    drawerLabel: "Explore",
                    drawerIcon: (drawerConfig) => (
                        <FontAwesome
                            name="shopping-bag"
                            size={20}
                            color={drawerConfig.color}
                        />
                    ),
                }}
            />
            <ShopDrawer.Screen
                name="OrdersStack"
                component={OrderNavigator}
                options={{
                    title: "Orders",
                    drawerLabel: "Your Orders",
                    drawerIcon: (drawerConfig) => (
                        <FontAwesome
                            name="history"
                            size={20}
                            color={drawerConfig.color}
                        />
                    ),
                }}
            />
        </ShopDrawer.Navigator>
    );
}

export default function Navigator() {
    return (
        <NavigationContainer>
            <ShopNavigator />
        </NavigationContainer>
    );
}
