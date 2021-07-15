export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
    return { type: DELETE_PRODUCT, pid: productId };
};

export const addProduct = (title, imageUrl, description, price) => {
    return {
        type: ADD_PRODUCT,
        productData: { title, imageUrl, description, price },
    };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: { title, imageUrl, description },
    };
};
