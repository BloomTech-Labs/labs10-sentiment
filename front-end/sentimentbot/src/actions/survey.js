import axios from 'axios';

export const FETCH_SURVEY_START = 'FETCH_SURVEY_START';
export const FETCH_SURVEY_SUCCESS = 'FETCH_SURVEY_SUCCESS';
export const FETCH_SURVEY_FAILURE = 'FETCH_SURVEY_FAILURE';
export const ADD_SURVEY_START = 'ADD_SURVEY_START';
export const ADD_SURVEY_SUCCESS = 'ADD_SURVEY_SUCCESS';
export const ADD_SURVEY_FAILURE = 'ADD_SURVEY_FAILURE';
export const DELETE_SURVEY_START = 'DELETE_SURVEY_START';
export const DELETE_SURVEY_SUCCESS = 'DELETE_SURVEY_SUCCESS';
export const DELETE_SURVEY_FAILURE = 'DELETE_SURVEY_FAILURE';
export const EDIT_SURVEY_START = 'EDIT_SURVEY_START';
export const EDIT_SURVEY_SUCCESS = 'EDIT_SURVEY_SUCCESS';
export const EDIT_SURVEY_FAILURE = 'EDIT_SURVEY_FAILURE';
export const SINGLE_SURVEY_START = 'SINGLE_SURVEY_START';
export const SINGLE_SURVEY_SUCCESS = 'SINGLE_SURVEY_SUCCESS';
export const SINGLE_SURVEY_FAILURE = 'SINGLE_SURVEY_FAILURE';
export const REQ_ACTIVITY_SURVEY_START = 'REQ_ACTIVITY_SURVEY_START';
export const REQ_ACTIVITY_SURVEY_SUCCESS = 'REQ_ACTIVITY_SURVEY_SUCCESS';
export const REQ_ACTIVITY_SURVEY_FAILURE = 'REQ_ACTIVITY_SURVEY_FAILURE';
export const CHANGE_ACTIVITY_SURVEY_START = 'CHANGE_ACTIVITY_SURVEY_START';
export const CHANGE_ACTIVITY_SURVEY_SUCCESS = 'CHANGE_ACTIVITY_SURVEY_SUCCESS';
export const CHANGE_ACTIVITY_SURVEY_FAILURE = 'CHANGE_ACTIVITY_SURVEY_FAILURE';

//these routes relate to the use of our surveys between the managers and the users they are communicating with
let url = "https://botsentiment.herokuapp.com"
// let url = "http://localhost:5002"

export const getSurvey = id => dispatch => {
    dispatch({ type: FETCH_SURVEY_START });
    axios
    .get(`https://botsentiment.herokuapp.com/api/surveys/manager/${id}`)
    .then(response => {
        dispatch({ type: FETCH_SURVEY_SUCCESS, payload: response.data })
    })
    .catch(err => dispatch({ type: FETCH_SURVEY_FAILURE, payload: err }))
}

export const changeSurveyActivity = id => dispatch => {
    dispatch({ type: CHANGE_ACTIVITY_SURVEY_START });
    axios
    .get(`https://botsentiment.herokuapp.com/api/surveys/changeActivity/${id}`)
    .then(response => {
        dispatch({ type: CHANGE_ACTIVITY_SURVEY_SUCCESS, payload: response.data })
    })
    .catch(err => dispatch({ type: CHANGE_ACTIVITY_SURVEY_FAILURE, payload: err }))
}

export const getSurveyActivity = () => dispatch => {
    dispatch({ type: REQ_ACTIVITY_SURVEY_START });
    axios
    .get(`${url}/api/survey_active`)
    .then(response => {
        dispatch({ type: REQ_ACTIVITY_SURVEY_SUCCESS, payload: response.data })
    })
    .catch(err => dispatch({ type: REQ_ACTIVITY_SURVEY_FAILURE, payload: err }))
}

export const addSurvey = note => dispatch => {
    dispatch({ type: ADD_SURVEY_START });
    axios
        .post("https://botsentiment.herokuapp.com/api/surveys", note)
        .then(response => {
            dispatch({ type: ADD_SURVEY_SUCCESS, payload: response.data });
        })
        .catch(err => dispatch({ type: ADD_SURVEY_FAILURE, payload: err }));
};

export const editSurvey = (id, note) => dispatch => {
    dispatch({ type: EDIT_SURVEY_START });
    axios
        .put(`https://botsentiment.herokuapp.com/api/surveys/${id}`, note)
        .then(response => {
            dispatch({ type: EDIT_SURVEY_SUCCESS, payload: response.data });
        })
        .catch(err => dispatch({ type: EDIT_SURVEY_FAILURE, payload: err }));
};

export const deleteSurvey = id => dispatch => {
    dispatch({ type: DELETE_SURVEY_START });
    axios
        .delete(`https://botsentiment.herokuapp.com/api/surveys/${id}`)
        .then(response => {
            dispatch({ type: DELETE_SURVEY_SUCCESS, payload: response.data })
        })
        .catch(err => dispatch({ type: DELETE_SURVEY_FAILURE, payload: err }));
};

export const fetchSingleSurvey = id => dispatch => {
    dispatch({ type: SINGLE_SURVEY_START });
    axios
        .get(`https://botsentiment.herokuapp.com/api/surveys/${id}`)
        .then(response => {
            dispatch({ type: SINGLE_SURVEY_SUCCESS, payload: response.data })
        })
        .catch(err => dispatch({ type: SINGLE_SURVEY_FAILURE, payload: err }));
};