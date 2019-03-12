import axios from "axios";

export const FETCH_TEAMMEMBERS_START = "FETCH_TEAMMEMBERS_START";
export const FETCH_TEAMMEMBERS_SUCCESS = "FETCH_TEAMMEMBERS_SUCCESS";
export const FETCH_TEAMMEMBERS_FAILURE = "FETCH_TEAMMEMBERS_FAILURE";
export const ADD_TEAMMEMBERS_START = "ADD_TEAMMEMBERS_START";
export const ADD_TEAMMEMBERS_SUCCESS = "ADD_TEAMMEMBERS_SUCCESS";
export const ADD_TEAMMEMBERS_FAILURE = "ADD_TEAMMEMBERS_FAILURE";
export const DELETE_TEAMMEMBERS_START = "DELETE_TEAMMEMBERS_START";
export const DELETE_TEAMMEMBERS_SUCCESS = "DELETE_TEAMMEMBERS_SUCCESS";
export const DELETE_TEAMMEMBERS_FAILURE = "DELETE_TEAMMEMBERS_FAILURE";
export const EDIT_TEAMMEMBERS_START = "EDIT_TEAMMEMBERS_START";
export const EDIT_TEAMMEMBERS_SUCCESS = "EDIT_TEAMMEMBERS_SUCCESS";
export const EDIT_TEAMMEMBERS_FAILURE = "EDIT_TEAMMEMBERS_FAILURE";
export const SINGLE_TEAMMEMBERS_START = "SINGLE_TEAMMEMBERS_START";
export const SINGLE_TEAMMEMBERS_SUCCESS = "SINGLE_TEAMMEMBERS_SUCCESS";
export const SINGLE_TEAMMEMBERS_FAILURE = "SINGLE_TEAMMEMBERS_FAILURE";

export const getTeamMembers = () => dispatch => {
  dispatch({ type: FETCH_TEAMMEMBERS_START });
  axios
    .get("https://botsentiment.herokuapp.com/api/team_members")
    .then(response => {
      dispatch({ type: FETCH_TEAMMEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: FETCH_TEAMMEMBERS_FAILURE, payload: err }));
};

export const addTeamMembers = team => dispatch => {
  dispatch({ type: ADD_TEAMMEMBERS_START });
  axios
    .post("https://botsentiment.herokuapp.com/api/team_members", team)
    .then(response => {
      dispatch({ type: ADD_TEAMMEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: ADD_TEAMMEMBERS_FAILURE, payload: err }));
};

export const editTeamMembers = (id, body) => dispatch => {
  dispatch({ type: EDIT_TEAMMEMBERS_START });
  axios
    .put(`https://botsentiment.herokuapp.com/api/team_members/${id}`, body)
    .then(response => {
      dispatch({ type: EDIT_TEAMMEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: EDIT_TEAMMEMBERS_FAILURE, payload: err }));
};

export const deleteTeamMembers = id => dispatch => {
  dispatch({ type: DELETE_TEAMMEMBERS_START });
  axios
    .delete(`https://botsentiment.herokuapp.com/api/team_members/${id}`)
    .then(response => {
      dispatch({ type: DELETE_TEAMMEMBERS_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: DELETE_TEAMMEMBERS_FAILURE, payload: err }));
};

export const getSingleTeamMembers = email => dispatch => {
  dispatch({ type: SINGLE_TEAMMEMBERS_START });
  axios
    .get(`https://botsentiment.herokuapp.com/api/team_members/Email/${email}`)
    .then(response => {
      dispatch({ type: SINGLE_TEAMMEMBERS_SUCCESS, payload: response.data });
      localStorage.setItem('team_id', response.data[0].team_id)
      localStorage.setItem('type', response.data[0].type)
      localStorage.setItem('id', response.data[0].id)
    })
    .catch(err => dispatch({ type: SINGLE_TEAMMEMBERS_FAILURE, payload: err }));
};