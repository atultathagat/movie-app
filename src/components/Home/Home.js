import React from 'react';
import AdminPanel from '../AdminPanel/AdminPanel';
import MovieListing
 from '../MovieListing/MovieListing';

 const Home = () => {
 
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
 
    return (
        <div>
            <div className='banner-img'></div>
            {userDetails.userType === 'user' ? <MovieListing/> : <AdminPanel/>}
        </div>
    );
};

export default Home;