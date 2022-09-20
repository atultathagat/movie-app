import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMovies, loadShows } from '../../redux/actions/movieActions';
import MovieCard from '../MovieCard/MovieCard'
import './MovieListing.scss';

const MovieListing = () => {

    const movieDetail = useSelector(state => state?.movieReducer?.movies);
    
    const showDetail = useSelector(state => state?.movieReducer?.shows);
 
    const movieText = 'Harry';
    const showText = 'Friends';
    const dispatch = useDispatch();
   useEffect(() => {
       dispatch(loadMovies(movieText, true));
       dispatch(loadShows(showText, true));
   }, [])

    const renderMovies = (detail) => {
        return detail.Response === 'True' ? 
        detail.Search.map((movie, index) => <MovieCard key={index} data={movie}/>): 
        <div  className='movie-error'>
           <h2>{detail.Error}</h2>
        </div>
    }

    return (
        <div className='movie-wrapper'>
            <div className='movie-list'>
                <h2>Movies</h2>
            <div className='movie-container'>{movieDetail.Response && renderMovies(movieDetail)}</div>
            </div>
            <div className='show-list'>
                <h2>Shows</h2>
            <div className='movie-container'>{showDetail.Response && renderMovies(showDetail)}</div>
            </div>
        </div>
    );
};

export default MovieListing;