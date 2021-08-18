import axios from "axios";
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_ALL_PRODUCTS = "FETCH_PRODUCTS";

export const fetchAllProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        // console.log(userId);
        try {
            const res = await axios({
                method: "get",
                url: "https://shopapp-7e8fc-default-rtdb.firebaseio.com/products.json",
            });

            if (res.status !== 200) {
                throw new Error("Something is wrong, status not 200");
            }

            let loadedData = [];
            for (let key in res.data) {
                loadedData.push(
                    new Product(
                        key,
                        res.data[key].ownerId,
                        res.data[key].title,
                        res.data[key].imageUrl,
                        res.data[key].description,
                        res.data[key].price
                    )
                );
            }
            const userProds = loadedData.filter(
                (prod) => prod.ownerId === userId
            );

            dispatch({
                type: FETCH_ALL_PRODUCTS,
                products: loadedData,
                userProducts: userProds,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const res = await axios({
                method: "delete",
                url: `https://shopapp-7e8fc-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
            });
            // console.log("deleted product", res);
            dispatch({ type: DELETE_PRODUCT, pid: productId });
        } catch (err) {
            throw err;
        }
    };
};

export const addProduct = (title, imageUrl, description, price) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        try {
            const resp = await axios({
                method: "post",
                url: `https://shopapp-7e8fc-default-rtdb.firebaseio.com/products.json?auth=${token}`,
                data: {
                    title,
                    imageUrl,
                    description,
                    price,
                    ownerId: userId,
                },
            });
            if (resp.status !== 200) {
                throw new Error("Something is wrong, status not 200");
            }
            dispatch({
                type: ADD_PRODUCT,
                productData: {
                    id: resp.data.name,
                    title,
                    imageUrl,
                    description,
                    price,
                    ownerId: userId,
                },
            });
        } catch (err) {
            console.log("Error =>>> ", err.response.data, err.response.status);
            if (err.response.status === 401) {
                throw new Error("Please Login/Signup to continue...");
            } else {
                throw new Error(err.response.data.error);
            }
        }
    };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;

            const response = await axios({
                method: "patch",
                url: `https://shopapp-7e8fc-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
                data: {
                    title,
                    imageUrl,
                    description,
                },
            });
            // console.log("Updated data =>> ", response.data);
            dispatch({
                type: UPDATE_PRODUCT,
                pid: id,
                productData: { title, imageUrl, description },
            });
        } catch (err) {
            if (err.response.status === 401) {
                throw new Error(
                    "You are not Authenticated to edit this product!"
                );
            } else {
                throw new Error(err.response.data.error);
            }
        }
    };
};
