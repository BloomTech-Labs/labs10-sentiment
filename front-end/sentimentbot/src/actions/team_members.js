import axios from "axios";

export const FETCH_TEAMMEMBERS_START = "FETCH_TEAMS_START";
export const FETCH_TEAMMEMBERS_SUCCESS = "FETCH_TEAMS_SUCCESS";
export const FETCH_TEAMMEMBERS_FAILURE = "FETCH_TEAMS_FAILURE";
export const ADD_TEAMMEMBERS_START = "ADD_TEAMS_START";
export const ADD_TEAMMEMBERS_SUCCESS = "ADD_TEAMS_SUCCESS";
export const ADD_TEAMMEMBERS_FAILURE = "ADD_TEAMS_FAILURE";
export const DELETE_TEAMMEMBERS_START = "DELETE_TEAMS_START";
export const DELETE_TEAMMEMBERS_SUCCESS = "DELETE_TEAMS_SUCCESS";
export const DELETE_TEAMMEMBERS_FAILURE = "DELETE_TEAMS_FAILURE";
export const EDIT_TEAMMEMBERS_START = "EDIT_TEAMS_START";
export const EDIT_TEAMMEMBERS_SUCCESS = "EDIT_TEAMS_SUCCESS";
export const EDIT_TEAMMEMBERS_FAILURE = "EDIT_TEAMS_FAILURE";
export const SINGLE_TEAMMEMBERS_START = "SINGLE_TEAMS_START";
export const SINGLE_TEAMMEMBERS_SUCCESS = "SINGLE_TEAMS_SUCCESS";
export const SINGLE_TEAMMEMBERS_FAILURE = "SINGLE_TEAM_FAILURE";

export const getTeamMembers = () => {
  dispatchEvent({ type: FETCH_TEAMMEMBERS_START });
  axios
    .get("https://botsentiment.herokuapp.com/api/teams")
    .then(response => {
      dispatchEvent({ type: FETCH_TEAMMEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatchEvent({ type: FETCH_TEAMS_FAILURE, payload: err }));
};

export const addTeamMembers = team => dispatch => {
  dispatch({ type: ADD_TEAMMEMBERS_START });
  axios
    .post("https://botsentiment.herokuapp.com/api/teams", team)
    .then(response => {
      dispatch({ type: ADD_TEAMMEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: ADD_TEAMS_FAILURE, payload: err }));
};

export const editTeamMembers = id => dispatch => {
  dispatch({ type: EDIT_TEAMMEMBERS_START });
  axios
    .put(`https://botsentiment.herokuapp.com/api/teams/${id}`)
    .then(response => {
      dispatch({ type: EDIT_TEAMMEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: EDIT_TEAMS_FAILURE, payload: err }));
};

export const deleteTeamMembers = id => dispatch => {
  dispatch({ type: DELETE_TEAMMEMBERS_START });
  axios
    .put(`https://botsentiment.herokuapp.com/api/teams/${id}`)
    .then(response => {
      dispatch({ type: DELETE_TEAMMEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: DELETE_TEAMS_FAILURE, payload: err }));
};

export const getSingleTeamMembers = email => dispatch => {
  dispatch({ type: SINGLE_TEAMMEMBERS_START });
  axios
    .put(`https://botsentiment.herokuapp.com/api/teams/${email}`)
    .then(response => {
      dispatch({ type: SINGLE_TEAMMEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: SINGLE_TEAMMEMBERS_FAILURE, payload: err }));
};