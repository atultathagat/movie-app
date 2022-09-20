import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link, useLocation} from 'react-router-dom'
import logout from '../../images/logout.jpeg'
import { makeParallelCallForMoviesAndShows } from '../../redux/actions/movieActions';
import './Header.scss';

const Header = () => {
    const {pathname} = useLocation();
    const [term, setTerm] = useState('');
    const dispatch = useDispatch();
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const submitHandler = e => {
e.preventDefault();
dispatch(makeParallelCallForMoviesAndShows(term))
setTerm('');
    }

const logoutUser = () => {
localStorage.clear();
};

    return (pathname !== '/login' &&
        <div className='header'>
                <div className='logo'>   
    <Link to ='/'>Movie App</Link></div>
    {userDetails && userDetails.userType === 'user' && <div className='search-bar'>
{!pathname.includes('/movie') && <form onSubmit={submitHandler}>
    <input type="text" placeholder='Search movies or shows' value={term} onChange={e => setTerm(e.target.value)}/>
    <button type="submit"><i className='fa fa-search'></i></button>
</form>
}    </div>}
            {userDetails && <div className='user-img'>
                {<div>Welcome {userDetails.name}</div>}
                <Link to="/login">
                <img src={logout} alt = 'logut' onClick={() => logoutUser()}/></Link>
            </div>}
        </div>
    );
};

export default Header;