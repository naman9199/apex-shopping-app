import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CustomHeaderButton = (props) => {
    let size = 23;
    if (props.iconSize) {
        size = props.iconSize;
    }
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={size}
            color={Colors.primary}
        />
    );
};

export default CustomHeaderButton;
