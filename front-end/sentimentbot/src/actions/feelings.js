import axios from 'axios';

export const FETCH_FEELINGS_START = 'FETCH_FEELINGS_START';
export const FETCH_FEELINGS_SUCCESS = 'FETCH_FEELINGS_SUCCESS';
export const FETCH_FEELINGS_FAILURE = 'FETCH_FEELINGS_FAILURE';
export const ADD_FEELINGS_START = 'ADD_FEELINGS_START';
export const ADD_FEELINGS_SUCCESS = 'ADD_FEELINGS_SUCCESS';
export const ADD_FEELINGS_FAILURE = 'ADD_FEELINGS_FAILURE';
export const DELETE_FEELINGS_START = 'DELETE_FEELINGS_START';
export const DELETE_FEELINGS_SUCCESS = 'DELETE_FEELINGS_SUCCESS';
export const DELETE_FEELINGS_FAILURE = 'DELETE_FEELINGS_FAILURE';
export const EDIT_FEELINGS_START = 'EDIT_FEELINGS_START';
export const EDIT_FEELINGS_SUCCESS = 'EDIT_FEELINGS_SUCCESS';
export const EDIT_FEELINGS_FAILURE = 'EDIT_FEELINGS_FAILURE';
export const SINGLE_FEELINGS_START = 'SINGLE_FEELINGS_START';
export const SINGLE_FEELINGS_SUCCESS = 'SINGLE_FEELINGS_SUCCESS';
export const SINGLE_FEELINGS_FAILURE = 'SINGLE_FEELINGS_FAILURE';

export const getFeelings = id => dispatch => {
    dispatch({ type: FETCH_FEELINGS_START });
    axios
    .get(`https://botsentiment.herokuapp.com/api/feelings/myfeelings/${id}`)
    .then(response => {
        dispatch({ type: FETCH_FEELINGS_SUCCESS, payload: response.data })
    })
    .catch(err => dispatch({ type: FETCH_FEELINGS_FAILURE, payload: err }))
}

export const addFeelings = note => dispatch => {
    dispatch({ type: ADD_FEELINGS_START });
    axios
        .post("https://botsentiment.herokuapp.com/api/feelings", note)
        .then(response => {
            dispatch({ type: ADD_FEELINGS_SUCCESS, payload: response.data });
        })
        .catch(err => dispatch({ type: ADD_FEELINGS_FAILURE, payload: err }));
};

export const editFeelings = (id, note) => dispatch => {
    dispatch({ type: EDIT_FEELINGS_START });
    axios
        .put(`https://botsentiment.herokuapp.com/api/feelings/${id}`, note)
        .then(response => {
            dispatch({ type: EDIT_FEELINGS_SUCCESS, payload: response.data });
        })
        .catch(err => dispatch({ type: EDIT_FEELINGS_FAILURE, payload: err }));
};

export const deleteFeelings = id => dispatch => {
    dispatch({ type: DELETE_FEELINGS_START });
    axios
        .delete(`https://botsentiment.herokuapp.com/api/feelings/${id}`)
        .then(response => {
            dispatch({ type: DELETE_FEELINGS_SUCCESS, payload: response.data })
        })
        .catch(err => dispatch({ type: DELETE_FEELINGS_FAILURE, payload: err }));
};

export const fetchSingleFeelings = id => dispatch => {
    dispatch({ type: SINGLE_FEELINGS_START });
    axios
        .get(`https://botsentiment.herokuapp.com/api/feelings/${id}`)
        .then(response => {
            dispatch({ type: SINGLE_FEELINGS_SUCCESS, payload: response.data })
        })
        .catch(err => dispatch({ type: SINGLE_FEELINGS_FAILURE, payload: err }));
};