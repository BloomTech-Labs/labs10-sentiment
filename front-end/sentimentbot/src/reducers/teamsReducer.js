import {
  FETCH_TEAMS_START,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
  ADD_TEAMS_START,
  ADD_TEAMS_SUCCESS,
  ADD_TEAMS_FAILURE,
  EDIT_TEAMS_START,
  EDIT_TEAMS_SUCCESS,
  EDIT_TEAMS_FAILURE,
  DELETE_TEAMS_START,
  DELETE_TEAMS_SUCCESS,
  DELETE_TEAMS_FAILURE,
  SINGLE_TEAMS_START,
  SINGLE_TEAMS_SUCCESS,
  SINGLE_TEAMS_FAILURE
} from "../actions/index";

const initialState = {
  teams: [],
  isFetching: false,
  error: null,
  singleTeams: []
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAMS_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        teams: action.payload,
        error: null
      };
    case FETCH_TEAMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case ADD_TEAMS_START:
      return {
        ...state,
        isFetching: true
      };
    case ADD_TEAMS_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case ADD_TEAMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case EDIT_TEAMS_START:
      return {
        ...state,
        isFetching: true
      };
    case EDIT_TEAMS_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case EDIT_TEAMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case DELETE_TEAMS_START:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_TEAMS_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case DELETE_TEAMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case SINGLE_TEAMS_START:
      return {
        ...state,
        isFetching: true
      };
    case SINGLE_TEAMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        singleTeams: action.payload
      };
    case SINGLE_TEAMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        singleTeams: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default teamsReducer;
