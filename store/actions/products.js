import axios from "axios";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
    return { type: DELETE_PRODUCT, pid: productId };
};

export const addProduct = (title, imageUrl, description, price) => {
    return async (dispatch) => {
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

        console.log(resp.data.name);

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
    };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: { title, imageUrl, description },
    };
};
