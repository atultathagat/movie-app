import React, { useEffect } from 'react';
import { loadMovies } from '../../redux/actions/movieActions';
import MovieListing
 from '../MovieListing/MovieListing';
import { useDispatch } from 'react-redux';

 const Home = () => {
     const movieText = 'Harry';
     const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMovies(movieText));
    }, [])
    return (
        <div>
            <div className='banner-img'></div>
            <MovieListing/>
        </div>
    );
};

export default Home;