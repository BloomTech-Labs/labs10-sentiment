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
    SINGLE_SURVEY_FAILURE,
    REQ_ACTIVITY_SURVEY_START,
    REQ_ACTIVITY_SURVEY_SUCCESS,
    REQ_ACTIVITY_SURVEY_FAILURE,
    CHANGE_ACTIVITY_SURVEY_START,
    CHANGE_ACTIVITY_SURVEY_SUCCESS,
    CHANGE_ACTIVITY_SURVEY_FAILURE
} from '../actions/index';

const initialState = {
    survey: [],
    surveyIsFetching: false,
    error: null,
    singleSurvey: [],
    active: []
  };
  
  const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SURVEY_START:
        return {
          ...state,
          surveyIsFetching: true
        };
      case FETCH_SURVEY_SUCCESS:
        return {
          ...state,
          surveyIsFetching: false,
          survey: action.payload,
          error: null
        };
      case FETCH_SURVEY_FAILURE:
        return {
          ...state,
          surveyIsFetching: false,
          error: action.payload
        };
      case ADD_SURVEY_START:
        return {
          ...state,
          surveyIsFetching: true
        };
      case ADD_SURVEY_SUCCESS:
        return {
          ...state,
          surveyIsFetching: false,
        };
      case ADD_SURVEY_FAILURE:
        return {
          ...state,
          surveyIsFetching: false,
          error: action.payload
        };
      case EDIT_SURVEY_START:
        return {
          ...state,
          surveyIsFetching: true
        };
      case EDIT_SURVEY_SUCCESS:
        return {
          ...state,
          surveyIsFetching: false,
        };
      case EDIT_SURVEY_FAILURE:
        return {
          ...state,
          surveyIsFetching: false,
          error: action.payload
        };
      case DELETE_SURVEY_START:
        return {
          ...state,
          surveyIsFetching: true
        };
      case DELETE_SURVEY_SUCCESS:
        return {
          ...state,
          surveyIsFetching: false,
        };
      case DELETE_SURVEY_FAILURE:
        return {
          ...state,
          surveyIsFetching: false,
          error: action.payload
        };
      case SINGLE_SURVEY_START:
        return {
          ...state,
          surveyIsFetching: true
        };
      case SINGLE_SURVEY_SUCCESS:
        return {
          ...state,
          surveyIsFetching: false,
          singleSurvey: action.payload
        };
      case SINGLE_SURVEY_FAILURE:
        return {
          ...state,
          surveyIsFetching: false,
          singleSurvey: [],
          error: action.payload
        };
        case REQ_ACTIVITY_SURVEY_START:
        return {
          ...state,
          surveyIsFetching: true
        };
        case REQ_ACTIVITY_SURVEY_SUCCESS:
        return {
          ...state,
          surveyIsFetching: false,
          active: action.payload
        };
        case REQ_ACTIVITY_SURVEY_FAILURE:
        return {
          ...state,
          surveyIsFetching: false,
          active: [],
          error: action.payload
        };
        case CHANGE_ACTIVITY_SURVEY_START:
        return {
          ...state,
          surveyIsFetching: true
        };
        case CHANGE_ACTIVITY_SURVEY_SUCCESS:
        return {
          ...state,
          surveyIsFetching: false,
          error: null
        };
        case CHANGE_ACTIVITY_SURVEY_FAILURE:
        return {
          ...state,
          surveyIsFetching: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default surveyReducer;