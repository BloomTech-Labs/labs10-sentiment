import axios from "axios";

export const FETCH_TEAMS_START = "FETCH_TEAMS_START";
export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS";
export const FETCH_TEAMS_FAILURE = "FETCH_TEAMS_FAILURE";
export const ADD_TEAMS_START = "ADD_TEAMS_START";
export const ADD_TEAMS_SUCCESS = "ADD_TEAMS_SUCCESS";
export const ADD_TEAMS_FAILURE = "ADD_TEAMS_FAILURE";
export const DELETE_TEAMS_START = "DELETE_TEAMS_START";
export const DELETE_TEAMS_SUCCESS = "DELETE_TEAMS_SUCCESS";
export const DELETE_TEAMS_FAILURE = "DELETE_TEAMS_FAILURE";
export const EDIT_TEAMS_START = "EDIT_TEAMS_START";
export const EDIT_TEAMS_SUCCESS = "EDIT_TEAMS_SUCCESS";
export const EDIT_TEAMS_FAILURE = "EDIT_TEAMS_FAILURE";
export const SINGLE_TEAMS_START = "SINGLE_TEAMS_START";
export const SINGLE_TEAMS_SUCCESS = "SINGLE_TEAMS_SUCCESS";
export const SINGLE_TEAMS_FAILURE = "SINGLE_TEAM_FAILURE";
export const JOIN_TEAM_START = "JOIN_TEAM_START";
export const JOIN_TEAM_SUCCESS = "JOIN_TEAM_SUCCESS";
export const JOIN_TEAM_FAILURE = "JOIN_TEAM_FAILURE";
export const FETCH_TEAMS_MEMBERS_START = "FETCH_TEAMS_MEMBERS_START";
export const FETCH_TEAMS_MEMBERS_SUCCESS = "FETCH_TEAMS_MEMBERS_SUCCESS";
export const FETCH_TEAMS_MEMBERS_FAILURE = "FETCH_TEAMS_MEMBERS_FAILURE";

export const getTeams = () => dispatch => {
  dispatch({ type: FETCH_TEAMS_START });
  axios
    .get("https://botsentiment.herokuapp.com/api/teams")
    .then(response => {
      dispatch({ type: FETCH_TEAMS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: FETCH_TEAMS_FAILURE, payload: err }));
};

export const joinTeam = (id, team_code) => dispatch => {
  dispatch({ type: EDIT_TEAMS_START });
  axios
    .put(`https://botsentiment.herokuapp.com/api/team_members/${id}/join`, team_code)
    .then(response => {
      dispatch({ type: EDIT_TEAMS_SUCCESS, payload: response.team_code });
    })
    .catch(err => dispatch({ type: EDIT_TEAMS_FAILURE, payload: err }));
 };

export const addTeam = data => dispatch => {
  dispatch({ type: ADD_TEAMS_START });
  axios
    .post("https://botsentiment.herokuapp.com/api/teams", data)
    .then(response => {
      dispatch({ type: ADD_TEAMS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: ADD_TEAMS_FAILURE, payload: err }));
};

export const editTeam = (id, note) => dispatch => {
  dispatch({ type: EDIT_TEAMS_START });
  axios
    .put(`https://botsentiment.herokuapp.com/api/teams/${id}`, note)
    .then(response => {
      dispatch({ type: EDIT_TEAMS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: EDIT_TEAMS_FAILURE, payload: err }));
};

export const deleteTeam = id => dispatch => {
  dispatch({ type: DELETE_TEAMS_START });
  axios
    .delete(`https://botsentiment.herokuapp.com/api/teams/${id}`)
    .then(response => {
      dispatch({ type: DELETE_TEAMS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: DELETE_TEAMS_FAILURE, payload: err }));
};

export const getSingleTeam = id => dispatch => {
  dispatch({ type: SINGLE_TEAMS_START });
  axios
    .get(`https://botsentiment.herokuapp.com/api/teams/${id}`)
    .then(response => {
      dispatch({ type: SINGLE_TEAMS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: SINGLE_TEAMS_FAILURE, payload: err }));
};

export const getTeamsMembers = id => dispatch => {
  dispatch({ type: FETCH_TEAMS_MEMBERS_START });
  axios
    .get(`https://botsentiment.herokuapp.com/api/team_members/team_member/${id}`)
    .then(response => {
      dispatch({ type: FETCH_TEAMS_MEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: FETCH_TEAMS_MEMBERS_FAILURE, payload: err }));
};
