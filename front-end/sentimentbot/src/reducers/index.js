import { combineReducers } from 'redux'
import { feelingsReducer } from './feelingsReducer';
import { managersReducers } from './managersReducers';
import { surveyReducer } from './surveyReducer';

export default combineReducers ({
    feelingsReducer,
    managersReducers,
    surveyReducer,
})