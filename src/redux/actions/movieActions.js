import { apiKey } from "../../common/apis/movieAPIKey";
import { actionTypes } from "../constants/action-types";
import movieAPI from "../../common/apis/movieAPI"

export const setMovies = movies => (
    {
        type: actionTypes.SET_MOVIES,
        payload: movies
    }
)

export const selectedMovie = movie => (
    {
        type: actionTypes.SELECTED_MOVIE,
        payload: movie
    }
)

export const loadMovies = movieText => dispatch => {
        movieAPI.get(`?apiKey=${apiKey}&s=${movieText}&type=movie`).
        then(response => dispatch(setMovies(response.data))).
        catch(() => {});
    };
