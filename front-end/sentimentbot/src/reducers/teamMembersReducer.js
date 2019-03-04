import {
    FETCH_TEAMMEMBERS_START,
    FETCH_TEAMMEMBERS_SUCCESS,
    FETCH_TEAMMEMBERS_FAILURE,
    ADD_TEAMMEMBERS_START,
    ADD_TEAMMEMBERS_SUCCESS,
    ADD_TEAMMEMBERS_FAILURE,
    EDIT_TEAMMEMBERS_START,
    EDIT_TEAMMEMBERS_SUCCESS,
    EDIT_TEAMMEMBERS_FAILURE,
    DELETE_TEAMMEMBERS_START,
    DELETE_TEAMMEMBERS_SUCCESS,
    DELETE_TEAMMEMBERS_FAILURE,
    SINGLE_TEAMMEMBERS_START,
    SINGLE_TEAMMEMBERS_SUCCESS,
    SINGLE_TEAMMEMBERS_FAILURE
  } from "../actions/index";
  
  const initialState = {
    teamMembers: [],
    tmIsFetching: false,
    error: null,
    singleTeamMembers: []
  };
  
  const teamMembersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TEAMMEMBERS_START:
        return {
          ...state,
          tmIsFetching: true
        };
      case FETCH_TEAMMEMBERS_SUCCESS:
        return {
          ...state,
          tmIsFetching: false,
          teamMembers: action.payload,
          error: null
        };
      case FETCH_TEAMMEMBERS_FAILURE:
        return {
          ...state,
          tmIsFetching: false,
          error: action.payload
        };
      case ADD_TEAMMEMBERS_START:
        return {
          ...state,
          tmIsFetching: true
        };
      case ADD_TEAMMEMBERS_SUCCESS:
        return {
          ...state,
          tmIsFetching: false
        };
      case ADD_TEAMMEMBERS_FAILURE:
        return {
          ...state,
          tmIsFetching: false,
          error: action.payload
        };
      case EDIT_TEAMMEMBERS_START:
        return {
          ...state,
          tmIsFetching: true
        };
      case EDIT_TEAMMEMBERS_SUCCESS:
        return {
          ...state,
          tmIsFetching: false
        };
      case EDIT_TEAMMEMBERS_FAILURE:
        return {
          ...state,
          tmIsFetching: false,
          error: action.payload
        };
      case DELETE_TEAMMEMBERS_START:
        return {
          ...state,
          tmIsFetching: true
        };
      case DELETE_TEAMMEMBERS_SUCCESS:
        return {
          ...state,
          tmIsFetching: false
        };
      case DELETE_TEAMMEMBERS_FAILURE:
        return {
          ...state,
          tmIsFetching: false,
          error: action.payload
        };
      case SINGLE_TEAMMEMBERS_START:
        return {
          ...state,
          tmIsFetching: true
        };
      case SINGLE_TEAMMEMBERS_SUCCESS:
        return {
          ...state,
          tmIsFetching: false,
          singleTeamMembers: action.payload
        };
      case SINGLE_TEAMMEMBERS_FAILURE:
        return {
          ...state,
          tmIsFetching: false,
          singleTeamMembers: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default teamMembersReducer;
  