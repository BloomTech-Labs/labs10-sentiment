import { combineReducers } from 'redux'
import feelingsReducer  from './feelingsReducer';
import managersReducers  from './managersReducer';
import surveyReducer  from './surveyReducer';
import  teamsReducers  from './teamsReducer';
import teamMembersReducer from './teamMembersReducer'

export default combineReducers ({
    feelingsReducer,
    managersReducers,
    surveyReducer,
    teamsReducers,
    teamMembersReducer
})