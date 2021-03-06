import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    FETCH_ALL_PRODUCTS,
    UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
    availableProducts: [],
    userProducts: [],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            // console.log("USERSSSSSS@@@@@@ ->", action.userProducts);
            return {
                availableProducts: action.products,
                userProducts: action.userProducts,
            };
        case ADD_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            };

        case UPDATE_PRODUCT:
            const updatedUserIndex = state.userProducts.findIndex(
                (prod) => prod.id === action.pid
            );
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[updatedUserIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[updatedUserIndex].price
            );

            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[updatedUserIndex] = updatedProduct;

            const updatedAvailableIndex = state.availableProducts.findIndex(
                (prod) => prod.id === action.pid
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[updatedAvailableIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts,
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    (product) => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    (product) => product.id !== action.pid
                ),
            };

        default:
            return state;
    }
};

export default productsReducer;
