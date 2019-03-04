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
    feelingsIsFetching: false,
    error: null,
    singleFeelings: [],
  };
  
  const feelingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FEELINGS_START:
        return {
          ...state,
          feelingsIsFetching: true
        };
      case FETCH_FEELINGS_SUCCESS:
        return {
          ...state,
          feelingsIsFetching: false,
          feelings: action.payload,
          error: null
        };
      case FETCH_FEELINGS_FAILURE:
        return {
          ...state,
          feelingsIsFetching: false,
          error: action.payload
        };
      case ADD_FEELINGS_START:
        return {
          ...state,
          feelingsIsFetching: true
        };
      case ADD_FEELINGS_SUCCESS:
        return {
          ...state,
          feelingsIsFetching: false,
        };
      case ADD_FEELINGS_FAILURE:
        return {
          ...state,
          feelingsIsFetching: false,
          error: action.payload
        };
      case EDIT_FEELINGS_START:
        return {
          ...state,
          feelingsIsFetching: true
        };
      case EDIT_FEELINGS_SUCCESS:
        return {
          ...state,
          feelingsIsFetching: false,
        };
      case EDIT_FEELINGS_FAILURE:
        return {
          ...state,
          feelingsIsFetching: false,
          error: action.payload
        };
      case DELETE_FEELINGS_START:
        return {
          ...state,
          feelingsIsFetching: true
        };
      case DELETE_FEELINGS_SUCCESS:
        return {
          ...state,
          feelingsIsFetching: false,
        };
      case DELETE_FEELINGS_FAILURE:
        return {
          ...state,
          feelingsIsFetching: false,
          error: action.payload
        };
      case SINGLE_FEELINGS_START:
        return {
          ...state,
          feelingsIsFetching: true
        };
      case SINGLE_FEELINGS_SUCCESS:
        return {
          ...state,
          feelingsIsFetching: false,
          singleFeelings: action.payload
        };
      case SINGLE_FEELINGS_FAILURE:
        return {
          ...state,
          feelingsIsFetching: false,
          singleFeelings: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default feelingsReducer;
  