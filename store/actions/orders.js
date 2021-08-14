import axios from "axios";
import Order from "../../models/Order";
export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDER = "FETCH_ORDER";

export const addOrder = (cartItems, totalAmount) => {
    const date = new Date();
    return async (dispatch) => {
        try {
            const resp = await axios({
                method: "post",
                url: "https://shopapp-7e8fc-default-rtdb.firebaseio.com/orders/u1.json",
                data: {
                    cartItems,
                    totalAmount,
                    date: date.toISOString(),
                },
            });

            if (resp.status !== 200) {
                throw new Error("Something is wrong, status not 200");
            }

            console.log(resp.data);

            dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: resp.data.name,
                    items: cartItems,
                    amount: totalAmount,
                    date,
                },
            });
        } catch (err) {
            throw err;
        }
    };
};

export const fetchOrder = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "get",
                url: "https://shopapp-7e8fc-default-rtdb.firebaseio.com/orders/u1.json",
            });
            console.log("STATUS => ", res.status);
            if (res.status !== 200) {
                throw new Error("Something is wrong, status not 200");
            }

            let loadedData = [];
            for (let key in res.data) {
                loadedData.push(
                    new Order(
                        key,
                        res.data[key].cartItems,
                        res.data[key].totalAmount,
                        new Date(res.data[key].date)
                    )
                );
            }

            dispatch({
                type: FETCH_ORDER,
                orders: loadedData,
            });
        } catch (err) {
            console.log("here!!");
            throw err;
        }
    };
};
