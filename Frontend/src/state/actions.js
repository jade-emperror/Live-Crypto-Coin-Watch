// src/state/actions.js

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SHOW_EDIT_MODAL = 'SET_SHOW_EDIT_MODAL';
export const SET_EDITABLE_VALUE = 'SET_EDITABLE_VALUE';
export const SET_ROW_INDEX = 'SET_ROW_INDEX';
export const SET_TOAST_MESSAGE = 'SET_TOAST_MESSAGE';

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

export const setShowEditModal = (show) => ({
    type: SET_SHOW_EDIT_MODAL,
    payload: show,
});

export const setEditableValue = (value) => ({
    type: SET_EDITABLE_VALUE,
    payload: value,
});

export const setRowIndex = (index) => ({
    type: SET_ROW_INDEX,
    payload: index,
});

export const setToastMessage = (message) => ({
    type: SET_TOAST_MESSAGE,
    payload: message,
});
