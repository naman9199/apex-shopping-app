import { AUTHENTICATE, LOGOUT } from "../actions/Auth";

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
