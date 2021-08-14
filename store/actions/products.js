import axios from "axios";
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_ALL_PRODUCTS = "FETCH_PRODUCTS";

export const fetchAllProducts = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "get",
                url: "https://shopapp-7e8fc-default-rtdb.firebaseio.com/products.json",
            });

            // console.log("Response => ", res);

            if (res.status !== 200) {
                throw new Error("Something is wrong, status not 200");
            }

            let loadedData = [];
            for (let key in res.data) {
                loadedData.push(
                    new Product(
                        key,
                        "u1",
                        res.data[key].title,
                        res.data[key].imageUrl,
                        res.data[key].description,
                        res.data[key].price
                    )
                );
            }

            console.log("Array =>> ", loadedData.length);

            dispatch({
                type: FETCH_ALL_PRODUCTS,
                products: loadedData,
            });
        } catch (err) {
            throw err;
        }
    };
};

export const deleteProduct = (productId) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "delete",
                url: `https://shopapp-7e8fc-default-rtdb.firebaseio.com/products/${productId}.json`,
            });
            // console.log("deleted product", res);
            dispatch({ type: DELETE_PRODUCT, pid: productId });
        } catch (err) {
            throw err;
        }
    };
};

export const addProduct = (title, imageUrl, description, price) => {
    return async (dispatch) => {
        try {
            const resp = await axios({
                method: "post",
                url: "https://shopapp-7e8fc-default-rtdb.firebaseio.com/products.json",
                data: {
                    title,
                    imageUrl,
                    description,
                    price,
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
                },
            });
        } catch (err) {
            throw err;
        }
    };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return async (dispatch) => {
        try {
            console.log("DATA =>", id, title, imageUrl, description);
            const response = await axios({
                method: "patch",
                url: `https://shopapp-7e8fc-default-rtdb.firebaseio.com/products/${id}.json`,
                data: {
                    title,
                    imageUrl,
                    description,
                },
            });
            console.log("Updated data =>> ", response.data);
            dispatch({
                type: UPDATE_PRODUCT,
                pid: id,
                productData: { title, imageUrl, description },
            });
        } catch (err) {
            throw err;
        }
    };
};
