import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    // console.log("DATE =>> ", getDate(props.getDate));

    // function getDate() {
    //     const date = props.getDate.toString();
    //     // const dd = date.substring(8, 10);
    //     // const mm = date.substring(5, 7);
    //     // const yyyy = date.substring(0, 4);
    //     // return `${dd}-${mm}-${yyyy}`;
    //     return date;
    // }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => setShowDetails((current) => !current)}
            >
                <View style={styles.itemWrapper}>
                    <View style={styles.beforeBox}>
                        <View>
                            <Text style={styles.sum}>
                                $ {props.totalAmount.toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.dateWrapper}>
                            <Text style={styles.date}>
                                {props.getDate.toString()}
                            </Text>
                            {showDetails ? (
                                <SimpleLineIcons
                                    name="arrow-down"
                                    size={15}
                                    color="black"
                                />
                            ) : (
                                <SimpleLineIcons
                                    name="arrow-right"
                                    size={15}
                                    color="black"
                                />
                            )}
                        </View>
                    </View>
                    {showDetails ? (
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                paddingTop: 10,
                            }}
                        >
                            {props.item.items.map((x) => (
                                <View
                                    key={x.productId}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                    }}
                                >
                                    <Text style={styles.itemName}>
                                        {x.productTitle}
                                        {"  "}
                                        <Text style={{ color: Colors.accent }}>
                                            (${x.productPrice})
                                        </Text>
                                        {"  "}
                                        <Text style={{ color: "#aaa" }}>
                                            x{x.quantity}
                                        </Text>
                                    </Text>
                                    <Text style={styles.itemSum}>
                                        ${x.sum.toFixed(2)}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    itemWrapper: {
        backgroundColor: "white",
        elevation: 4,
        flexDirection: "column",
        borderWidth: 2,
        borderColor: Colors.grey,
        borderRadius: 20,
        alignItems: "center",
        margin: 10,
        padding: 20,
    },
    dateWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    beforeBox: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        fontSize: 13,
        fontFamily: "Nexa-Bold",
        paddingRight: 10,
        color: Colors.primary,
    },
    sum: {
        fontSize: 17,
        fontFamily: "Nexa-Bold",
        color: Colors.accent,
    },
    itemName: {
        fontSize: 12,
        color: Colors.primary,
        fontFamily: "Nexa-Bold",
    },
    itemSum: {
        fontSize: 12,
        color: Colors.accent,
        fontFamily: "Nexa-Bold",
    },
});
