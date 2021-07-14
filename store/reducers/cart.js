import Cart from "../../models/Cart";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    items: {},
    totalAmount: 0,
};

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productId = addedProduct.id;
            const prodTitle = addedProduct.title;
            const prodPrice = addedProduct.price;

            let updateOrAddNewItem;

            if (state.items[addedProduct.id]) {
                updateOrAddNewItem = new Cart(
                    state.items[productId].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[productId].sum + prodPrice
                );
            } else {
                updateOrAddNewItem = new Cart(
                    1,
                    prodPrice,
                    prodTitle,
                    prodPrice
                );
            }
            return {
                ...state,
                items: { ...state.items, [productId]: updateOrAddNewItem },
                totalAmount: state.totalAmount + prodPrice,
            };

        case REMOVE_FROM_CART:
            const selectedProduct = state.items[action.id];
            let updatedCartItems;
            if (selectedProduct.quantity > 1) {
                let updatedItem = new Cart(
                    selectedProduct.quantity - 1,
                    selectedProduct.productPrice,
                    selectedProduct.productTitle,
                    selectedProduct.sum - selectedProduct.productPrice
                );
                updatedCartItems = { ...state.items, [action.id]: updatedItem };
            } else {
                updatedCartItems = state.items;
                delete updatedCartItems[action.id];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: Math.abs(
                    state.totalAmount - selectedProduct.productPrice
                ),
            };

        case ADD_ORDER:
            return initialState;

        default:
            return state;
    }
};

export default CartReducer;
