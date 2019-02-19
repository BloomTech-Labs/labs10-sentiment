import {
    FETCH_FEELINGS_START,
    FETCH_FEELINGS_SUCCESS,
    FETCH_FEELINGS_FAILURE,
    ADD_FEELINGS_START,
    ADD_FEELINGS_SUCCESS,
    ADD_FEELINGS_FAILURE,
    EDIT_FEELINGS_START,
    EDIT_FEELINGS_SUCCESS,
    EDIT_FEELINGS_FAILURE,
    DELETE_FEELINGS_START,
    DELETE_FEELINGS_SUCCESS,
    DELETE_FEELINGS_FAILURE,
    SINGLE_FEELINGS_START,
    SINGLE_FEELINGS_SUCCESS,
    SINGLE_FEELINGS_FAILURE
} from '../actions/index';

const initialState = {
    feelings: [],
    isFetching: false,
    error: null,
    singleFeelings: [],
  };
  
  const feelingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FEELINGS_START:
        return {
          ...state,
          isFetching: true
        };
      case FETCH_FEELINGS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          feelings: action.payload,
          error: null
        };
      case FETCH_FEELINGS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case ADD_FEELINGS_START:
        return {
          ...state,
          isFetching: true
        };
      case ADD_FEELINGS_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case ADD_FEELINGS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case EDIT_FEELINGS_START:
        return {
          ...state,
          isFetching: true
        };
      case EDIT_FEELINGS_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case EDIT_FEELINGS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case DELETE_FEELINGS_START:
        return {
          ...state,
          isFetching: true
        };
      case DELETE_FEELINGS_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case DELETE_FEELINGS_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case SINGLE_FEELINGS_START:
        return {
          ...state,
          isFetching: true
        };
      case SINGLE_FEELINGS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          singleFeelings: action.payload
        };
      case SINGLE_FEELINGS_FAILURE:
        return {
          ...state,
          isFetching: false,
          singleFeelings: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default feelingsReducer;
  