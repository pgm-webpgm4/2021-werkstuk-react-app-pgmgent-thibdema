import { ADD_PRODUCT_TO_BASKET } from '../actionTypes';

const initialState = {
  products: [],
};

const productsReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      const {product} = action.payload;
      return {
        ...state,
        products: [...state.products, product]
      };
  
    default:
      return state;
  }
};

export default productsReducer;