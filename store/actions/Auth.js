<<<<<<< HEAD
import axios from "axios";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";

export const signup = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4fY4dh0LZNCmxdd1AanzzkyKo6BAW2YU",
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
            console.log(res.data);
            console.log("SIGN UP SUCCESS!");
            dispatch({
                type: SIGNUP,
                token: res.data.idToken,
                userId: res.data.localId,
            });
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
                url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4fY4dh0LZNCmxdd1AanzzkyKo6BAW2YU",
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
            console.log(res.data);
            console.log("SIGN IN SUCCESS!");
            dispatch({
                type: SIGNIN,
                token: res.data.idToken,
                userId: res.data.localId,
            });
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
=======
import axios from "axios";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";

export const signup = (email, password) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[YOUR_KEY]",
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
            console.log(res.data);
            console.log("SIGN UP SUCCESS!");
            dispatch({
                type: SIGNUP,
                token: res.data.idToken,
                userId: res.data.localId,
            });
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
                url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[YOUR_KEY]",
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
            console.log(res.data);
            console.log("SIGN IN SUCCESS!");
            dispatch({
                type: SIGNIN,
                token: res.data.idToken,
                userId: res.data.localId,
            });
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
>>>>>>> 2efea9d329aa3419eb7c44ccb2dd79650dd62dd3
