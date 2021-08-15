import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createSwitchNavigator } from "react-navigation";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import CustomHeaderButton from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {
    FontAwesome5,
    FontAwesome,
    Ionicons,
    Entypo,
} from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/Auth";
import { useSelector } from "react-redux";

const ProductsStack = createStackNavigator();
const OrderStack = createStackNavigator();
const AdminStack = createStackNavigator();
const ShopDrawer = createDrawerNavigator();

const headerConfig = {
    headerTintColor: Colors.primary,
    headerTitleStyle: { fontWeight: "bold" },
    headerStyle: {
        elevation: 0,
        borderBottomWidth: 1,
        borderColor: Colors.grey,
    },
    headerTitleAlign: "center",
};

function HeaderIcon(props) {
    return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title={props.iconName}
                iconName={props.iconName}
                onPress={props.onPress}
                iconSize={props.iconSize}
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
                            iconName="ios-menu"
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                })}
            />
        </OrderStack.Navigator>
    );
}

function AdminNavigator() {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen
                name="userProducts"
                component={UserProductsScreen}
                options={({ navigation }) => ({
                    ...headerConfig,
                    headerTitle: "Admin",
                    headerLeft: () => (
                        <HeaderIcon
                            iconName="ios-menu"
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                    headerRight: () => (
                        <HeaderIcon
                            iconName="md-add"
                            onPress={() =>
                                navigation.navigate("editProducts", {
                                    productId: 0,
                                })
                            }
                            iconSize={27}
                        />
                    ),
                })}
            />
            <AdminStack.Screen
                name="editProducts"
                component={EditProductScreen}
                options={({ navigation, route }) => ({
                    ...headerConfig,
                    headerTitle: route.params.productId
                        ? "Edit"
                        : "Add Product",
                    headerLeft: () => (
                        <HeaderIcon
                            iconName="arrow-back"
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    // headerRight: () => (
                    //     <HeaderIcon iconName="ios-checkmark-sharp" />
                    // ),
                })}
            />
        </AdminStack.Navigator>
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
                    unmountOnBlur: true,
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
                    unmountOnBlur: true,
                }}
            />
            <ShopDrawer.Screen
                name="AdminStack"
                component={AdminNavigator}
                options={{
                    title: "AdminMenu",
                    drawerLabel: "Admin",
                    drawerIcon: (drawerConfig) => (
                        <Ionicons
                            name="ios-create"
                            size={24}
                            color={drawerConfig.color}
                        />
                    ),
                }}
            />
        </ShopDrawer.Navigator>
    );
}

const Auth = createStackNavigator();

function AuthNavigator() {
    return (
        <Auth.Navigator screenOptions={{ headerShown: false }}>
            <Auth.Screen component={AuthScreen} name="AuthScreen" />
        </Auth.Navigator>
    );
}

let isAuth = true;
export default function Navigator() {
    const auth = useSelector((state) => state.auth);
    // console.log("AUTH => ", auth);
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        if (auth.token) {
            setIsVerified(true);
        }
    }, [auth]);
    return (
        <NavigationContainer>
            {isVerified ? <ShopNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}
