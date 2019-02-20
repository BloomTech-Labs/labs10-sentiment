import { combineReducers } from 'redux'
import feelingsReducer  from './feelingsReducer';
import managersReducers  from './managersReducer';
import surveyReducer  from './surveyReducer';
import  teamsReducers  from './teamsReducer';

export default combineReducers ({
    feelingsReducer,
    managersReducers,
    surveyReducer,
    teamsReducers
})