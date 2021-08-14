import Order from "../../models/Order";
import { ADD_ORDER, FETCH_ORDER } from "../actions/orders";

const initialState = {
    orders: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            );

            // console.log("Order id => ", action.orderData.id);
            return {
                ...state,
                orders: state.orders.concat(newOrder),
            };

        case FETCH_ORDER:
            // console.log(action.orders);
            return {
                orders: action.orders,
            };

        default:
            return state;
    }
};

export default orderReducer;
