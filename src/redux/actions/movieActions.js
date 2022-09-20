import { apiKey } from "../../common/apis/movieAPIKey";
import { actionTypes } from "../constants/action-types";
import movieAPI from "../../common/apis/movieAPI"
import axios from 'axios';


export const setMovies = movies => (
    {
        type: actionTypes.SET_MOVIES,
        payload: movies
    }
)

export const selectedMovieOrShow = movie => (
    {
        type: actionTypes.SELECTED_MOVIE_SHOW,
        payload: movie
    }
)

export const setShows = shows => (
    {
        type: actionTypes.SET_SHOWS,
        payload: shows
    }
)

export const removeSelectedMovieShow = () => ( 
    {
        type: actionTypes.REMOVE_SELECTED_MOVIE_SHOW,
        payload: {}
    }
);


export const setStat = stat => (
    {
        type: actionTypes.SET_STAT,
        payload: stat
    }
)

const addSearchResult = (searchTerm, searchType) => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    axios.post('http://localhost:8090/addSearchHistory',
    {searchTerm,
    searchedBy: userDetails.name,
searchType});
}

export const loadMovies = (movieText, defaultLoad) => dispatch => {
        movieAPI.get(`?apiKey=${apiKey}&s=${movieText}&type=movie`).
        then(response => {
            dispatch(setMovies(response.data))
         !defaultLoad && addSearchResult(movieText,'Searched')
            }).
        catch(() => {});
    };

export const loadShows = (showText, defaultLoad) => dispatch => {
        movieAPI.get(`?apiKey=${apiKey}&s=${showText}&type=series`).
        then(response => {dispatch(setShows(response.data))
        !defaultLoad && addSearchResult(showText,'Searched')
        }
        ).
        catch(() => {});
    };

export const loadMovieOrShows = movieId => dispatch => {
    movieAPI.get(`?apiKey=${apiKey}&i=${movieId}&Plot=full`).
    then(response => {
        dispatch(selectedMovieOrShow(response.data))
        addSearchResult(response.data.Title,'Clicked');
    }).
    catch(() => {});
}

export const makeParallelCallForMoviesAndShows = searchTerm => dispatch => {
const apiCalls = [movieAPI.get(`?apiKey=${apiKey}&s=${searchTerm}&type=movie`), movieAPI.get(`?apiKey=${apiKey}&s=${searchTerm}&type=series`)];
let isSuccess = false;
Promise.allSettled(apiCalls).then(responses => {
    responses.forEach((resp, i) => {
        const {status, value} = resp;
    if(value.data.Response === 'True' && !isSuccess)
        isSuccess = true;
        if(status === "fulfilled") {
            if(i===0) {
            dispatch(setMovies(value.data))
            }
            else {
                dispatch(setShows(value.data))
            }
         }
    })
    if(isSuccess) {
        addSearchResult(searchTerm, 'Searched')
    }
});

}

export const loadStat = () => dispatch => {
    axios.get(`http://localhost:8090/getSearchHistory`).
    then(response => {
        dispatch(setStat(response.data))
    }).
    catch(() => {});
}