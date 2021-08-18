import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATE, LOGOUT, SIGNUP } from "../actions/Auth";
import { SIGNIN } from "../actions/Auth";

const initialState = {
    token: null,
    userId: null,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            // console.log("REDUCER => ", action.token, action.userId);
            return {
                token: action.token,
                userId: action.userId,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default AuthReducer;
