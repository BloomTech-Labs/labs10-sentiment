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
  SINGLE_TEAMS_FAILURE,
  JOIN_TEAM_START,
  JOIN_TEAM_SUCCESS,
  JOIN_TEAM_FAILURE,
  FETCH_TEAMS_MEMBERS_START,
  FETCH_TEAMS_MEMBERS_SUCCESS,
  FETCH_TEAMS_MEMBERS_FAILURE
} from "../actions/index";

const initialState = {
  teams: [],
  teamsIsFetching: false,
  error: null,
  singleTeams: [],
  teamMembers: [],
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAMS_START:
      return {
        ...state,
        teamsIsFetching: true
      };
    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        teamsIsFetching: false,
        teams: action.payload,
        error: null
      };
    case FETCH_TEAMS_FAILURE:
      return {
        ...state,
        teamsIsFetching: false,
        error: action.payload
      };
    case ADD_TEAMS_START:
      return {
        ...state,
        teamsIsFetching: true
      };
    case ADD_TEAMS_SUCCESS:
      return {
        ...state,
        teamsIsFetching: false
      };
    case ADD_TEAMS_FAILURE:
      return {
        ...state,
        teamsIsFetching: false,
        error: action.payload
      };
    case EDIT_TEAMS_START:
      return {
        ...state,
        teamsIsFetching: true
      };
    case EDIT_TEAMS_SUCCESS:
      return {
        ...state,
        teamsIsFetching: false
      };
    case EDIT_TEAMS_FAILURE:
      return {
        ...state,
        teamsIsFetching: false,
        error: action.payload
      };
    case DELETE_TEAMS_START:
      return {
        ...state,
        teamsIsFetching: true
      };
    case DELETE_TEAMS_SUCCESS:
      return {
        ...state,
        teamsIsFetching: false
      };
    case DELETE_TEAMS_FAILURE:
      return {
        ...state,
        teamsIsFetching: false,
        error: action.payload
      };
    case SINGLE_TEAMS_START:
      return {
        ...state,
        teamsIsFetching: true
      };
    case SINGLE_TEAMS_SUCCESS:
      return {
        ...state,
        teamsIsFetching: false,
        singleTeams: action.payload
      };
    case SINGLE_TEAMS_FAILURE:
      return {
        ...state,
        teamsIsFetching: false,
        singleTeams: [],
        error: action.payload
      };
    case JOIN_TEAM_START:
      return {
        ...state,
        teamsIsFetching: true
      };
    case JOIN_TEAM_SUCCESS:
      return {
        ...state,
        teamsIsFetching: false,
        teamMembers: action.payload
      };
    case JOIN_TEAM_FAILURE:
      return {
        ...state,
        teamsIsFetching: false,
        teamMembers: [],
        error: action.payload
      };
      case FETCH_TEAMS_MEMBERS_START:
      return {
        ...state,
        teamsIsFetching: true
      };
    case FETCH_TEAMS_MEMBERS_SUCCESS:
      return {
        ...state,
        teamsIsFetching: false,
        teamMembers: action.payload,
        error: null
      };
    case FETCH_TEAMS_MEMBERS_FAILURE:
      return {
        ...state,
        teamsIsFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default teamsReducer;
