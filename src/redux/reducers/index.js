import { combineReducers } from "redux";
import {movieReducer, adminReducer} from './movieReducer'

export const rootReducer = combineReducers({
    movieReducer,
    adminReducer
});
