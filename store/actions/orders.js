import axios from "axios";
import Order from "../../models/Order";
export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDER = "FETCH_ORDER";

export const addOrder = (cartItems, totalAmount) => {
    const date = new Date();
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        try {
            const res = await axios({
                method: "post",
                url: `https://shopapp-7e8fc-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
                data: {
                    cartItems,
                    totalAmount,
                    date: date.toISOString(),
                    ownerId: userId,
                },
            });

            if (res.status !== 200) {
                throw new Error("Something is wrong, status not 200");
            }

            console.log(res.data);

            dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: res.data.name,
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
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const res = await axios({
                method: "get",
                url: `https://shopapp-7e8fc-default-rtdb.firebaseio.com/orders/${userId}.json`,
            });
            // console.log("STATUS => ", res.status);
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
            console.log("error while fetching orders!!");
            throw err;
        }
    };
};
