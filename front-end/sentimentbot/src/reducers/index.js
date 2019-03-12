import { combineReducers } from 'redux'
import feelingsReducer  from './feelingsReducer';
import managersReducer  from './managersReducer';
import surveyReducer  from './surveyReducer';
import  teamsReducer  from './teamsReducer';
import teamMembersReducer from './teamMembersReducer';
import prefeelingsReducer from './preFeelingReducer';

export default combineReducers ({
    feelingsReducer,
    managersReducer,
    surveyReducer,
    teamsReducer,
    teamMembersReducer,
    prefeelingsReducer
})