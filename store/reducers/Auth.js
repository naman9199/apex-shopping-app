import { SIGNUP } from "../actions/Auth";
import { SIGNIN } from "../actions/Auth";

const initialState = {
    token: null,
    userId: null,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId,
            };
        case SIGNIN:
            return {
                token: action.token,
                userId: action.userId,
            };
        default:
            return state;
    }
};

export default AuthReducer;
