import axios from 'axios';

export const FETCH_MANAGERS_START = 'FETCH_MANAGERS_START';
export const FETCH_MANAGERS_SUCCESS = 'FETCH_MANAGERS_SUCCESS';
export const FETCH_MANAGERS_FAILURE = 'FETCH_MANAGERS_FAILURE';
export const ADD_MANAGERS_START = 'ADD_MANAGERS_START';
export const ADD_MANAGERS_SUCCESS = 'ADD_MANAGERS_SUCCESS';
export const ADD_MANAGERS_FAILURE = 'ADD_MANAGERS_FAILURE';
export const DELETE_MANAGERS_START = 'DELETE_MANAGERS_START';
export const DELETE_MANAGERS_SUCCESS = 'DELETE_MANAGERS_SUCCESS';
export const DELETE_MANAGERS_FAILURE = 'DELETE_MANAGERS_FAILURE';
export const EDIT_MANAGERS_START = 'EDIT_MANAGERS_START';
export const EDIT_MANAGERS_SUCCESS = 'EDIT_MANAGERS_SUCCESS';
export const EDIT_MANAGERS_FAILURE = 'EDIT_MANAGERS_FAILURE';
export const SINGLE_MANAGERS_START = 'SINGLE_MANAGERS_START';
export const SINGLE_MANAGERS_SUCCESS = 'SINGLE_MANAGERS_SUCCESS';
export const SINGLE_MANAGERS_FAILURE = 'SINGLE_MANAGERS_FAILURE';

export const getManagers = id => dispatch => {
    dispatch({ type: FETCH_MANAGERS_START });
    axios
    .get(`https://botsentiment.herokuapp.com/api/slackauth/single/${id}`)
    .then(response => {
        dispatch({ type: FETCH_MANAGERS_SUCCESS, payload: response.data })
    })
    .catch(err => dispatch({ type: FETCH_MANAGERS_FAILURE, payload: err }))
}

export const addManager = note => dispatch => {
    dispatch({ type: ADD_MANAGERS_START });
    axios
        .post("https://botsentiment.herokuapp.com/api/managers", note)
        .then(response => {
            dispatch({ type: ADD_MANAGERS_SUCCESS, payload: response.data });
        })
        .catch(err => dispatch({ type: ADD_MANAGERS_FAILURE, payload: err }));
};

export const editManager = (id, note) => dispatch => {
    dispatch({ type: EDIT_MANAGERS_START });
    axios
        .put(`https://botsentiment.herokuapp.com/api/managers/${id}`, note)
        .then(response => {
            dispatch({ type: EDIT_MANAGERS_SUCCESS, payload: response.data });
        })
        .catch(err => dispatch({ type: EDIT_MANAGERS_FAILURE, payload: err }));
};

export const deleteManager = id => dispatch => {
    dispatch({ type: DELETE_MANAGERS_START });
    axios
        .delete(`https://botsentiment.herokuapp.com/api/managers/${id}`)
        .then(response => {
            dispatch({ type: DELETE_MANAGERS_SUCCESS, payload: response.data })
        })
        .catch(err => dispatch({ type: DELETE_MANAGERS_FAILURE, payload: err }));
};

export const fetchSingleManager = id => dispatch => {
    dispatch({ type: SINGLE_MANAGERS_START });
    axios
        .get(`https://botsentiment.herokuapp.com/api/managers/${id}`)
        .then(response => {
            dispatch({ type: SINGLE_MANAGERS_SUCCESS, payload: response.data })
        })
        .catch(err => dispatch({ type: SINGLE_MANAGERS_FAILURE, payload: err }));
};