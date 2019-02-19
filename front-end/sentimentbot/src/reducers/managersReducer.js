import {
    FETCH_MANAGERS_START,
    FETCH_MANAGERS_SUCCESS,
    FETCH_MANAGERS_FAILURE,
    ADD_MANAGERS_START,
    ADD_MANAGERS_SUCCESS,
    ADD_MANAGERS_FAILURE,
    EDIT_MANAGERS_START,
    EDIT_MANAGERS_SUCCESS,
    EDIT_MANAGERS_FAILURE,
    DELETE_MANAGERS_START,
    DELETE_MANAGERS_SUCCESS,
    DELETE_MANAGERS_FAILURE,
    SINGLE_MANAGERS_START,
    SINGLE_MANAGERS_SUCCESS,
    SINGLE_MANAGERS_FAILURE
} from '../actions/index';

const initialState = {
    managers: [],
    isFetching: false,
    error: null,
    singleManagers: [],
  };
  
  const managersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MANAGERS_START:
        return {
          ...state,
          isFetching: true
        };
      case FETCH_MANAGERS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          managers: action.payload,
          error: null
        };
      case FETCH_MANAGERS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case ADD_MANAGERS_START:
        return {
          ...state,
          isFetching: true
        };
      case ADD_MANAGERS_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case ADD_MANAGERS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case EDIT_MANAGERS_START:
        return {
          ...state,
          isFetching: true
        };
      case EDIT_MANAGERS_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case EDIT_MANAGERS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case DELETE_MANAGERS_START:
        return {
          ...state,
          isFetching: true
        };
      case DELETE_MANAGERS_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case DELETE_MANAGERS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case SINGLE_MANAGERS_START:
        return {
          ...state,
          isFetching: true
        };
      case SINGLE_MANAGERS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          singleManagers: action.payload
        };
      case SINGLE_MANAGERS_FAILURE:
        return {
          ...state,
          isFetching: false,
          singleManagers: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default managersReducer;
  