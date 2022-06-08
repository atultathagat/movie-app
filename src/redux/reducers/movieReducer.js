import { actionTypes } from "../constants/action-types";

const initialState = {
    movies: []
};

export const movieReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                movies: payload
            }
        default: return state

    }
}