import { combineReducers } from 'redux'
import feelingsReducer  from './feelingsReducer';
import managersReducers  from './managersReducer';
import surveyReducer  from './surveyReducer';
import  teamsReducer  from './teamsReducer';
import teamMembersReducer from './teamMembersReducer';
import prefeelingsReducer from './preFeelingReducer';

export default combineReducers ({
    feelingsReducer,
    managersReducers,
    surveyReducer,
    teamsReducer,
    teamMembersReducer,
    prefeelingsReducer
})