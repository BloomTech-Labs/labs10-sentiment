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
    managersIsFetching: false,
    error: null,
    singleManagers: [],
  };
  
  const managersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MANAGERS_START:
        return {
          ...state,
          managersIsFetching: true
        };
      case FETCH_MANAGERS_SUCCESS:
        return {
          ...state,
          managersIsFetching: false,
          managers: action.payload,
          error: null
        };
      case FETCH_MANAGERS_FAILURE:
        return {
          ...state,
          managersIsFetching: false,
          error: action.payload
        };
      case ADD_MANAGERS_START:
        return {
          ...state,
          managersIsFetching: true
        };
      case ADD_MANAGERS_SUCCESS:
        return {
          ...state,
          managersIsFetching: false,
        };
      case ADD_MANAGERS_FAILURE:
        return {
          ...state,
          managersIsFetching: false,
          error: action.payload
        };
      case EDIT_MANAGERS_START:
        return {
          ...state,
          managersIsFetching: true
        };
      case EDIT_MANAGERS_SUCCESS:
        return {
          ...state,
          managersIsFetching: false,
        };
      case EDIT_MANAGERS_FAILURE:
        return {
          ...state,
          managersIsFetching: false,
          error: action.payload
        };
      case DELETE_MANAGERS_START:
        return {
          ...state,
          managersIsFetching: true
        };
      case DELETE_MANAGERS_SUCCESS:
        return {
          ...state,
          managersIsFetching: false,
        };
      case DELETE_MANAGERS_FAILURE:
        return {
          ...state,
          managersIsFetching: false,
          error: action.payload
        };
      case SINGLE_MANAGERS_START:
        return {
          ...state,
          managersIsFetching: true
        };
      case SINGLE_MANAGERS_SUCCESS:
        return {
          ...state,
          managersIsFetching: false,
          singleManagers: action.payload
        };
      case SINGLE_MANAGERS_FAILURE:
        return {
          ...state,
          managersIsFetching: false,
          singleManagers: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default managersReducer;
  