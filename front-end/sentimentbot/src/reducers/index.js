import { combineReducers } from 'redux'
import { feelingsReducer } from './feelingsReducer';
import { managersReducers } from './managersReducers';

export default combineReducers ({
    feelingsReducer,
    managersReducers
})