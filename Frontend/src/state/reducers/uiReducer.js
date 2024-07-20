// src/state/reducers/uiReducer.js
import { SET_SHOW_EDIT_MODAL, SET_EDITABLE_VALUE, SET_ROW_INDEX } from '../actions';

const initialState = {
  showEditModal: false,
  editableValue: '',
  rowIndex: null,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_EDIT_MODAL:
      return {
        ...state,
        showEditModal: action.payload,
      };
    case SET_EDITABLE_VALUE:
      return {
        ...state,
        editableValue: action.payload,
      };
    case SET_ROW_INDEX:
      return {
        ...state,
        rowIndex: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
