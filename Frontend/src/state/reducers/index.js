// src/state/reducers/index.js
import { combineReducers } from 'redux';
import productsReducer from './ProductReducers';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  ui: uiReducer,
});

export default rootReducer;
