

import { SET_PRODUCTS } from '../actions';

const initialProductsState = [];

const productReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      console.log('Products state updated:', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;
