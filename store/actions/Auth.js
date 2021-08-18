import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { REACT_APP_API_TEST_KEY } from "@env";
export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;
const saveToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        "userData",
        JSON.stringify({
            token: token,
            userId: userId,
            expirationDate: expirationDate.toISOString(),
        })
    );
};

const clearTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = (expirationTime) => {
    console.log(expirationTime);
    return (dispatch) => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const logout = () => {
    AsyncStorage.removeItem("userData").then(() =>
        console.log("TOKEN DELETED!")
    );
    clearTimer();
    return { type: LOGOUT };
};

export const authenticate = (userId, token, expirationTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimer(expirationTime));
        dispatch({ type: AUTHENTICATE, userId, token });
    };
};

export const signup = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_APP_API_TEST_KEY}`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email,
                    password,
                    returnSecureToken: true,
                },
            });
            console.log("SIGN UP SUCCESS!");
            dispatch(
                authenticate(
                    res.data.localId,
                    res.data.idToken,
                    parseInt(res.data.expiresIn) * 1000
                )
            );
            const expirationDate = new Date(
                new Date().getTime() + parseInt(res.data.expiresIn) * 1000
            );

            saveToStorage(res.data.idToken, res.data.localId, expirationDate);
        } catch (err) {
            const errorId = err.response.data.error.message;
            if (errorId === "EMAIL_EXISTS") {
                throw new Error("Email already exists!");
            } else {
                throw new Error("Unknown Error!");
            }
        }
    };
};

export const signin = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_API_TEST_KEY}`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email,
                    password,
                    returnSecureToken: true,
                },
            });
            console.log("SIGN IN SUCCESS!");
            dispatch(
                authenticate(
                    res.data.localId,
                    res.data.idToken,
                    parseInt(res.data.expiresIn) * 1000
                )
            );

            const expirationDate = new Date(
                new Date().getTime() + parseInt(res.data.expiresIn) * 1000
            );

            saveToStorage(res.data.idToken, res.data.localId, expirationDate);
        } catch (err) {
            const errorId = err.response.data.error.message;
            if (errorId === "EMAIL_NOT_FOUND") {
                throw new Error("Email not found!");
            } else if (errorId === "INVALID_PASSWORD") {
                throw new Error("This password is not valid!");
            } else {
                throw new Error("Unknown Error!");
            }
        }
    };
};
