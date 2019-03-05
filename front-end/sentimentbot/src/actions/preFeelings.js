import axios from 'axios';

export const FETCH_PREFEELING_START = 'FETCH_PREFEELING_START';
export const FETCH_PREFEELING_SUCCESS = 'FETCH_PREFEELING_SUCCESS';
export const FETCH_PREFEELING_FAILURE = 'FETCH_PREFEELING_FAILURE';
export const ADD_PREFEELING_START = 'ADD_PREFEELING_START';
export const ADD_PREFEELING_SUCCESS = 'ADD_PREFEELING_SUCCESS';
export const ADD_PREFEELING_FAILURE = 'ADD_PREFEELING_FAILURE';
export const DELETE_PREFEELING_START = 'DELETE_PREFEELING_START';
export const DELETE_PREFEELING_SUCCESS = 'DELETE_PREFEELING_SUCCESS';
export const DELETE_PREFEELING_FAILURE = 'DELETE_PREFEELING_FAILURE';
export const EDIT_PREFEELING_START = 'EDIT_PREFEELING_START';
export const EDIT_PREFEELING_SUCCESS = 'EDIT_PREFEELING_SUCCESS';
export const EDIT_PREFEELING_FAILURE = 'EDIT_PREFEELING_FAILURE';
export const SINGLE_PREFEELING_START = 'SINGLE_PREFEELING_START';
export const SINGLE_PREFEELING_SUCCESS = 'SINGLE_PREFEELING_SUCCESS';
export const SINGLE_PREFEELING_FAILURE = 'SINGLE_PREFEELING_FAILURE';

export const getPreFeeling = () => dispatch => {
    dispatch({ type: FETCH_PREFEELING_START });
  axios
    .get("https://botsentiment.herokuapp.com/api/pre-set-feelings")
    .then(response => {
      dispatch({ type: FETCH_PREFEELING_SUCCESS, payload: response.data });
    })
    .catch(err => dispatch({ type: FETCH_PREFEELING_FAILURE, payload: err }));
};

export const addPreFeeling = note => dispatch => {
    dispatch({ type: ADD_PREFEELING_START });
    axios
        .post("https://botsentiment.herokuapp.com/api/pre-set-feelings", note)
        .then(response => {
            dispatch({ type: ADD_PREFEELING_SUCCESS, payload: response.data });
        })
        .catch(err => dispatch({ type: ADD_PREFEELING_FAILURE, payload: err }));
};

export const editPreFeeling = (id, note) => dispatch => {
    dispatch({ type: EDIT_PREFEELING_START });
    axios
        .put(`https://botsentiment.herokuapp.com/api/pre-set-feelings/${id}`, note)
        .then(response => {
            dispatch({ type: EDIT_PREFEELING_SUCCESS, payload: response.data });
        })
        .catch(err => dispatch({ type: EDIT_PREFEELING_FAILURE, payload: err }));
};

export const deletePreFeeling = id => dispatch => {
    dispatch({ type: DELETE_PREFEELING_START });
    axios
        .delete(`https://botsentiment.herokuapp.com/api/pre-set-feelings/${id}`)
        .then(response => {
            dispatch({ type: DELETE_PREFEELING_SUCCESS, payload: response.data })
        })
        .catch(err => dispatch({ type: DELETE_PREFEELING_FAILURE, payload: err }));
};

export const fetchSinglePreFeeling = id => dispatch => {
    dispatch({ type: SINGLE_PREFEELING_START });
    axios
        .get(`https://botsentiment.herokuapp.com/api/pre-set-feelings/${id}`)
        .then(response => {
            dispatch({ type: SINGLE_PREFEELING_SUCCESS, payload: response.data })
        })
        .catch(err => dispatch({ type: SINGLE_PREFEELING_FAILURE, payload: err }));
};