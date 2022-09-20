import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { loadMovieOrShows, removeSelectedMovieShow } from '../../redux/actions/movieActions';
import './MovieDetail.scss';

const MovieDetail = () => {

    const {imdbID} = useParams();

    const dispatch = useDispatch();

    const movieShowDetail = useSelector(state => state?.movieReducer?.movieOrShow);

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    
    
    useEffect(() => {
     dispatch(loadMovieOrShows(imdbID));
     return () => {
         dispatch(removeSelectedMovieShow());
     }
    }, []);

    return (<>
    {userDetails.userType === 'admin' && <Redirect to='/'/>}
        <div className='movie-section'>
           {!Object.keys(movieShowDetail).length ?
           <div>
               ...Loading
           </div> : <>
            <div className='section-left'>
                <div className='movie-title'>{movieShowDetail.Title}</div>
                <div className='movie-rating'>
                    <span>
                       IMDB Rating <i className='fa fa-star'></i> : {movieShowDetail.imdbRating}
                    </span>
                    <span>
                       IMDB Votes <i className='fa fa-thumbs-up'></i> : {movieShowDetail.imdbVotes}
                    </span>
                    <span>
                       Runtime <i className='fa fa-film'></i> : {movieShowDetail.Runtime}
                    </span>
                    <span>
                       Year <i className='fa fa-calendar'></i> : {movieShowDetail.Year}
                    </span>
                </div>
                <div className='movie-plot'>
                     {movieShowDetail.Plot}
                </div>
                <div className='movie-info'>
                  <div>
                      <span>Director</span>
                      <span>{movieShowDetail.Director}</span>
                  </div>
                  <div>
                      <span>Stars</span>
                      <span>{movieShowDetail.Actors}</span>
                  </div>
                  <div>
                      <span>Genres</span>
                      <span>{movieShowDetail.Genre}</span>
                  </div>
                  <div>
                      <span>Language</span>
                      <span>{movieShowDetail.Language}</span>
                  </div>
                </div>
            </div>
            <div className='section-left'>
                <img src={movieShowDetail.Poster} alt={movieShowDetail.Title}/>
            </div>
            </>
}        </div>
</>
    );
};

export default MovieDetail;