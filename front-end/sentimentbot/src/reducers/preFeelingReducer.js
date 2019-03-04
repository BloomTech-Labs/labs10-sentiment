import {
    FETCH_PREFEELING_START,
    FETCH_PREFEELING_SUCCESS,
    FETCH_PREFEELING_FAILURE,
    ADD_PREFEELING_START,
    ADD_PREFEELING_SUCCESS,
    ADD_PREFEELING_FAILURE,
    EDIT_PREFEELING_START,
    EDIT_PREFEELING_SUCCESS,
    EDIT_PREFEELING_FAILURE,
    DELETE_PREFEELING_START,
    DELETE_PREFEELING_SUCCESS,
    DELETE_PREFEELING_FAILURE,
    SINGLE_PREFEELING_START,
    SINGLE_PREFEELING_SUCCESS,
    SINGLE_PREFEELING_FAILURE
} from '../actions/index';

const initialState = {
    prefeelings: [],
    isFetching: false,
    error: null,
    singlePreFeelings: [],
  };
  
  const prefeelingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PREFEELING_START:
        return {
          ...state,
          isFetching: true
        };
      case FETCH_PREFEELING_SUCCESS:
        return {
          ...state,
          isFetching: false,
          prefeelings: action.payload,
          error: null
        };
      case FETCH_PREFEELING_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case ADD_PREFEELING_START:
        return {
          ...state,
          isFetching: true
        };
      case ADD_PREFEELING_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case ADD_PREFEELING_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case EDIT_PREFEELING_START:
        return {
          ...state,
          isFetching: true
        };
      case EDIT_PREFEELING_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case EDIT_PREFEELING_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case DELETE_PREFEELING_START:
        return {
          ...state,
          isFetching: true
        };
      case DELETE_PREFEELING_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case DELETE_PREFEELING_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case SINGLE_PREFEELING_START:
        return {
          ...state,
          isFetching: true
        };
      case SINGLE_PREFEELING_SUCCESS:
        return {
          ...state,
          isFetching: false,
          singlePreFeelings: action.payload
        };
      case SINGLE_PREFEELING_FAILURE:
        return {
          ...state,
          isFetching: false,
          singlePreFeelings: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default prefeelingsReducer;