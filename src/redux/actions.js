import { ADD_PRODUCT_TO_BASKET } from './actionTypes';

export const addProduct = product => ({
  type: ADD_PRODUCT_TO_BASKET,
  payload: {
    product
  }
});