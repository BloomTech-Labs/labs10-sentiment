import {
    FETCH_SURVEY_START,
    FETCH_SURVEY_SUCCESS,
    FETCH_SURVEY_FAILURE,
    ADD_SURVEY_START,
    ADD_SURVEY_SUCCESS,
    ADD_SURVEY_FAILURE,
    EDIT_SURVEY_START,
    EDIT_SURVEY_SUCCESS,
    EDIT_SURVEY_FAILURE,
    DELETE_SURVEY_START,
    DELETE_SURVEY_SUCCESS,
    DELETE_SURVEY_FAILURE,
    SINGLE_SURVEY_START,
    SINGLE_SURVEY_SUCCESS,
    SINGLE_SURVEY_FAILURE
} from '../actions/index';

const initialState = {
    survey: [],
    isFetching: false,
    error: null,
    singleSurvey: [],
  };
  
  const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SURVEY_START:
        return {
          ...state,
          isFetching: true
        };
      case FETCH_SURVEY_SUCCESS:
        return {
          ...state,
          isFetching: false,
          survey: action.payload,
          error: null
        };
      case FETCH_SURVEY_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case ADD_SURVEY_START:
        return {
          ...state,
          isFetching: true
        };
      case ADD_SURVEY_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case ADD_SURVEY_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case EDIT_SURVEY_START:
        return {
          ...state,
          isFetching: true
        };
      case EDIT_SURVEY_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case EDIT_SURVEY_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case DELETE_SURVEY_START:
        return {
          ...state,
          isFetching: true
        };
      case DELETE_SURVEY_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case DELETE_SURVEY_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      case SINGLE_SURVEY_START:
        return {
          ...state,
          isFetching: true
        };
      case SINGLE_SURVEY_SUCCESS:
        return {
          ...state,
          isFetching: false,
          singleSurvey: action.payload
        };
      case SINGLE_SURVEY_FAILURE:
        return {
          ...state,
          isFetching: false,
          singleSurvey: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default surveyReducer;