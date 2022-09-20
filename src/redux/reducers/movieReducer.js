import { actionTypes } from "../constants/action-types";

const initialStateForMovie = {
    movies: [],
    shows: [],
    movieOrShow: {},
};


const initialStateForAdminStat = {
    searches: []
};

export const movieReducer = (state = initialStateForMovie, {type, payload}) => {
    switch(type) {
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                movies: payload
            }
        case actionTypes.SET_SHOWS:
            return {
                ...state,
                shows: payload
            }
        case actionTypes.SELECTED_MOVIE_SHOW:
            return {
                ...state,
                movieOrShow: payload
            }    
        case actionTypes.REMOVE_SELECTED_MOVIE_SHOW:
            return {
                ...state,
                movieOrShow: {}
            }
        default: return state;
    }
}

export const adminReducer = (state = initialStateForAdminStat, {type,payload}) => {
    switch(type) {
        case actionTypes.SET_STAT:
            return {
                ...state,
                searches: payload
            }
       default: return state;
    }
}